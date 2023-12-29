import axios from "axios";
import { removeToken } from "./removeToken";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_server,
  withCredentials: true,
});

secureAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("Error tracked in Interceptor - ", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await removeToken();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default secureAxios;
