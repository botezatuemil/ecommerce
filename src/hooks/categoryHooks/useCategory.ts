import axios from "axios";
import { useQuery } from "react-query";

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return data;
};

// react query that fetches all categories by calling fetch categories
export const useCategory = () => {
  return useQuery("category", fetchCategories, {
    onSuccess: () => console.log("Successfully fetched categories"),
    onError: () => console.log("Error on fetching categories"),
  });
};
