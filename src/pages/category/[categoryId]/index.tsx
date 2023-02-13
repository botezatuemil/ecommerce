import FilterButton from "@/components/Buttons/FilterButton";
import Navbar from "@/components/Navbar/Navbar";
import Product from "@/components/Product/Product";
import { useProductsCategory } from "@/hooks/categoryHooks/useProductInCategory";
import { useCleanupFilter } from "@/hooks/filterHooks/useCleanupFilter";
import { useFetchLogin } from "@/hooks/userHooks/useFetchLogin";
import { useFilterPrice } from "@/store/FilterPriceStore";
import { useFilterSearch } from "@/store/FilterSearchStore";
import { isProductArray } from "@/type-guards";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";


const Category = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  useFetchLogin();
  const { filterPrice } = useFilterPrice();
  const {filterName} = useFilterSearch();
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(4);

  // fetch products data by category and apply filters
  const { isLoading, data, isError, isFetching, refetch } = useProductsCategory(
    categoryId,
    filterPrice,
    filterName,
    limit
  );

  // calculate if the current position is at the bottom of the screen
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setIsFetchingMore(true);

      setTimeout(() => {
        setLimit((limit) => limit + 4);
        setIsFetchingMore(false)
      }, 500);
    }
  };

  // when component renders reset all filters that were applied before
  useCleanupFilter();

  // event listener to know if the position is at the bottom of the screen at any moment
  useEffect(() => {
    
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setIsFetchingMore(false);
    };
    
  }, []);

  const title: string = categoryId as string;

  return (
    <div className="flex flex-col w-full min-h-[100vh] ">
      <Navbar />
      <div className="w-full min-h-[100vh] flex flex-col p-10 space-y-4">
        {title && (
          <h1 className="font-poppins font-semibold text-2xl ">
            {title.charAt(0).toUpperCase() + title.slice(1)} For You!
          </h1>
        )}
        {/* show the filter component */}
        {isProductArray(data) && <FilterButton />}
        <div className="h-full grid grid-cols-1  md:grid-cols-3 md:gap-0  xl:grid-cols-4  2xl:grid-cols-6 space-y-4 ">
          {/* map all products on screen */}
          {isProductArray(data) &&
            data.map((product) => (
              <Product
                category={product.category}
                image={product.image}
                price={product.price}
                title={product.title}
                key={product.id}
                id={product.id}
                description={product.description}
              />
            ))}
        </div>
      </div>
      {/* load spinner if there is more data to load */}
      {isFetchingMore && (
        <div className="flex w-full justify-center p-10">
          <CgSpinner className="animate-spin text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Category;
