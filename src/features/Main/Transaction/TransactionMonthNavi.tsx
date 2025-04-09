import { useTransactionFilterStore } from "../../../stores/useTransactionFilterStore";
import { formatDateToString } from "../../../utils/date";

// const [currDate, setCurrDate] = useState({month: date.getMonth(), year: date.getFullYear()});
interface TransactionMonthNaviProps {
  currDate: { month: number; year: number };
  setCurrDate: (date: { month: number; year: number }) => void;
}

const TransactionMonthNavi = ({currDate, setCurrDate}:TransactionMonthNaviProps) => {  
  const setFilters = useTransactionFilterStore((state) => state.setFilters)

  const goToPreMonth = () => {
    const newMonth = currDate.month === 0 ? 11 : currDate.month - 1;
    const newYear = currDate.month === 0 ? currDate.year - 1 : currDate.year;

    setCurrDate({ month: newMonth, year: newYear });
    setFilters({
      startDate: formatDateToString(newYear, newMonth, 1),
      endDate: formatDateToString(newYear, newMonth + 1, 0),
    });
  }

  const goToNextMonth = () => {
    const newMonth = currDate.month === 11 ? 0 : currDate.month + 1;
    const newYear = currDate.month === 11 ? currDate.year + 1 : currDate.year;

    setCurrDate({ month: newMonth, year: newYear });
    setFilters({
      startDate: formatDateToString(newYear, newMonth, 1),
      endDate: formatDateToString(newYear, newMonth + 1, 0),
    });
  }

  const getMonthtoEng = () => {
    const date = new Date(currDate.year, currDate.month);
    return date.toLocaleDateString("en-US", {month: "long"})
  }

  return (
    <div className="flex justify-center gap-4 items-center md:text-24 text-16 font-pre-semibold pt-1">
      <span className="text-gray200 cursor-pointer" onClick={goToPreMonth}>&lt;</span>
      <span className="text-main200 text-right">{getMonthtoEng()}</span>
      <span className="text-gray200">{currDate.year}</span>
      <span className="text-gray200 cursor-pointer" onClick={goToNextMonth}>&gt;</span>
    </div>
  );
}

export default TransactionMonthNavi;