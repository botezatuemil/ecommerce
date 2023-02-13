import FilterButton from "@/components/Buttons/FilterButton";
import Navbar from "@/components/Navbar/Navbar";
import Product from "@/components/Product/Product";
import { useCleanupFilter } from "@/hooks/filterHooks/useCleanupFilter";
import { useProduct } from "@/hooks/productHooks/useProduct";
import { useFetchLogin } from "@/hooks/userHooks/useFetchLogin";
import { useCategoryFilter } from "@/store/FilterCategoryStore";
import { useFilterPrice } from "@/store/FilterPriceStore";
import { useFilterSearch } from "@/store/FilterSearchStore";
import { isCategoryArray, isProductArray } from "@/type-guards";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const AllProducts = () => {

  // filter that contains the price range that was checked in filter component
  const { filterPrice, toggleFilterPrice } = useFilterPrice();

  // filter that contains the category that was checked in filter component
  const { filterCategory, toggleCategoryFilter } = useCategoryFilter();

  // filter that contains the search keyword from search bar
  const { filterName } = useFilterSearch();

  // limit results to only 8 products when component mounts
  const [limit, setLimit] = useState<number>(8);

  // check if I can fetch more (used to fetch the next results on bottom of the screen)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  useFetchLogin();
  useCleanupFilter();

  // fetch product data with all filters applied at the same time
  const { isLoading, data, isError, isFetching, refetch } = useProduct(
    filterPrice,
    filterCategory,
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

      // creates a loading data experience to allow spinner to show on screen and fetch the next 4 products
      setTimeout(() => {
        setLimit((limit) => limit + 4);
        setIsFetchingMore(false)
      }, 500);
    }
  };

  // event listener on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setIsFetchingMore(false);
    };
  }, [])

 

  return (
    <div className="flex flex-col w-full min-h-[100vh]">
      <Navbar />
      <div className="w-full min-h-[100vh] flex flex-col p-10 space-y-4 ">
        <h1 className="font-poppins font-semibold text-2xl ">
          Discover Our New Collection!
        </h1>
        {isProductArray(data) && <FilterButton />}
        <div className="h-full grid grid-cols-1  md:grid-cols-3 md:gap-0  xl:grid-cols-4  2xl:grid-cols-6 space-y-4 ">
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
      {isFetchingMore && (
        <div className="flex w-full justify-center p-10">
          <CgSpinner className="animate-spin text-3xl" />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
