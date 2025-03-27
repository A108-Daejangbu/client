import CloseIcon from "../../../assets/CloseIcons.svg";
import { useState } from "react";

interface LinkShareModalProps {
  onClose: () => void;
}

const LinkShareModal = ({ onClose }: LinkShareModalProps) => {
  // const [shareLink, setShareLink] = useState(
  //   `https://ViwerLanding/${accountId}`
  // );
  const [buttonText, setButtonText] = useState("링크 복사");

  // 링크 복사 함수
  const handleCopyLink = () => {
    navigator.clipboard
      // .writeText(shareLink)
      .writeText("https://sharelinkid") //실제 복사되는 주소로, 나중에 shareLink로 바꾸기
      .then(() => {
        setButtonText("복사 완료"); // 버튼 텍스트를 "복사 완료"로 변경
        setTimeout(() => {
          setButtonText("링크 복사"); // 5초 후에 버튼 텍스트를 원래대로 복원
        }, 5000);
      })
      .catch((err) => {
        console.error("링크 복사 실패:", err);
      });
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경을 클릭하면 모달이 닫히도록 설정
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 font-pre-regular text-main200"
        onClick={(e) => e.stopPropagation()} // 모달 본체 클릭 시, 이벤트 전파를 막아 닫히지 않도록 처리>
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="w-[15px]"></div>
          <h2 className="text-lg font-pre-medium text-center">링크 공유</h2>
          <button
            onClick={onClose} // onClose prop 사용해 모달 닫기
          >
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
        </div>

        {/* 모달 본문 */}
        <p className="text-center text-14 mb-2">
          아래 링크를 통해 회비 내역을 투명하게 공유할 수 있습니다. 링크를
          복사하여 뷰어들에게 전달해 보세요.
        </p>
        <div className="flex flex-col justify-center items-center">
          {/* 주소*/}
          <input
            type="text"
            // value={shareLink}
            value="https://sharelinkid" //여기는 읽기 전용
            className="border-[2px] border-purple rounded-lg mb-8 py-2 px-2 w-full"
            readOnly
          />
          {/* 모달 버튼 */}
          <button
            className="w-full px-4 py-2 text-white rounded-lg text-14"
            style={{
              background: "linear-gradient(180deg, #7953FF 0%, #4E00CB 100%)",
              borderRadius: "8px",
            }}
            onClick={handleCopyLink}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkShareModal;
