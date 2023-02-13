import { create } from 'zustand';

interface IDrawerFilter {
    isFilterOpen : boolean,
    toggleDrawerFilter: (newState : boolean) => void;
}
export const useDrawerFilter  = create<IDrawerFilter>()((set) => ({
    isFilterOpen: false,
    toggleDrawerFilter: (newState : boolean) => set(() => ({ isFilterOpen: newState})),
}))
