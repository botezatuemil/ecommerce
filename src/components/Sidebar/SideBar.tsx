import React from "react";
import { useDrawerMenu } from "@/store/DrawerMenuState";


const SideBar: React.FC<{
  children: JSX.Element;
  sidebarOverlayStyle: string;
  sidebarStyle: string
}> = (props) => {
  const {isMenuOpen, toggleDrawerMenu} = useDrawerMenu();

  const onCloseSidebar = () => {
    toggleDrawerMenu(false);
  }
  
  return (
    // sidebar layout that is used with multiple children components
    <div
      className={`flex inset-0 fixed z-50 ${props.sidebarOverlayStyle}  `}
      onClick={onCloseSidebar}
    >
      <div className={`w-full ${props.sidebarStyle} bg-white transition-all duration-300  fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw]  z-50 px-4  `}>
        {props.children}
      </div>
    </div>
  );
};

export default SideBar;
