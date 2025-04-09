import { useRef, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import CategoryCard from "./CategoryCard";
import useDetectClose from "../../../hooks/useDetectClose";
import { IoClose } from "react-icons/io5";
import FilterPeriod from "./FilterModal/FilterPeriod";
import FilterMoney from "./FilterModal/FilterMoney";
import FilterTransaction from "./FilterModal/FilterTransaction";
import FilterCategory from "./FilterModal/FilterCategory";
import { SelectDate, SelectOptions, TransactionReq } from "../../../types/Transaction";

interface TransactionFilteringProps{
  categories: Category[];
  onFilterChange: (req: Partial<TransactionReq>) => void;
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
  // const typeMap = { 전체: "", 입금만: "DEPOSIT", 출금만: "WITHDRAWAL"} as const;

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
        <div className="flex flex-wrap gap-2 md:max-w-[75%] max-w-[65%]">
          {selectedCategories.map(cat => (
            <CategoryCard key={cat.categoryId} category={cat} onDelete={() => toggleCategory(cat)} onSelected={true} isInline={true} />
          ))}
        </div>

        {/* 검색 필터링 */}
        <div className="flex relative  gap-2 text-[#707070] text-10 md:text-[14px] cursor-default font-pre-extralight"
        onClick={(e) => {
          e.stopPropagation()
          setIsFilterModalOpen(!isFilterModalOpen)
          }}>
            <div className="flex items-center gap-2 h-auto">
              <span>{selectOptions.period}</span>
              <span>{selectOptions.type}</span>
              <span>{selectOptions.order}</span>
              <IoMdOptions className="cursor-pointer"/>
            </div>
      
          {/* 필터링 모달 */}
          {isFilterModalOpen && (
            <div
              className="absolute top-full right-0 p-4 border-gray300 w-60 border rounded-md bg-white shadow-lg z-50 whitespace-nowrap"
              ref={filterModalRef}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="justify-self-end text-gray200 text-16 cursor-pointer" 
                onClick={() => setIsFilterModalOpen(false)}>
                <IoClose />
              </div>
              <div>
                {/* 조회기간 설정 */}
                <FilterPeriod setSelectOptions={setSelectOptions} dateRange={dateRange} setDateRange={setDateRange} formatDate={formatDate} period={selectOptions.period} />
              </div> 
              <div>
                {/* 거래 유형 설정 */}
                <FilterTransaction type={'유형'} title={'거래 유형'} setSelectOptions={setSelectOptions} selectType={selectOptions.type} />
              </div>
              <div>
                {/* 거래 정렬 설정 */}
                <FilterTransaction type={'정렬'} title={'거래 내역 정렬'} setSelectOptions={setSelectOptions} selectOrder={selectOptions.order} />
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
        </div>
      </div>

      <hr className="bg-[#707070] opacity-20 w-full my-1.5 h-[0.5px]" />

    </>
  )
}

export default TransactionFiltering;