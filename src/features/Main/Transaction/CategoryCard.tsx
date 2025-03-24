interface CategoryCardProp {
  category: Category;
}

const CategoryCard = ({category}: CategoryCardProp) => {
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

  const idx = (category.accountId + new Date().getDate() + new Date().getMonth()) % ColorPallete.length;
  const BgColor = ColorPallete[idx].bgColor;
  const TextColor = ColorPallete[idx].textColor;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const BgColorWithAlpha = hexToRgba(BgColor, 0.2);

  return (
    <div className="px-4 pl-2 rounded"
    style={{"backgroundColor": BgColorWithAlpha, "color": TextColor}}>
      <span className="font-pre-extrabold text-8 text-ellipsis line-clamp-1">#  {category.categoryName}</span>
    </div>
  )
}

export default CategoryCard;