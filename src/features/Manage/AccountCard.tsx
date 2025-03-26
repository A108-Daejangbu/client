import editIcon from "../../assets/edit2.svg";
import deleteIcon from "../../assets/delete2.svg";
import DeleteModal from "../../features/Manage/AccountModal/DeletModal";
import ModifyModal from "../../features/Manage/AccountModal/ModifyModal";
import { useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import { bankData } from "../../constants/bankData";
import { accountInfo } from "../../dummy/accountInfo";

const AccountCard = () => {
  // 더미 데이터 사용(잊지말고 001코드 1로 바꿔두기)
  const account = accountInfo[0];

  // 해당 은행 정보 가져오기
  const bankInfo = bankData.find((bank) => bank.bankCode === account.bankCode)!;

  // bankInfo가 없는 경우 로직 처리
  if (!bankInfo) {
    console.log("은행 정보를 찾을 수 없습니다.");
  }

  // useDetectClose는 모달의 상태를 관리
  const modifyModalRef = useRef<HTMLDivElement>(null!); //초기에는 null이지만, 반드시 이후에 값이 할당될 것
  const delelteModalRef = useRef<HTMLDivElement>(null!);

  // useDetectClose 훅을 사용하여 모달 열기/닫기 상태를 관리
  const [isModifyModalOpen, setIsModifyModalOpen] = useDetectClose(
    modifyModalRef,
    false
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useDetectClose(
    delelteModalRef,
    false
  );

  return (
    <div
      className="w-[19rem] p-4 rounded-2xl shadow-lg relative font-pre-regular"
      style={{
        borderRadius: "17px",
        background: `linear-gradient(120deg, ${bankInfo.color1} 15%, ${bankInfo.color2} 50%)`,
      }}
    >
      {/* 수정 삭제 버튼 */}
      <div className="absolute top-4 right-4 flex space-x-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModifyModalOpen(true);
          }}
        >
          <img src={editIcon} alt="editIcon" className="w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
        >
          <img src={deleteIcon} alt="deleteIcon" className="w-5" />
        </button>
      </div>
      {/* 은행이름 및 계좌번호 */}
      <div className="text-10 opacity-65 flex gap-1.5">
        <h2>{account.bankName}</h2>
        <p>{account.accountNumber}</p>
      </div>
      {/* 은행 로고와 계좌명 잔액*/}
      <div className="flex mt-6 items-center">
        <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center mr-3">
          <img
            src={bankInfo.logo}
            alt={bankInfo.bankName}
            className="w-[26px] h-[26px]"
          />
        </div>

        <div className="flex-cols font-pre-semibold ">
          <h2 className="text-20 text-white truncate">
            {account.accountName.length >= 13
              ? account.accountName.slice(0, 13) + "..."
              : account.accountName}
          </h2>
          <p className="text-[18PX] text-white">
            {account.balance.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* 미완료 영수증 */}
      <p className="mt-6 text-16 text-white text-right">
        미완료 영수증:
        <span className="font-medium ml-2">
          {account.uncompletedReceipts}개
        </span>
      </p>

      {/* 수정 모달 */}
      {isModifyModalOpen && (
        <div ref={modifyModalRef}>
          <ModifyModal onClose={() => setIsModifyModalOpen(false)} />
        </div>
      )}

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div ref={delelteModalRef}>
          <DeleteModal onClose={() => setIsDeleteModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default AccountCard;
