import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

// authenticate user through username and password that is passed from login screen
const authLogin = async (username: string, password: string) => {
  const { data } = await axios.post(
    "https://fakestoreapi.com/auth/login",
    {
        username,
        password
    }
  );
  return data;
};

// when mutate function is called, query hook makes the api call by calling the passed callback function
export const useLogin = (username: string, password: string, onSuccess : (data: {token: string}) => void, onError : (error : AxiosError) => void) => {
  return useMutation<{token: string}, AxiosError>(
    "login",
    () => authLogin(username, password),
    {
      onSuccess,
      onError
    }
  );
};