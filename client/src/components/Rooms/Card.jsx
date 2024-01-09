import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizer } from "../../API/capitalizer";
import secureAxios from "../../API/secureAxios";

const Card = ({ room }) => {
  //! Getting all Reviews
  const { data: reviews } = useQuery({
    queryKey: ["reviews", room?._id],
    queryFn: async ({ queryKey }) => {
      const { data } = await secureAxios.get(`/reviews/${queryKey[1]}`);
      return data;
    },
  });
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (reviews?.length > 0) {
      const data = reviews?.reduce((a, b) => a + b.rating, 0);
      setRating(data / reviews?.length);
    }
  }, [room, reviews]);
  return (
    <Link to={`/room/${room?._id}`} className="col-span-1 cursor-pointer group">
      <div className="border rounded-lg p-2">
        <div className="overflow-hidden rounded-lg relative">
          <div className="absolute z-10 top-1 left-1 bg-white flex items-center gap-1 px-2 rounded-md py-1">
            <img src="/star.svg" className="" alt="" />
            <p className="text-xs">{rating == 0 ? "N/A" : rating.toFixed(1)}</p>
          </div>
          <img
            src={room.image}
            className="aspect-video rounded-lg group-hover:scale-110 transition-all"
            alt={room.title}
          />
        </div>
        <div className="p-3 space-y-1">
          <p className="text-[#262729] text-xl font-medium">{room.title}</p>
          <p className="text-[#858585] text-base leading-6">
            Category: {capitalizer(room.category)}
          </p>
          <p className="text-[#262729] leading-6">Click for Availability</p>
          <p className="text-primary text-2xl font-medium leading-10">
            BDT- {room.price}
            <span className="text-base">/night</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
