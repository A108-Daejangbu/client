import axiosClient from "../axiosClient";

export const deleteReceipt = async (receiptId: number) => {
  try {
    //  필수 파라미터 검증
    if (!receiptId) {
        throw new Error('필수 파라미터가 누락되었습니다. (receiptId는 필수값입니다.)');
    }
    
    const response = await axiosClient.post(`/receipt/manager/delete?receiptId=${receiptId}`);
    return response.data;
  } catch (error) {
    console.error("영수증 삭제 에러:", error);
    throw new Error("영수증을 삭제하는 중 오류가 발생했습니다.");
  }
};
