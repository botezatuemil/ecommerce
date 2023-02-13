import { ICart, IProduct } from "@/interfaces";
import { create } from "zustand";

interface ICartState {
  items: ICart[];
  addToCart: (cartItem : ICart) => void;
  removeFromCart: (cartItem : ICart) => void;
  getTotalSum : () => number;
}

export const useCartStore = create<ICartState>()((set, get) => ({
  items: [],

  // add a new item to cart if it's not found
  // if it's found just add the quantity at the found cart that is specified as parameter
  addToCart: (cartItem : ICart) =>  {
    const cartItems = get().items;
    let found = cartItems.some((cart) => cart.product.id === cartItem.product.id);
      if (found) {
        set({items: [...cartItems.map(cart => 
          cart.product.id === cartItem.product.id ? {...cart, quantity: cart.quantity + cartItem.quantity} : cart
        )]});
      } else {
        set({items: [...cartItems, cartItem]});
      }
  },

  // remove the product from cart if the current quantity is 1
  // update the quantity by decreasing the quantity of found items with the one specified from parameter
  removeFromCart: (cartItem : ICart) =>  {
    const cartItems = get().items;
    if (cartItem.quantity === 1) {
      set({items: [...cartItems.filter(cart => cart.product.id !== cartItem.product.id)]})
    } else {
      set({items: [...cartItems.map(cart => cart.product.id === cartItem.product.id ? {...cart, quantity: cart.quantity - 1} : cart)]})
    }
  },

  // calculates the total sum of cart items for displaying the final price
  getTotalSum : () => {
    const cartItems = get().items;
    let totalSum = 0;

    cartItems.map(cart => {
      const res =  (parseFloat(cart.product.price) * cart.quantity).toFixed(2)
      totalSum += Number(res);
    })
    return totalSum;
  }
}));

