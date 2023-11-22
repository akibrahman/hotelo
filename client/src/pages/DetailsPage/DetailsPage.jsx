import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";
import Container from "../../components/Shared/Container";
import Loader from "../../components/Shared/Loader";

const DetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        const targetedRoom = data.find((room) => room._id == id);
        setRoom(targetedRoom);
      });
  }, [id]);
  if (!room) return <Loader />;
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Header roomData={room} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 mt-10">
          <RoomInfo roomData={room} />
          <div className="col-span-3">
            <RoomReservation room={room} />
            {/* <p>A</p> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
