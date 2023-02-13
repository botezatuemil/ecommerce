import React, { useState } from "react";
import { useRouter } from "next/router";
import { isProduct } from "../../../../type-guards";
import { useProductDetail } from "@/hooks/productHooks/useProductDetail";
import Navbar from "@/components/Navbar/Navbar";

import { GrFormAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";
import Carousel from "@/components/Carousel/Carousel";
import { useProductsCategoryFilter } from "@/hooks/categoryHooks/useProductCategoryFilter";
import { useCartStore } from "@/store/CartState";
import { ICart } from "@/interfaces";
import { useFetchLogin } from "@/hooks/userHooks/useFetchLogin";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [count, setCount] = useState<number>(1);

  // fetch product detail by id that was passed from router
  const { isLoading, data, isError, isFetching, refetch } =
    useProductDetail(productId);
    useFetchLogin();

  // cart global store to handle adding or removing items from cart
  const { addToCart } = useCartStore();

  if (isLoading) {
    console.log("Loading...") 
  };
  if (isError) {
    console.log("An error has occurred: ")
  }

  const decreaseCounter = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  const increaseCounter = () => {
    setCount((count) => count + 1);
  };

  // when pressing on add to cart button, the product is added to cart by calling the addToCart zustand store
  const onCartPress = () => {
    if (isProduct(data)) {
      const cart : ICart = {
        product: data,
        quantity: count
      }
      addToCart(cart);
    }
  };

  return (
    <>
      {isProduct(data) &&
        <div className="min-h-full w-full flex flex-col ">
          <Navbar />
          <div className="flex flex-col px-2  md:flex-row md:justify-between md:items-center py-10  w-full h-full md:px-10  ">
            <div className="flex px-20 md:w-[40vw] h-[70vh]  md:p-10 justify-center rounded items-center ">
              <img src={data.image} alt="produs" className="max-h-[350px] " />
            </div>
            <div className="flex flex-col justify-center items-start px-4 md:w-[50vw] space-y-10 h-full md:h-[70vh] ">
              <div className="space-y-4">
                <p data-testid="title" className="font-jost font-semibold text-2xl">{data.title}</p>
                <p data-testid="description" className="font-jost  break-words">{data.description}</p>
              </div>
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <p data-testid="price" className="font-jost font-medium text-xl">
                    ${data.price} or ${(parseInt(data.price) / 6).toFixed(2)}
                    /month
                  </p>
                  <p className="font-jost  text-xs">
                    Sugested payments with 6 months special financing
                  </p>
                  <div className="select-none flex flex-row justify-between items-center md:w-[10vw] h-[40px] bg-[#f6f6f6]  transition-all duration-110 ease-in self-start font-jost font-medium  rounded-full py-[6px] px-4">
                    <IoMdRemove
                      className="cursor-pointer text-lg"
                      onClick={decreaseCounter}
                      data-testid="decrement"
                    />
                    <p data-testid="count">{count}</p>
                    <GrFormAdd
                      className="cursor-pointer text-lg"
                      onClick={increaseCounter}
                      data-testid="increment"
                    />
                  </div>
                </div>
                <div className="select-none flex flex-row space-x-10  w-full">
                  <button className=" w-1/2 md:w-[20vw] h-[50px] bg-black text-white transition-all duration-110 ease-in self-start font-jost font-medium   rounded-full py-[6px] px-4 ">
                    Buy Now
                  </button>
                  <button
                    onClick={onCartPress}
                    className="w-1/2 md:w-[20vw] h-[50px]  transition-all duration-110 ease-in self-start font-jost font-medium text-[#686768]   border-2 rounded-full py-[6px] px-4 border-[#686768]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* show the recommended items from the same category without the current product that is displayed */}
          <Carousel
            page={`/category/${data.category}`}
            title="Items You Might Like"
            items={() => useProductsCategoryFilter(data.category, data.id)}
          />
        </div>
      }
    </>
  );
};

export default ProductDetail;
