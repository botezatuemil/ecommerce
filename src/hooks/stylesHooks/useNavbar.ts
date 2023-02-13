import React, {useState, useEffect} from "react";

export const useNavbar = () => {
    const [stickyClass, setStickyClass] = useState('relative');

    useEffect(() => {
      window.addEventListener('scroll', stickNavbar);
  
      return () => {
        window.removeEventListener('scroll', stickNavbar);
      };
    }, []);
  
    // checks if the navbar passes the specified treshold to apply another style 
    const stickNavbar = () => {
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        windowHeight > 100 ? setStickyClass('text-black fixed top-0 left-0 z-50 bg-[#F3F5F2] ') : setStickyClass('relative');
      }
    };

    return {stickyClass};
};
