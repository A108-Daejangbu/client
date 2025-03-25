import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// 데이터 import
import { 
  DataItem, 
  initialData, 
  initialColumns, 
  fieldMapping, 
  columnWidths 
} from '../dummy/reportData';

// 타입 정의
interface ColumnItem {
  index: number;
  type: 'COLUMN';
}

// 드래그 가능한 칼럼 헤더 컴포넌트
const DraggableColumnHeader = ({ column, index, moveColumn }: { 
  column: string; 
  index: number; 
  moveColumn: (fromIndex: number, toIndex: number) => void 
}) => {
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

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver && canDrop ? 'rgba(0, 0, 0, 0.1)' : 'white';

  return (
    <th 
      ref={(node) => {
        drag(drop(node));
      }}
      className={`px-6 pt-5 pb-3 text-center`}
      style={{ 
        cursor: 'move',
        opacity,
        backgroundColor,
        transition: 'background-color 0.2s ease'
      }}
    >
      <div className="w-full text-center whitespace-nowrap text-14 font-pre-light text-main200 hover:text-purple">
        {column}
        <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </th>
  );
};

// 툴팁 컴포넌트 분리
const NoteTooltip = ({ content }: { content: string }) => (
  <div 
    className="fixed group-hover:block hidden bg-white p-4 min-w-[200px] max-w-[400px] z-[9999] rounded-lg"
    style={{ 
      top: 'calc(var(--mouse-y) + 10px)',
      left: 'calc(var(--mouse-x) + 10px)',
      border: '1px solid transparent',
      backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #3E6FFA, #7953FF)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }}
  >
    <p className="text-14 font-pre-regular text-main200 whitespace-normal break-words">
      {content}
    </p>
  </div>
);

// 테이블 셀 컴포넌트 분리
const TableCell = ({ 
  column, 
  content, 
}: { 
  column: string;
  content: string;
}) => (
  <td className={`px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200 truncate ${column === '비고' ? 'relative group' : ''}`}>
    {content}
    {column === '비고' && content && <NoteTooltip content={content} />}
  </td>
);

function ReportPage() {
  // initialData를 import해서 사용
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [tableData] = useState<DataItem[]>(initialData);

  // fieldMapping과 columnWidths는 import해서 사용
  
  // 컬럼 순서 변경 함수
  const moveColumn = useCallback((fromIndex: number, toIndex: number) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const [movedColumn] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, movedColumn);
      return newColumns;
    });
  }, []);

  // 컬럼 너비 얻기
  const getColumnWidth = (column: string): string => {
    const index = initialColumns.indexOf(column);
    return index !== -1 ? columnWidths[index] : '14%';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content bg-white flex justify-center">
        <div className="max-w-[900px] w-full">
          {/* 헤더 */}
          <div className="mb-[30px]">
            <h1 className="font-pre-extrabold text-[28px] text-center text-main200">경희대학교 응용수학과</h1>
          </div>

          {/* Preview 섹션과 다운로드 버튼 */}
          <div className="mx-4 mb-1 flex justify-between items-center">
            <div>
              <h2 className="font-pre-semibold text-20 text-main200">Preview</h2>
              <div className="flex items-center gap-2 text-gray200 font-pre-bold text-10">
                <span>2025. 03. 01</span>
                <span>~</span>
                <span>2025. 03. 18</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue to-purple hover:opacity-80 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-pre-bold text-14">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              보고서 다운받기
            </button>
          </div>

          {/* 테이블 컨테이너 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden modal mx-auto">
            <div className="overflow-x-auto">
              {/* 헤더 영역 - 스크롤과 관계없이 고정 */}
              <div className="sticky top-0 z-10 bg-white">
                <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                  <colgroup>
                    {columns.map((column, index) => (
                      <col key={index} style={{ width: getColumnWidth(column) }} />
                    ))}
                  </colgroup>
                  
                  {/* 테이블 헤더 - 드래그 가능 */}
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <DraggableColumnHeader 
                          key={`${column}-${index}`} 
                          column={column} 
                          index={index} 
                          moveColumn={moveColumn} 
                        />
                      ))}
                    </tr>
                  </thead>
                </table>
                
                {/* 그라데이션 선 - 헤더와 함께 고정 */}
                <div className="h-[1px] w-[860px] bg-gradient-to-r from-[#3262DE] to-[#9A1EBC] mx-auto"></div>
              </div>
              
              {/* 데이터 영역 - 스크롤 가능 */}
              <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                  <colgroup>
                    {columns.map((column, index) => (
                      <col key={index} style={{ width: getColumnWidth(column) }} />
                    ))}
                  </colgroup>
                  
                  {/* 데이터 행 */}
                  <tbody className="bg-white">
                    {tableData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {columns.map((column, index) => {
                          const field = fieldMapping[column];
                          return (
                            <TableCell
                              key={`${item.id}-${index}`}
                              column={column}
                              content={String(item[field])}
                            />
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default ReportPage;
