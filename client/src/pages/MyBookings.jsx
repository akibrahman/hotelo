import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactModal from "react-modal";
import secureAxios from "../API/secureAxios";
import Button from "../components/Button/Button";
import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const MyBookings = () => {
  const user = useUser();
  const [booking, setBooking] = useState(null);
  const { data: bookings } = useQuery({
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
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!bookings) return <Loader />;

  return (
    <div className="flex flex-col items-center mt-8 w-[95%]">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-col items-center gap-4">
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
            <form
            //   onSubmit={handleSubmit}
            >
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
                  // value={comment}
                  // onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="mb-4"></div>
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
      <h2 className="text-2xl font-bold mb-10">Bookings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 pr-0 rounded-lg shadow-md shadow-primary flex gap-4 items-center"
          >
            <div className="space-y-3">
              <img
                src={booking.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />
              {booking.enjoyed && (
                <Button
                  onClick={async () => {
                    await bookingDetails(booking._id);
                    openModal();
                  }}
                  label={"Review"}
                  small={true}
                  bg={"bg-green-400"}
                />
              )}
              {booking.enjoyed || (
                <Button label={"Cancle"} small={true} bg={"bg-red-400"} />
              )}
            </div>
            <div className="space-y-2">
              <p>{booking.room.title}</p>
              <p>{booking.price}/- BDT</p>
              <p>
                {new Date(booking.startDate).toDateString()} -{" "}
                {new Date(booking.endDate).toDateString()}
              </p>
              <p className="bg-primary px-4 text-white w-max rounded-full">
                {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
