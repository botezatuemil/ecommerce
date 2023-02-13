import { AxiosError } from "axios";
import { useState } from "react";

export const useForm = (
    onError : (error : AxiosError) => void
) => {
  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorForm, setIsErrorForm] = useState<boolean>(false);
  const [errorMessage, setErrorMesage] = useState<string>();

  const [username, setUsername] = useState<string>("mor_2314");
  const [password, setPassword] = useState<string>("83r5^_");


  // calls onError from react query 
  onError;

  // check if username is empty and set error message 
  const onCheckUsernameEmpty = () => {
    if (username === "") {
      setIsErrorUsername(true);
      setErrorMesage("Username cannot be empty");
      return;
    }
  };

  const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    setIsErrorUsername(false);
    setIsErrorForm(false)
    setErrorMesage("")
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setIsErrorForm(false)
    setErrorMesage("")
  };

  return {
    username,
    password, 
    setUsername,
    setPassword,
    setErrorMesage,
    onCheckUsernameEmpty,
    onChangeUsername,
    onChangePassword,
    errorMessage,
    isErrorForm,
    isErrorUsername,
    setIsErrorForm
  }
};
