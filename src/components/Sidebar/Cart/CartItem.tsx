import { ICart, IProduct } from "@/interfaces";
import { useCartStore } from "@/store/CartState";
import React, { useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";

const CartItem: React.FC<{ cart: ICart }> = (props) => {
  const [count, setCount] = useState<number>(props.cart.quantity);
  const { items, addToCart, removeFromCart } = useCartStore();

  useEffect(() => {
    setCount(props.cart.quantity);
  }, [items]);

  // calls removeFromCart global store function and decrease the counter that is displayed on screen
  const decreaseCounter = () => {
    if (count > 0) {
      setCount((count) => count - 1);
      const cart: ICart = {
        product: props.cart.product,
        quantity: count,
      };
      removeFromCart(cart)
    }
  };

   // calls addToCart global store function and increase the counter that is displayed on screen
  const increaseCounter = () => {
    setCount((count) => count + 1);
    const cart: ICart = {
      product: props.cart.product,
      quantity: 1,
    };
    addToCart(cart);
  };

  return (
    <div className="flex w-full h-[90px] flex-row space-x-4 bg-white items-center rounded">
      <div className=" flex min-w-[70px] justify-center  ">
        <img
          src={props.cart.product.image}
          alt="produs"
          className="h-[60px] max-h-[80px] max-w-[70px] "
        />
      </div>
      <div className="w-full h-full py-3">
        <div className="flex flex-col justify-between h-full ">
          <p className="font-jost text-xs  line-clamp-2 ">
            {props.cart.product.title}
          </p>
          <div className="w-full flex items-center ">
            <div className="flex flex-row w-full items-center space-x-2">
              <div className="select-none flex flex-row justify-between items-center min-w-[80px] py-1 px-2 bg-[#f6f6f6]  self-start font-jost font-medium   text-xs">
                <IoMdRemove
                  className="cursor-pointer text-lg"
                  onClick={decreaseCounter}
                />
                {count}
                <GrFormAdd
                  className="cursor-pointer text-lg"
                  onClick={increaseCounter}
                />
              </div>
              <p className="font-jost text-xs text-[#5b5757]">
                ${props.cart.product.price}
              </p>
            </div>
            <p className="font-jost font-medium text-xs">
              ${(parseFloat(props.cart.product.price) * count).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
