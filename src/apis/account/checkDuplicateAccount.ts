import axios, { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
// 전역에서 정의한 axios 인스턴스(axiosClient)를 불러와서 사용
// 기존에 axios.post를 호출하던 부분을 axiosClient.post로 변경하여, 모든 요청에 대해 공통 설정(baseURL, withCredentials 등)을 적용

interface CheckDuplicateAccountResponse {
  result: boolean;
  message: string;
}

export const checkDuplicateAccount = async (
  accountNo: string
): Promise<CheckDuplicateAccountResponse> => {
  try {
    // 전역 axios 인스턴스를 사용하여 API 호출
    // baseURL이 이미 axiosClient에 설정되어 있으므로,
    // 여기서는 엔드포인트 경로만 지정.
    const response: AxiosResponse<CheckDuplicateAccountResponse> =
      await axiosClient.post("/account/manager/check-duplicate", { accountNo });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as CheckDuplicateAccountResponse;
    }
    throw error;
  }
};
