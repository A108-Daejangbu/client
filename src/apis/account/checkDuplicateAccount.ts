import axiosClient from "../axiosClient";

interface CheckDuplicateAccountResponse {
  result: boolean;
  message: string;
}

export const checkDuplicateAccount = async (
  accountNo: string
): Promise<CheckDuplicateAccountResponse> => {
  try {
    const response = await axiosClient.post<CheckDuplicateAccountResponse>(
      "/account/manager/check-duplicate",
      { accountNo }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    // 모든 에러 케이스를 단일 메시지로 처리
    throw new Error("계좌번호 검증 중 오류가 발생했습니다.");
  }
};
