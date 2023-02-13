import { IFilterCategory, IPriceRange, IProduct } from "@/interfaces";
import { isProductArray } from "@/type-guards";
import axios from "axios";
import { useQuery } from "react-query";

export const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
};

// fetch products data using useQuery hook from react query library

export const useProduct = (filterPrice? :IPriceRange[], filterCategory?: IFilterCategory[], filterName?: string, limit?: number) => {
  return useQuery<IProduct[]>("products", fetchProducts, {
    onSuccess: () => console.log("Succes"),
    onError: () => console.log("Error"),
    select: (state) => {
      let filteredState = state;

      // checks if the filterPrice exists and if at least one checkbox was checked (at least a filter by price is active)
      // if all boxes are unchecked, the data remains the same
      if (typeof filterPrice !== "undefined" && filterPrice.some(fc => fc.checked)) {

        // filter the products that have the price in the range passed 
        filteredState = filteredState.filter(product => filterPrice.some(fp => parseFloat(product.price) >= fp.lowerBound && parseFloat(product.price) <= fp.upperBound && fp.checked))
      }

      // checks if the filterCategory exists and if at least one checkbox was checked (at least a filter by category is active)
      // if all boxes are unchecked, the data remains the same
      if (typeof filterCategory !== "undefined" && filterCategory.some(fc => fc.checked) ) {
       
        // can filter multiple categories at once and look at those that are active
        filteredState = filteredState.filter(product => filterCategory.some(fc => product.category === fc.category && fc.checked === true))
      } 

      // filter for searching products from search bar
      if (typeof filterName !== "undefined") {
        filteredState = filteredState.filter(product => product.title.toLowerCase().includes(filterName.toLowerCase()))
      }

      // limit data that is displayed on screen for infinite scrolling experience
      if (typeof limit !== "undefined") {
        filteredState = filteredState.slice(0, limit)
      }
      
      // return the data that was filtered with all filters
      return filteredState;
    }
  });
};
