import { useCategory } from "@/hooks/categoryHooks/useCategory";
import { isCategoryArray } from "@/type-guards";
import {AiOutlineClose} from "react-icons/ai"
import React from "react";
import Link from 'next/link'

import { useDrawerMenu } from "@/store/DrawerMenuState";

const CategoryList = () => {

  // fetch the list of all categories
  const { isLoading, data, isError, isFetching, refetch } = useCategory();

  // used to handle closing the drawer menu
  const {toggleDrawerMenu} = useDrawerMenu();
  
  if (isLoading) {
    <p>Loading...</p>
  }

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col space-y-4 py-10 px-10">
        <div className="flex flex-row space-x-2 items-center cursor-pointer" onClick={() => toggleDrawerMenu(false)}>
            <AiOutlineClose className="text-lg"/>
            <p className="font-jost">Close</p>
        </div>
        {isCategoryArray(data) &&
          data.map((category) => (
            <Link
              href={`/category/${category}`}
              key={category}
              className="font-jost font text-2xl text-black "
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
