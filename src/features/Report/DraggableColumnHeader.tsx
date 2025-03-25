import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Dropdown from './Dropdown';
import { dropdownSections } from '../../dummy/reportData';

interface DraggableColumnHeaderProps {
  column: string;
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  onDelete: (columnName: string) => void;
  onFilter?: (columnName: string, option: string) => void;
  onResetFilter?: (columnName: string) => void;
  onCategoryFilter?: (category: string) => void;
  selectedCategories?: string[];
  onDateFilter?: (dates: { from: Date; to: Date }) => void;
  selectedDateRange?: { from: Date; to: Date } | null;
  selectedFilters?: Record<string, string[]>;
}

interface ColumnItem {
  index: number;
  type: 'COLUMN';
}

const DraggableColumnHeader: React.FC<DraggableColumnHeaderProps> = ({ 
  column, 
  index, 
  moveColumn,
  onDelete,
  onFilter,
  onResetFilter,
  onCategoryFilter,
  selectedCategories = [],
  onDateFilter,
  selectedDateRange,
  selectedFilters = {}
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLTableCellElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: (): ColumnItem => ({
      index,
      type: 'COLUMN'
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'COLUMN',
    canDrop: (item: ColumnItem) => item.index !== index,
    drop: (item: ColumnItem) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option: string) => {
    if (option.includes('삭제')) {
      onDelete(column);
    } else if (column === '카테고리') {
      onCategoryFilter?.(option);
    } else if (['입금', '출금'].includes(column)) {
      onFilter?.(column, option);
      if (option.includes('필터링')) {
        setIsDropdownOpen(false);  // 드롭다운 닫기
      }
    } else if (option === '전체') {
      onResetFilter?.(column);
    }
  };

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    onDateFilter?.({ from, to });
  };

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver && canDrop ? 'rgba(0, 0, 0, 0.1)' : 'white';

  return (
    <th 
      ref={(node) => {
        headerRef.current = node;
        drag(drop(node));
      }}
      className={`px-6 pt-5 pb-3 text-center relative`}
      style={{ 
        cursor: 'move',
        opacity,
        backgroundColor,
        transition: 'background-color 0.2s ease'
      }}
      onClick={handleClick}
    >
      <div className="w-full text-center whitespace-nowrap text-14 font-pre-light text-main200 hover:text-purple">
        {column}
        <svg 
          className={`w-4 h-4 ml-1 inline-block transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <Dropdown
        isOpen={isDropdownOpen}
        sections={dropdownSections[column] || []}
        onClose={() => setIsDropdownOpen(false)}
        onSelect={handleSelect}
        column={column}
        onDateSelect={handleDateSelect}
        selectedCategories={selectedCategories}
        selectedDateRange={selectedDateRange}
        selectedFilters={selectedFilters}
      />
    </th>
  );
};

export default DraggableColumnHeader;