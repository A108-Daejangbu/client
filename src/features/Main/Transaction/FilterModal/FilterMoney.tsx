import { RiResetLeftFill } from "react-icons/ri";
import { useTransactionFilterStore } from "../../../../stores/useTransactionFilterStore";

interface Money{
  min: number;
  max: number;
}

interface FilterMoneyProps{
  moneyMinMax: Money
  setMoneyMinMax: React.Dispatch<React.SetStateAction<Money>>;
}

const FilterMoney = ({moneyMinMax, setMoneyMinMax}:FilterMoneyProps) => {
  // 숫자를 3자리마다 콤마 찍는 함수
  const formatNumber = (num: number) => num.toLocaleString("ko-KR");

  // 콤마 제거하고 숫자 파싱
  const parseNumber = (val: string) => Number(val.replace(/,/g, ""));

  const setFilters = useTransactionFilterStore((state) => state.setFilters)
  const removeFilters = useTransactionFilterStore((state) => state.removeFilter)

  const setMoney = (type: string) => {
    if(type === 'remove'){
      removeFilters("min")
      removeFilters("max")
      setMoneyMinMax({
        min: 0,
        max: 1000000000
      })
    }else{
      setFilters({
        min: moneyMinMax.min,
        max: moneyMinMax.max,
      })
    }
  }

  return(
    <>
      <div className="text-main100 text-14 pb-1 font-pre-light flex items-center gap-2">
        <span>거래 금액 설정</span>
        <RiResetLeftFill className="text-gray200 cursor-pointer"
                onClick={() => setMoney('remove')} />
      </div>
      <div className="flex gap-1 mb-4 p-1 font-pre-medium">
        <input
          type="text"
          value={formatNumber(moneyMinMax.min)}
          onChange={(e) => {
            setMoneyMinMax(prev => ({
              ...prev,
              min:  parseNumber(e.target.value),
            }));
          }}
          className="border border-gray-100 rounded px-2 py-1 flex-1 text-10 text-end w-16"
        />
        <span>~</span>
        <input
          type="text"
          value={formatNumber(moneyMinMax.max)}
          onChange={(e) => {
            setMoneyMinMax(prev => ({
              ...prev,
              max:  parseNumber(e.target.value),
            }));
          }}
          className="border border-gray-100 rounded px-2 py-1 flex-1 text-10 text-end w-16"
        />
        <button className="text-10 border border-gray-100 text-black rounded px-2 py-1" onClick={() => setMoney('minmax')}>적용</button>
      </div>
    </>
  )
}

export default FilterMoney;