import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { base64 } from "../API/base64";
import { makeFile } from "../API/makeFile";
import secureAxios from "../API/secureAxios";
import { imageUpload } from "../API/util";
import useUser from "../hooks/useUser";

const EditProfile = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    photo: user.photo,
    phoneNumber: user.phoneNumber,
    address: user.address,
    bio: user.bio,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = await imageUpload(
      formData.photo == user.photo
        ? null
        : await makeFile(formData.photo, user.name, "image"),
      user.photo
    );
    const { data } = await secureAxios.post(`/edit-profile/${user._id}`, {
      ...formData,
      photo: url,
    });
    if (data.message == "Internal Server Error") {
      toast.error(data.message);
    } else {
      toast.success("Profile Updated");
      navigate("/dashboard/my-profile");
    }
    await user.refetch();
    setLoading(false);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <div className="w-[95%] my-10">
      <div className="mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Update Profle</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-10 ml-20 flex items-center gap-10">
            <img
              src={formData.photo}
              className="w-[200px] aspect-square rounded-full"
              alt=""
            />
            <input
              onChange={async (e) => {
                const base = await base64(e.target);
                setFormData({
                  ...formData,
                  photo: base,
                });
              }}
              accept="image/*"
              className="hidden"
              type="file"
              name=""
              id="newPhoto"
            />
            <label
              htmlFor="newPhoto"
              className="text-white cursor-pointer select-none bg-primary font-semibold px-4 py-2 rounded-md duration-300 active:scale-90"
            >
              Update
            </label>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md outline-none"
                required
              />
            </div>
            <div className="mb-4 flex-1">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-600"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md outline-none"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="mt-1 p-2 w-full border rounded-md outline-none"
              />
            </div>
            <div className="mb-4 flex-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`mt-1 p-2 w-full border rounded-md outline-none ${
                  validatePhoneNumber(formData.phoneNumber)
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                required
              />
              {!validatePhoneNumber(formData.phoneNumber) && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid phone number.
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-600"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Full Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center gap-3"
          >
            Submit
            {loading && <FaSpinner className="animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
