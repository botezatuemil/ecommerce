import { IPriceRange } from '@/interfaces';
import { create } from 'zustand';

interface IFilterState {
    filterPrice : IPriceRange[],
    toggleFilterPrice: (newFilter : IPriceRange[]) => void;
}
export const useFilterPrice = create<IFilterState>()((set) => ({
    filterPrice: [],
    toggleFilterPrice: (newFilter : IPriceRange[]) => set((state) => ({ filterPrice: newFilter })),
}))