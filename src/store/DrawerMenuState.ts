import { create } from 'zustand';

interface IDrawerMenu {
    isMenuOpen : boolean,
    toggleDrawerMenu: (newState : boolean) => void;
}
export const useDrawerMenu  = create<IDrawerMenu>()((set) => ({
    isMenuOpen: false,
    toggleDrawerMenu: (newState : boolean) => set((state) => ({ isMenuOpen: newState})),
}))

