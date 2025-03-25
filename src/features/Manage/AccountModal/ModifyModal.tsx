import { useState } from "react";
import CloseIcon from "../../../assets/CloseIcons.svg";

interface ModifyModalProps {
  onClose: () => void;
}

const ModifyModal = ({ onClose }: ModifyModalProps) => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // 계좌 정보 변경 로직
    console.log("정보 변경 완료:", accountName, password);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96"
        onClick={(e) => e.stopPropagation()} // 모달 본체 클릭 시, 이벤트 전파를 막아 닫히지 않도록 처리
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6 w-full">
          <h2 className="text-lg font-semibold text-black flex-grow text-center">
            계좌 정보 변경
          </h2>
          <button
            onClick={onClose} // onClose prop을 사용해 모달 닫기
          >
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
        </div>

        {/* 계좌명 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            계좌명
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="계좌명을 입력하세요"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            입장 비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="입력할 비밀번호"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            입장 비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          {!passwordMatch && (
            <p className="text-red-500 text-xs mt-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        {/* 모달 버튼 */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSubmit}
            className="w-1/2 px-4 py-2 text-white rounded-lg"
            style={{
              background: "linear-gradient(180deg, #7953FF 0%, #4E00CB 100%)", // 버튼 배경
              borderRadius: "8px", // border-radius 설정
            }}
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 text-[#4E00CB] border border-[#4E00CB] rounded-lg hover:bg-gray-100 ml-2"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyModal;
