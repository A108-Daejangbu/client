import ReciptContent from "./ReciptContent";
import ReciptImg from "./ReciptImg";
import CloseIcon from "../../assets/CloseIcons.svg";
interface ReciptModalProps {
  date: string;
  balance: string;
  detail: string;
  onClose: () => void;
}

const ReciptModal = ({ date, balance, detail, onClose }: ReciptModalProps) => {
  return (
    <div className="w-[248px] max-h-[650px] border border-1px rounded-lg shadow-lg bg-white flex flex-col">
      <button onClick={onClose} className="absolute top-2 right-2 z-10 p-1">
        <img src={CloseIcon} alt="Close" className="w-3" />
      </button>
      <div className="flex-shrink-0">
        <ReciptImg />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ReciptContent date={date} balance={balance} detail={detail} />
      </div>
    </div>
  );
};

export default ReciptModal;
