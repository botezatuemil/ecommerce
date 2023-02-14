import { useCartStore } from "@/store/CartState";
import { useDrawerCart } from "@/store/DrawerCartState";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./CartItem";
import { isCartArray } from "../../../type-guards/index";

const Cart = () => {

  // to show cart details and to calculate the total sum  
  const { items: cartItems, getTotalSum } = useCartStore();

  // for closing the cart drawer
  const { toggleDrawerCart } = useDrawerCart();

  return (
    <div className="flex flex-col w-full h-full pt-10 ">
      <div className="w-full h-full items-center flex flex-col  ">
        <div className="flex flex-row justify-between w-full ">
          <p className="font-jost font-medium ">
            Shopping Cart ({cartItems.length})
          </p>
          <div
            className="flex flex-row space-x-2 items-center cursor-pointer"
            onClick={() => toggleDrawerCart(false)}
          >
            <AiOutlineClose className="text-lg" />
            <p className="font-jost">Close</p>
          </div>
        </div>
        <div className="flex w-full border-[1px] mt-6 " />
        <div className="w-full space-y-2 h-[70vh] overflow-y-auto">
          {isCartArray(cartItems) &&
            cartItems.map((cart) => <CartItem key={cart.product.id} cart={cart} />)}
        </div>
      </div>
      <div className="flex h-full items-center justify-between ">
        <div className="flex flex-col">
          <p className="font-jost">Total price</p>
          <p className="font-jost font-medium ">${getTotalSum().toFixed(2)}</p>
        </div>
        <button className="font-jost bg-black text-white px-3 py-2 rounded">Buy Now</button>
      </div>
    </div>
  );
};

export default Cart;
