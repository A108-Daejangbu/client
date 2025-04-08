import { useCallback, useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import TransactionMonthNavi from "./TransactionMonthNavi";
import TransactionFiltering from "./TransactionFiltering";

import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { getMyCategories } from "../../../apis/transaction/getMyCategories";
import { useTransactionStore } from "../../../stores/useTransactionStore";
import { endDate, startDate } from "../../../utils/date";
import { TransactionReq } from "../../../types/Transaction";
import { useTransactionFilterStore } from "../../../stores/useTransactionFilterStore";
import { useNavigate } from "react-router-dom";
import { useReceiptStore } from "../../../stores/useReceiptStore";
import { getReceipts } from "../../../apis/receipt/getReceipts";

interface TransactionListProps {
  accountId: string | undefined
}

const TransactionList = ({accountId} : TransactionListProps) => {
  const navigate = useNavigate();

  const date = new Date()
  const [currDate, setCurrDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear(),
  });

  const [filterOptions, setFilterOptions] = useState<Partial<TransactionReq>>({});

  const transactions = useTransactionStore((state) => state.transactions)
  const categoryList = useTransactionStore((state) => state.categories)
  const setCategories = useTransactionStore((state) => state.setCategories)
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions)

  const filters = useTransactionFilterStore((state) => state.filters);
  const resetFilters = useTransactionFilterStore((state) => state.resetFilters);
  const setRecetips = useReceiptStore((state) => state.setReceipt)

  const fetchCategories = useCallback(async (accountId: string) => {
    const data = await getMyCategories(accountId);
    setCategories(data);
  }, [setCategories])

  const handleFilterChange = (updated: Partial<TransactionReq>) => {
    setFilterOptions((prev) => ({ ...prev, ...updated }));
  };

  useEffect(() => {
    if(!accountId) return;

    const init = async() => {

      try{
  
        await fetchCategories(accountId);
        resetFilters();
    
        // 기본 거래내역 조회
        const req: TransactionReq = {
          accountId: Number(accountId),
          pageSize: 30,
          pageNo: 0,
          startDate,
          endDate,
          ...filters
        };
        await fetchTransactions(req);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }catch (error){
        navigate('/error')
      }
    }

    init();
  }, [accountId])

  // 필터 변경 시 거래내역 다시 요청
  useEffect(() =>{
    if(!accountId) return;

    const applySearchFilter = async () => {
      try{
        const req: TransactionReq = {
          accountId: Number(accountId),
          pageSize: 30,
          pageNo: 0,
          startDate: filterOptions.startDate ?? startDate,
          endDate: filterOptions.endDate ?? endDate,
          // ...filterOptions,
          ...filters
        };
    
        await fetchTransactions(req);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }catch(error){
        navigate('/error')
      }
    }
    applySearchFilter()

  }, [filters])

  const setSelectedTransactionId = useReceiptStore((state) => state.setSelectedTransactionId)
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const handleModalToggle = async (transactionId: string) => {
    const data = await getReceipts(transactionId);
    setRecetips([...data]);
    setSelectedTransactionId(transactionId)
    setActiveModalId((prev) => (prev === transactionId ? null : transactionId));
  };

  return (
    <div className="">
      <TransactionMonthNavi currDate={currDate} setCurrDate={setCurrDate} />
      <TransactionFiltering 
      categories={categoryList}
      onFilterChange={handleFilterChange} />

      {/* 타임라인 형식의 transaction card들 */}
      <div className="relative py-3">
        {/* 타임라인 세로선 */}
        {transactions.length !== 0 && <div className="absolute left-1/2 top-20 h-full w-[1px] bg-[#707070] z-0  hidden md:block" />}

        {/* 거래내역 */}
        { transactions.length !== 0 ? 
        <div className="flex flex-col md:gap-1 gap-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="relative z-10 flex justify-between items-center w-full"
            >
              {/* 왼쪽 카드 (거래 유형 = 입금(1)) */}
              {tx.transactionType === "DEPOSIT" ? (
                <>
                  <div className="md:w-[50%] w-[80%] flex justify-between">
                    <TransactionCard
                      transaction={tx}
                      isInline={true}
                      isModalOpen={activeModalId === tx.id.toString()}
                      onModalToggle={() => handleModalToggle(tx.id.toString())}
                    />
                    <div className="flex items-center">
                      {/* <span className='font-pre-extralight text-main200'>&lt;</span> */}
                      <GoTriangleLeft className="h-3 w-3 text-main200  hidden md:block" />
                      <div className="self-center w-8 border-t border-dashed border-main200  hidden md:block" />
                    </div>
                  </div>
                  <div className="md:w-[50%] w-[20%]" />
                </>
              ) : (
                /* 오른쪽 카드 (거래 유형 = 출금(2)) */
                <>
                  <div className="md:w-[50%] w-[20%]" />
                  <div className="md:w-[50%] w-[80%] flex justify-between">
                    <div className="flex items-center">
                      <div className="self-center w-8 border-t border-dashed border-main200  hidden md:block" />
                      <GoTriangleRight className="h-3 w-3 text-main200  hidden md:block" />
                    </div>
                    <TransactionCard
                      transaction={tx}
                      isInline={true}
                      isModalOpen={activeModalId === tx.id.toString()}
                      onModalToggle={() => handleModalToggle(tx.id.toString())}
                    />
                  </div>
                </>
              )}

              {/* 타임라인 점 */}
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-main200  hidden md:block" />
            </div>
          ))}
        </div> : <div className="text-main200 justify-self-center">아직 거래내역이 없습니다.</div>
        }
      </div>
    </div>
  );
};

export default TransactionList;
