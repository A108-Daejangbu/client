
// 영수증[38]
interface Receipt{
  receiptId: number;         // 영수증 ID
  imageUrl?: string;         // 영수증 Url
  items: ReceiptItem[]; // 상세 품목, null: 상세 품목 삭제
  totalAmount?: number;       // 해당 영수증의 총액
  passStatus?: 'N' | 'P';
}

// 영수증 상세품목 수정 시 request[25]
interface ReceiptReq{
  name: string;
  amount: number;
  count: number;
}

// 상세 품목 [38, 25]
interface ReceiptItem{
  itemId: number;
  name: string;           // 상세품목 명
  totalAmount: number;   // 총 금액
  count: number;          // 수량
}

// 상세 거래내역(=영수증들)[38]
// interface TransactionDetail{
//   transactionDate: string;
//   transactionUniqueNo: number;
//   receipts: Receipt[];           // 영수증 상세 품목
//   detail: string;                // 비고
//   total: string;                 // 총 가격
// }

interface TransactionDetail{
  receiptId: number;
  receiptUrl: string;
  items: ReceiptItem[];
}

// 영수증 등록 시 response [6]
interface ReceiptResp{
  imageId: number;        // 영수증 사진 id
  imageUrl: string;       // 영수증 사진 url
  items: ReceiptItem[];   // 영수증 상세품목 
  totalAmoount: number    // 영수증 총 금액
}