// DataItem 타입 정의
export interface DataItem {
  id: number;
  category: string;
  date: string;
  content: string;
  deposit: string;
  withdraw: string;
  balance: string;
  note: string;
}

// 더미데이터 export
export const initialData: DataItem[] = [
  {
    id: 1,
    category: 'MT',
    date: '2025.03.13',
    content: 'MT 간식',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: '여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.여기는 영수증 비고 내용이 들어갈 곳입니다.'
  },
  {
    id: 2,
    category: 'MT',
    date: '2025.03.13',
    content: 'MT 숙소',
    deposit: '800,000,000',
    withdraw: '-',
    balance: '3,057,300',
    note: ''
  },
  {
    id: 3,
    category: 'MT',
    date: '2025.03.13',
    content: 'MT 준비물품',
    deposit: '-',
    withdraw: '120,000',
    balance: '2,937,300',
    note: ''
  },
  {
    id: 4,
    category: '개강총회',
    date: '2025.03.13',
    content: 'MT 준비물품',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  },
  {
    id: 5,
    category: '개강총회',
    date: '2025.03.13',
    content: 'MT 준비물품',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  },
  {
    id: 6,
    category: '축제',
    date: '2025.03.13',
    content: 'MT 간식',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  },
  {
    id: 7,
    category: '축제',
    date: '2025.03.13',
    content: 'MT 간식',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  },
  {
    id: 8,
    category: '축제',
    date: '2025.03.13',
    content: 'MT 간식',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  },
  {
    id: 9,
    category: '축제',
    date: '2025.03.13',
    content: 'MT 간식',
    deposit: '-',
    withdraw: '156,000',
    balance: '3,857,300',
    note: ''
  }
];

// 초기 컬럼 이름도 함께 export
export const initialColumns = ['카테고리', '날짜', '내용', '입금', '출금', '잔액', '비고'];

// 필드 매핑 객체도 export
export const fieldMapping: Record<string, keyof DataItem> = {
  '카테고리': 'category',
  '날짜': 'date',
  '내용': 'content',
  '입금': 'deposit',
  '출금': 'withdraw',
  '잔액': 'balance',
  '비고': 'note'
};

// 열 너비 매핑도 export
export const columnWidths = ['12%', '12%', '14%', '14%', '14%', '14%', '20%'];
