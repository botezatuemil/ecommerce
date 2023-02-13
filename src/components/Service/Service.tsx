import React from "react";

interface IService {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Service = (props : IService) => {
  return (
    <div className="flex min-w-full md:min-w-0 md:w-1/5 justify-center flex-row items-center space-x-4 ">
      {props.icon}
      <div>
        <p className="font-jost  ">{props.title}</p>
        <p className="font-jost text-[#989A98] text-xs">{props.description}</p>
      </div>
    </div>
  );
};

export default Service;
