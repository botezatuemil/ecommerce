
import { useLogin } from "@/hooks/userHooks/useLogin";
import  { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import jwt_decode from "jwt-decode";
import {useUser} from "../../store/UserStore"
import { useForm } from "@/hooks/userHooks/useForm";

const Login = () => {
 
  // zustand store that keeps authenticated user data for access in the entire app
  const {toggleLogin, setUsername : saveUsername, isLoggedIn, setId} = useUser();

  // function that is called when the api returns error
  const onError = (error : AxiosError) => {
    if (error.response && error.response.data) {
      setErrorMesage(error.response.data.toString());
      setIsErrorForm(true)
    }
  }
  
  // is called when the api successfully makes the call
  // decode jwt and save it to local storage to access it later in app
  // save user data in global context (username, id, isLogged)
  // navigate to home page
  const onSuccess = (data : {token: string}) => {
    localStorage.setItem("token", data.token);

    if (data.token !== null) {
      const decodedToken : {sub: number, user: string, iat: number} = jwt_decode(data.token);
      saveUsername(decodedToken.user)
      toggleLogin(true);
      setId(decodedToken.sub)
      console.log(decodedToken)
    } 
    router.replace("/")
  }

  // custom hook that handles all form and input data as well as all errors
  const {username, password, onChangePassword, onChangeUsername, onCheckUsernameEmpty, errorMessage,
    isErrorForm,
    isErrorUsername,setErrorMesage, setIsErrorForm } = useForm(onError);

  const router = useRouter();

  // wraps react query hook, handles authentification through api call
  const { mutate, error, data } = useLogin(username, password, onSuccess, onError);

  // when clicking submit, checks if username is empty and make the api call
  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onCheckUsernameEmpty();
    mutate();
  };

  return (
    <div className="flex w-full h-[100vh] flex-row ">
      <div className="absolute md:w-[50%] md:relative opacity-70 md:opacity-100 md:flex xl:w-[65vw] bg-black h-full">
        <img
          className="h-[100%] object-cover"
          src="https://img.freepik.com/free-photo/black-white-balls-fall-into-pool-screen-black-background-spheres-fill-volume-3d-render_1217-2494.jpg"
        />
      </div>
      <div className="w-full flex md:w-[50vw] xl:w-[35vw] h-full flex-col px-20 py-10 relative ">
        <div className="space-y-2">
          <h1 className="font-poppins font-semibold text-2xl text-white md:text-black">Login</h1>
          <p className="font-jost text-[15px] text-white md:text-black ">
            See your growth and get the latest products{" "}
          </p>
        </div>

        <form
          onSubmit={onLogin}
          className="absolute pr-40 w-full  top-[40%] flex flex-col space-y-8 font-jost"
        >
          <label className="text-red-500 font-jost absolute ">{errorMessage}</label>

          <input
            className={`border-2 w-full h-[40px] pl-2 ${isErrorUsername  || isErrorForm ? "border-red-500" : "border-[#6b6b6d]" } rounded `}
            placeholder="Enter your username"
            value={username}
            onChange={onChangeUsername}

          />
          <input
            type="password"
            className={`border-2 w-full h-[40px] pl-2 ${isErrorForm ? "border-red-500" : "border-[#6b6b6d]" } rounded`}
            placeholder="Enter your password"
            value={password}
            onChange={onChangePassword}
          />
          <a href="/login" className="text-xs underline text-white md:text-black">
            Forgot password?
          </a>
          <button  className="items-center flex justify-center bg-black w-full h-[40px] pl-2 rounded text-white hover:bg-white hover:border-2 hover:border-black hover:text-black transition-all delay-200 ease-in-out">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
