// const [currDate, setCurrDate] = useState({month: date.getMonth(), year: date.getFullYear()});
interface TransactionMonthNaviProps {
  currDate: { month: number; year: number };
  setCurrDate: (date: { month: number; year: number }) => void;
}

const TransactionMonthNavi = ({currDate, setCurrDate}:TransactionMonthNaviProps) => {  
  const goToPreMonth = () => {
    if(currDate.month === 0){
      setCurrDate({month: (currDate.month+11)%12, year: currDate.year-1});
    }else{
      setCurrDate({month: currDate.month-1, year: currDate.year});
    }
  }

  const goToNextMonth = () => {
    if(currDate.month === 11){
      setCurrDate({month: (currDate.month+1)%12, year: currDate.year+1});
    }else{
      setCurrDate({month: currDate.month+1, year: currDate.year});
    }
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