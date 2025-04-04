import axiosClient from "../axiosClient";

interface RequestCodeResponse {
  message: string;
}

export const requestAccountCode = async (
  accountNo: string
): Promise<RequestCodeResponse> => {
  try {
    const response = await axiosClient.post<RequestCodeResponse>(
      `/account/manager/request-code?accountNo=${accountNo}`,
      null
    );
    return response.data;
  } catch (error: unknown) {
    void error;
    throw new Error("계좌번호 1원인증 요청 중 오류가 발생했습니다.");
  }
};
