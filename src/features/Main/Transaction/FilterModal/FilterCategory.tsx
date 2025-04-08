import CategoryCard from "../CategoryCard";

interface FilterCategoryProps{
  unselectedCategories: Category[];
  toggleCategory: (category: Category) => void;
  selectedCategories: Category[]
}

const FilterCategory = ({unselectedCategories, selectedCategories, toggleCategory}:FilterCategoryProps) => {
  return (
    <>
      <div className="text-main100 font-pre-light text-16 pb-1">
        <span>카테고리 설정</span>
      </div>
      <div className="flex flex-wrap gap-2 py-2">
        {selectedCategories.map((cat, idx) => (
          <CategoryCard category={cat} onSelected={true} key={idx} onDelete={toggleCategory} isInline={true} callin={"filter"}/>
        ))}
      </div>
      <hr className="py-1" />
      {selectedCategories.length + unselectedCategories.length === 0 ? (
        <span className="text-gray-400 text-sm">아직 설정된 카테고리가 없습니다.</span>
      ) :(<div className="flex flex-wrap gap-2 pb-2">
          {unselectedCategories.map((cat, idx) => (
            <CategoryCard category={cat} onDelete={toggleCategory} key={idx}  isInline={true} callin={"filter"}/>
          ))}
        </div>
      )}
    </>
  )
}

export default FilterCategory;