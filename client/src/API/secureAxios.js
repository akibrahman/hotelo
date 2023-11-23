import axios from "axios";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_server,
  withCredentials: true,
});
export default secureAxios;
