import ReceiptContent from "./ReciptContent";
import ReciptImg from "./ReciptImg";
import CloseIcon from "../../assets/CloseIcons.svg";
import { useReceiptStore } from "../../stores/useReceiptStore";
interface ReciptModalProps {
  date: string;
  balance: number;
  detail: string;
  onClose: () => void;
}

const ReciptModal = ({ date, balance, detail, onClose }: ReciptModalProps) => {
  const isLoading = useReceiptStore((state) => state.isLoading)

  // 사용자 타입 확인
  const isViewer = location.pathname.startsWith('/viewer/');
  const isManager = !isViewer && (location.pathname.startsWith('/main/') || 
                                location.pathname.startsWith('/report/') || 
                                location.pathname === '/manage');


  return (
    <div className="w-[300px] max-h-[650px] border border-1px rounded-lg shadow-lg bg-white flex flex-col">
      <button onClick={onClose} className="absolute top-2 right-2 z-10 p-1">
        <img src={CloseIcon} alt="Close" className="w-3" />
      </button>

      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}

      <div className="flex-shrink-0">
        <ReciptImg isManager={isManager} />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ReceiptContent date={date} balance={balance} detail={detail} isManager={isManager} />
      </div>
    </div>
  );
};

export default ReciptModal;
