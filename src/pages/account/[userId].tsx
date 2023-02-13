import Navbar from "@/components/Navbar/Navbar";
import { useAccount } from "@/hooks/userHooks/useAccount";
import { useFetchLogin } from "@/hooks/userHooks/useFetchLogin";
import { useRouter } from "next/router";
import React from "react";
import { BiLogOut } from "react-icons/bi";

const Account = () => {
  const router = useRouter();
  const { userId } = router.query;
  useFetchLogin();

  // fetch data for user account
  const { data } = useAccount(userId);

  // remove the local storage token when user logs out and navigate to login page
  const onLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login")
  }

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-[#F3F5F2] ">
      <Navbar />
      <div className="w-full   flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        {data && (
          <div className="font-jost">
            <div className="space-y-2">
              <p className="font-poppins font-semibold text-xl mb-6">
                Manage account
              </p>
              <p>Username: {data.username}</p>
              <p>First Name: {data.name.firstname}</p>
              <p>Last Name: {data.name.lastname}</p>
              <p>Email: {data.email}</p>
              <p>Phone: {data.phone}</p>
              <p>City: {data.address.city}</p>
              <p>Street: {data.address.street}</p>
            </div>
          </div>
        )}
        <div className="w-full flex flex-row justify-center items-center">
          <button className="relative flex rounded flex-row  py-2  bg-red-600 text-white font-jost w-[200px]">
          <BiLogOut className="absolute place-self-center ml-2" />
            <p onClick={onLogout} className="text-center w-full">Log out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
