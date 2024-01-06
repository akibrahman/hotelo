import DatePicker from "react-date-picker";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
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
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <div className="w-1/2 ">
          <p className="text-lg font-light text-neutral-500 mb-3">Check In:</p>
          <DatePicker
            className={"w-[95%]"}
            format="dd - MM - y"
            onChange={selectStartDate}
            value={startDate}
            calendarIcon={<LuCalendarPlus className="text-2xl" />}
            clearIcon={null}
            // onInvalidChange={() => alert("Invalid")}
            dayPlaceholder="01"
            monthPlaceholder="01"
            yearPlaceholder="2005"
          />
        </div>
        <div className="w-1/2">
          <p className="text-lg font-light text-neutral-500 mb-3">Check Out:</p>
          <DatePicker
            className={"w-[95%]"}
            format="dd - MM - y"
            onChange={selectEndDate}
            value={endDate}
            calendarIcon={<LuCalendarMinus className="text-2xl" />}
            clearIcon={<FaTimes />}
            dayPlaceholder="01"
            monthPlaceholder="01"
            yearPlaceholder="2005"
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

      <hr />
      <div className="">
        <p className="text-xl font-semibold text-stone-700 mb-4">
          Description:
        </p>
        {roomData.description.split("&--&").map((description, i) => (
          <div
            key={i}
            className="
          text-lg font-light text-neutral-500 text-justify mt-3"
          >
            {description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomInfo;
