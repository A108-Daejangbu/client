import React, { useState } from "react";
import { bankData } from "../../constants/bankData";
import { isValidAccountName, isValidPassword } from "../../utils/validation";
import { checkDuplicateAccount } from "../../apis/account/checkDuplicateAccount";

const RegistrationForm = () => {
  const [accountName, setAccountName] = useState(""); // 계좌명 상태
  const [accountNumber, setAccountNumber] = useState(""); // 계좌번호 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태
  const [password, setPassword] = useState(""); // 입장 비밀번호 상태
  const [selectedBankName, setSelectedBankName] = useState(""); // 선택된 은행명

  const [accountNameError, setAccountNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [accountNumberMessage, setAccountNumberMessage] = useState("");
  // 계좌번호 검증 결과 메시지 상태

  // 선택된 은행명에 따른 은행코드 추출, 이 은행코드로 API요청하기
  // const selectedBankCode = bankData.find(
  //   (bank) => bank.bankName === selectedBankName
  // )?.bankCode;

  // 계좌번호 숫자만 입력되었는지 검사하는 함수
  const isNumeric = (value: string) => /^\d+$/.test(value);

  // 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!isValidAccountName(accountName)) {
      setAccountNameError("공백 포함 11자 이하로 입력해 주세요.");
      hasError = true;
    } else {
      setAccountNameError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError("영문 대문자와 숫자 조합, 4~8자로 입력해 주세요.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    console.log("폼이 제출되었습니다.");
  };

  // 계좌번호 중복 체크 API 호출 함수
  const handleCheckAccountNumber = async () => {
    // 입력된 계좌번호가 숫자로만 구성되었는지 확인
    if (!isNumeric(accountNumber)) {
      setAccountNumberError("숫자만 입력해 주세요.");
      return; // 숫자가 아니라면 API 호출하지 않고 반환
    } else {
      setAccountNumberError(""); // 정상 입력이면 에러 메시지 초기화
    }
    try {
      const response = await checkDuplicateAccount(accountNumber);
      setAccountNumberMessage(response.message); // 성공 메시지 표시
    } catch {
      setAccountNumberMessage("계좌번호 검증 중 오류가 발생했습니다."); // 모든 에러에 동일 메시지
    }
  };

  const inputClassName =
    "block w-full min-w-0 px-2 py-1.5 border border-gray-300 rounded-lg font-pre-regular text-12 placeholder:text-gray-400 truncate";

  return (
    <div className="w-full sm:max-w-md lg:max-w-md text-sm font-pre-medium text-main200 whitespace-nowrap">
      <h2 className="text-16 font-pre-medium text-left mb-[15px]">계좌 등록</h2>
      <div className="mb-[40px] border-b"></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 계좌명 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">계좌명</label>
          <div className="relative w-full">
            <input
              type="text"
              className={inputClassName}
              placeholder="공백 포함 최대 11자 이하"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
            {accountNameError && (
              <p className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                {accountNameError}
              </p>
            )}
          </div>
          <button className="px-2 py-2 invisible">확인</button>
        </div>
        {/* 은행 선택 필드 */}
        <div className="flex items-center gap-4 w-full">
          <label className="w-1/4">은행선택</label>
          <select
            className="block w-full max-w-full px-2 py-2 border border-gray-300 rounded-lg bg-white font-pre-regular text-12"
            value={selectedBankName}
            onChange={(e) => setSelectedBankName(e.target.value)}
            required
          >
            <option value="">--------선택해 주세요--------</option>
            {bankData.map((bank) => (
              <option key={bank.bankCode} value={bank.bankName}>
                {bank.bankName}
              </option>
            ))}
          </select>
          <button className="px-2 py-1.5 invisible">확인</button>
        </div>
        {/* 계좌번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">계좌번호</label>
          <div className="relative w-full">
            <input
              type="text"
              className={inputClassName}
              placeholder="‘-’없이 숫자만 입력"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
            {/* 계좌번호 유효성 에러 메시지 */}
            {accountNumberError && (
              <p className="absolute left-0 text-[10px] ml-1 text-red-500">
                {accountNumberError}
              </p>
            )}
            {/* 계좌번호 중복 체크 결과 메시지 */}
            {accountNumberMessage && (
              <p className="absolute left-0 text-[10px] ml-1">
                {accountNumberMessage}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCheckAccountNumber}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-12"
          >
            인증
          </button>
        </div>

        {/* 인증번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">인증번호</label>
          <input
            type="text"
            className={inputClassName}
            placeholder="계좌로 전송된 인증번호 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-2 py-1.5 text-12">
            확인
          </button>
        </div>
        {/* 입장 코드 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">입장코드</label>
          <div className="relative w-full">
            <input
              type="password"
              className={inputClassName}
              placeholder="영문 대문자+숫자, 4자 이상 8자 이하"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <p className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                {passwordError}
              </p>
            )}
          </div>
          <button className="px-2 py-2 invisible">확인</button>
        </div>

        {/* 제출 버튼 */}
        <div className="flex items-center">
          {/* <label className="w-1/4 invisible"></label> */}
          <button
            type="submit"
            className="w-full py-1.5 mt-12 rounded-[6.013px] bg-gradient-to-r from-[#7953FF] to-[#4E00CB] shadow-[0px_6.013px_6.239px_0px_rgba(74,58,255,0.28)] text-white text-base tracking-widest"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
