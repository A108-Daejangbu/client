import axios, { AxiosResponse } from "axios";

interface CheckDuplicateAccountResponse {
  result: boolean;
  message: string;
}

export const checkDuplicateAccount = async (
  accountNo: string
): Promise<CheckDuplicateAccountResponse> => {
  try {
    const response: AxiosResponse<CheckDuplicateAccountResponse> =
      await axios.post("/api/account/manager/check-duplicate", { accountNo });
    return response.data;
  } catch (error) {
    // axios의 에러인지 확인
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as CheckDuplicateAccountResponse;
    }
    throw error;
  }
};
