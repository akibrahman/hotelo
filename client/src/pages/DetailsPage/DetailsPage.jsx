import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import publicAxios from "../../API/publicAxios";
import Button from "../../components/Button/Button";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";
import Container from "../../components/Shared/Container";
import Loader from "../../components/Shared/Loader";
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
    color: "#9447D6",
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
      color: "",
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
    // const data = {
    //   userId: user._id,
    //   roomId: id,
    //   startDate,
    //   endDate,
    //   price: totalPrice,
    // };
    // console.log(data);
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
  if (!room || !reservations || !reservationData || !user) return <Loader />;
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
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Header roomData={room} />
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
