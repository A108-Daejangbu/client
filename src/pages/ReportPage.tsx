import React, { useState, useCallback, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// 데이터 import
import {
  DataItem,
  initialData,
  initialColumns,
  fieldMapping,
  columnWidths,
} from "../dummy/reportData";
import DraggableColumnHeader from "../features/Report/DraggableColumnHeader";
import * as XLSX from "xlsx";
import { useTransactionStore } from "../stores/useTransactionStore"; // 스토어 import 추가
import { useAccountStore } from "../stores/useAccountStore";

// // 타입 정의
// interface ColumnItem {
//   index: number;
//   type: "COLUMN";
// }

// 툴팁 컴포넌트 수정
const ContentTooltip = ({ content }: { content: string }) => (
  <div
    className="fixed hidden group-hover:block bg-white p-2 md:p-3 min-w-[100px] max-w-[300px] z-[9999] rounded-lg shadow-lg"
    style={{
      top: "calc(var(--mouse-y) + 10px)",
      left: "min(calc(var(--mouse-x) + 10px), calc(100vw - 320px))",
      border: "1px solid transparent",
      backgroundImage:
        "linear-gradient(white, white), linear-gradient(to right, #3E6FFA, #7953FF)",
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
    }}
  >
    <p className="text-12 md:text-14 font-pre-regular text-main200 whitespace-normal break-words">
      {content}
    </p>
  </div>
);

// 테이블 셀 컴포넌트 수정
const TableCell = ({
  // column,
  content,
  isLastRow,
  isLastColumn,
}: {
  column: string;
  content: string;
  isLastRow: boolean;
  isLastColumn: boolean;
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // 텍스트가 오버플로우되는지 체크
  useEffect(() => {
    if (cellRef.current) {
      const isTextOverflowing =
        cellRef.current.scrollWidth > cellRef.current.clientWidth;
      setIsOverflowing(isTextOverflowing);
    }
  }, [content]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOverflowing) {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  };

  return (
    <td
      ref={cellRef}
      className={`px-2 md:px-4 py-1.5 md:py-2 text-center whitespace-nowrap font-pre-regular text-12 md:text-14 text-main200 truncate ${isOverflowing ? "group relative" : ""}`}
      onMouseMove={handleMouseMove}
    >
      {content}
      {isOverflowing && <ContentTooltip content={content} />}
      {isLastRow && isLastColumn && <div className="last-row-cell"></div>}
    </td>
  );
};

function ReportPage() {
  const accountId = useAccountStore((state) => state.selectedAccountId);
  const accounts = useAccountStore((state) => state.accounts);
  // 선택된 accountId에 해당하는 계좌 정보 찾기
  const selectedAccount = accounts.find(
    (account) => account.accountId === Number(accountId)
  );
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [tableData, setTableData] = useState<DataItem[]>(initialData);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    입금: [],
    출금: [],
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);

  // fieldMapping과 columnWidths는 import해서 사용

  // useTransactionStore에서 필요한 상태와 메서드 가져오기
  const fetchTransactions = useTransactionStore(state => state.fetchTransactions);
  const transactions = useTransactionStore(state => state.transactions);
  const isLoading = useTransactionStore(state => state.isLoading);

  // 컴포넌트 마운트 시 거래내역 조회
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchTransactions({
          accountId: 1,
          pageSize: 10,
          pageNo: 1,
          startDate: "20240701",
          endDate: "20240731",
          type: "DEPOSIT",
          searchOption: "ALL"
        });
      } catch (error) {
        console.error("거래내역 조회 실패:", error);
      }
    };

    fetchInitialData();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

  // tableData 상태를 transactions로 업데이트
  useEffect(() => {
    setTableData(transactions);
  }, [transactions]);

  // 컬럼 순서 변경 함수
  const moveColumn = useCallback((fromIndex: number, toIndex: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const [movedColumn] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, movedColumn);
      return newColumns;
    });
  }, []);

  // 컬럼 삭제 함수 추가
  const handleColumnDelete = useCallback((columnName: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col !== columnName)
    );
  }, []);

  // 컬럼 너비 얻기
  const getColumnWidth = (column: string): string => {
    const index = initialColumns.indexOf(column);
    return index !== -1 ? columnWidths[index] : "14%";
  };

  // 필터링된 데이터를 계산하는 함수
  const getFilteredData = useCallback(
    (baseData: DataItem[]) => {
      let filteredData = [...baseData];

      // 날짜 필터 적용
      if (selectedDateRange) {
        const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split(".").map(Number);
          return new Date(year, month - 1, day);
        };

        filteredData = filteredData.filter((item) => {
          const itemDate = parseDate(item.transactionDate);
          return (
            itemDate >= selectedDateRange.from &&
            itemDate <= selectedDateRange.to
          );
        });
      }

      // 카테고리 필터 적용
      if (selectedCategories.length > 0) {
        filteredData = filteredData.filter((item) =>
          selectedCategories.includes(item.categoryName)
        );
      }

      // 입금/출금 필터 적용
      Object.entries(selectedFilters).forEach(([column, filters]) => {
        if (filters.length > 0) {
          if (
            column === "입금" &&
            filters.includes('입금이 "-" 인 거래내역 숨기기')
          ) {
            filteredData = filteredData.filter((item) => item.transactionType !== "DEPOSIT");
          }
          if (
            column === "출금" &&
            filters.includes('출금이 "-" 인 거래내역 숨기기')
          ) {
            filteredData = filteredData.filter((item) => item.transactionType !== "WITHDRAW");
          }
        }
      });

      return filteredData;
    },
    [selectedDateRange, selectedCategories, selectedFilters]
  );

  // 필터링 처리 함수 수정
  const handleFilter = useCallback((columnName: string, option: string) => {
    if (option === "전체") {
      setSelectedFilters((prev) => ({ ...prev, [columnName]: [] }));
    } else {
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        const filterOption = option;

        // 이미 선택된 옵션이면 제거, 아니면 추가
        newFilters[columnName] = prev[columnName]?.includes(filterOption)
          ? [] // 선택 해제시 빈 배열로 초기화
          : [filterOption]; // 선택시 해당 옵션만 배열에 추가

        return newFilters;
      });
    }
  }, []);

  // 카테고리 필터링 함수 수정
  const handleCategoryFilter = useCallback((category: string) => {
    if (category === "전체") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category];
        return newCategories;
      });
    }
  }, []);

  // 날짜 필터링 함수 수정
  const handleDateFilter = useCallback(
    ({ from, to }: { from: Date; to: Date }) => {
      setSelectedDateRange({ from, to });
    },
    []
  );

  // 필터 변경시 데이터 업데이트
  useEffect(() => {
    const filteredData = getFilteredData(initialData);
    setTableData(filteredData);
  }, [selectedDateRange, selectedCategories, selectedFilters, getFilteredData]);

  // 필터 초기화 함수
  const handleResetFilter = useCallback((columnName: string) => {
    setSelectedFilters((prev) => ({ ...prev, [columnName]: [] }));
    setTableData(initialData);
  }, []);

  // 날짜 포맷팅 함수 수정
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // getDisplayDateRange 함수 수정
  const getDisplayDateRange = useCallback(() => {
    // 선택된 날짜 범위가 있는 경우
    if (selectedDateRange) {
      return {
        from: formatDate(selectedDateRange.from),
        to: formatDate(selectedDateRange.to),
      };
    }

    // 전체 데이터의 날짜 범위 계산
    const dates = tableData.map((item) => {
      // YYYY.MM.DD 형식의 문자열을 Date 객체로 변환
      const [year, month, day] = item.transactionDate.split(".").map(Number);
      return new Date(year, month - 1, day);
    });

    if (dates.length === 0) return null;

    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return {
      from: formatDate(minDate),
      to: formatDate(maxDate),
    };
  }, [selectedDateRange, tableData]);

  const dateRange = getDisplayDateRange();

  // 엑셀 다운로드 함수 수정
  const handleDownloadExcel = useCallback(() => {
    // 현재 표시된 데이터와 컬럼을 기반으로 워크시트 데이터 생성
    const worksheetData = tableData.map((item) => {
      const row: Record<string, string | number | boolean | null | undefined> =
        {};
      columns.forEach((column) => {
        const field = fieldMapping[column];
        row[column] = item[field];
      });
      return row;
    });

    // 워크북 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // 열 너비 설정
    const columnWidths = columns.map((column) => ({
      wch: column === "비고" ? 30 : 15, // 비고 열은 더 넓게, 나머지는 15
    }));
    worksheet["!cols"] = columnWidths;

    // 워크시트를 워크북에 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, "거래내역");

    // 파일 이름 생성 (거래내역 조회기간 기준)
    const range = getDisplayDateRange();
    const fileName = range
      ? `대장부_거래내역_보고서_${range.from}_${range.to}.xlsx`
      : `대장부_거래내역_보고서.xlsx`;

    // 엑셀 파일 다운로드
    XLSX.writeFile(workbook, fileName);
  }, [tableData, columns, fieldMapping, getDisplayDateRange]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content bg-white flex justify-center">
        <div className="max-w-[900px] w-full">
          {/* 헤더 */}
          <div className="mb-[30px]">
            <h1 className="font-pre-extrabold text-[28px] text-center text-main200">
              {selectedAccount?.accountNickname}
            </h1>
          </div>

          {/* Preview 섹션과 다운로드 버튼 */}
          <div className="mx-4 mb-2 flex justify-between items-center">
            <div>
              <h2 className="font-pre-semibold text-20 text-main200">
                Preview
              </h2>
              <div className="flex items-center gap-2 text-gray200 font-pre-bold text-10">
                {dateRange ? (
                  <>
                    <span>{dateRange.from}</span>
                    <span>~</span>
                    <span>{dateRange.to}</span>
                  </>
                ) : (
                  <span>데이터 없음</span>
                )}
              </div>
            </div>

            <button
              onClick={handleDownloadExcel}
              className="bg-gradient-to-r from-blue to-purple hover:opacity-80 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 font-pre-bold text-12 md:text-14"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="hidden sm:inline">보고서 다운받기</span>
              <span className="sm:hidden">다운로드</span>
            </button>
          </div>

          {/* 테이블 컨테이너 */}
          {/* shadow-[1.44px_2.16px_20.14px_rgba(0,0,0,0.2)] */}
          <div className="bg-white rounded-xl overflow-hidden mx-auto border border-gray-200">
            <div className="overflow-x-auto overflow-y-hidden rounded-xl">
              <div className="sticky top-0 z-10 bg-white min-w-[600px]">
                {" "}
                {/* 최소 너비 설정 */}
                <table
                  className="w-full border-collapse"
                  style={{ tableLayout: "fixed" }}
                >
                  <colgroup>
                    {columns.map((column, index) => (
                      <col
                        key={index}
                        style={{ width: getColumnWidth(column) }}
                      />
                    ))}
                  </colgroup>

                  {/* 테이블 헤더 - 드래그 가능 */}
                  <thead className="rounded-xl">
                    <tr className="rounded-xl">
                      {columns.map((column, index) => (
                        <DraggableColumnHeader
                          key={`${column}-${index}`}
                          column={column}
                          index={index}
                          moveColumn={moveColumn}
                          onDelete={handleColumnDelete}
                          onFilter={handleFilter}
                          onResetFilter={handleResetFilter}
                          onCategoryFilter={handleCategoryFilter}
                          selectedCategories={selectedCategories}
                          onDateFilter={handleDateFilter}
                          selectedDateRange={selectedDateRange}
                          selectedFilters={selectedFilters}
                        />
                      ))}
                    </tr>
                  </thead>
                </table>
                {/* 그라데이션 선 - 헤더와 함께 고정 */}
                <div className="h-[1px] w-full bg-gradient-to-r from-[#3262DE] to-[#9A1EBC]"></div>
              </div>

              {/* 데이터 영역 - 스크롤 가능 */}
              <div className="overflow-y-auto max-h-[calc(100vh-300px)] md:h-[400px] relative custom-scrollbar min-w-[600px]">
                <div
                  className="absolute inset-0 pointer-events-none rounded-b-xl bg-white"
                  style={{ zIndex: -1 }}
                ></div>
                <table
                  className="w-full border-collapse relative"
                  style={{ tableLayout: "fixed" }}
                >
                  <colgroup>
                    {columns.map((column, index) => (
                      <col
                        key={index}
                        style={{ width: getColumnWidth(column) }}
                      />
                    ))}
                  </colgroup>

                  {/* 데이터 행 */}
                  <tbody className="bg-white">
                    {tableData.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 ${idx === tableData.length - 1 ? "last-row" : ""}`}
                      >
                        {columns.map((column, index) => {
                          const field = fieldMapping[column];
                          return (
                            <TableCell
                              key={`${item.id}-${index}`}
                              column={column}
                              content={String(item[field])}
                              isLastRow={idx === tableData.length - 1}
                              isLastColumn={index === columns.length - 1}
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
