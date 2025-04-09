import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/addeclips.svg";
const EmptyAccount = () => {
  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate("/account");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[75vh] text-center font-pre-medium">
      <h2 className="text-16 md:text-24 font-pre-medium mb-10">
        대장부 서비스에 이용할{" "}
        <span className="font-pre-bold">계좌를 등록해주세요.</span>
      </h2>
      <div className="flex flex-col justify-center items-center border border-dashed border-gray200 py-4 px-6 rounded-xl">
        <button
          onClick={handleAddAccount}
          className="flex flex-col items-center justify-center space-y-2"
        >
          <img src={addIcon} alt="add" className="w-10 mt-10" />
          <span className="text-[#4E00CB] md:text-[18px] text-14">
            계좌 등록
          </span>
          <p className="font-pre-regular text-gray200 md:text-14 text-10 whitespace-nowrap">
            모임의 투명한 거래 내역을 위해 계좌를 등록해주세요.
            <br />
            모든 거래는 모임원들에게 실시간으로 공유됩니다.
          </p>
        </button>
      </div>
    </div>
  );
};

export default EmptyAccount;
