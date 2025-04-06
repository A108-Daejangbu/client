import axiosClient from "../axiosClient";

export const getMyCategories = async (accountId: string): Promise<Category[]> => {
  try {
    //  필수 파라미터 검증
      if (!accountId) {
        throw new Error('필수 파라미터가 누락되었습니다. (accountId는 필수값입니다.)');
      }
    
    const response = await axiosClient.get<Category[]>('/account/common/get-all-categories', {
      params: {accountId: accountId}
    });
    return response.data;
  } catch (error) {
    console.error("계좌의 카테고리 조회 에러:", error);
    throw new Error("계좌 카테고리를 가져오는 중 오류가 발생했습니다.");
  }
};
