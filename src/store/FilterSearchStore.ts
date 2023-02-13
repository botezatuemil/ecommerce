import { IPriceRange } from '@/interfaces';
import { create } from 'zustand';

interface IFilterSearchState {
    filterName : string,
    toggleFilterName: (newFilter : string) => void;
}
export const useFilterSearch = create<IFilterSearchState>()((set) => ({
    filterName: "",
    toggleFilterName: (newFilter :string) => set((state) => ({ filterName: newFilter })),
}))