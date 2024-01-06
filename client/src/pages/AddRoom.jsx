import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaImage, FaSpinner, FaTimes } from "react-icons/fa";
import { base64 } from "../API/base64";
import { makeFile } from "../API/makeFile";
import secureAxios from "../API/secureAxios";
import { imageUpload } from "../API/util";
import useUser from "../hooks/useUser";

const AddRoom = () => {
  const facility = useRef();
  const user = useUser();
  const [fileKey, setFileKey] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Main Image Missing");
      return;
    }
    for (const additionalImage of images) {
      if (!additionalImage) {
        toast.error("Additional Image(s) Missing");
        return;
      }
    }
    if (facilities.length == 0 || facilities.length < 2) {
      toast.error("Add Atleast Two Features");
      return;
    }
    setLoading(true);
    try {
      const mainImage = await imageUpload(
        await makeFile(image, "mainImage.jpg", "image/*")
      );
      let additionalImages = [];
      for (const additionalImage of images) {
        const data = await imageUpload(
          await makeFile(
            additionalImage,
            `additionalImage-${images.indexOf(additionalImage)}.jpg`,
            "image/*"
          )
        );
        additionalImages.push(data);
      }
      const room = {
        title: e.target.title.value,
        host: user._id,
        price: e.target.price.value,
        capacity: e.target.capacity.value,
        description: e.target.description.value,
        category: e.target.category.value,
        image: mainImage,
        gallery: additionalImages,
        facilities,
        likes: 0,
      };
      setFacilities([]);
      setImage("");
      setFileKey(0);
      setImages(["", "", "", "", ""]);
      e.target.reset();
      setLoading(false);
      await secureAxios.post("/add-room", room);
      toast.success("Room Added Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="container mx-auto mt-8 w-[95%] p-5 border rounded-md">
      <h1 className="text-3xl font-bold mb-4">Add a Room</h1>
      {/* <Button
      
        onClick={}
        label={"Test"}
      /> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            required
            type="text"
            name="title"
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
            <div className="flex items-center gap-2">
              <input
                required
                type="number"
                name="price"
                className="mt-1 p-2 border w-full rounded-md outline-none"
              />
              <label className="font-semibold text-primary">BDT</label>
            </div>
          </div>

          <div className="mb-4 flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              required
              name="category"
              className="mt-1 p-2 border w-full rounded-md"
            >
              <option value="singleDeluxe">Single Deluxe</option>
              <option value="singlePremium">Single Premium</option>
              <option value="coupleDeluxe">Couple Deluxe</option>
              <option value="couplePremium">Couple Premium</option>
              <option value="family-4">Family - 4</option>
              <option value="family-6">Family -6</option>
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
            className="scale-0 absolute"
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

        <div className="mb-6">
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
                  name={`additionalImage${index}`}
                  type="file"
                  accept="image/*"
                  key={fileKey}
                  onChange={async (file) => {
                    const data = await base64(file.target);
                    const temp = [...images];
                    temp[index] = data;
                    setImages(temp);
                  }}
                  className="scale-0 absolute"
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
            Facilities
          </label>
          <div className="p-4 bg-slate-200 rounded-md mt-2 flex items-center flex-wrap gap-3">
            {facilities.map((fa, i) => (
              <span
                className="bg-primary px-3 py-1 rounded-md text-white flex items-center gap-2"
                key={fa + i}
              >
                {i + 1}: {fa}
                <FaTimes
                  onClick={() => {
                    const temp = [...facilities];
                    temp.splice(i, 1);
                    setFacilities(temp);
                  }}
                  className="text-xl bg-white text-primary rounded-full p-1 cursor-pointer"
                />
              </span>
            ))}
          </div>
          <input
            type="text"
            className="border rounded-md mt-2 px-3 py-1 outline-none"
            placeholder="Write Facility"
            ref={facility}
          />
          <p
            onClick={() => {
              if (!facility.current.value) return;
              const temp = [...facilities];
              temp.push(facility.current.value);
              facility.current.value = "";
              setFacilities(temp);
            }}
            className="bg-primary text-white px-3 py-1 font-semibold rounded-md ml-2 duration-300 active:scale-90 ease-in-out cursor-pointer select-none w-max inline-block"
          >
            Add
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description{" "}
            <span className="ml-20">
              ( Put{" "}
              <span className="bg-slate-300 px-3 rounded-md mx-1">&--&</span> to
              make Paragraph )
            </span>
          </label>
          <textarea
            rows="6"
            required
            name="description"
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
            required
            type="number"
            name="capacity"
            className="mt-1 p-2 border w-full rounded-md outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-3"
        >
          Add Room {loading && <FaSpinner className="animate-spin" />}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
