import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import publicAxios from "../../API/publicAxios";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";
import Container from "../../components/Shared/Container";
import Loader from "../../components/Shared/Loader";
import useUser from "../../hooks/useUser";

const DetailsPage = () => {
  const { id } = useParams();
  const user = useUser();

  const { data: room } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await publicAxios.get(`/room/${id}`);
      return res.data;
    },
  });

  const { data: reservationData, refetch: reservationDataRefetch } = useQuery({
    queryKey: ["reservations", id],
    queryFn: async ({ queryKey }) => {
      const res = await publicAxios.get(`/reservation-data/${queryKey[1]}`);
      return res.data;
    },
  });
  const reservations = reservationData?.map(({ _id, startDate, endDate }) => ({
    key: _id,
    startDate: moment(startDate)._d,
    endDate: moment(endDate)._d,
    color: "#F43F5E",
  }));

  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  //!!!!!!!!!!!!!!!!!!!!!!

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState();

  const addBookings = async () => {
    await publicAxios.post("/add-bookings", {
      userId: user._id,
      roomId: id,
      startDate,
      endDate,
    });
    setTotalPrice(0);
    setCurrentValue({
      startDate: moment.now(),
      endDate: moment.now(),
      key: "current",
      color: "green",
    });
    await reservationDataRefetch();
    toast.success("Bookings Confirmed");
  };

  const selectStartDate = (data) => {
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

  const selectEndDate = (data) => {
    if (moment(startDate).isSame(moment(data), "days")) {
      setError("Check Out date can not be same as Check In date");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    } else if (moment(startDate).isAfter(moment(data), "days")) {
      setError("Check Out date should come after Check In date");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setError("");
    setEndDate(data);
  };

  const [currentValue, setCurrentValue] = useState({
    startDate: moment.now(),
    endDate: moment.now(),
    key: "current",
    color: "green",
  });

  const currentReserve = () => {
    if (moment(startDate).isSame(moment(endDate), "days")) {
      setTotalPrice(0);
      alert("Invalid Input");
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
          color: "green",
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

    const totalDays = moment(endDate).diff(moment(startDate), "days");
    // console.log(totalDays);
    const TempTotalPrice = (parseInt(totalDays) + 1) * parseInt(room.price);
    setTotalPrice(TempTotalPrice);
  };

  if (!room || !reservations || !reservationData || !user) return <Loader />;
  return (
    <Container>
      <button
        className="hidden"
        onClick={() => toast.success("Bookings Confirmed")}
      >
        Test
      </button>
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
              addBookings={addBookings}
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
