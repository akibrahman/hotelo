import secureAxios from "./secureAxios";

export const removeToken = async () => {
  const { data } = await secureAxios.get("/remove-jwt");
  return data;
};
