import axiosClient from "../axiosClient";

export const changeDetail = async (transactionId: string, detail: string) => {
  try {
    //  필수 파라미터 검증
    if (!transactionId || !detail) {
        throw new Error('필수 파라미터가 누락되었습니다. (transactionId와 detail은은 필수값입니다.)');
    }

    
    const response = await axiosClient.post('/transaction/manager/update-detail', {
        'transactionId': transactionId,
        'detail': detail
    });
    return response.data;
  } catch (error) {
    console.error("비고 변경/등록 에러:", error);
    throw new Error("비고를 변경/등록하는 중 오류가 발생했습니다.");
  }
};
