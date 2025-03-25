import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";

interface FilterPeriodProps{
  // setSelectOptions: (options:SelectOptions) => void;
  setSelectOptions: React.Dispatch<React.SetStateAction<SelectOptions>>;
  dateRange: SelectDate;
  setDateRange: React.Dispatch<React.SetStateAction<SelectDate>>
  formatDate: (date: Date) => string;
}

const FilterPeriod = ({setSelectOptions, dateRange, setDateRange, formatDate}:FilterPeriodProps) => {
  const today = new Date();

  const [periodOption, setPeriodOption] = useState('이번달')

  const handlePeriodClick = (label: string) => {
    if(label === '3개월'){
      setDateRange({startPeriod: formatDate(new Date(today.getFullYear(), today.getMonth()-3, today.getDay())), endPeriod: formatDate(today)});
      
    }else if (label === '1개월'){
      setDateRange({startPeriod: formatDate(new Date(today.getFullYear(), today.getMonth()-1, today.getDay())), endPeriod: formatDate(today)});
    }else{
      setDateRange({startPeriod: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)), endPeriod: formatDate(today)});
    }
    setPeriodOption(label);
    setSelectOptions(prev => ({
      ...prev,
      period: label,
    }));
  }
  return (
    <div>
      <div className="text-main100 font-pre-light text-16 flex items-center gap-2 pb-1 ">
        <span>조회 기간</span>
        <RiResetLeftFill className="text-gray200 cursor-pointer"
        onClick={() => handlePeriodClick('이번달')} />
      </div>
      {/* date 설정 토글 */}
      <div className="flex bg-gray-100 rounded-md p-1 gap-1 mb-4">
        {['1개월', '3개월', '직접 설정'].map((label:string) => (
          <button
            key={label}
            onClick={() => handlePeriodClick(label)}
            className={`flex-1 px-4 py-2 text-sm rounded-md font-pre-medium transition-all tracking-widest ${
              periodOption === label
                ? "bg-white text-black shadow-sm"
                : "text-gray-400"
            } ${label === "직접 설정" ? "tracking-tighter" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
      {/* 날짜 직접 입력 */}
      {periodOption === "직접 설정" && (
  <div className="flex items-center justify-between gap-2 text-xs text-gray-600 mb-4">
    <input
      type="date"
      value={dateRange.startPeriod}
      onChange={(e) => {
        setDateRange(prev => ({
          ...prev,
          startPeriod: e.target.value,
        }));
        setPeriodOption("직접 설정");
      }}
      className="border rounded px-2 py-1 flex-1"
    />
    <span>~</span>
    <input
      type="date"
      value={dateRange.endPeriod}
      onChange={(e) => {
        setDateRange(prev => ({
          ...prev,
          endPeriod: e.target.value,
        }));
        setPeriodOption("직접 설정");
      }}
      className="border rounded px-2 py-1 flex-1"
    />
  </div>
)}

    </div>
  )
}

export default FilterPeriod;