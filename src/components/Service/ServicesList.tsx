import React from "react";
import Service from "./Service";
import { MdOutlineLocalShipping } from "react-icons/md";
import {AiOutlineGift} from "react-icons/ai"
import {BiSupport} from "react-icons/bi";
import {TbDiscount2} from "react-icons/tb";
import {BsCreditCard2Back} from "react-icons/bs";

const ServicesList = () => {
  return (
    <div className="flex w-full h-[20vh] flex-row bg-[#F3F5F2] overflow-x-auto">
      <Service
        description="From all orders over 100$"
        icon={<MdOutlineLocalShipping className="text-3xl" />}
        title={"Free Shipping"}
      />
      <Service
        description="Save up to 25% off"
        icon={<AiOutlineGift className="text-3xl" />}
        title={"Daily Surprise Offers"}
      />
      <Service
        description="Shop with an expert"
        icon={<BiSupport className="text-3xl" />}
        title={"Support 24/7"}
      />
      <Service
        description="Get factory direct price"
        icon={<TbDiscount2 className="text-3xl" />}
        title={"Affordable Prices"}
      />
      <Service
        description="100% Protected Payments"
        icon={<BsCreditCard2Back className="text-3xl" />}
        title={"Secure Payments"}
      />
    </div>
  );
};

export default ServicesList;
