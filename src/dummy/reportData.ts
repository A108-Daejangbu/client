import { useTransactionStore } from "../stores/useTransactionStore";

// DataItem 타입 정의
export interface DataItem {
  id: number;                           // 거래내역 ID
  transactionDate: string;              // 거래 날짜 (YYYY-MM-DD)
  transactionTime: string;              // 거래 시간 (HH:mm:ss)
  transactionType: 'DEPOSIT' | 'WITHDRAW';     // 거래 유형
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
export const fieldMapping: Record<string, keyof DataItem> = {
  카테고리: "categoryName",
  날짜: "transactionDate",
  내용: "detail",
  입금: "transactionBalance",
  출금: "transactionBalance",
  잔액: "transactionAfterBalance",
  비고: "detail",
};

// 열 너비 매핑도 export
export const columnWidths = ["12%", "12%", "14%", "14%", "14%", "14%", "20%"];

// 카테고리 옵션을 initialData에서 추출하는 함수
const getCategoryOptions = () => {
  const uniqueCategories = Array.from(
    new Set(initialData.map((item) => item.categoryName))
  );

  return [
    { label: "전체" },
    ...uniqueCategories.map((category) => ({ label: category })),
    { label: "카테고리 열 삭제" },
  ];
};

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

// 드롭다운 데이터 구조 수정
export const dropdownSections: Record<string, DropdownSection[]> = {
  카테고리: [
    {
      title: "카테고리 설정",
      options: getCategoryOptions(),
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
        { label: '입금이 "-" 인 거래내역 숨기기' },
        { label: "입금 열 삭제" },
      ],
    },
  ],
  출금: [
    {
      title: "출금 설정",
      options: [
        { label: '출금이 "-" 인 거래내역 숨기기' },
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
};
