import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { useNavbar } from "@/hooks/stylesHooks/useNavbar";
import SideBar from "../Sidebar/SideBar";
import CategoryList from "../Sidebar/Category/CategoryList";
import { useDrawerMenu } from "@/store/DrawerMenuState";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDrawerCart } from "@/store/DrawerCartState";
import Cart from "../Sidebar/Cart/Cart";
import { useUser } from "@/store/UserStore";
import { AiOutlineClose } from "react-icons/ai";
import { useFilterSearch } from "@/store/FilterSearchStore";


const Navbar = () => {

  // custom hook for handling events and changing styles based on that
  const { stickyClass } = useNavbar();
  const { isLoggedIn, id } = useUser();

  const { isCartOpen, toggleDrawerCart } = useDrawerCart();
  const { isMenuOpen, toggleDrawerMenu } = useDrawerMenu();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { filterName, toggleFilterName } = useFilterSearch();
  const router = useRouter();

  const pressMenu = () => {
    toggleDrawerMenu(true);
  };

  // if the user is logged in then it shows his account details, if not it's redirected to login screen
  const manageAccount = () => {
    if (isLoggedIn) {
      router.replace(`/account/${id}`);
    } else {
      router.replace("/login");
    }
  };

  // enable search
  const onSearch = () => {
    setIsSearching(true);
  };

  // save search in global store to apply to hooks that use the filters 
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleFilterName(e.currentTarget.value);
  };

  // disable search
  const onCloseSearch = () => {
    setIsSearching(false);
    toggleFilterName("");
  };

  return (
    // shows the default navbar
    <>
      {!isSearching ? (
        <>
          <nav
            className={` ${
              stickyClass === "relative" &&
              router.pathname === "/" &&
              "text-white"
            } ${
              router.pathname === "/"
                ? `${stickyClass}`
                : "text-black bg-[#F3F5F2]"
            } w-full h-[6vh] md:h-[16vh]  transition ease-in-out delay-150 hover:bg-[#F3F5F2] hover:text-black duration-300 sticky top-0 z-10 flex flex-row items-center justify-between px-10`}
          >
            <div className="flex flex-row  space-x-8 md:space-x-16">
              <div
                className="font-jost font-light flex items-center space-x-2 cursor-pointer  text-xs md:text-base"
                onClick={pressMenu}
              >
                <AiOutlineMenu className=" md:text-lg" />
                <p>Menu</p>
              </div>
              <div
                onClick={onSearch}
                className="font-jost font-light flex items-center space-x-2 cursor-pointer  text-xs md:text-base"
              >
                <CiSearch className="md:text-lg" />
                <p>Search</p>
              </div>
            </div>
            <Link
              href="/"
              className="font-poppins hidden md:flex text-3xl cursor-pointer "
            >
              SHOPCAST
            </Link>
            <div className="flex flex-row space-x-8  md:space-x-16">
              <div
                onClick={manageAccount}
                className="font-jost font-light flex space-x-2 items-center cursor-pointer  text-xs md:text-base"
              >
                <AiOutlineUser className="font-lg md:text-lg" />
                <p>Account</p>
              </div>
              <div
                className="font-jost font-light items-center space-x-2 flex cursor-pointer  text-xs md:text-base"
                onClick={() => toggleDrawerCart(true)}
              >
                <IoCartOutline className="md:text-lg" />
                <p>Cart</p>
              </div>
            </div>
          </nav>
          {isMenuOpen && !isCartOpen && (
            <SideBar
              sidebarStyle=""
              sidebarOverlayStyle="bg-opacity-70 bg-black "
            >
              <CategoryList />
            </SideBar>
          )}
          {isCartOpen && !isMenuOpen && (
            <SideBar sidebarStyle="right-0" sidebarOverlayStyle="">
              <Cart />
            </SideBar>
          )}
        </>
      ) : (

        // shows the search bar navbar
        <nav
          className={` w-full h-[16vh] justify-center border-b-[1px]  transition ease-in-out delay-150 bg-white hover:text-black duration-300 sticky top-0 z-10 flex flex-row items-center `}
        >
          <div className="flex relative items-center bg-[#F3F5F2] py-2 rounded">
            <input
              onChange={onChangeHandler}
              className="w-[50vw] ml-8 bg-[#F3F5F2] font-jost border-none outline-0"
              placeholder="Search product"
            />
            <CiSearch className="absolute ml-2" />
          </div>
          <AiOutlineClose
            onClick={onCloseSearch}
            className=" flex  absolute cursor-pointer left-[95%]"
          />
        </nav>
      )}
    </>
  );
};

export default Navbar;
