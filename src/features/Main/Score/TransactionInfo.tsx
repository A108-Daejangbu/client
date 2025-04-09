import HighImportant from '../../../assets/HighImportance.png'
import LowImportant from '../../../assets/LowImportance.png'

const TransactionInfo: React.FC<{ score: Score}> = ({ score }) => (
  <div className="flex items-center justify-center py-2 pt-0 w-full z-20">
    <div className="flex items-center gap-1.5">
      <img src={score.score < 40 ? HighImportant : LowImportant} alt="!" className="md:w-4 md:h-4 w-2 h-2" />
      <span className="text-10 md:text-12 text-[#757380] justify-self-center font-pre-regular">미증빙 내역 {score.uncompletedCnt}건</span>
    </div>
  </div>
);

export default TransactionInfo;