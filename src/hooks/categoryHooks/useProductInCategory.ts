import { IFilterCategory, IPriceRange, IProduct } from "@/interfaces";
import { isProductArray } from "@/type-guards";
import axios from "axios";
import { useQuery } from "react-query";

export const fetchProductsCategory = async (categoryName: string | string[] | undefined) => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/category/${categoryName}`
  );
  return data;
};


// fetch products by category and apply the same filters as useProduct without filterCategory 
export const useProductsCategory = (categoryName: string | string[] | undefined, filterPrice? :IPriceRange[], filterName? : string, limit?: number) => {
  return useQuery<IProduct[]>(["productsCategory", categoryName], () => fetchProductsCategory(categoryName), {
    onSuccess: () => console.log(`Successfully fetched products for ${categoryName}`),
    onError: () => console.log(`Error fetching products for ${categoryName}`),
    select: (state) => {
      let filteredState = state;
      if (typeof filterPrice !== "undefined") {
        if (filterPrice.some(fc => fc.checked)) {
       
          if (isProductArray(state)) {
            filteredState =  filteredState.filter(product => filterPrice.some(fp => parseFloat(product.price) >= fp.lowerBound && parseFloat(product.price) <= fp.upperBound && fp.checked))
          }
        }
      }
      if (typeof filterName !== "undefined") {
        
        filteredState = filteredState.filter(product => product.title.toLowerCase().includes(filterName.toLowerCase()))
      }

      if (typeof limit !== "undefined") {
        filteredState = filteredState.slice(0, limit)
      }
      
      return filteredState;
    }
  });

};
