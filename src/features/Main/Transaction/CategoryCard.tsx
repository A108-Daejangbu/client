import { useTransactionFilterStore } from "../../../stores/useTransactionFilterStore";

interface CategoryCardProp {
  category: Category;
  onDelete?: (category:Category) => void; // 카테고리 설정 or 삭제 함수
  onSelected?: boolean;  // 선택된 카테고리인지(true -> X 버튼 보이도록)
  isInline?: boolean;    // 말줄임을 사용할 것인지(true -> 요소를 넘어가는 길이면 자르고 ... 붙임)
  callin?: string;       // callin == filter인 경우 filtering하는 상황임을 알림
}

const CategoryCard = ({category, onDelete, onSelected=false, isInline}: CategoryCardProp) => {
  const removeCategoryId = useTransactionFilterStore((state) => state.removeCategoryId)
  const addCategoryId = useTransactionFilterStore((state) => state.addCategoryId)

  const ColorPallete = [
    {bgColor: '#00FF94', textColor: '#5DC486'},
    {bgColor: '#0042FF', textColor: '#5B75BF'},
    {bgColor: '#F90000', textColor: '#CD5D5D'},
    {bgColor: '#FFD300', textColor: '#C6B45A'},
    {bgColor: '#A66CFF', textColor: '#845BC3'},
    {bgColor: '#FF7B00', textColor: '#CD9561'},
    {bgColor: '#FF85A1', textColor: '#CE647D'},
    {bgColor: '#FF85A1', textColor: '#CE647D'},
    {bgColor: '#FF85D0', textColor: '#CE64AD'},
  ]

  const idx = ((category.categoryId ? category.categoryId: 0)  + new Date().getDate() + new Date().getMonth()) % ColorPallete.length;
  const BgColor = ColorPallete[idx].bgColor;
  const TextColor = ColorPallete[idx].textColor;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ 모달 닫힘 방지
    if (!onSelected) {
      onDelete?.(category);
      handleClearSelectedCategory(category.categoryId)
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(category);
    handleClearSelectedCategory(category.categoryId); // 선택 제거
  };

  const handleClearSelectedCategory = (id: number) => {
    if(onSelected){ // id에 해당하는 카테고리 삭제
      removeCategoryId(id);
    }else{ // id에 해당하는 카테고리 추가
      addCategoryId(id);
    }
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const BgColorWithAlpha = hexToRgba(BgColor, 0.2);

  return (
    <div className={`relative flex mt-1 px-2 rounded md:min-h-4 min-h-2 content-center leading-normal items-center ${!onSelected ? 'cursor-pointer' : ''}`}
    style={{"backgroundColor": BgColorWithAlpha, "color": TextColor}}
    onClick={handleCardClick}>
     <span
        className={`font-pre-extrabold md:text-14 text-12 ${
          isInline
            ? "inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]"
            : ""
        }`}
        title={isInline ? category.name : undefined} // Hover 시 전체 보기
      >
        <span className="mr-2">#</span>
        {category.name}
      </span>

      {/* X 버튼 */}
      {onSelected && (
        <button
          // onClick={(e) => {
          //   e.stopPropagation();
          //   onDelete?.(category);
          //   handleClearSelectedCategory(category.categoryId)
          // }}
          onClick={handleDeleteClick}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-400 text-white text-[12px] flex items-center justify-center p-0 cursor-pointer">
          <span className="self-center pb-[0.25rem]">x</span>
        </button>
      )}
    </div>
  )
}

export default CategoryCard;