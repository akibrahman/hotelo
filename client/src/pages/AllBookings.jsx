import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { capitalizer } from "../API/capitalizer";
import secureAxios from "../API/secureAxios";
import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const AllBookings = () => {
  const user = useUser();
  //! Get all Bookings
  const { data: bookings } = useQuery({
    queryKey: ["all-bookings", "admin"],
    queryFn: async () => {
      const res = await secureAxios.get(`/all-bookings-admin`);
      return res.data;
    },
    enabled: user ? true : false,
  });

  // const handleCancel = async () => {
  //   const reason = {
  //     userId: user._id,
  //     status: "pending",
  //   };
  //   await secureAxios.post("/rais-cancel", reason);
  //   toast.success("Cancelation Request Successfully Submitted");
  //   await bookingsRefetch();
  // };

  if (!bookings) return <Loader />;

  return (
    <div className="mt-8 w-[95%]">
      <h2 className="text-2xl font-bold mb-10">
        All Bookings - {bookings?.length}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-lg shadow-md shadow-primary flex gap-4 items-center justify-between"
          >
            <div className="space-y-3 mr-10">
              <img
                src={booking.room.image}
                className="w-28 rounded-md"
                alt="Room Image"
              />

              {booking.c_status == "approved" ? (
                <p className="text-center bg-orange-500 rounded-md text-white py-1">
                  Cancllled
                </p>
              ) : (
                <p className="">
                  {moment(booking.startDate).isSameOrBefore(moment.now()) &&
                  moment(booking.endDate).isSameOrAfter(moment.now()) ? (
                    <p className="text-center bg-green-500 rounded-md text-white py-1">
                      Enjoying
                    </p>
                  ) : moment(booking.startDate).isAfter(moment.now()) ? (
                    <p className="text-center bg-primary rounded-md text-white py-1">
                      Will Enjoy
                    </p>
                  ) : (
                    <p className="text-center bg-purple-500 rounded-md text-white py-1">
                      Enjoyed
                    </p>
                  )}
                </p>
              )}
            </div>
            <div className="space-y-2 flex-1">
              <p>{booking.room.title}</p>
              <p>{booking.price}/- BDT</p>
              <p>
                {new Date(booking.startDate).toDateString()} -{" "}
                {new Date(booking.endDate).toDateString()}
              </p>
              <p className="bg-primary px-4 text-white w-max rounded-full">
                {booking.c_req && booking.c_status == "approved"
                  ? "Refunded"
                  : capitalizer(booking.status)}
              </p>
            </div>
            <div className="space-y-2 flex-1">
              <img
                src={booking.user.photo}
                className="aspect-square w-10 rounded-md"
                alt=""
              />
              <p>{booking.user.name}</p>
              <p>{booking.user.email}</p>
              <p>
                Booking Date: {new Date(booking.bookingDate).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
