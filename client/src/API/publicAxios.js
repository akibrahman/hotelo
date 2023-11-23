import axios from "axios";

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_server,
});
export default publicAxios;
