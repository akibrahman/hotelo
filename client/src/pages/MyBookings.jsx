import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa";
import ReactModal from "react-modal";
import Rating from "react-rating";
import secureAxios from "../API/secureAxios";
import Button from "../components/Button/Button";
import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const MyBookings = () => {
  const user = useUser();
  const [booking, setBooking] = useState(null);
  //! Get all Bookings
  const { data: bookings, refetch: bookingsRefetch } = useQuery({
    queryKey: ["my-bookings", user?._id],
    queryFn: async ({ queryKey }) => {
      const res = await secureAxios.get(`/my-bookings/${queryKey[1]}`);
      return res.data;
    },
    enabled: user ? true : false,
  });

  //! Get One Booking details
  const bookingDetails = async (bookingId) => {
    const data = await secureAxios.get(`/booking-details/${bookingId}`);
    setBooking(data.data[0]);
  };

  //! Modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  //! Review Modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setBooking(null);
    setRating(null);
    setComment(null);
  };
  //! Cancle Modal
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
    setBooking(null);
    setComment(null);
  };
  const handleReview = async (event) => {
    event.preventDefault();
    if (!rating || !comment) {
      toast.error("Please Review Properly !");
      return;
    }
    const review = {
      userId: user._id,
      roomId: booking.roomId,
      bookingId: booking._id,
      comment,
      rating,
    };
    await secureAxios.post("/post-review", review);
    toast.success("Reviewed Successfully");
    await bookingsRefetch();
    closeModal();
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    if (!comment) {
      toast.error("Please Fill-Up Properly !");
      return;
    }
    const reason = {
      userId: user._id,
      roomId: booking.roomId,
      bookingId: booking._id,
      reason: comment,
    };
    await secureAxios.post("/rais-cancel", reason);
    toast.success("Cancelation Request Successfully Submitted");
    await bookingsRefetch();
    closeModal2();
  };

  if (!bookings) return <Loader />;

  return (
    <div className="flex flex-col items-center mt-8 w-[95%]">
      {/* Review Modal  */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-col items-center gap-4 min-w-[500px]">
          <div className="bg-white p-6 rounded-lg shadow-md shadow-primary flex gap-4 items-center w-full">
            <div className="space-y-3">
              <img
                src={booking?.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />
            </div>
            <div className="space-y-2">
              <p>{booking?.room.title}</p>
            </div>
          </div>

          <div className="mx-auto p-6 bg-white rounded-md shadow-md shadow-primary w-full">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <form onSubmit={handleReview}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Rating
                  onClick={(val) => setRating(val)}
                  initialRating={rating}
                  fullSymbol={<FaStar className="text-2xl ml-1" />}
                  emptySymbol={<FaRegStar className="text-2xl ml-1" />}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </ReactModal>
      {/* Cancel Modal  */}
      <ReactModal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
      >
        <div className="flex flex-col items-center gap-4 min-w-[500px]">
          <div className="bg-white p-6 rounded-lg shadow-md shadow-primary flex gap-4 items-center w-full">
            <div className="space-y-3">
              <img
                src={booking?.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />
            </div>
            <div className="space-y-2">
              <p>{booking?.room.title}</p>
            </div>
          </div>

          <div className="mx-auto p-6 bg-white rounded-md shadow-md shadow-primary w-full">
            <h2 className="text-2xl font-bold mb-4">
              Valid Cancelation Reason
            </h2>
            <form onSubmit={handleCancel}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Reason
                </label>
                <textarea
                  id="comment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Write your reason here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit Cancel Request
              </button>
            </form>
          </div>
        </div>
      </ReactModal>
      <h2 className="text-2xl font-bold mb-10">Bookings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-lg shadow-md shadow-primary flex gap-4 items-center"
          >
            <div className="space-y-3">
              <img
                src={booking.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />

              {booking.c_req &&
              booking.c_status == "declined" &&
              booking.enjoyed &&
              !booking.reviewed ? (
                <Button
                  onClick={async () => {
                    await bookingDetails(booking._id);
                    openModal();
                  }}
                  label={"Review"}
                  small={true}
                  bg={"bg-green-400"}
                />
              ) : booking.c_req &&
                booking.c_status == "declined" &&
                booking.enjoyed &&
                booking.reviewed ? (
                <p className="text-center text-green-500 font-semibold mx-auto w-min">
                  Reviewed
                </p>
              ) : booking.c_req && booking.c_status == "declined" ? (
                <p className="text-center text-red-500 font-semibold mx-auto w-min">
                  Cancaletion Declined
                </p>
              ) : booking.c_req && booking.c_status == "approved" ? (
                <p className="text-center text-green-500 font-semibold mx-auto w-min">
                  Cancaletion Approved
                </p>
              ) : booking.c_req && booking.c_status == "processing" ? (
                <p className="text-center text-red-500 font-semibold mx-auto w-min">
                  Cancaletion Requested
                </p>
              ) : booking.enjoyed && !booking.reviewed ? (
                <Button
                  onClick={async () => {
                    await bookingDetails(booking._id);
                    openModal();
                  }}
                  label={"Review"}
                  small={true}
                  bg={"bg-green-400"}
                />
              ) : booking.enjoyed && booking.reviewed ? (
                <p className="text-center text-green-500 font-semibold">
                  Reviewed
                </p>
              ) : (
                <Button
                  onClick={async () => {
                    if (
                      moment(booking.startDate).diff(moment.now(), "hours") < 24
                    ) {
                      toast.error("Cann't cancel ! Less than 24 Hours left !");
                      return;
                    }
                    await bookingDetails(booking._id);
                    openModal2();
                    console.log(
                      moment(booking.startDate).diff(moment.now(), "hours")
                    );
                  }}
                  label={"Cancle"}
                  small={true}
                  bg={"bg-red-400"}
                />
              )}

              {/* {booking.enjoyed && !booking.reviewed ? (
                <Button
                  onClick={async () => {
                    await bookingDetails(booking._id);
                    openModal();
                  }}
                  label={"Review"}
                  small={true}
                  bg={"bg-green-400"}
                />
              ) : booking.enjoyed && booking.reviewed ? (
                <p className="text-center text-green-500 font-semibold">
                  Reviewed
                </p>
              ) : (
                <Button
                  onClick={async () => {
                    if (
                      moment(booking.startDate).diff(moment.now(), "hours") < 24
                    ) {
                      toast.error("Cann't cancel ! Less than 24 Hours left !");
                      return;
                    }
                    await bookingDetails(booking._id);
                    openModal2();
                    console.log(
                      moment(booking.startDate).diff(moment.now(), "hours")
                    );
                  }}
                  label={"Cancle"}
                  small={true}
                  bg={"bg-red-400"}
                />
              )} */}
            </div>
            <div className="space-y-2">
              <p>{booking.room.title}</p>
              <p>{booking.price}/- BDT</p>
              <p>
                {new Date(booking.startDate).toDateString()} -{" "}
                {new Date(booking.endDate).toDateString()}
              </p>
              <p className="bg-primary px-4 text-white w-max rounded-full">
                {booking.c_req && booking.c_status == "approved"
                  ? "Refunded"
                  : booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
