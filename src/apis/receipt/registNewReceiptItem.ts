import axiosClient from "../axiosClient";

export const registNewReceiptItem = async (receiptId: number, item: ReceiptReq) => {
  try {
    //  필수 파라미터 검증
    if (!receiptId || !item) {
        throw new Error('필수 파라미터가 누락되었습니다. (receiptId와 item은 필수값입니다.)');
    }

    console.log("새로 추가했슴다", item)
    const response = await axiosClient.post('/item/manager/create', {
        'receiptId': receiptId,
        'item': item
    });
    return response.data;
  } catch (error) {
    console.error("상세 품목 추가 에러:", error);
    throw new Error("상세품목을 등록하는 중 오류가 발생했습니다.");
  }
};
