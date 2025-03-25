interface CategoryCardProp {
  category: Category;
  onDelete?: (category:Category) => void;
  onSelected?: boolean;
  isInline?: boolean;
}

const CategoryCard = ({category, onDelete, onSelected, isInline}: CategoryCardProp) => {
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

  const idx = (category.categoryId + new Date().getDate() + new Date().getMonth()) % ColorPallete.length;
  const BgColor = ColorPallete[idx].bgColor;
  const TextColor = ColorPallete[idx].textColor;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const BgColorWithAlpha = hexToRgba(BgColor, 0.2);

  const handleCardClick = () => {
    if (!onSelected) {
      onDelete?.(category);
    }
  };

  return (
    <div className={`relative px-2 rounded min-h-4 content-center ${!onSelected ? 'cursor-pointer' : ''}`}
    style={{"backgroundColor": BgColorWithAlpha, "color": TextColor}}
    onClick={handleCardClick}>
      <span className={`font-pre-extrabold text-12 text-ellipsis line-clamp-1 ${
      isInline ? "max-w-[150px]" : ""
    }`}><span className="mr-2">#</span>{category.categoryName}</span>

      {/* X 버튼 */}
      {onSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(category)}}
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-400 text-white text-[12px] flex items-center justify-center p-0 cursor-pointer">
          <span className="translate-y-[0.5px] self-end">x</span>
        </button>
      )}
    </div>
  )
}

export default CategoryCard;