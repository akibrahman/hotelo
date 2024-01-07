import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import secureAxios from "../API/secureAxios";
import Loader from "../components/Shared/Loader";

const Cancelations = () => {
  const { data: reqs } = useQuery({
    queryKey: ["cancelation-reqs", "admin"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/cancelation-reqs");
      return data;
    },
  });
  if (!reqs) return <Loader />;
  return (
    <div className="w-[95%]">
      {/* <Button
        onClick={async () => {
          const { data } = await publicAxios.post("/refund");
          console.log(data);
        }}
        label={"Refund"}
      ></Button>
      <Button
        onClick={async () => {
          const { data } = await publicAxios.post("/refund-query");
          console.log(data);
        }}
        label={"Refund Query"}
      ></Button> */}
      <h2 className="text-2xl font-bold my-10">Cancelation Requests</h2>
      <div className="flex flex-col gap-3">
        {reqs.map((req) => (
          <div
            className="bg-stone-300 p-5 rounded-md flex items-center justify-between text-sm relative"
            key={req._id}
          >
            {req.status == "resolved" && (
              <img
                src="/resolved.png"
                className="w-20 absolute right-5 -top-5 z-10"
                alt=""
              />
            )}
            <img
              src={req.room.image}
              className="aspect-video rounded-md w-32"
              alt=""
            />
            <div className="">
              <p className="w-max">Room Name: {req.room.title}</p>
              <p className="w-max">Name: {req.user.name}</p>
              <p className="w-max">E-mail: {req.user.email}</p>
            </div>
            <div>
              <p className="w-max">Amount: {req.payment.amount}/-</p>
              <p className="w-max">
                Paymemnt Date:{" "}
                {new Date(req.payment.paymentDate).toDateString()}
              </p>
              <p className="w-max">
                Request Date: {new Date(req.date).toDateString()}
              </p>
            </div>
            <div className="z-20">
              <Link to={`/dashboard/cancelation-requestes/${req._id}`}>
                <button
                  className="bg-primary rounded-md px-4 py-2 texmedi
             text-white duration-300 active:scale-90"
                >
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cancelations;
