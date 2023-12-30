import DatePicker from "react-date-picker";
import { FaExclamationCircle } from "react-icons/fa";
import { LuCalendarMinus, LuCalendarPlus } from "react-icons/lu";
import Button from "../Button/Button";

const RoomInfo = ({
  roomData,
  startDate,
  selectStartDate,
  endDate,
  selectEndDate,
  currentReserve,
  error,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
        >
          <div>Hosted by {roomData.host.name}</div>

          <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={roomData.host.image}
          />
        </div>
        <div
          className="
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              "
        >
          <div>{roomData.guests} guests</div>
          <div>{roomData.bedrooms} rooms</div>
          <div>{roomData.bathrooms} bathrooms</div>
        </div>
      </div>

      <hr />
      <div
        className="
          text-lg font-light text-neutral-500 text-justify"
      >
        {roomData.description}
      </div>
      <hr />
      <div className="flex items-center gap-6">
        <div className="w-1/2 ">
          <p>Check In:</p>
          <DatePicker
            className={"w-[95%]"}
            format="dd - MM - y"
            onChange={selectStartDate}
            value={startDate}
            calendarIcon={<LuCalendarPlus className="text-2xl" />}
            clearIcon={null}
            // onInvalidChange={() => alert("Invalid")}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
          />
        </div>
        <div className="w-1/2">
          <p>Check Out:</p>
          <DatePicker
            className={"w-[95%]"}
            format="dd - MM - y"
            onChange={selectEndDate}
            value={endDate}
            calendarIcon={<LuCalendarMinus className="text-2xl" />}
            clearIcon={"X"}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
          />
        </div>
      </div>
      {error && (
        <p className="text-red-600 font-bold flex items-center gap-3">
          <FaExclamationCircle />
          {error}
        </p>
      )}
      <Button onClick={currentReserve} label={"Check Availability"} />
    </div>
  );
};

export default RoomInfo;
