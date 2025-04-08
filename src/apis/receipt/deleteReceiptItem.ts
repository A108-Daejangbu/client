import axiosClient from "../axiosClient";

export const deleteReceiptItem = async (itemId: number) => {
  try {
    //  필수 파라미터 검증
    if (itemId==null) {
        throw new Error('필수 파라미터가 누락되었습니다. (itemId는는 필수값입니다.)');
    }

    const response = await axiosClient.post(`/item/manager/delete?itemId=${itemId}`);
    return response.data;
  } catch (error) {
    console.error("영수증 항목 삭제 에러:", error);
    throw new Error("영수증 항목을 삭제하는 중 오류가 발생했습니다.");
  }
};
