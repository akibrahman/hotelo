import Button from "../Button/Button";
import Calender from "./Calender";

const RoomReservation = ({
  room,
  currentValue,
  reservations,
  totalPrice,
  confirmBookings,
}) => {
  //!

  const handleSelect = (ranges) => {
    // console.log(new Date(ranges.selection.startDate));
    // console.log(ranges);
    console.log(ranges[Object.keys(ranges)[0]]);
    // setValue(ranges[Object.keys(ranges)[0]]);
  };

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room.price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender
          value={currentValue}
          handleSelect={handleSelect}
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
        <div className="">$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default RoomReservation;
