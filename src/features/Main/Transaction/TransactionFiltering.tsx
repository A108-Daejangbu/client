import { useRef, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import CategoryCard from "./CategoryCard";
import useDetectClose from "../../../hooks/useDetectClose";
import { IoClose } from "react-icons/io5";
import FilterPeriod from "./FilterModal/FilterPeriod";
import FilterMoney from "./FilterModal/FilterMoney";
import FilterTransaction from "./FilterModal/FilterTransaction";
import FilterCategory from "./FilterModal/FilterCategory";

interface TransactionFilteringProps{
  categories: Category[]
}

const TransactionFiltering = ({categories}: TransactionFilteringProps) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  const filterModalRef = useRef<HTMLDivElement>(null!);
  const [isFilterModalOpen, setIsFilterModalOpen] = useDetectClose(filterModalRef, false);

  const [selectOptions, setSelectOptions] = useState<SelectOptions>({period:'이번달', type:'전체', order:'최신순'})
  // const orderMap = { 최신순: "DESC", 과거순: "ASC", } as const;
  // const typeMap = { 전체: "", 입금만: "1", 출금만: "2"} as const;

  const [dateRange, setDateRange] = useState<SelectDate>({startPeriod: formatDate(new Date(year, month, 1)), endPeriod: formatDate(today)});
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const toggleCategory = (category: Category) => {
    const isSelected = selectedCategories.some(cat => cat.categoryId === category.categoryId);
  
    if (isSelected) {
      setSelectedCategories(prev =>
        prev.filter(cat => cat.categoryId !== category.categoryId)
      );
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const unselectedCategories = categories.filter(
    cat => !selectedCategories.some(selectedCat => selectedCat.categoryId === cat.categoryId)
  );

  const [moneyMinMax, setMoneyMinMax] = useState({min: 0, max:1000000000});



  return (
    <>
      <div className="flex justify-between pt-3 items-end px-1">
        {/* 선택된 카테고리들 */}
        <div className="flex flex-wrap gap-2 max-w-[75%]">
          {selectedCategories.map(cat => (
            <CategoryCard key={cat.categoryId} category={cat} onDelete={() => toggleCategory(cat)} onSelected={true} isInline={true} />
          ))}
        </div>

        {/* 검색 필터링 */}
        <div className="flex items-center gap-2 text-[#707070] text-[14px] cursor-default font-pre-extralight">
          <span>{selectOptions.period}</span>
          <span>{selectOptions.type}</span>
          <span>{selectOptions.order}</span>
          <IoMdOptions onClick={(e) => {
            e.stopPropagation()
            setIsFilterModalOpen(!isFilterModalOpen)
            }} className="cursor-pointer" />
        </div>
      </div>

      <hr className="bg-[#707070] w-full my-1.5" />

      {/* 필터링 모달 */}
      {isFilterModalOpen && (
        <div className="p-4 border-gray300 max-w-80 border rounded-md mt-1 justify-self-end" ref={filterModalRef}>
          <div className="justify-self-end text-gray200 text-20 cursor-pointer" onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
            <IoClose />
          </div>
          <div>
            {/* 조회기간 설정 */}
            <FilterPeriod setSelectOptions={setSelectOptions} dateRange={dateRange} setDateRange={setDateRange} formatDate={formatDate} />
          </div> 
          <div>
            {/* 거래 유형 설정 */}
            <FilterTransaction type={'유형'} title={'거래 유형'} setSelectOptions={setSelectOptions} />
          </div>
          <div>
            {/* 거래 정렬 설정 */}
            <FilterTransaction type={'정렬'} title={'거래 내역 정렬'} setSelectOptions={setSelectOptions} />
          </div>
          <div>
            {/* 거래 금액 설정 */}
            <FilterMoney moneyMinMax={moneyMinMax} setMoneyMinMax={setMoneyMinMax} />
          </div>
          <div>
            {/* 카테고리 설정 */}
            <FilterCategory unselectedCategories={unselectedCategories} selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
          </div>
        </div>
      )}
    </>
  )
}

export default TransactionFiltering;