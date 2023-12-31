import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import secureAxios from "../API/secureAxios";
import Button from "../components/Button/Button";
import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const MyBookings = () => {
  console.log(moment(new Date().toISOString()).isSame(moment()));
  const user = useUser();
  const { data: bookings } = useQuery({
    queryKey: ["my-bookings", user?._id],
    queryFn: async ({ queryKey }) => {
      const res = await secureAxios.get(`/my-bookings/${queryKey[1]}`);
      return res.data;
    },
    enabled: user ? true : false,
  });

  if (!bookings) return <Loader />;

  return (
    <div className="flex flex-col items-center mt-8 w-[95%]">
      <h2 className="text-2xl font-bold mb-10">Bookings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 pr-0 rounded-lg shadow-md shadow-primary flex gap-4 items-center"
          >
            <div className="space-y-3">
              <img
                src={booking.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />
              <Button
                label={booking.enjoyed ? "Review" : "Cancle"}
                small={true}
                bg={booking.enjoyed ? "bg-green-400" : "bg-red-400"}
              />
            </div>
            <div className="space-y-2">
              <p>{booking.room.title}</p>
              <p>{booking.price}/- BDT</p>
              <p>
                {new Date(booking.startDate).toDateString()} -{" "}
                {new Date(booking.endDate).toDateString()}
              </p>
              <p className="bg-primary px-4 text-white w-max rounded-full">
                {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
