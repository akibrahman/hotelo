import publicAxios from "./publicAxios";

export const saveUser = async (user) => {
  const userData = {
    name: user.displayName,
    email: user.email,
    role: "guest",
    status: "Verified",
    photo: user.photoURL,
  };
  const { data } = await publicAxios.put(`/users/${user?.email}`, userData);
  return data;
};
