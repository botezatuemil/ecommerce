import { ICart, ICategory, IProduct } from "@/interfaces";

export const isProductArray = (object: unknown): object is IProduct[] => {
  if (object !== null && typeof object === "object") {
    return true;
  }
  return false;
};

export const isProduct = (object: unknown): object is IProduct => {
  if (object !== null && typeof object === "object") {
    return true;
  }
  return false;
};

export const isCategoryArray = (object :unknown) : object is string[] => {
  return Array.isArray(object) && object.every(o => typeof o === "string");
}

export const isCartArray = (arg: any): arg is ICart[] => {
  return Array.isArray(arg) && arg.every((item) => item.hasOwnProperty('quantity') && item.hasOwnProperty('product'));
}



