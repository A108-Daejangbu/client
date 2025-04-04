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
    <div className="flex md:justify-start justify-center gap-4 items-center md:text-24 text-16 font-pre-semibold">
      <span className="text-main200 md:w-32 text-right order-2 md:order-1">{getMonthtoEng()}</span>
      <span className="text-gray200 order-3 md:order-2">{currDate.year}</span>
      <span className="text-gray200 cursor-pointer order-1 md:order-3" onClick={goToPreMonth}>&lt;</span>
      <span className="text-gray200 cursor-pointer order-4" onClick={goToNextMonth}>&gt;</span>
    </div>
  );
}

export default TransactionMonthNavi;