import { useState } from "react";
import CloseIcon from "../../../assets/CloseIcons.svg";
import { isValidAccountName, isValidPassword } from "../../../utils/validation";
import { updateAccount as updateAccountAPI } from "../../../apis/manage/updateAccount";
import { useAccountStore } from "../../../stores/useAccountStore";
import type { Account } from "../../../types/Account";

interface ModifyModalProps {
  onClose: () => void;
  account: Account; // store에 저장된 기존계좌정보
}

const ModifyModal = ({ onClose, account }: ModifyModalProps) => {
  // 모달이 열리면 초기값 기존 계좌명과 비밀번호
  const [accountName, setAccountName] = useState(account.accountNickname);
  const [password, setPassword] = useState(account.password);
  const [emptyFields, setEmptyFields] = useState(false);
  const [accountNameError, setAccountNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // store의 updateAccount 함수
  const updateAccountStore = useAccountStore((state) => state.updateAccount);

  // handleSubmit은 입력값 검증 후 API 호출, store 업데이트, 모달 닫힘 처리
  const handleSubmit = async () => {
    if (!accountName.trim() || !password.trim()) {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }

    let hasError = false;
    if (!isValidAccountName(accountName)) {
      setAccountNameError("공백 포함 최대 25자 이하로 입력해 주세요.");
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
    if (hasError) return;

    try {
      // 수정 API 호출: account의 accountId와 수정된 계좌명, 비밀번호 전송
      const updatedAccount = await updateAccountAPI({
        accountId: account.accountId,
        accountNickname: accountName,
        password: password,
      });
      // API 응답으로 받은 업데이트된 데이터store에 반영
      updateAccountStore(updatedAccount);
      console.log("계좌 정보 변경 완료:", updatedAccount);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 font-pre-regular text-main200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="w-[15px]"></div>
          <h2 className="text-20 font-pre-medium text-center">
            계좌 정보 변경
          </h2>
          <button onClick={onClose}>
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
        </div>

        {/* 계좌명 입력 필드 */}
        <div className="mb-4">
          <label className="block text-14 font-pre-regular ml-1 mb-1">
            계좌명
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-14"
            placeholder="공백 포함 최대 25자 이하로 입력해 주세요."
          />
          {accountNameError && (
            <p className="text-red-500 text-12 mt-1 ml-1">{accountNameError}</p>
          )}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-4">
          <label className="block text-14 font-pre-regular ml-1 mb-1">
            입장 비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-14"
            placeholder="숫자 4~8자로 입력해 주세요."
          />
          {passwordError && (
            <p className="text-red-500 text-12 mt-1 ml-1">{passwordError}</p>
          )}
        </div>

        {/* 빈 입력 필드 에러 메시지 */}
        {emptyFields && (
          <p className="text-red-500 text-12 mt-1">모든 필드를 입력해주세요.</p>
        )}

        {/* 모달 버튼 영역 */}
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
