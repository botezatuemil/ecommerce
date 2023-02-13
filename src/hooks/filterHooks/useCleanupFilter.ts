import { IFilterCategory } from "@/interfaces";
import { useCategoryFilter } from "@/store/FilterCategoryStore";
import { useFilterPrice } from "@/store/FilterPriceStore";
import { isCategoryArray } from "@/type-guards";
import { useEffect } from "react";
import { useCategory } from "../categoryHooks/useCategory";

export const useCleanupFilter = () => {
    
  //filter that contains the price range that was checked in filter component
  const { toggleFilterPrice } = useFilterPrice();

  // filter that contains the category that was checked in filter component
  const { toggleCategoryFilter } = useCategoryFilter();

  // fetch categories to use all categories name with a checkbox for filter
  const { data: categoryData } = useCategory();

  useEffect(() => {
    let initialCategoryFilter: IFilterCategory[] = [];

    // creates the array of categories 
    if (isCategoryArray(categoryData)) {
      categoryData.map((category) => {
        initialCategoryFilter.push({ category: category, checked: false });
      });
    }
    toggleCategoryFilter([...initialCategoryFilter]);

    // creates the default filters range for price
    toggleFilterPrice([
      { id: 1, lowerBound: 0, upperBound: 50, checked: false },
      { id: 2, lowerBound: 50, upperBound: 100, checked: false },
      { id: 3, lowerBound: 100, upperBound: 200, checked: false },
      { id: 4, lowerBound: 200, upperBound: 500, checked: false },
      { id: 5, lowerBound: 500, upperBound: 1000, checked: false },
      { id: 6, lowerBound: 1000, upperBound: Infinity, checked: false },
    ]);
  }, [categoryData]);
};
