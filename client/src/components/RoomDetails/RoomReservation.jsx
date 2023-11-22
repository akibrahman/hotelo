import { formatDistance } from "date-fns";
import { useState } from "react";
import Button from "../Button/Button";
import Calender from "./Calender";

const RoomReservation = ({ room }) => {
  //!
  const [value, setValue] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    console.log(value);
    console.log(ranges);
    setValue({ ...ranges.selection });
  };

  let totalDays = formatDistance(
    new Date(value.endDate || room.to),
    new Date(value.startDate || room.from)
  );
  const totalPrice = totalDays.split(" ")[0] * parseFloat(room.price);
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room.price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender value={value} handleSelect={handleSelect} />
      </div>
      <hr />
      <div className="">
        <Button label={"Reserve"} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div className="">Total</div>
        <div className="">$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default RoomReservation;
