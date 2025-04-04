import React, { useState } from "react";
import { bankData } from "../../constants/bankData";
import { isValidAccountName, isValidPassword } from "../../utils/validation";
import { checkDuplicateAccount } from "../../apis/account/checkDuplicateAccount";
import { requestAccountCode } from "../../apis/account/requestAccountCode";
import { verifyAuthCode } from "../../apis/account/verifyAuthCode";
import { submitAccount } from "../../apis/account/submitAccount"; // API 함수 추가
import { useNavigate } from "react-router-dom";

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
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증번호 검증 결과 메시지
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태
  const navigate = useNavigate();

  // 계좌번호 숫자만 입력되었는지 검사하는 함수
  const isNumeric = (value: string) => /^\d+$/.test(value);

  // 폼 제출 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // 필수 항목 검증
    if (!isValidAccountName(accountName)) {
      setAccountNameError("공백 포함 25자 이하로 입력해 주세요.");
      hasError = true;
    } else {
      setAccountNameError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError("숫자 4~8자로 입력해 주세요.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!selectedBankName) {
      setAccountNumberError("은행을 선택해 주세요.");
      hasError = true;
    }

    if (!isVerified) {
      setVerificationMessage("인증을 완료해 주세요.");
      hasError = true;
    }

    if (hasError) return;

    // 인증 완료 후 계좌 등록 API 호출
    const data = {
      accountNickname: accountName,
      bankCode:
        bankData.find((bank) => bank.bankName === selectedBankName)?.bankCode ||
        "",
      accountNo: accountNumber,
      password,
    };

    try {
      const response = await submitAccount(data); // API 호출
      console.log("계좌 등록 성공:", response);

      // 계좌 등록 성공 시 /manage 페이지로 이동
      navigate("/manage");
    } catch (error) {
      console.error("계좌 등록 실패:", error);
    }
  };

  // 계좌번호 중복 체크 후 1원 요청 API 호출 함수
  const handleCheckAccountNumber = async () => {
    if (!isNumeric(accountNumber)) {
      setAccountNumberError("숫자만 입력해 주세요.");
      return;
    } else {
      setAccountNumberError("");
    }

    try {
      const duplicateResponse = await checkDuplicateAccount(accountNumber);
      if (duplicateResponse.result) {
        await requestAccountCode(accountNumber);
        setAccountNumberMessage("1원인증코드를 전송했습니다.");
      } else {
        setAccountNumberMessage(duplicateResponse.message);
      }
    } catch (error: unknown) {
      void error;
      setAccountNumberMessage("계좌번호 검증 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 검증 API 호출 함수
  const handleVerifyCode = async () => {
    if (!accountNumber) {
      setVerificationMessage("계좌번호를 먼저 입력하세요.");
      return;
    }
    if (!verificationCode) {
      setVerificationMessage("인증번호를 입력하세요.");
      return;
    }

    try {
      await verifyAuthCode(accountNumber, verificationCode);
      setVerificationMessage("인증이 완료되었습니다.");
      setIsVerified(true); // 인증 완료 상태 설정
    } catch (error) {
      console.error("API 호출 실패:", error);
      setVerificationMessage("인증번호 검증 중 오류가 발생했습니다.");
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
              placeholder="공백 포함 최대 25자 이하"
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
            {accountNumberError && (
              <p className="absolute left-0 text-[10px] ml-1 text-red-500">
                {accountNumberError}
              </p>
            )}
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

        {/* 인증번호 입력 및 검증 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">인증번호</label>
          <div className="relative w-full">
            <input
              type="text"
              className={inputClassName}
              placeholder="계좌로 전송된 인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            {verificationMessage && (
              <p className="absolute left-0 text-[10px] ml-1">
                {verificationMessage}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyCode}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-12"
            disabled={isVerified}
          >
            {isVerified ? "완료" : "확인"}
          </button>
        </div>

        {/* 입장 코드 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">입장코드</label>
          <div className="relative w-full">
            <input
              type="password"
              className={inputClassName}
              placeholder="숫자 4자 이상 8자 이하"
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
        </div>

        {/* 제출 버튼 */}
        <div className="flex items-center">
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
