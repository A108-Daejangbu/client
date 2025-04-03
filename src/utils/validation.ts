/**
 * 계좌명 유효성 검사
 * - 공백 포함 최대 11자 이하(등록폼에서 공란은 막아놓음)
 */
export const isValidAccountName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 11;
};

/**
 * 입장코드 유효성 검사
 * - 숫자 포함
 * - 4자 이상, 8자 이하
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^\d{4,8}$/;
  return regex.test(password);
};
