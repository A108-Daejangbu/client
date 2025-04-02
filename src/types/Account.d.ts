// 계좌 등록 [4]
interface AccountResp {
  accountNickname: string; // 계좌 별명
  bankCode: number; // 은행 코드
  accountNo: string; // 계좌번호
  password?: string; // 계좌 비밀번호
}

// [41]
export interface Bank {
  bankCode: string; // 은행 코드
  bankName: string; // 은행 이름
}

// [49]
interface AccountUpdateReq {
  accountId: number;
  accountNickname: string;
  password: string;
}

interface BankInfo extends Bank {
  logo: string;
  color1: string;
  color2: string;
}

export interface Account {
  accountId: number;
  accountNickname: string; //계좌명
  bankCode: string; // 은행 코드
  accountNo: string; // 계좌 번호
  password: string; // 계좌 비밀번호
  balance: number; // 계좌 잔액
  unCompletedReceipts: number; // 미완료 영수증 개수
}
