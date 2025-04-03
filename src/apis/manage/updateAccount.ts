import axiosClient from "../axiosClient";
import type { Account } from "../../types/Account";

interface UpdateAccountRequest {
  accountId: number;
  accountNickname: string;
  password: string;
}

export const updateAccount = async (
  payload: UpdateAccountRequest
): Promise<Account> => {
  const response = await axiosClient.post<Account>(
    "/account/manager/update",
    payload
  );
  return response.data;
};
