// stores/useTransactionFilterStore.ts

import { create } from "zustand";
// import { TransactionReq, TransactionType, OrderType, SearchOption } from "../types/Transaction";
import { TransactionReq } from "../types/Transaction";
import { formatDateToString } from "../utils/date";

interface FilterState {
  filters: Partial<TransactionReq>;

  setFilters: (updates: Partial<TransactionReq>) => void;
  resetFilters: () => void;
  removeFilter: (key: keyof TransactionReq) => void;
  addCategoryId: (id:number) => void;
  removeCategoryId: (id:number) => void;
}

export const useTransactionFilterStore = create<FilterState>((set) => ({
  filters: {},
  setFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),
  resetFilters: () =>{
    const today = new Date();
    set({
      filters: {
        startDate: formatDateToString(today.getFullYear(), today.getMonth(), 1),
        endDate: formatDateToString(today.getFullYear(), today.getMonth()+1, 0),
        pageNo: 0,
        pageSize: 100,
      },
    })},
    removeFilter: (key: keyof TransactionReq) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [key]: _, ...rest } = state.filters;
          return { filters: rest };
        })
    },
    addCategoryId: (id: number) =>{
      console.log("카테고리 추가됨: ", id)
      set((state) => {
        const current = state.filters.categoryIds || [];
        if (current.includes(id)) return { filters: { ...state.filters } };
        return {
          filters: {
            ...state.filters,
            categoryIds: [...current, id],
          },
        };
      })
    },
    removeCategoryId: (id: number) =>{
      console.log("카테고리 삭제됨: ", id)
      set((state) => {
        const current = state.filters.categoryIds || [];
        const updated = current.filter((catId) => catId !== id);

        if (updated.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { categoryIds, ...rest } = state.filters;
          return { filters: rest };
        }
        return {
          filters: {
            ...state.filters,
            categoryIds: updated,
          },
        };
      })},
}));
