import axiosClient from "../axiosClient";

export const updateReceiptItem = async (item: ReceiptItem) => {
  try {
    //  필수 파라미터 검증
    if (!item) {
        throw new Error('필수 파라미터가 누락되었습니다.');
    }

    const response = await axiosClient.post('/item/manager/update', {
        'itemId': item.itemId,
        'name': item.name,
        'amount' : item.totalAmount,
        'count': item.count
    });
    return response.data;
  } catch (error) {
    console.error("영수증 항목 수정 에러:", error);
    throw new Error("영수증 항목을 수정하는 중 오류가 발생했습니다.");
  }
};
