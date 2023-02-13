import { isProductArray } from "@/type-guards";
import { useQuery } from "react-query";
import { fetchProductsCategory } from "./useProductInCategory";

// custom hook that fetches all products without the one passed in function in the specified category
// it does not make another api call because productsCategory key is the same as useProductInCategory
// if the data is still in cache

export const useProductsCategoryFilter = (categoryName: string | string[] | undefined, idProduct: number) => {
  return useQuery(["productsCategory", categoryName], () => fetchProductsCategory(categoryName), {
    onSuccess: () => console.log(`Successfully fetched products for ${categoryName}`),
    onError: () => console.log("Error"),
    select: (data) => {
      return isProductArray(data) && data.filter(product => product.id !== idProduct);
    }
  });
};
