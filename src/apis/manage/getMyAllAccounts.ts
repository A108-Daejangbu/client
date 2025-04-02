import axiosClient from "../axiosClient";
import { Account } from "../../types/Account";

export const getMyAllAccounts = async (): Promise<Account[]> => {
  try {
    const response = await axiosClient.get<Account[]>(
      "/account/manager/get-my-all"
    );
    return response.data;
  } catch (error) {
    console.error("계좌 정보 조회 에러:", error);
    throw new Error("계좌 정보를 가져오는 중 오류가 발생했습니다.");
  }
};
