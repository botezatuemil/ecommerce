import { useUser } from "@/store/UserStore";
import {  useEffect } from "react";
import jwt_decode from "jwt-decode";

// get token from local storage and if it's still valid, save data in zustand global store
// this way we know even on refresh if user is still authenticated
export const useFetchLogin = () => {
  const { toggleLogin, setUsername, setId } = useUser();
  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      const decodedToken: { sub: number; user: string; iat: number } =
        jwt_decode(token);
      toggleLogin(true);
      setUsername(decodedToken.user);
      setId(decodedToken.sub);
    }
  }, []);
};
