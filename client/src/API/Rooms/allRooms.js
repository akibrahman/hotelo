import publicAxios from "../publicAxios";

export const allRooms = async () => {
  const { data } = await publicAxios.get("/all-rooms");
  return data;
};
