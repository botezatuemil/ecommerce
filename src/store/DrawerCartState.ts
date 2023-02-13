import { create } from 'zustand';

interface IDrawerCart {
    isCartOpen : boolean,
    toggleDrawerCart: (newState : boolean) => void;
}
export const useDrawerCart  = create<IDrawerCart>()((set) => ({
    isCartOpen: false,
    toggleDrawerCart: (newState : boolean) => set((state) => ({ isCartOpen: newState })),
}))
