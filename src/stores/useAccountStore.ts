import { create } from "zustand";
import type { Account } from "../types/Account";

// zustand store에서 관리할 상태와 메서드 정의
interface AccountStore {
  accounts: Account[]; // 전체 계좌 목록
  selectedAccountId: number | null; // 선택된 계좌 ID (모달 등에서 사용)

  // 계좌 목록 초기화 (서버에서 응답받은 데이터 설정)
  setAccounts: (accounts: Account[]) => void;

  // 계좌 추가
  addAccount: (account: Account) => void;

  // 계좌 삭제
  removeAccount: (accountId: number) => void;

  // 계좌 정보 수정 (닉네임, 비밀번호 등)
  updateAccount: (updated: Partial<Account> & { accountId: number }) => void;

  // 수입/지출 발생 시 잔액(balance) 업데이트
  updateBalance: (accountId: number, amount: number) => void;

  // 선택된 계좌 ID 설정
  selectAccount: (accountId: number | null) => void;
}

// zustand 훅 생성: 상태와 메서드를 포함한 store 정의
export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [], // 초기 계좌 목록은 빈 배열로 설정
  selectedAccountId: null, // 처음에는 선택된 계좌 없음

  // 서버에서 받아온 계좌 목록 전체를 설정하는 함수
  setAccounts: (accounts) => set({ accounts }),

  // 새 계좌를 목록에 추가하는 함수
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),

  // 특정 계좌를 계좌 ID로 찾아 목록에서 제거하는 함수
  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.accountId !== accountId),
    })),

  // 특정 계좌의 정보를 수정하는 함수 (accountId 기준으로 병합)
  updateAccount: (updated) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.accountId === updated.accountId ? { ...acc, ...updated } : acc
      ),
    })),

  // 수입/지출 시 잔액(balance)을 증가/감소시키는 함수
  updateBalance: (accountId, amount) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.accountId === accountId
          ? { ...acc, balance: acc.balance + amount }
          : acc
      ),
    })),

  // 특정 계좌를 선택 상태로 설정하는 함수
  selectAccount: (accountId) => set({ selectedAccountId: accountId }),
}));
