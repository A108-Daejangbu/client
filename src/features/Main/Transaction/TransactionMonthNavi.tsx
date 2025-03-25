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
    <div className="flex gap-4 items-center text-24 font-pre-semibold">
      <span className="text-main200 w-32 text-right">{getMonthtoEng()}</span>
      <span className="text-gray200">{currDate.year}</span>
      <span className="text-gray200 cursor-pointer" onClick={goToPreMonth}>&lt;</span>
      <span className="text-gray200 cursor-pointer" onClick={goToNextMonth}>&gt;</span>
    </div>
  );
}

export default TransactionMonthNavi;