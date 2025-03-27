// import addIcon from "../assets/addIcon.svg";
import addIcon from "../../assets/addIcon_main200.svg";
import { useNavigate } from "react-router-dom";

const AddAccountBtn = () => {
  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate("/account");
  };
  return (
    <div className="flex justify-between items-center mb-4 max-w-[1000px] w-full mx-auto">
      <div></div>
      <button
        onClick={handleAddAccount}
        className="flex px-8 py-2 rounded-full transition-transform transform-gpu text-16 hover:-translate-y-1 hover:shadow-lg font-pre-medium"
      >
        <img src={addIcon} alt="addIcon" className="mr-2 w-3" />
        <p>계좌 추가</p>
      </button>
    </div>
  );
};

export default AddAccountBtn;
