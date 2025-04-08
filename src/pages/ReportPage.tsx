import React, { useState, useCallback, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
// import { getMyAllAccounts } from "../apis/manage/getMyAllAccounts";
// 데이터 import
import {
  DataItem,
  initialData,
  initialColumns,
  fieldMapping,
  columnWidths,
  getDropdownSections,
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
  column,
}: {
  column: string;
  content: string;
  isLastRow: boolean;
  isLastColumn: boolean;
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // 콤마 추가 처리를 위한 함수
  const formatNumberWithComma = (value: string): string => {
    // 숫자인 경우 콤마 추가
    if (!isNaN(Number(value)) && ['입금', '출금', '잔액'].includes(column)) {
      return Number(value).toLocaleString('ko-KR');
    }
    return value;
  };

  // 포맷팅된 콘텐츠
  const formattedContent = formatNumberWithComma(content);

  // 텍스트가 오버플로우되는지 체크
  useEffect(() => {
    if (cellRef.current) {
      const isTextOverflowing =
        cellRef.current.scrollWidth > cellRef.current.clientWidth;
      setIsOverflowing(isTextOverflowing);
    }
  }, [formattedContent]);

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
      {formattedContent}
      {isOverflowing && <ContentTooltip content={formattedContent} />}
      {isLastRow && isLastColumn && <div className="last-row-cell"></div>}
    </td>
  );
};

function ReportPage() {
  // useParams에서 ':accountId' 형식의 URL 파라미터를 가져옴
  const params = useParams();
  // URL에서 accountId 추출 - /report/{accountId} 형식 활용
  const accountId = params.accountId || window.location.pathname.split('/report/')[1];
  
  const accounts = useAccountStore((state) => state.accounts);
  // 선택된 accountId에 해당하는 계좌 정보 찾기
  const selectedAccount = accounts.find(
    (account) => account.accountId === Number(accountId)
  );
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [tableData, setTableData] = useState<DataItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
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

  // dropdownSections 상태 추가
  const [dropdownSections, setDropdownSections] = useState(getDropdownSections([]));

  // useTransactionStore에서 필요한 상태와 메서드 가져오기
  const fetchTransactions = useTransactionStore(state => state.fetchTransactions);
  const transactions = useTransactionStore(state => state.transactions);

  // accounts가 비어있을 때 계좌 정보를 가져오는 API 호출
  // const setAccounts = useAccountStore((state) => state.setAccounts);

  // useEffect(() => {
  //   // accounts 배열이 비어있을 때만 API 호출
  //   if (accounts.length === 0 && accountId) {
  //     const fetchAccounts = async () => {
  //       try {
  //         // getMyAllAccounts API를 import 해야 함
  //         const accountData = await getMyAllAccounts();
  //         setAccounts(accountData);
  //       } catch (error) {
  //         console.error("계좌 정보를 가져오는 중 오류가 발생했습니다:", error);
  //       }
  //     };
      
  //     fetchAccounts();
  //   }
  // }, [accounts.length, accountId, setAccounts]);

  // 필터링된 데이터를 계산하는 함수를 먼저 선언
  const getFilteredData = useCallback(
    (baseData: DataItem[]) => {
      let filteredData = [...baseData];

      // 날짜 필터 적용
      if (selectedDateRange) {
        const parseDate = (dateStr: string) => {
          return new Date(dateStr);
        };

        filteredData = filteredData.filter((item) => {
          const itemDate = parseDate(item.transactionDate);
          // 종료일의 다음날 00:00:00으로 설정하여 해당 날짜의 모든 거래가 포함되도록 함
          const endDate = new Date(selectedDateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          endDate.setHours(0, 0, 0, 0);
          
          return (
            itemDate >= selectedDateRange.from &&
            itemDate < endDate
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
            filters.includes('입금이 "0" 인 거래내역 숨기기')
          ) {
            filteredData = filteredData.filter((item) => item.transactionType !== "WITHDRAWAL");
          }
          if (
            column === "출금" &&
            filters.includes('출금이 "0" 인 거래내역 숨기기')
          ) {
            filteredData = filteredData.filter((item) => item.transactionType !== "DEPOSIT");
          }
        }
      });

      return filteredData;
    },
    [selectedDateRange, selectedCategories, selectedFilters]
  );

  // tableData 상태를 transactions로 업데이트
  useEffect(() => {
    if (!transactions.length) return;
    
    // 필터가 적용되지 않은 경우에만 업데이트
    if (!selectedDateRange && selectedCategories.length === 0 && 
        selectedFilters.입금.length === 0 && selectedFilters.출금.length === 0) {
      setTableData(transactions);
    } else {
      // 필터가 적용된 경우 getFilteredData 사용
      const filteredData = getFilteredData(transactions);
      setTableData(filteredData);
    }
  }, [transactions, selectedDateRange, selectedCategories, selectedFilters, getFilteredData]);

  // 거래내역 조회
  useEffect(() => {
    const fetchData = async () => {
      if (!accountId || isLoading) return;

      try {
        setIsLoading(true);
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}${month}${day}`;
        };

        const response = await fetchTransactions({
          accountId: Number(accountId),
          pageSize: 30,
          pageNo: currentPage,
          startDate: formatDate(oneYearAgo),
          endDate: formatDate(today),
          orderType: 'DESC'
        });

        if (response && response.length > 0) {
          setHasMore(response.length === 30);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("거래내역 조회 실패:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accountId, currentPage, fetchTransactions]);

  // accountId가 변경될 때 초기화
  useEffect(() => {
    if (accountId) {
      setCurrentPage(0);
      setHasMore(true);
      setTableData([]); // 기존 데이터 초기화
      setSelectedDateRange(null);
      setSelectedCategories([]);
      setSelectedFilters({ 입금: [], 출금: [] });
    }
  }, [accountId]);

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

  // 필터 변경시 데이터 업데이트 제거 (위의 useEffect에서 처리)
  // useEffect(() => {
  //   const filteredData = getFilteredData(transactions);
  //   setTableData(filteredData);
  // }, [selectedDateRange, selectedCategories, selectedFilters, getFilteredData, transactions]);

  // 필터 초기화 함수 수정
  const handleResetFilter = useCallback((columnName: string) => {
    setSelectedFilters((prev) => ({ ...prev, [columnName]: [] }));
    // transactions를 정렬해서 설정
    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = new Date(`${a.transactionDate} ${a.transactionTime}`);
      const dateB = new Date(`${b.transactionDate} ${b.transactionTime}`);
      return dateA.getTime() - dateB.getTime(); // 과거순 정렬
    });
    setTableData(sortedTransactions);
  }, [transactions]);

  // 날짜 포맷팅 함수 수정 (출력 형식을 YYYY.MM.DD로 유지)
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
      // YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
      return new Date(item.transactionDate);
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
      const row: Record<string, string | number> = {};
      columns.forEach((column) => {
        const field = fieldMapping[column];
        if (typeof field === 'function') {
          row[column] = field(item);
        } else {
          row[column] = item[field];
        }
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

  // transactions가 업데이트될 때마다 dropdownSections 업데이트
  useEffect(() => {
    setDropdownSections(getDropdownSections(transactions));
  }, [transactions]);

  // 스크롤 이벤트 핸들러 수정
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const threshold = scrollHeight - clientHeight;
    
    // 스크롤이 바닥에 도달했고, 로딩 중이 아니며, 더 불러올 데이터가 있는 경우
    if (!isLoading && hasMore && scrollTop >= threshold - 50) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoading, hasMore]);

  // handleResetAllFilters 함수 수정
  const handleResetAllFilters = useCallback(() => {
    // 페이지 새로고침 수행
    window.location.reload();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="content bg-white flex justify-center">
        <div className="max-w-[1000px] w-full">
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

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAllFilters}
                className="border border-gray-300 hover:bg-gray-50 text-main200 px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-pre-bold text-12 md:text-14"
              >
                필터 초기화
              </button>
              
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
                          dropdownSections={dropdownSections}
                        />
                      ))}
                    </tr>
                  </thead>
                </table>
                {/* 그라데이션 선 - 헤더와 함께 고정 */}
                <div className="h-[1px] w-full bg-gradient-to-r from-[#3262DE] to-[#9A1EBC]"></div>
              </div>

              {/* 데이터 영역 - 스크롤 가능 */}
              <div 
                className="overflow-y-auto max-h-[calc(100vh-300px)] md:h-[400px] relative custom-scrollbar min-w-[600px] overscroll-none"
                onScroll={handleScroll}
                style={{ 
                  scrollBehavior: 'auto',
                  overflowAnchor: 'none'
                }}
              >
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
                        key={`${item.id}-${item.transactionDate}-${idx}`}
                        className={`hover:bg-gray-50 ${idx === tableData.length - 1 ? "last-row" : ""}`}
                      >
                        {columns.map((column, index) => {
                          const field = fieldMapping[column];
                          let content;
                          if (typeof field === 'function') {
                            content = String(field(item));
                          } else {
                            content = String(item[field]);
                          }
                          return (
                            <TableCell
                              key={`${item.id}-${index}`}
                              column={column}
                              content={content}
                              isLastRow={idx === tableData.length - 1}
                              isLastColumn={index === columns.length - 1}
                            />
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isLoading && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">데이터를 불러오는 중...</p>
                  </div>
                )}
                {!hasMore && tableData.length > 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">모든 데이터를 불러왔습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default ReportPage;
