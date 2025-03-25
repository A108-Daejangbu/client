import editIcon from "../../assets/pencil-edit.svg";
import deleteIcon from "../../assets/trash.svg";
import DeleteModal from "../../features/Manage/AccountModal/DeletModal";
import ModifyModal from "../../features/Manage/AccountModal/ModifyModal";
import { useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";

const AccountCard = () => {
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
    <div className="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg p-4 bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-2xl shadow-lg relative">
      {/* 수정 삭제 버튼 */}
      <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModifyModalOpen(true);
          }}
        >
          <img src={editIcon} alt="editIcon" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
        >
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>

      {/* 은행 계좌 정보 */}
      <p className="text-sm opacity-75">신한은행 3333-24-3301808</p>

      {/* 단체 이름 및 금액 */}
      <div className="mt-2">
        <h2 className="text-xl font-bold">경희대 총학생회</h2>
        <p className="text-2xl font-semibold">1,500,175원</p>
      </div>

      {/* 미완료 영수증 */}
      <p className="mt-4 text-sm">
        미완료 영수증: <span className="font-semibold">7개</span>
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
