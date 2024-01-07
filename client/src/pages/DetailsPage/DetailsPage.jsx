import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa";
import Modal from "react-modal";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import publicAxios from "../../API/publicAxios";
import secureAxios from "../../API/secureAxios";
import Button from "../../components/Button/Button";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Loader from "../../components/Shared/Loader";
import SliderBtn from "../../components/SliderBtn";
import useUser from "../../hooks/useUser";

const DetailsPage = () => {
  const { id } = useParams();
  const user = useUser();
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // const axiosInstance = usePublicAxios();
  //! Variables for Confirmation Modal
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
  //! Getting the room Data
  const { data: room } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await publicAxios.get(`/room/${id}`);
      return res.data;
    },
  });
  //! Getting all Reviews
  const { data: reviews } = useQuery({
    queryKey: ["reviews", room?._id],
    queryFn: async ({ queryKey }) => {
      const { data } = await secureAxios.get(`/reviews/${queryKey[1]}`);
      return data;
    },
  });
  //! Getting all reservationsData for this room
  const { data: reservationData, refetch: reservationDataRefetch } = useQuery({
    queryKey: ["reservations", id],
    queryFn: async ({ queryKey }) => {
      const res = await publicAxios.get(`/reservation-data/${queryKey[1]}`);
      return res.data;
    },
  });
  //! Getting all reservations for this room
  const reservations = reservationData?.map(({ _id, startDate, endDate }) => ({
    key: _id,
    startDate: moment(startDate)._d,
    endDate: moment(endDate)._d,
    color: "#3B82F6",
  }));
  //! Selecting Check In Date
  const selectStartDate = (data) => {
    setTotalPrice(0);
    if (endDate && moment(endDate).isBefore(moment(data))) {
      setError("Check 'Check-Out' Date");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (moment().isSameOrBefore(moment(data), "days")) {
      setError("");
      setStartDate(data);
      return;
    } else {
      setError("You cann't go past !");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  //! Selecting Check Out Date
  const selectEndDate = (data) => {
    setTotalPrice(0);
    if (moment(startDate).isSame(moment(data), "days")) {
      setError("Check 'Check-In' Date");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    } else if (moment(startDate).isAfter(moment(data), "days")) {
      setError("Check 'Check-In' Date");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setError("");
    setEndDate(data);
  };
  //! Set dates for reserve
  const [currentValue, setCurrentValue] = useState({
    startDate: moment.now(),
    endDate: moment.now(),
    key: "current",
    color: "",
  });
  //! Availability checker
  const currentReserve = () => {
    if (startDate == undefined) {
      setTotalPrice(0);
      toast.error("Please select check-in date!");
      return;
    } else if (endDate == undefined) {
      setTotalPrice(0);
      toast.error("Please select check-out date!");
      return;
    }

    for (let i = 0; i < reservations.length; i++) {
      if (
        moment(startDate).isBetween(
          moment(reservations[i].startDate),
          moment(reservations[i].endDate)
        ) ||
        moment(startDate).isSame(moment(reservations[i].startDate)) ||
        moment(startDate).isSame(moment(reservations[i].endDate)) ||
        moment(endDate).isBetween(
          moment(reservations[i].startDate),
          moment(reservations[i].endDate)
        ) ||
        moment(endDate).isSame(moment(reservations[i].startDate)) ||
        moment(endDate).isSame(moment(reservations[i].endDate))
      ) {
        toast.error("Sorry! Selected dates are not available");
        setTotalPrice(0);
        setCurrentValue({
          startDate: moment.now(),
          endDate: moment.now(),
          key: "current",
          color: "",
        });
        return;
      }
    }
    toast.success("Congratulations! Reservation available");
    setCurrentValue({
      startDate: moment(startDate)._d,
      endDate: moment(endDate)._d,
      key: "current",
      color: "green",
    });
    console.log(startDate);
    console.log(endDate);

    const totalDays = moment(endDate).diff(moment(startDate), "days");
    console.log(totalDays);
    const TempTotalPrice = parseInt(totalDays) * parseInt(room.price);
    setTotalPrice(TempTotalPrice);
  };
  //! Confirm Bookings
  const confirmBookings = async () => {
    openModal();
  };
  //! Add Bookings
  const addBookings = async () => {
    const res = await publicAxios.post("/add-bookings", {
      userId: user._id,
      roomId: id,
      startDate,
      endDate,
      price: totalPrice,
    });
    window.location.replace(res.data.url);
    setTotalPrice(0);
    setCurrentValue({
      startDate: moment.now(),
      endDate: moment.now(),
      key: "current",
      color: "",
    });
    await reservationDataRefetch();
    closeModal();
    toast.success("Processing....");
  };
  if (!room || !reservations || !reservationData || !user || !reviews)
    return <Loader />;
  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="p-10 space-y-3">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Name:</p> <p>{user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">E-mail:</p> <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Room Name:</p> <p>{room.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check In:</p>{" "}
            <p>
              {new Date(startDate).getDate()}-
              {new Date(startDate).getMonth() + 1}-
              {new Date(startDate).getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check Out:</p>{" "}
            <p>
              {new Date(endDate).getDate()}-{new Date(endDate).getMonth() + 1}-
              {new Date(endDate).getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Nights Count:</p>{" "}
            <p>{moment(endDate).diff(moment(startDate), "days")}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Total Price:</p>{" "}
            <p>{totalPrice}/- BDT</p>
          </div>
          <div className="flex gap-4 pt-5">
            <Button onClick={closeModal} label={"Revise"} />
            <Button onClick={addBookings} label={"Confirm & Pay"} />
          </div>
        </div>
      </Modal>
      <div className="max-w-screen-lg mx-auto select-none pb-10">
        <div className="flex flex-col gap-6">
          <Heading title={room.title} />
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            <SwiperSlide>
              <img
                src={room.image}
                className="h-[420px] rounded-md w-full"
                alt=""
              />
            </SwiperSlide>
            {room.gallery.map((image, i) => (
              <SwiperSlide key={i}>
                <img
                  src={image}
                  className="w-full h-[420px] rounded-md"
                  alt=""
                />
              </SwiperSlide>
            ))}
            <div className="w-full px-2 absolute z-10 top-1/2 -translate-y-1/2 left-0 flex items-center justify-between select-none">
              <SliderBtn dir="prev"></SliderBtn>
              <SliderBtn dir="next"></SliderBtn>
            </div>
          </Swiper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-10">
          <RoomInfo
            error={error}
            roomData={room}
            startDate={startDate}
            selectStartDate={selectStartDate}
            endDate={endDate}
            selectEndDate={selectEndDate}
            currentReserve={currentReserve}
          />
          <div className="col-span-3">
            <RoomReservation
              confirmBookings={confirmBookings}
              reservations={reservations}
              currentValue={currentValue}
              room={room}
              totalPrice={totalPrice}
            />
            <div className="text-xl my-8 text-neutral-500">
              <p className="font-semibold mb-3">Special Features:</p>
              <div className="flex flex-col gap-2">
                {room.facilities.map((facility, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-primary text-white px-3 py-1 rounded-md"
                  >
                    <p>{i + 1}.</p>
                    <p>{facility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-semibold my-8 text-neutral-500 text-xl">
            Reviews:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                className="flex flex-col gap-3 bg-stone-200 p-5 rounded-lg"
                key={review._id}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.photo}
                    className="w-10 h-10 rounded-full"
                    alt={review.user.name}
                  />
                  <p>{review.user.name}</p>
                  <Rating
                    readonly={true}
                    initialRating={review.rating}
                    fullSymbol={<FaStar className="ml-1 mt-2" />}
                    emptySymbol={<FaRegStar className="ml-1 mt-2" />}
                  />
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
