import { create } from "zustand";

// zustand store에서 관리할 상태와 메서드 정의
interface ReceiptStore {
  receipts: Receipt[]; // 전체 영수증 목록
  selectedTransactionId: string | null; // 선택된 계좌 ID
  receiptsIdx: number;
  isUploadSlide: boolean;

  setSelectedTransactionId: (transactionId: string) => void;
  setReceipt: (receipts: Receipt[]) => void;
  setReceiptsIdx: (idx:number) => void;
  setIsUploadSlide: (val:boolean) => void;
}

// zustand 훅 생성: 상태와 메서드를 포함한 store 정의
export const useReceiptStore = create<ReceiptStore>((set) => ({
    receipts: [], // 초기 계좌 목록은 빈 배열로 설정
    selectedTransactionId: null, // 처음에는 선택된 계좌 없음
    receiptsIdx: 0,
    isUploadSlide: true,

    setSelectedTransactionId : (transactionId) => {
        set({selectedTransactionId: transactionId})
    }, 
    setReceipt: (receipts) => {
        set({receipts: receipts})
    },
    setReceiptsIdx: (idx: number) => {
        set({ receiptsIdx: idx });
    },
    setIsUploadSlide: (val) => {
        set({isUploadSlide: val})
    }

}));
