import { ICart, IProduct } from "@/interfaces";
import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/CartState";

const Product = (props : IProduct) => {
  
  const updateCartItems = useCartStore((state) => state.addToCart);

  // to add one product from main screen or the screen where the product is shown
  const addToCart = (product : IProduct, quantity: number) => {
    const cart : ICart = {product, quantity};
    updateCartItems(cart);
  }

  return (
    <div className="flex pt-8 pb-4 min-w-full px-4 justify-between  md:min-w-[280px] md:max-w-[280px] rounded flex-col bg-white shadow-lg  space-y-4   ">
      <div className="justify-center flex hover:scale-125 transition-all duration-300 ease-in-out ">
        <Link  href={`/category/${props.category}/product/${props.id}`}><img src={props.image} alt="produs" className="max-h-[100px] " /></Link>
      </div>
      <div>
        <p className="font-jost line-clamp-2 ">{props.title}</p>
      </div>
      <div className="flex flex-col justify-self-end">
        <p className="font-jost font-medium">${props.price}</p>
        <p className="font-jost font-light text-[#686768] text-xs">
          {props.category}
        </p>
        <button onClick={() => addToCart(props, 1)} className=" hover:bg-black hover:text-white hover:border-black transition-all duration-110 ease-in self-start font-jost font-medium text-[#686768] text-xs mt-2  border-2 rounded-full py-[6px] px-4 border-[#686768]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
