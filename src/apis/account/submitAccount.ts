import axiosClient from "../axiosClient"; // axiosClient 설정

interface SubmitAccountRequest {
  accountNickname: string;
  bankCode: string;
  accountNo: string;
  password: string;
}

interface SubmitAccountResponse {
  accountNickname: string;
  bankCode: string;
  accountNo: string;
  accountId: number;
}

export const submitAccount = async (
  data: SubmitAccountRequest
): Promise<SubmitAccountResponse> => {
  try {
    const response = await axiosClient.post<SubmitAccountResponse>(
      "/account/manager/create", // 서버의 API 경로
      data // 본문에 데이터 전송
    );
    return response.data;
  } catch (error: unknown) {
    console.error("API 호출 실패:", error);
    throw new Error("계좌 등록 중 오류가 발생했습니다.");
  }
};
