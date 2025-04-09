import { useState } from "react";
import { SelectOptions } from "../../../../types/Transaction";
import { useTransactionFilterStore } from "../../../../stores/useTransactionFilterStore";

interface FilterTransactionProps {
  title: string;
  type: "유형" | "정렬";
  setSelectOptions: React.Dispatch<React.SetStateAction<SelectOptions>>;
  selectType?: string;
  selectOrder?: string;
}

const FilterTransaction = ({title, type, setSelectOptions, selectType, selectOrder}:FilterTransactionProps) => {
  const [typeOption, setTypeOption] = useState(selectType)
  const [orderOption, setOrderOption] = useState(selectOrder)

  const setFilters = useTransactionFilterStore((state) => state.setFilters)
  const removeFilter = useTransactionFilterStore((state) => state.removeFilter)

  const orderMap = { 최신순: "DESC", 과거순: "ASC", } as const;
  const typeMap = { 전체: undefined, 입금만: "DEPOSIT", 출금만: "WITHDRAWAL"} as const;

  const optionList = type==='유형' ? ['전체', '입금만', '출금만'] : ['최신순', '과거순'];
  const option = type==='유형' ? typeOption : orderOption;
  const setOption = type==='유형' ? setTypeOption : setOrderOption;


  const handleOption = (label: string) => {
    setOption(label)
    setSelectOptions(prev => ({
      ...prev,
      [type === '유형' ? 'type' : 'order']:label,
    }))
    if(type==='유형'){
      if(label === '전체'){
        removeFilter("type")
      }else{
        setFilters({
          type: typeMap[label as keyof typeof typeMap]
        })
      }
    }else{
      setFilters({
        orderType: orderMap[label as keyof typeof orderMap]
      })
    }
  }

  return (
    <>
      <div className="text-main100 font-pre-light text-14 pb-1 tracking-normal">
        <span>{title}</span>
      </div>
      <div className="flex bg-gray-100 rounded-md p-1 gap-1 mb-4">
        {optionList.map((label:string) => (
          <button
            key={label}
            onClick={() => handleOption(label)}
            className={`flex-1 px-4 py-2 text-xs rounded-md font-pre-medium transition-all tracking-widest ${
              option === label
                ? "bg-white text-black shadow-sm"
                : "text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}

export default FilterTransaction;