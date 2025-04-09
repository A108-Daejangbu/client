import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { SelectDate, SelectOptions } from "../../../../types/Transaction";
import { useTransactionFilterStore } from "../../../../stores/useTransactionFilterStore";
import { formatDateToString } from "../../../../utils/date";

interface FilterPeriodProps{
  // setSelectOptions: (options:SelectOptions) => void;
  setSelectOptions: React.Dispatch<React.SetStateAction<SelectOptions>>;
  dateRange: SelectDate;
  setDateRange: React.Dispatch<React.SetStateAction<SelectDate>>
  formatDate: (date: Date) => string;
  period: string;
}

const FilterPeriod = ({setSelectOptions, dateRange, setDateRange, formatDate, period}:FilterPeriodProps) => {
  const setFilters = useTransactionFilterStore((state) => state.setFilters)

  const today = new Date();

  const [periodOption, setPeriodOption] = useState(period)
  const [dateError, setDateError] = useState("");

  const getMonthsAgo = (monthOffset: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - monthOffset);
    return d;
  };

  const handlePeriodClick = (label: string) => {
    let start: Date;
    const end = today;
  
    if (label === '3개월') {
      start = getMonthsAgo(3);
    } else if (label === '1개월') {
      start = getMonthsAgo(1);
    } else if (label === '이번달') {
      start = new Date(today.getFullYear(), today.getMonth(), 1); // 이번 달 1일
    } else {
      setPeriodOption(label)
      setSelectOptions(prev => ({ ...prev, period: label }));

      // 처음 눌렀을 때의 값을 반영
      setFilters({
        startDate: dateRange.startPeriod.replace(/-/g, ""),
        endDate: dateRange.endPeriod.replace(/-/g, "")
      });
      return;
    }
  
    setDateRange({
      startPeriod: formatDate(start),
      endPeriod: formatDate(end),
    });
  
    setPeriodOption(label);
    setSelectOptions(prev => ({ ...prev, period: label }));
  
    // 🔥 필터 상태도 업데이트
    setFilters({
      startDate: formatDateToString(start.getFullYear(), start.getMonth(), start.getDate()),
      endDate: formatDateToString(end.getFullYear(), end.getMonth(), end.getDate()),
    });

    setDateError("");
  };

  const handleDateChange = (field: "start" | "end", value: string) => {
    const updatedRange = {
      ...dateRange,
      [field === "start" ? "startPeriod" : "endPeriod"]: value,
    };

    const start = new Date(updatedRange.startPeriod);
    const end = new Date(updatedRange.endPeriod);

    if (start > end) {
      setDateError("시작일은 종료일보다 앞서야 합니다.");
    } else {
      setDateError("");
      setFilters({
        startDate: updatedRange.startPeriod.replace(/-/g, ""),
        endDate: updatedRange.endPeriod.replace(/-/g, ""),
      });
    }

    setDateRange(updatedRange);
    setPeriodOption("직접 설정");
    setSelectOptions((prev) => ({ ...prev, period: "직접 설정" }));
  };
  
  return (
    <div>
      <div className="text-main100 font-pre-light text-14 flex items-center gap-2 pb-1 ">
        <span>조회 기간</span>
        <RiResetLeftFill className="text-gray200 cursor-pointer"
        onClick={() => handlePeriodClick('이번달')} />
      </div>
      {/* date 설정 토글 */}
      <div className="flex bg-gray-100 rounded-md p-1 gap-1/2 mb-3">
        {['1개월', '3개월', '직접 설정'].map((label:string) => (
          <button
            key={label}
            onClick={() => handlePeriodClick(label)}
            className={`flex-1 px-3 py-2 text-xs rounded-md font-pre-medium transition-all tracking-widest ${
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
        <div className="items-center justify-between gap-2 text-xs text-gray-600 mb-4">
          <div className="justify-center flex">
            <input
              type="date"
              value={dateRange.startPeriod}
              onChange={(e) => {handleDateChange("start", e.target.value)}}
              className="border rounded px-1 pr-0 py-1 flex-1 text-10"
            />
            <span className="px-1/2">~</span>
            <input
              type="date"
              value={dateRange.endPeriod}
              onChange={(e) => {handleDateChange("end", e.target.value)}}
              className="border rounded px-1 pr-0 py-1 flex-1 text-10"
            />
          </div>
          {dateError && <p className="text-red-500 justify-self-center pt-1">{dateError}</p>}
        </div>
      )}
    </div>
  )
}

export default FilterPeriod;