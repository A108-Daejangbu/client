import HighImportant from '../../../assets/HighImportance.png'
import LowImportant from '../../../assets/LowImportance.png'

const TransactionInfo: React.FC<{ score: Score}> = ({ score }) => (
  <div className="flex items-center px-4 py-2 w-full">
    <div className="flex items-center justify-center gap-1.5">
      <img src={score.score < 40 ? HighImportant : LowImportant} alt="!" className="w-4 h-4" />
      <span className="text-14 text-gray200">미증빙 거래내역 : {score.uncompletedCnt}건</span>
    </div>
  </div>
);

export default TransactionInfo;