import { create } from "zustand";
import type { Transaction, TransactionReq } from "../types/Transaction";
import axiosClient from "../apis/axiosClient";

const api = axiosClient

interface TransactionStore {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  categories: Category[];
  score: Score | null;
  isLoading: boolean;
  error: string | null;
  recentFilters: TransactionReq | null;

  // 상태 관리 메서드
  setTransactions: (transactions: Transaction[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setScore: (score:Score) => void;

  // API 요청 메서드
  fetchTransactions: (params: TransactionReq) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  selectedTransaction: null,
  categories: [],
  score: null,
  isLoading: false,
  error: null,
  recentFilters: null,

  // 상태 업데이트 메서드
  setTransactions: (transactions) => set({ transactions }),
  setCategories: (categories) => set({categories}),
  setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setScore: (score) => set({score}),

  // 거래내역 조회 API 요청 메서드
  fetchTransactions: async (params: TransactionReq) => {
    try {
      set({ isLoading: true, error: null });
      
      // 필수 파라미터 검증
      if (!params.accountId || !params.pageSize || params.pageNo == null || !params.startDate || !params.endDate) {
        throw new Error('필수 파라미터가 누락되었습니다. (accountId, pageSize, pageNo, startDate, endDate는 필수값입니다.)');
      }

      set({recentFilters: params})

      const response = await api.get<Transaction[]>('/transaction/auth', {
        params: {
          // 필수 파라미터
          accountId: params.accountId,
          pageSize: params.pageSize,
          pageNo: params.pageNo,
          startDate: params.startDate,
          endDate: params.endDate,
          
          // 선택적 파라미터
          ...(params.type && { type: params.type }),
          ...(params.min && { min: params.min }),
          ...(params.max && { max: params.max }),
          ...(params.keyword && { keyword: params.keyword }),
          ...(params.searchOption && { searchOption: params.searchOption }),
          ...(params.categoryId && { categoryId: params.categoryId }),
          ...(params.orderType && { orderType: params.orderType }),
          ...(params.searchOptionAsString && { searchOptionAsString: params.searchOptionAsString })
        }
      });

      set({ transactions: response.data });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '거래내역 조회 중 오류가 발생했습니다.' 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  
}));