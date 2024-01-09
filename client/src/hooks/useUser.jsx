import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useSecureAxios from "./useSecureAxios";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useSecureAxios();
  const { data, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async ({ queryKey }) => {
      const user = await axiosInstance.get(`/user/${queryKey[1]}`);
      return user.data;
    },
    enabled: user.email ? true : false,
  });
  return { ...data, refetch };
};

export default useUser;
