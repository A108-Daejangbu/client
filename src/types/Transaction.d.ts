// 거래내역 [5]
interface Transaction{
  id: number;                        // 거래내역 ID
  transactionDate: string;           // 거래날짜 (ex. '20250313)
  transactionTime: string;           // 거래시간 (ex. '20250313)
  transactionType: '1' | '2';        // 거래종류('1': 입금, '2':출금)
  transactionBalance: number;        // 거래 금액
  transactionAfterBalance: number;   // 잔액
  passStatus: 'N' | 'P' | 'W' | 'F'; // 'N': 미등록, 'P': 금액 일치, 'W': OCR 오류, 'F': 금액 불일치
  categoryId: number;                // 카테고리 ID
  categoryName: string;              // 카테고리명
  transactionSummary: string;        // 거래내역 입출금자명(상호명)
  detail: string;                    // 비고
}

// 거래내역 조회 request [5]
interface TransactionReq{
  id: number;                          // 계좌 ID
  pageSize: number;                                        
  pageNo: number;
  startDate: string|null;              // 조회 시작일(null 입력 시 전체 내역 조회)                                   
  endDate: string|null;                // 조회 종료일
  type: '1' | '2' | null;              // '1': 입금, '2': 출금, 'null': 입출금 전체체
  min?: number;                        // 최저 금액 
  max?: number;                        // 최고 금액
  searchoption?: 'ALL' | 'SUMMARY' | 'DETAIL' | 'AMOUNT'; // 검새 조건('ALL': 상호명+비고, 'SUMMARY': 상호명, 'DETAIL': 비고, 'AMOUNT': 금액)
  keyword?: string;                    // 검색 키워드
}

// 거래내역 detail 변경 request [27]
interface UpdateDetailReq{
  transactionUniqueNo: number;
  detail: number;
}

// 거래내역 카테고리 설정 시 request [28]
interface SetCategoryReq{
  transactionId: number;
  categoryId: number;
}

interface SelectOptions {
  period: string;
  type: string;
  order: string;
}

interface SelectDate {
  startPeriod:string; 
  endPeriod: string;
}