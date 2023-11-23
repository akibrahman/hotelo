import publicAxios from "./publicAxios";

export const saveUser = async (user) => {
  const userData = {
    email: user.email,
    role: "guest",
    status: "Verified",
  };
  const { data } = await publicAxios.put(`/users/${user?.email}`, userData);
  return data;
};
