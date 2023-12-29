import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_server}`,
  withCredentials: true,
});
const useSecureAxios = () => {
  const navigate = useNavigate();
  const { auth, setUser, setLoading, logOut } = useAuth();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("Tracked in the Axios Interceptor - ", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log(
            "Response Problem Cought by Axios Interceptors - ",
            error.response.status
          );
          logOut(auth)
            .then(() => {
              setUser(null);
              setLoading(true);
              navigate("/login");
            })
            .catch();
        }
      }
    );
  }, [auth]);
  return axiosInstance;
};

export default useSecureAxios;
