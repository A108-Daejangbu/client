import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/addeclips.svg";
const EmptyAccount = () => {
  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate("/account");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[75vh] text-center font-pre-medium">
      <h2 className="text-20 font-pre-medium mb-4">
        대장부 서비스에 이용할{" "}
        <span className="font-pre-bold">계좌를 등록해주세요.</span>
      </h2>
      <div className="border border-dashed border-gray200 py-4 rounded-xl max-w-s w-full flex justify-center">
        <button
          onClick={handleAddAccount}
          className="flex flex-col items-center justify-center space-y-2"
        >
          <img src={addIcon} alt="add" className="w-10 mt-10" />
          <span className="text-[#4E00CB] text-[18px]">계좌 등록</span>
          <p className="text-gray200 text-14 whitespace-nowrap">
            모임의 투명한 거래 내역을 위해 계좌 정보를 등록해주세요.
            <br />
            모든 거래는 모임원들에게 실시간으로 공유됩니다.
          </p>
        </button>
      </div>
    </div>
  );
};

export default EmptyAccount;
