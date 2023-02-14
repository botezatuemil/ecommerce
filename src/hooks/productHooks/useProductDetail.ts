import { IProduct } from "@/interfaces";
import axios from "axios";
import { useQuery } from "react-query";

const fetchProductById = async (productId: string | string[] | undefined) => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );
  return data;
};

// fetch product detail by id 
export const useProductDetail = (productId : string | string[] | undefined) => {
  return useQuery<IProduct>(["products", productId], () => fetchProductById(productId));
};
