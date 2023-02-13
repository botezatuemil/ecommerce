import { IUser } from "@/interfaces";
import axios from "axios";
import { useQuery } from "react-query";

const fetchUser = async (id: string | string[] | undefined) => {
  if (id !== undefined) {
    const { data } = await axios.get(`https://fakestoreapi.com/users/${id}`);
    return data;
  }
};

// fetch user details 
export const useAccount = (id: string | string[] | undefined) => {
  return useQuery<IUser>(["user", id], () => fetchUser(id), {
    onSuccess: () => console.log(`Successfully fetched user data`),
    onError: () => console.log("Error on fetching user data"),
  });
};
