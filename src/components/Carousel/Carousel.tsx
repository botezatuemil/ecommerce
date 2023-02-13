import { isProductArray } from "@/type-guards";
import Link from "next/link";
import React from "react";
import { UseQueryResult } from "react-query";
import Product from "../Product/Product";

const Carousel : React.FC<{page: string, title: string, items: () => UseQueryResult<any, unknown> }> = (props) => {

  // calls the hook from props to display it's data
  const { isLoading, data, isError, isFetching, refetch } = props.items();

  return (
    <div className="flex flex-col w-full p-10 space-y-6">
      <div className="flex justify-between items-center">
      <h1 className="font-poppins font-semibold md:text-2xl ">{props.title}</h1>
      <Link href={props.page} className="font-jost cursor-pointer">See all</Link>
      </div>
      <div className="flex flex-row overflow-x-scroll py-2  space-x-10 w-full">
        {isProductArray(data) &&
          data.map((product) => (
            <Product
              id={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.image}
              key={product.id}
              description={product.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
