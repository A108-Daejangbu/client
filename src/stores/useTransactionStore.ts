import { create } from "zustand";
import type { PassStatus, Transaction, TransactionReq } from "../types/Transaction";
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
  updatePassStatus: (transactionId: number, newStatus: PassStatus ) => void;

  // API 요청 메서드
  fetchTransactions: (params: TransactionReq) => Promise<Transaction[]>;
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
  updatePassStatus: (transactionId, newStatus) => {
    set((state) => ({
      transactions: state.transactions.map((tx) => 
      tx.id === transactionId ?
    {...tx, passStatus: newStatus} : tx)
    }))
  },

  // 거래내역 조회 API 요청 메서드
  fetchTransactions: async (params: TransactionReq) => {
    try {
      set({ isLoading: true, error: null });
      
      // 필수 파라미터 검증
      if (!params.accountId || !params.pageSize || params.pageNo == null || !params.startDate || !params.endDate) {
        throw new Error('필수 파라미터가 누락되었습니다. (accountId, pageSize, pageNo, startDate, endDate는 필수값입니다.)');
      }
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { searchOption, keyword, ...filteredParams } = params;
      set({ recentFilters: filteredParams });

      const response = await api.get<Transaction[]>('/transaction/auth', {
        params: {
          // 필수 파라미터
          accountId: params.accountId,
          pageSize: params.pageSize,
          pageNo: params.pageNo,
          startDate: params.startDate,
          endDate: params.endDate,
          
          // 선택적 파라미터
          orderType: params.orderType || 'DESC',
          ...(params.type && { type: params.type }),
          ...(params.min && { min: params.min }),
          ...(params.max && { max: params.max }),
          ...(params.keyword && { keyword: params.keyword }),
          ...(params.searchOption && { searchOption: params.searchOption }),
          ...(params.categoryIds && { categoryIds: params.categoryIds }),
          ...(params.searchOptionAsString && { searchOptionAsString: params.searchOptionAsString })
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          for (const key in params) {
            const value = params[key as keyof typeof params];
            if (Array.isArray(value)) {
              value.forEach((v) => {
                searchParams.append(key, String(v));
              });
            } else if (value !== undefined && value !== null) {
              searchParams.append(key, String(value));
            }
          }

          return searchParams.toString();
        }
      });

      const transactions = Array.isArray(response.data) ? response.data : [];
      
      set((state) => {
        // 첫 페이지이거나 accountId가 변경된 경우
        if (params.pageNo === 0) {
          return { transactions, error: null };
        }
        
        // 이전 거래내역이 없는 경우 새로운 거래내역만 설정
        if (!Array.isArray(state.transactions)) {
          return { transactions, error: null };
        }
        
        // 이전 거래내역과 새로운 거래내역 합치기
        return { 
          transactions: [...state.transactions, ...transactions],
          error: null
        };
      });
      
      return transactions;
    } catch (error) {
      console.error('거래내역 조회 실패:', error);
      set({ 
        error: error instanceof Error ? error.message : '거래내역 조회 중 오류가 발생했습니다.',
        transactions: [] // 에러 발생 시 빈 배열로 초기화
      });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));