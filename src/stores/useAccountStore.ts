import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Account } from "../types/Account";

interface AccountStore {
  accounts: Account[]; // 계좌 목록저장하는 배열
  selectedAccountId: number | null; // 선택된 계좌 ID저장 (모달 등에서 사용)

  // 서버에서 받아온 전체 계좌 목록으로 store의 accounts 상태를 초기화
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

// persist적용하여 store의 상태 변경이 localStorage("account-storage"라는 키 사용)에 자동으로 동기화
export const useAccountStore = create<AccountStore>()(
  persist(
    // 초기 상태와 상태 변경 함수를 정의하는 콜백 함수
    (set) => ({
      accounts: [], //초기계좌목록은 빈 배열
      selectedAccountId: null,
      // setAccounts 함수: 서버로부터 받은 계좌 배열을 상태에 저장
      setAccounts: (accounts) => set({ accounts }),
      // addAccount 함수: 현재 상태의 계좌 배열에 새로운 계좌를 추가
      addAccount: (account) =>
        set((state) => ({ accounts: [...state.accounts, account] })),
      // removeAccount 함수: accountId가 일치하는 계좌를 제거
      removeAccount: (accountId) =>
        set((state) => ({
          accounts: state.accounts.filter((acc) => acc.accountId !== accountId),
        })),
      // updateAccount 함수: accountId가 일치하는 계좌의 정보를 업데이트
      updateAccount: (updated) =>
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.accountId === updated.accountId ? { ...acc, ...updated } : acc
          ),
        })),
      // updateBalance 함수: accountId에 해당하는 계좌의 balance 값을 amount만큼 변경
      updateBalance: (accountId, amount) =>
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.accountId === accountId
              ? { ...acc, balance: acc.balance + amount }
              : acc
          ),
        })),
      selectAccount: (accountId) => set({ selectedAccountId: accountId }), // selectAccount 함수: 현재 선택된 계좌의 ID를 업데이트
    }),
    {
      name: "account-storage", // localStorage에 저장될 key 이름
    }
  )
);
