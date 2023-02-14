import { useDrawerFilter } from "@/store/DrawerFilterState";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IFilterCategory, IPriceRange } from "@/interfaces";
import { useFilterPrice } from "@/store/FilterPriceStore";
import { useCategoryFilter } from "@/store/FilterCategoryStore";


const Filter = () => {
  const { isFilterOpen, toggleDrawerFilter } = useDrawerFilter();

  const {filterPrice, toggleFilterPrice} = useFilterPrice();
  const {filterCategory, toggleCategoryFilter} = useCategoryFilter();

  // when category checkbox is checked save the category filter and change it's checked state
  const onCheckCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    const newFilterCategory : IFilterCategory = {
      category,
      checked: e.currentTarget.checked
    }
    
    toggleCategoryFilter([...filterCategory.map(fc => fc.category === newFilterCategory.category ? {...fc, checked:newFilterCategory.checked } : fc)]);
   
  };

  // when a price is cheked, save the price range in global store and change it's checked state
  const onCheckPrices = ( checkedPrice : IPriceRange) =>  {
    const newData = filterPrice.map(price => price.id === checkedPrice.id ? {...price, checked :!checkedPrice.checked} : {...price, checked : false} );
    toggleFilterPrice(newData)
  }
  return (
    <div className="flex flex-col pt-10 space-y-4">
      <div
        className="flex flex-row space-x-2 items-center cursor-pointer"
        onClick={() => toggleDrawerFilter(false)}
      >
        <AiOutlineClose className="text-lg" />
        <p className="font-jost">Close</p>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-jost font-medium">Filter by Category</p>
        {
          // map category filters from global store to show it's checked status even when the sidebar is closed
          filterCategory.map((filter) => (
            <div key={Math.random()} className="flex flex-row space-x-2">
              <input checked={filter.checked} type="checkbox" onChange={(e) => onCheckCategory(e, filter.category)} />
              <label className="font-jost">{filter.category}</label>
            </div>
          ))}
      </div>
      <div className="space-y-2">
        <p className="font-jost font-medium">Filter by Price</p>
       
        {
          // map price filters from global store to show it's checked status even when the sidebar is closed
          filterPrice.map((price) => (
          <div key={Math.random()} className="flex flex-row space-x-2">
            <input type="checkbox" checked={price.checked} onChange={(e) => onCheckPrices(price)} />
            {price.upperBound !== Infinity ? (
              <label className="font-jost">
                {price.lowerBound} - {price.upperBound}
              </label>
            ) : (
              <label className="font-jost">Above {price.lowerBound}</label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
