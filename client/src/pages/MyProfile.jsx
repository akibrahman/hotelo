import Loader from "../components/Shared/Loader";
import useUser from "../hooks/useUser";

const MyProfile = () => {
  const user = useUser();
  if (!user) return <Loader />;
  return (
    <div className="flex justify-center items-center w-[95%] mx-auto bg-gray-100 py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={user.photo} // Replace with the actual URL of the profile picture
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>

        {/* User Information */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>

        {/* Additional Details */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Location:</span>
            <span>{user.address}</span>
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
