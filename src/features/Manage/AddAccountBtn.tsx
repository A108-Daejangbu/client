// import addIcon from "../assets/addIcon.svg";
import addIcon from "../../assets/addIcon_main200.svg";
import { useNavigate } from "react-router-dom";

const AddAccountBtn = () => {
  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate("/account");
  };
  return (
    <div className="flex justify-end items-center mb-4 max-w-[1000px] w-full mx-auto">
      <button
        onClick={handleAddAccount}
        className="flex text-16 font-pre-medium mr-2"
      >
        <img src={addIcon} alt="addIcon" className="mr-2 w-3" />
        <p>계좌 추가</p>
      </button>
    </div>
  );
};

export default AddAccountBtn;
