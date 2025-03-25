import CloseIcon from "../../../assets/CloseIcons.svg";

interface DeleteModalProps {
  onClose: () => void; // 모달을 닫을 때 사용할 onClose prop 정의
}

const DeleteModal = ({ onClose }: DeleteModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경을 클릭하면 모달이 닫히도록 설정
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96"
        onClick={(e) => e.stopPropagation()} // 모달 본체 클릭 시, 이벤트 전파를 막아 닫히지 않도록 처리>
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-lg font-semibold text-black flex-grow text-center">
            계좌 삭제
          </h2>
          <button
            onClick={onClose} // onClose prop을 사용해 모달 닫기
          >
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
        </div>

        {/* 모달 본문 */}
        <p className="text-gray-600 text-center">
          해당 계좌를 삭제하시겠습니까?
        </p>

        {/* 모달 버튼 */}
        <div className="mt-6 flex justify-between">
          <button
            className="w-1/2 px-4 py-2 text-white rounded-lg"
            style={{
              background: "linear-gradient(180deg, #7953FF 0%, #4E00CB 100%)", // 버튼 배경
              borderRadius: "8px",
            }}
            onClick={() => {
              alert("계좌가 삭제되었습니다.");
              onClose(); // 모달을 닫는 함수 호출
            }}
          >
            확인
          </button>
          <button
            className="w-1/2 px-4 py-2 text-[#4E00CB] border border-[#4E00CB] rounded-lg hover:bg-gray-100 ml-2"
            onClick={onClose} // onClose prop을 사용해 모달 닫기
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
