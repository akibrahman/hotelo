import { useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { base64 } from "../API/base64";
import Button from "../components/Button/Button";

const AddRoom = () => {
  const [fileKey, setFileKey] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [roomData, setRoomData] = useState({
    title: "",
    price: "",
    category: "deluxe",
    mainImage: "",
    images: ["", "", "", "", ""],
    description: "",
    capacity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8 w-[95%] p-5 border rounded-md">
      <h1 className="text-3xl font-bold mb-4">Add a Room</h1>
      <Button
        onClick={() => {
          if (!image) {
            console.log("Main Image Missing");
            return;
          }
          for (const i of images) {
            if (!i) {
              console.log("Additional Image(s) Missing");
              return;
            }
          }
          console.log("Done");
          console.log("1. ", image);
          for (const i of images) {
            console.log(images.indexOf(i) + ". ", i);
          }
        }}
        label={"Test"}
      />
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={roomData.title}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md outline-none"
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="mb-4 flex-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded-md outline-none"
            />
          </div>

          <div className="mb-4 flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={roomData.category}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded-md"
            >
              <option value="deluxe">Deluxe</option>
              <option value="couple">Couple</option>
              <option value="moderate">Moderate</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-4">
            Main Image
          </label>
          <input
            type="file"
            id="mainImage"
            key={fileKey}
            name="mainImage"
            accept="image/*"
            onChange={async (file) => {
              const data = await base64(file.target);
              setImage(data);
            }}
            className="hidden"
          />
          {image ? (
            <div className="w-32 h-20 relative">
              <img
                src={image}
                className="rounded-md w-full h-full"
                alt="Main Image"
              />
              <FaTimes
                className="absolute top-1 right-1 bg-primary text-white rounded-full p-1 text-xl cursor-pointer"
                onClick={() => {
                  setFileKey((prevKey) => prevKey + 1);
                  setImage("");
                }}
              />
            </div>
          ) : (
            <label
              htmlFor="mainImage"
              className="text-primary font-bold border-2 border-dotted border-primary rounded-md w-32 h-20 cursor-pointer duration-300 flex items-center justify-center gap-1 ease-in-out active:scale-90"
            >
              Add <FaImage />
            </label>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-4">
            Additional Images
          </label>
          <div className="flex items-center justify-between">
            {images.map((image, index) => (
              <div key={index}>
                {image ? (
                  <div className="w-32 h-20 relative">
                    <img
                      src={image}
                      className="rounded-md w-full h-full"
                      alt="Main Image"
                    />
                    <FaTimes
                      className="absolute top-1 right-1 bg-primary text-white rounded-full p-1 text-xl cursor-pointer"
                      onClick={() => {
                        const temp = [...images];
                        temp[index] = "";
                        setFileKey((prevKey) => prevKey + 1);
                        setImages(temp);
                      }}
                    />
                  </div>
                ) : (
                  <label
                    htmlFor={`additionalImage${index}`}
                    className="text-primary font-bold border-2 border-dotted border-primary rounded-md w-32 h-20 cursor-pointer duration-300 flex items-center justify-center gap-1 ease-in-out active:scale-90"
                  >
                    Add <FaImage />
                  </label>
                )}
                <input
                  id={`additionalImage${index}`}
                  type="file"
                  key={fileKey}
                  onChange={async (file) => {
                    const data = await base64(file.target);
                    const temp = [...images];
                    temp[index] = data;
                    setImages(temp);
                  }}
                  className="hidden"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={roomData.description}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-600"
          >
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
