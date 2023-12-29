import publicAxios from "../publicAxios";

export const singleRoom = async (id) => {
  const { data } = await publicAxios.get(`/room/${id}`);
  return data;
};
