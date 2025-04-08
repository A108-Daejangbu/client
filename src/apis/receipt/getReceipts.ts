import axiosClient from "../axiosClient";

export const getReceipts = async (transactionId: string): Promise<TransactionDetail[]> => {
  try {
    //  필수 파라미터 검증
    if (!transactionId) {
        throw new Error('필수 파라미터가 누락되었습니다. (transactionId는 필수값입니다.)');
    }
    const response = await axiosClient.get<TransactionDetail[]>(`/receipt/common/get-all-items?transactionHistoryId=${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("영수증 등록 에러:", error);
    throw new Error("영수증을 등록하는 중 오류가 발생했습니다.");
  }
};
