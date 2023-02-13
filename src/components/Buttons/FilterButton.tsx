import { ICart } from "@/interfaces";
import { useDrawerFilter } from "@/store/DrawerFilterState";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Filter from "../Sidebar/Filter/Filter";
import SideBar from "../Sidebar/SideBar";

const FilterButton = () => {
  const { isFilterOpen, toggleDrawerFilter } = useDrawerFilter();

  // opens the filter sidebar
  const openFilterSidebar = () => {
    toggleDrawerFilter(true);
  };
  return (
    <>
      <div
        onClick={openFilterSidebar}
        className="flex items-center cursor-pointer md:w-1/12 py-1 flex-row rounded font-jost justify-between px-2 border-[1px] bg-[#f6f6f6]"
      >
        <p>Filter</p>
        <IoMdArrowDropdown />
      </div>
      
      {/* displays the sidebar layout with the default styles and Filter component as children */}
      {isFilterOpen && (
        <SideBar sidebarOverlayStyle="" sidebarStyle="">
          <Filter />
        </SideBar>
      )}
    </>
  );
};

export default FilterButton;
