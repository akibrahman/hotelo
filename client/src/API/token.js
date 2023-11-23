import secureAxios from "./secureAxios";

export const createToken = async (email) => {
  const emailData = { email };
  const { data } = await secureAxios.post("/jwt", emailData);
  return data;
};
