import Carousel from "@/components/Carousel/Carousel";
import Navbar from "@/components/Navbar/Navbar";
import ServicesList from "@/components/Service/ServicesList";
import { useProduct } from "@/hooks/productHooks/useProduct";
import { useFetchLogin } from "@/hooks/userHooks/useFetchLogin";
import React from "react";
import videoBg from "src/assets/videoBg2.mp4";

export default function Home() {

  // calls custom hook that checks if the user is still authenticated 
  useFetchLogin();
  const {data} = useProduct();
  
  return (
    <div className="flex flex-col w-full min-h-[100vh]  ">
      <div className="relative min-h-[100vh] ">
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          className="absolute top-0 w-full h-[100vh] object-cover"
        />
      </div>
      <div className="flex absolute top-0 left-0 m-0 p-0  flex-col items-center w-full  ">
        <Navbar />
        <div className="flex w-full h-[84vh] justify-center items-end  ">
          <div className="flex h-[40vh] w-full justify-center items-center flex-col space-y-10">
            <p className="text-white md:text-3xl font-jost">
              See Our New 2023 Collection
            </p>
            <button className="rounded-full px-4 py-2 md:h-[50px] md:w-[200px]   border-white border-2 border-solid ">
              <p className=" text-white font-jost text-xs md:text-[14px]">
                Watch the Show
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#f3f5f2] w-full flex flex-col  ">
        {/* component that shows a list of services provided by the store */}
        <ServicesList />
        {/* component to show more items as a horizontal list by passing any data that we want to be displayed*/}
        <Carousel page="products" title="Featured Collection" items={data} />
       
      </div>
    </div>
  );
}
