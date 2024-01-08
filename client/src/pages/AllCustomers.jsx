import { useQuery } from "@tanstack/react-query";
import secureAxios from "../API/secureAxios";
import Loader from "../components/Shared/Loader";

const AllCustomers = () => {
  //   const customers = ["", "", "", "", "", "", "", ""];
  const { data: customers } = useQuery({
    queryKey: ["all-user", "admin"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/all-users");
      return data;
    },
  });
  if (!customers) return <Loader />;
  return (
    <div className="w-[95%]">
      <h2 className="text-2xl font-bold my-10">All Customers</h2>
      <div className="flex flex-col gap-4">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="bg-stone-300 rounded-md p-5 flex items-center justify-between"
          >
            <img
              src={customer.photo}
              className="aspect-square w-20 rounded-md"
              alt=""
            />
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            {customer.role == "admin" ? (
              <p className="text-primary px-4 py-2 rounded-md font-semibold">
                Admin
              </p>
            ) : (
              <button className="bg-white px-4 py-2 rounded-md font-semibold duration-300 active:scale-90">
                Make Admin
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCustomers;
