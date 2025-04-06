import axiosClient from "../axiosClient"; // axiosClient 설정

interface VerifyAuthCodeResponse {
  message: string;
}

export const verifyAuthCode = async (
  accountNo: string,
  authCode: string
): Promise<VerifyAuthCodeResponse> => {
  try {
    // 쿼리 파라미터로 accountNo와 authCode를 전달
    const response = await axiosClient.post<VerifyAuthCodeResponse>(
      `/account/manager/verify-code?accountNo=${accountNo}&authCode=${authCode}`,
      null
    );
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("인증번호 검증 중 오류가 발생했습니다.");
  }
};
