import React from "react";
import {BsGlobe} from "react-icons/bs";

const Footer = () => {
  
  return (
    <footer className=" bg-[#19110b] w-full h-[30vh] relative bottom-0 flex-col  divide-y-[1px]  divide-[#2d221a] ">
        <div className="flex font-poppins justify-center md:justify-start md:px-10 text-lg font-medium text-white h-1/2 items-center cursor-pointer ">
            SHOP CAST
        </div>
        <div className="text-white lg:flex sm:grid-cols-4 md:grid-cols-4  lg:flex-row  items-center h-1/2 px-10 lg:justify-between grid grid-cols-3 ">
            <div className="flex flex-row space-x-2 cursor-pointer">
                <BsGlobe/>
                <p className="font-jost text-xs md:text-[15px]">ENGLISH (INTL)</p>
            </div>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Newsletter</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Contact</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Stores</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Sustainabilty</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Apps</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Follow Us</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Legal & Privacy</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Cookies</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Jobs</p>
            <p className="font-jost text-xs text-[15px] cursor-pointer">Sitemap</p>
        </div>
    </footer>
  )
};

export default Footer;
