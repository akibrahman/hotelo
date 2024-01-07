import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizer } from "../API/capitalizer";
import secureAxios from "../API/secureAxios";
import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const Cancelation = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["cancelation-reqs", "admin", id],
    queryFn: async ({ queryKey }) => {
      const { data } = await secureAxios.get(
        `/cancelation-reqs?id=${queryKey[2]}`
      );
      return data[0];
    },
  });
  const handleApprove = async () => {
    const res = await secureAxios.post(
      `/approve-cancelation/${data.booking._id}/${data.payment.transactionId}/${user._id}/${id}`
    );
    console.log(res.data);
    toast.success("Concern Approved !");
    navigate(-1);
  };
  const handleDecline = async () => {
    const res = await secureAxios.post(
      `/decline-cancelation/${data.booking._id}/${id}`
    );
    console.log(res.data);
    toast.success("Concern Declined !");
    navigate(-1);
  };
  if (!data) return <Loader />;
  return (
    <div className="w-[95%] mb-20">
      <h2 className="text-2xl font-bold my-10">
        Cancelation Details of - {id}
      </h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-stone-200 p-5 flex flex-col items-center gap-3 rounded-md">
          <p className="text-2xl font-bold mb-5">Room Details</p>

          <img
            src={data.room.image}
            className="aspect-video rounded-md w-44"
            alt=""
          />
          <p>Room Name: {data.room.title}</p>
          <p>Room Category: {capitalizer(data.room.category)}</p>
        </div>
        <div className="bg-stone-200 p-5 flex flex-col items-center gap-3 rounded-md">
          <p className="text-2xl font-bold mb-5">Customer Details</p>
          <img
            src={data.user.photo}
            className="aspect-square rounded-md w-44"
            alt=""
          />
          <p>Name: {data.user.name}</p>
          <p>E-mail: {capitalizer(data.user.email)}</p>
        </div>
        <div className="bg-stone-200 p-5 flex flex-col items-center gap-3 rounded-md">
          <p className="text-2xl font-bold mb-5">Booking Details</p>
          <p>
            Reservation Date:{" "}
            {new Date(data.booking.bookingDate).toDateString()}
          </p>
          <p>Check In: {new Date(data.booking.startDate).toDateString()}</p>
          <p>Check Out: {new Date(data.booking.endDate).toDateString()}</p>
          <p>Amount: BDT {data.booking.price}/-</p>
          <p>Status: {capitalizer(data.booking.status)}</p>
        </div>
        <div className="bg-stone-200 p-5 flex flex-col items-center gap-3 rounded-md">
          <p className="text-2xl font-bold mb-5">Cancelation Details</p>
          <p>Issued Date: {new Date(data.date).toDateString()}</p>
          <p className="font-bold text-xl underline">Reason</p>
          <p className="text-center">{data.reason}</p>
        </div>
      </div>
      {data.status == "resolved" || (
        <div className="flex items-center justify-around w-full mt-5">
          <button
            onClick={handleDecline}
            className="bg-orange-500 rounded-md px-4 py-2 texmedi
             text-white duration-300 active:scale-90"
          >
            Decline
          </button>
          <button
            onClick={handleApprove}
            className="bg-green-500 rounded-md px-4 py-2 texmedi
             text-white duration-300 active:scale-90"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default Cancelation;
