import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import Loader from "../Shared/Loader";
import Card from "./Card";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const category = params.get("category");
  useEffect(() => {
    setLoading(true);
    fetch("./rooms.json")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const filtered = data.filter((room) => room.category == category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }
        setLoading(false);
      });
  }, [category]);

  if (loading) return <Loader />;

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-8">
          {rooms.map((room) => (
            <Card key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            title={"No Rooms Available in this Category"}
            subtitle={"Please select another category"}
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
