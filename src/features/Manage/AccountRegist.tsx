// RegistrationForm.tsx
import React, { useState } from "react";

// RegistrationForm 컴포넌트 정의
const RegistrationForm = () => {
  // 상태 변수 설정
  const [accountName, setAccountName] = useState(""); // 계좌명 상태
  const [bankSelection, setBankSelection] = useState(""); // 은행 선택 상태
  const [accountNumber, setAccountNumber] = useState(""); // 계좌번호 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태
  const [password, setPassword] = useState(""); // 입장 비밀번호 상태
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // 입장 비밀번호 확인 상태

  // 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 후 페이지 리로드 방지 (기본 동작 방지)
    // 여기에서 폼 제출 후 필요한 처리 로직을 추가할 수 있습니다.
    console.log("폼이 제출되었습니다.");
  };

  // 컴포넌트 렌더링
  return (
    <div className="w-full sm:max-w-lg lg:max-w-xl mx-auto text-sm font-pre-medium text-gray200 whitespace-nowrap">
      <h2 className="text-2xl font-pre-bold text-left mb-[20px]">계좌등록</h2>
      <div className="mb-[25px] border-b"></div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 계좌명 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">계좌명</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="2자 이상의 한글, 영문 대소문자만 가능합니다"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
          <button className="px-4 py-2 invisible">확인</button>
        </div>

        {/* 은행 선택 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">은행선택</label>
          <select
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={bankSelection}
            onChange={(e) => setBankSelection(e.target.value)}
            required
          >
            <option value="">--------선택해 주세요--------</option>
            <option value="bank1">은행 1</option>
            <option value="bank2">은행 2</option>
            <option value="bank3">은행 3</option>
          </select>
          <button className="px-4 py-2 invisible">확인</button>
        </div>

        {/* 계좌번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">계좌번호</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border border-gray-200 rounded-lg"
            placeholder="‘-’없이 숫자만 입력해 주세요."
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-4 py-2">
            확인
          </button>
        </div>

        {/* 인증번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">인증번호</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="해당 계좌에 이체된 1원인증코드를 입력해 주세요."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-4 py-2">
            중복
          </button>
        </div>

        {/* 입장 비밀번호 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">입장 비밀번호</label>
          <input
            type="password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="4자리 이상의 숫자, 영문 대소문자로 입력해야 합니다."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="px-4 py-2 invisible">확인</button>
        </div>

        {/* 입장 비밀번호 확인 입력 필드 */}
        <div className="flex items-center gap-4">
          <label className="w-1/4">비밀번호 확인</label>
          <input
            type="password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button className="border border-gray-200 rounded-lg px-4 py-2">
            확인
          </button>
        </div>

        {/* 제출 버튼 */}
        <div className="flex items-center">
          <label className="w-1/4 invisible"></label>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-[6.013px] bg-gradient-to-r from-[#7953FF] to-[#4E00CB] shadow-[0px_6.013px_6.239px_0px_rgba(74,58,255,0.28)] text-white"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
