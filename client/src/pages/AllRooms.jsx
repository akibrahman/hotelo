import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { capitalizer } from "../API/capitalizer";
import publicAxios from "../API/publicAxios";
import Loader from "../components/Shared/Loader";

const AllRooms = () => {
  const { data: rooms } = useQuery({
    queryKey: ["all-rooms-admin"],
    queryFn: async () => {
      const { data } = await publicAxios.get("/all-rooms");
      return data;
    },
  });
  if (!rooms) return <Loader />;
  return (
    <div className="container mx-auto mt-8 w-[95%] p-5 border rounded-md">
      <h1 className="text-3xl font-bold mb-4">All Rooms</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="flex items-center justify-around gap-5 rounded-md p-3 bg-slate-100"
          >
            <img
              src={room.image}
              className="w-40 h-24 rounded-md"
              alt={room.title}
            />
            <div className="font-medium">
              <p>{room.title}</p>
              <p>BDT {room.price}/-</p>
              <p>{capitalizer(room.category)}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Link to={`/dashboard/edit-room/${room._id}`}>
                <HiPencil className="text-white bg-primary rounded-full p-1 text-3xl cursor-pointer hover:bg-blue-600 duration-300 select-none active:scale-90" />
              </Link>
              <MdDelete className="text-white bg-primary rounded-full p-1 text-3xl cursor-pointer hover:bg-blue-600 duration-300 select-none active:scale-90" />
              <FaArrowRight className="text-white bg-primary rounded-full p-1 text-3xl cursor-pointer hover:bg-blue-600 duration-300 select-none active:scale-90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
