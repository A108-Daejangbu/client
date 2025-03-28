import React, { useState } from "react";
import { bankData } from "../../constants/bankData";

const RegistrationForm = () => {
  const [accountName, setAccountName] = useState(""); // 계좌명 상태
  const [accountNumber, setAccountNumber] = useState(""); // 계좌번호 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태
  const [password, setPassword] = useState(""); // 입장 비밀번호 상태
  const [selectedBankName, setSelectedBankName] = useState(""); // 선택된 은행명

  // 선택된 은행명에 따른 은행코드 추출, 이 은행코드로 API요청하기
  // const selectedBankCode = bankData.find(
  //   (bank) => bank.bankName === selectedBankName
  // )?.bankCode;

  // 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 후 페이지 리로드 방지
    console.log("폼이 제출되었습니다.");
  };

  // const inputClassName =
  //   "block w-full px-2 py-2 border border-gray-300 rounded-lg font-pre-regular text-12";
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
          <input
            type="text"
            className={inputClassName}
            placeholder="계좌명"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
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
          <input
            type="text"
            className={inputClassName}
            placeholder="‘-’없이 숫자만 입력해 주세요."
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-2 py-1.5 text-12">
            확인
          </button>
        </div>
        {/* 인증번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">인증번호</label>
          <input
            type="text"
            className={inputClassName}
            placeholder="계좌에 이체된 1원인증코드를 입력해 주세요."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-2 py-1.5 text-12">
            중복
          </button>
        </div>
        {/* 입장 비밀번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">입장코드</label>
          <input
            type="password"
            className={inputClassName}
            placeholder="4자리 이상의 숫자, 영문 대소문자로 입력해야 합니다."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
