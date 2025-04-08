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
        pageSize: 30,
      },
    })},
    removeFilter: (key: keyof TransactionReq) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [key]: _, ...rest } = state.filters;
          return { filters: rest };
        })
    },
}));
