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

  return(
    <>
      <div className="text-main100 font-pre-light text-16 pb-1">
        <span>거래 금액 설정</span>
      </div>
      <div className="flex gap-1 mb-4 p-1">
        <input
          type="text"
          value={formatNumber(moneyMinMax.min)}
          onChange={(e) => {
            setMoneyMinMax(prev => ({
              ...prev,
              min:  parseNumber(e.target.value),
            }));
          }}
          className="border rounded px-2 py-1 flex-1 text-12 text-end w-16"
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
          className="border rounded px-2 py-1 flex-1 text-12 text-end w-16"
        />
        <button className="text-12 border rounded px-2 py-1">적용</button>
      </div>
    </>
  )
}

export default FilterMoney;