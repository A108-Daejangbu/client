import axiosClient from "../axiosClient";

export const createReceipt = async (transactionId: string, imageFile: File): Promise<Receipt> => {
  try {
    //  필수 파라미터 검증
    if (!transactionId || !imageFile) {
        throw new Error('필수 파라미터가 누락되었습니다. (transactionId와 receipt 이미지는 필수값입니다.)');
    }

    const formData = new FormData();

    formData.append('transactionHistoryId', transactionId)
    formData.append("image", imageFile)
    
    const response = await axiosClient.post<Receipt>('/receipt/manager/create', formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
  } catch (error) {
    console.error("영수증 등록 에러:", error);
    throw new Error("영수증을 등록하는 중 오류가 발생했습니다.");
  }
};
