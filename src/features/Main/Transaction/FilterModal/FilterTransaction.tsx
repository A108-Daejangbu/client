import { useState } from "react";

interface FilterTransactionProps {
  title: string;
  type: string;
  setSelectOptions: React.Dispatch<React.SetStateAction<SelectOptions>>;
  selectType?: string;
  selectOrder?: string;
}

const FilterTransaction = ({title, type, setSelectOptions, selectType, selectOrder}:FilterTransactionProps) => {
  const [typeOption, setTypeOption] = useState(selectType)
  const [orderOption, setOrderOption] = useState(selectOrder)

  const optionList = type==='유형' ? ['전체', '입금만', '출금만'] : ['최신순', '과거순'];
  const option = type==='유형' ? typeOption : orderOption;
  const setOption = type==='유형' ? setTypeOption : setOrderOption;

  const handleOption = (label: string) => {
    if(type==='유형'){
      setSelectOptions(prev => ({
        ...prev,
        type: label
      }))
    }else{
      setSelectOptions(prev => ({
        ...prev,
        order: label
      }))
    }
    setOption(label)
  }

  return (
    <>
      <div className="text-main100 font-pre-light text-16 pb-1 tracking-normal">
        <span>{title}</span>
      </div>
      <div className="flex bg-gray-100 rounded-md p-1 gap-1 mb-4">
        {optionList.map((label:string) => (
          <button
            key={label}
            onClick={() => handleOption(label)}
            className={`flex-1 px-4 py-2 text-sm rounded-md font-pre-medium transition-all tracking-widest ${
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