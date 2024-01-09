import { useQuery } from "@tanstack/react-query";
import publicAxios from "../../API/publicAxios";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import Loader from "../Shared/Loader";
import Card from "./Card";

const Rooms = () => {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["all-rooms"],
    queryFn: async () => {
      const res = await publicAxios.get("/all-rooms");
      return res.data;
    },
  });
  if (isLoading) return <Loader />;

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
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
