import { useTransactionStore } from "../stores/useTransactionStore";

// DataItem 타입 정의
export interface DataItem {
  id: number;                           // 거래내역 ID
  transactionDate: string;              // 거래 날짜 (YYYY-MM-DD)
  transactionTime: string;              // 거래 시간 (HH:mm:ss)
  transactionType: 'DEPOSIT' | 'WITHDRAWAL';     // 거래 유형
  transactionBalance: number;           // 거래 금액
  transactionAfterBalance: number;      // 거래 후 잔액
  passStatus: 'NONE' | 'PASS' | 'WARNING' | 'FAIL';               // 승인 상태
  categoryId: number;                   // 카테고리 ID
  categoryName: string;                 // 카테고리명
  transactionSummary: string;           // 거래처명
  detail: string;                       // 거래 상세 내용
}

// useTransactionStore에서 데이터 가져오기
export const initialData: DataItem[] = useTransactionStore.getState().transactions;

// 초기 컬럼 이름도 함께 export
export const initialColumns = [
  "카테고리",
  "날짜",
  "내용",
  "입금",
  "출금",
  "잔액",
  "비고",
];

// 필드 매핑 객체도 export
export const fieldMapping: Record<string, keyof DataItem | ((item: DataItem) => string | number)> = {
  카테고리: "categoryName",
  날짜: "transactionDate",
  내용: "transactionSummary",
  입금: (item: DataItem) => item.transactionType === 'DEPOSIT' ? item.transactionBalance : 0,
  출금: (item: DataItem) => item.transactionType === 'WITHDRAWAL' ? item.transactionBalance : 0,
  잔액: "transactionAfterBalance",
  비고: "detail",
};

// 열 너비 매핑도 export
export const columnWidths = ["12%", "12%", "14%", "14%", "14%", "14%", "20%"];

// getCategoryOptions 함수를 export하고 매개변수를 받도록 수정
export const getCategoryOptions = (transactions: DataItem[]) => {
  const uniqueCategories = Array.from(
    new Set(transactions.map((item) => item.categoryName))
  );

  return [
    { label: "전체" },
    ...uniqueCategories.map((category) => ({ label: category })),
    { label: "카테고리 열 삭제" },
  ];
};

// getDropdownSections 함수로 변경하여 동적으로 생성
export const getDropdownSections = (transactions: DataItem[]): Record<string, DropdownSection[]> => ({
  카테고리: [
    {
      title: "카테고리 설정",
      options: getCategoryOptions(transactions),
    },
  ],
  날짜: [
    {
      title: "날짜 설정",
      options: [{ label: "날짜 열 삭제" }],
    },
  ],
  내용: [
    {
      title: "내용 설정",
      options: [{ label: "내용 열 삭제" }],
    },
  ],
  입금: [
    {
      title: "입금 설정",
      options: [
        { label: '입금이 "0" 인 거래내역 숨기기' },
        { label: "입금 열 삭제" },
      ],
    },
  ],
  출금: [
    {
      title: "출금 설정",
      options: [
        { label: '출금이 "0" 인 거래내역 숨기기' },
        { label: "출금 열 삭제" },
      ],
    },
  ],
  잔액: [
    {
      title: "잔액 설정",
      options: [{ label: "잔액 열 삭제" }],
    },
  ],
  비고: [
    {
      title: "비고 설정",
      options: [{ label: "비고 열 삭제" }],
    },
  ],
});

// 드롭다운 옵션 타입 정의
export interface DropdownOption {
  label: string;
  color?: string; // 태그 색상
  isSelected?: boolean;
}

// 드롭다운 섹션 타입 정의
export interface DropdownSection {
  title: string;
  options: DropdownOption[];
}
