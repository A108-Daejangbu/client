import axiosClient from "../axiosClient";

interface DeleteAccountRequest {
  accountId: number;
}

export const deleteAccount = async (
  payload: DeleteAccountRequest
): Promise<void> => {
  await axiosClient.post(
    `/account/manager/delete?accountId=${payload.accountId}`
  );
};
