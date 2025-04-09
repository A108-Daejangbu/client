import { ViewerAccount } from "../../types/Account";
import axiosClient from "../axiosClient";

export const getViewerAccountInfo = async (
  accountId: string
): Promise<ViewerAccount> => {
  try {
    const response = await axiosClient.get<ViewerAccount>(
      `/account/common/get-account-info?accountId=${accountId}`,
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    void error; // error 변수 사용해 ESLint 경고 해소
    // 모든 에러 케이스를 단일 메시지로 처리
    throw new Error("계좌정보 조회 중 오류가 발생했습니다.");
  }
};
