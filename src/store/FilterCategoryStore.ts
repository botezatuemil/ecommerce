import { IFilterCategory } from '@/interfaces';
import { create } from 'zustand';

interface ICategoryFilterState {
    filterCategory : IFilterCategory[],
    toggleCategoryFilter: (newFilter : IFilterCategory[]) => void;
}
export const useCategoryFilter  = create<ICategoryFilterState>()((set) => ({
    filterCategory: [],
    toggleCategoryFilter: (newFilter : IFilterCategory[]) => set((state) => ({ filterCategory: newFilter })),
}))//