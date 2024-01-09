import { useState } from "react";
import secureAxios from "../../API/secureAxios";
import useUser from "../../hooks/useUser";
import Button from "../Button/Button";
import Calender from "./Calender";

const RoomReservation = ({
  room,
  currentValue,
  reservations,
  totalPrice,
  confirmBookings,
}) => {
  const user = useUser();
  // const handleSelect = (ranges) => {
  // console.log(new Date(ranges.selection.startDate));
  // console.log(ranges);
  // console.log(ranges[Object.keys(ranges)[0]]);
  // setValue(ranges[Object.keys(ranges)[0]]);
  // };
  const [isLiked, setIsLiked] = useState(
    user.likings.find((like) => like == room._id) == undefined ? false : true
  );
  const [likes, setLikes] = useState(room.likes);
  const like = async () => {
    setIsLiked(true);
    setLikes(likes + 1);
    const res = await secureAxios.post(`/like/${room._id}/${user._id}`);
    console.log(res);
  };
  const dislike = async () => {
    setIsLiked(false);
    setLikes(likes - 1);
    const res = await secureAxios.post(`/dislike/${room._id}/${user._id}`);
    console.log(res);
  };

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center justify-between pr-4">
        <div className="flex items-center gap-1 p-4">
          <div className="text-2xl font-semibold">BDT: {room.price}</div>
          <div className="font-light text-neutral-600">/night</div>
        </div>
        <div className="border border-primary px-4 py-2 rounded-full text-neutral-600 font-semibold flex items-center gap-3">
          {isLiked ? (
            <img
              onClick={dislike}
              src="/like.png"
              className="h-6 w-6 cursor-pointer"
              alt=""
            />
          ) : (
            <img
              onClick={like}
              src="/like.png"
              className="h-6 w-6 cursor-pointer likeBtn"
              alt=""
            />
          )}
          <p>Likes: {likes}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-center select-none">
        <Calender
          value={currentValue}
          // handleSelect={handleSelect}
          reservations={reservations}
        />
      </div>
      <hr />
      <div>
        {totalPrice != 0 && (
          <Button
            onClick={confirmBookings}
            disabled={totalPrice == 0 ? true : false}
            label={"Reserve"}
          />
        )}
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div className="">Total</div>
        <div className="">BDT: {totalPrice}</div>
      </div>
    </div>
  );
};

export default RoomReservation;
