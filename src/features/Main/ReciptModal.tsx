import ReciptContent from "./ReciptContent";
import ReciptImg from "./ReciptImg";

interface ReciptModalProps {
  date: string;
  balance: string;
  detail: string;
}

const ReciptModal = ({ date, balance, detail }: ReciptModalProps) => {
  return (
    <div className="w-[248px] max-h-[650px] border border-1px rounded-lg shadow-lg bg-white flex flex-col">
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
