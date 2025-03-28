import React from 'react';
import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import { DateRange } from "react-day-picker";
import { DropdownSection } from '../../dummy/reportData';

interface DropdownProps {
  isOpen: boolean;
  sections: DropdownSection[];
  onClose: () => void;
  onSelect: (option: string) => void;
  column: string;
  onDateSelect?: (dates: { from: Date; to: Date }) => void;
  selectedCategories?: string[];
  selectedDateRange?: { from: Date; to: Date } | null;
  selectedFilters?: Record<string, string[]>;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  isOpen, 
  sections, 
  onClose, 
  onSelect, 
  column,
  onDateSelect,
  selectedCategories = [],
  selectedDateRange,
  selectedFilters = {},
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    selectedDateRange || {
      from: new Date(),
      to: new Date(),
    }
  );

  // 선택된 날짜 범위를 표시하는 함수
  const formatDateRange = () => {
    if (!selectedDateRange) return '';
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}.${month}.${day}`;
    };
    return `${formatDate(selectedDateRange.from)} ~ ${formatDate(selectedDateRange.to)}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed mt-1 md:mt-2 bg-white rounded-lg z-50 py-1 md:py-2 border border-gray-300 shadow-lg"
      style={{ 
        fontSize: '0.8rem',
        transform: column === '날짜' ? 'scale(0.9) md:scale(1)' : 'none',
        transformOrigin: 'top left',
        top: 'var(--dropdown-top)',
        left: 'var(--dropdown-left)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {column === '날짜' ? (
        <div className="p-1 md:p-2">
          <div className="text-11 md:text-12 font-pre-medium text-main200 mb-1 md:mb-2 px-2">
            <span className="text-main200">날짜 설정</span>
            {selectedDateRange && (
              <span className="ml-2 text-10 md:text-11 text-gray-500">
                {formatDateRange()}
              </span>
            )}
          </div>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-md scale-90 md:scale-100"
            classNames={{
              months: "space-y-1 md:space-y-2",
              month: "space-y-1 md:space-y-2",
              caption: "flex justify-center pt-1 relative items-center text-sm md:text-base",
              caption_label: "text-xs md:text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-5 w-5 md:h-6 md:w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-between w-full",
              head_cell: "text-gray-500 w-6 md:w-8 font-normal text-[0.6rem] md:text-[0.7rem] text-center",
              row: "flex w-full justify-between mt-0",
              cell: "text-center relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-6 w-6 md:h-7 md:w-7 p-0 font-normal text-xs md:text-sm aria-selected:opacity-100 hover:bg-gray-100 rounded-md",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-gray-500 opacity-50",
              day_disabled: "text-gray-500 opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
          <div className="flex justify-between px-2 md:px-3">
            <div 
              className="text-12 md:text-11 font-pre-thin text-red-500 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                onSelect('날짜 열 삭제');
                onClose();
              }}
            >
              날짜 열 삭제
            </div>
            <div 
              onClick={() => {
                if (dateRange?.from && dateRange?.to && onDateSelect) {
                  onDateSelect({ from: dateRange.from, to: dateRange.to });
                  onClose();
                }
              }} 
              className="text-12 md:text-11 font-pre-thin text-blue cursor-pointer hover:opacity-80 transition-opacity"
            >
              적용
            </div>
          </div>
        </div>
      ) : (
        sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="w-[160px] md:w-[190px]">
            <div className="text-11 md:text-12 font-pre-medium mb-1 md:mb-2 px-2 md:px-3">
              <span className="text-main200">
                {section.title}
              </span>
            </div>
            {section.options.map((option, optionIndex) => {
              const isSelected = column === '카테고리' 
                ? selectedCategories.includes(option.label)
                : selectedFilters[column]?.includes(option.label);
              const isSpecialOption = option.label === '전체' || option.label.includes('삭제');

              return (
                <div 
                  key={optionIndex}
                  className={`px-2 md:px-3 py-1 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-1.5 md:gap-2 ${
                    option.label.includes('삭제') ? 'text-red-500' : 
                    option.label === '전체' ? 'text-main200' : ''
                  }`}
                  onClick={() => {
                    onSelect(option.label);
                    if (isSpecialOption || option.label.includes('숨기기')) {
                      onClose();
                    }
                  }}
                >
                  {(!isSpecialOption || option.label.includes('숨기기')) && (
                    <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded transition-all ${
                      isSelected 
                        ? 'bg-blue' 
                        : 'border border-gray-300'
                    } flex items-center justify-center`}>
                      {isSelected && (
                        <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                  )}
                  <span className={`text-11 md:text-12 font-pre-thin leading-none transition-colors ${
                    option.label.includes('삭제') ? 'text-red-500 hover:text-red-600' : 
                    option.label === '전체' ? 'text-main200' :
                    isSelected ? 'text-blue' : 'text-main200 hover:text-blue'
                  }`}>
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default Dropdown;