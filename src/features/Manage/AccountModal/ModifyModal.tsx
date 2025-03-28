import { useState } from "react";
import CloseIcon from "../../../assets/CloseIcons.svg";
import { isValidAccountName, isValidPassword } from "../../../utils/validation";

interface ModifyModalProps {
  onClose: () => void;
}

const ModifyModal = ({ onClose }: ModifyModalProps) => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false); // 입력필드 하나라도 비어있으면 true
  const [accountNameError, setAccountNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    const isEmpty = !accountName.trim() || !password.trim();
    setEmptyFields(isEmpty);

    if (isEmpty) {
      setAccountNameError("");
      setPasswordError("");
      return;
    }

    let hasError = false;

    if (!isValidAccountName(accountName)) {
      setAccountNameError("공백 포함 최대 11자 이하로 입력해 주세요.");
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

    console.log("계좌 정보 변경 완료:", accountName, password);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 font-pre-regular text-main200"
        onClick={(e) => e.stopPropagation()} // 모달 본체 클릭 시, 이벤트 전파를 막아 닫히지 않도록 처리
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="w-[15px]"></div>
          <h2 className="text-20 font-pre-medium text-center">
            계좌 정보 변경
          </h2>
          <button
            onClick={onClose} // onClose prop 사용해 모달 닫기
          >
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
        </div>

        {/* 계좌명 입력 */}
        <div className="mb-4">
          <label className="block text-14 font-pre-regular ml-1 mb-1">
            계좌명
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-14"
            placeholder="경희대 응용수학과"
          />
          {accountNameError && (
            <p className="text-red-500 text-12 mt-1 ml-1">{accountNameError}</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4">
          <label className="block text-14 font-pre-regular ml-1 mb-1">
            입장 비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-14"
            placeholder="******"
          />
          {passwordError && (
            <p className="text-red-500 text-12 mt-1 ml-1">{passwordError}</p>
          )}
        </div>

        {/* 입력 필드가 비어있을 때 메시지 */}
        {emptyFields && (
          <p className="text-red-500 text-12 mt-1">모든 필드를 입력해주세요.</p>
        )}

        {/* 모달 버튼 */}
        <div className="mt-8 flex justify-between font-pre-medium">
          <button
            onClick={handleSubmit}
            className="w-1/2 px-4 py-2 text-white rounded-lg text-14"
            style={{
              background: "linear-gradient(180deg, #7953FF 0%, #4E00CB 100%)",
              borderRadius: "8px",
            }}
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 text-[#4E00CB] border border-[#4E00CB] rounded-lg hover:bg-gray-100 ml-2 text-14"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyModal;
