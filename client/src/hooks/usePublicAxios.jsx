import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_server}`,
});
const usePublicAxios = () => {
  return axiosInstance;
};

export default usePublicAxios;
