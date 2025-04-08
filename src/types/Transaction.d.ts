// 거래 유형
export type TransactionType = "DEPOSIT" | "WITHDRAWAL";

// 거래내역 검색 옵션
export type SearchOption = "ALL" | "SUMMARY" | "DETAIL" | "AMOUNT";

// 거래내역 정렬 타입
export type OrderType = "ASC" | "DESC";

// 거래 승인 상태
export type PassStatus = "NONE" | "PASS" | "WARNING" | "FAIL";

// 거래내역 조회 요청 인터페이스
export interface TransactionReq {
  // 필수 파라미터
  accountId: number; // 계좌 ID
  pageSize: number; // 페이지당 항목 수
  pageNo: number; // 페이지 번호
  startDate: string; // 조회 시작일
  endDate: string; // 조회 종료일

  // 선택적 파라미터
  type?: TransactionType; // 거래 유형(입금/출금)
  min?: number; // 최소 금액
  max?: number; // 최대 금액
  keyword?: string; // 검색 키워드
  searchOption?: SearchOption; // 검색 옵션
  categoryIds?: number[]; // 카테고리 ID
  orderType?: OrderType; // 정렬 방식
  searchOptionAsString?: string; // 검색 옵션 문자열
}

// 거래내역 인터페이스
export interface Transaction {
  id: number; // 거래내역 ID
  transactionDate: string; // 거래 날짜 (YYYY-MM-DD)
  transactionTime: string; // 거래 시간 (HH:mm:ss)
  transactionType: TransactionType; // 거래 유형
  transactionBalance: number; // 거래 금액
  transactionAfterBalance: number; // 거래 후 잔액
  passStatus: PassStatus; // 승인 상태
  categoryId: number; // 카테고리 ID
  categoryName: string; // 카테고리명
  transactionSummary: string; // 거래처명
  detail: string; // 거래 상세 내용
}

// 거래내역 detail 변경 request [27]
interface UpdateDetailReq {
  transactionUniqueNo: number;
  detail: number;
}

// 거래내역 카테고리 설정 시 request [28]
interface SetCategoryReq {
  transactionId: number;
  categoryId: number;
}

interface SelectOptions {
  period: string;
  type: string;
  order: string;
}

interface SelectDate {
  startPeriod: string;
  endPeriod: string;
}
