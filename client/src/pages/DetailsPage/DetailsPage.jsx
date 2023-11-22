import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";

const DetailsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        const targetedRoom = data.find((room) => room._id == id);
        setRoom(targetedRoom);
      });
  }, [id]);
  return (
    <Container>
      <div>
        <p>This is Details - {room?.location}</p>
      </div>
    </Container>
  );
};

export default DetailsPage;
