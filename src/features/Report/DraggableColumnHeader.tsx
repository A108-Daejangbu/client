// 필요한 라이브러리와 컴포넌트들을 임포트
import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';  // 드래그 앤 드롭 기능을 위한 훅
import Dropdown from './Dropdown';
import { dropdownSections } from '../../dummy/reportData';

// 컴포넌트 props 타입 정의
interface DraggableColumnHeaderProps {
  column: string;                // 컬럼 이름
  index: number;                 // 컬럼 순서 인덱스
  moveColumn: (fromIndex: number, toIndex: number) => void;  // 컬럼 위치 변경 함수
  onDelete: (columnName: string) => void;                    // 컬럼 삭제 함수
  onFilter?: (columnName: string, option: string) => void;   // 필터 적용 함수
  onResetFilter?: (columnName: string) => void;              // 필터 초기화 함수
  onCategoryFilter?: (category: string) => void;             // 카테고리 필터 함수
  selectedCategories?: string[];                             // 선택된 카테고리 목록
  onDateFilter?: (dates: { from: Date; to: Date }) => void; // 날짜 필터 함수
  selectedDateRange?: { from: Date; to: Date } | null;       // 선택된 날짜 범위
  selectedFilters?: Record<string, string[]>;                // 선택된 필터 상태
}

// 드래그 앤 드롭을 위한 아이템 타입 정의
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
  // 드롭다운 메뉴의 열림/닫힘 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 헤더 요소에 대한 ref
  const headerRef = useRef<HTMLTableCellElement | null>(null);

  // useDrag: 드래그 기능 설정
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',  // 드래그 아이템 타입
    item: (): ColumnItem => ({
      index,
      type: 'COLUMN'
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()  // 현재 드래그 중인지 상태 확인
    })
  });

  // useDrop: 드롭 기능 설정
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'COLUMN',  // 받아들일 수 있는 드래그 아이템 타입
    canDrop: (item: ColumnItem) => item.index !== index,  // 같은 위치에는 드롭 불가
    drop: (item: ColumnItem) => {
      if (item.index !== index) {
        moveColumn(item.index, index);  // 컬럼 위치 변경
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),    // 드래그 아이템이 위에 있는지
      canDrop: monitor.canDrop()   // 드롭 가능한지
    })
  });

  // 드롭다운 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);  // 외부 클릭시 드롭다운 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 헤더 클릭 핸들러
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    setIsDropdownOpen(!isDropdownOpen);  // 드롭다운 토글
  };

  // 드롭다운 옵션 선택 핸들러
  const handleSelect = (option: string) => {
    if (option.includes('삭제')) {
      onDelete(column);  // 컬럼 삭제
    } else if (column === '카테고리') {
      onCategoryFilter?.(option);  // 카테고리 필터 적용
    } else if (['입금', '출금'].includes(column)) {
      onFilter?.(column, option);  // 입출금 필터 적용
      if (option.includes('필터링')) {
        setIsDropdownOpen(false);  // 필터 적용 후 드롭다운 닫기
      }
    } else if (option === '전체') {
      onResetFilter?.(column);  // 필터 초기화
    }
  };

  // 날짜 필터 선택 핸들러
  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    onDateFilter?.({ from, to });
  };

  // 드래그 중일 때의 스타일 설정
  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver && canDrop ? 'rgba(0, 0, 0, 0.1)' : 'white';

  // drag와 drop ref를 결합
  const combinedRef = React.useCallback(
    (node: HTMLTableCellElement | null) => {
      headerRef.current = node;
      drag(drop(node));
    },
    [drag, drop]
  );

  // 드롭다운 위치 계산을 위한 함수 추가
  const updateDropdownPosition = () => {
    if (headerRef.current && isDropdownOpen) {
      const rect = headerRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty('--dropdown-top', `${rect.bottom}px`);
      document.documentElement.style.setProperty('--dropdown-left', `${rect.left}px`);
    }
  };

  // 드롭다운이 열릴 때마다 위치 업데이트
  useEffect(() => {
    if (isDropdownOpen) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isDropdownOpen]);

  // 렌더링
  return (
    <th 
      ref={combinedRef}
      className={`px-2 md:px-6 pt-3 md:pt-5 pb-2 md:pb-3 text-center relative`}
      style={{ 
        cursor: 'move',
        opacity,
        backgroundColor,
        transition: 'background-color 0.2s ease'
      }}
      onClick={handleClick}
    >
      {/* 컬럼 헤더 텍스트와 드롭다운 화살표 */}
      <div className="w-full text-center whitespace-nowrap text-12 md:text-14 font-pre-light text-main200 hover:text-purple">
        {column}
        <svg 
          className={`w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 inline-block transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 드롭다운 메뉴 컴포넌트 */}
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