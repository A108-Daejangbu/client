import React, { useState } from 'react';
import TransactionCard from './TransactionCard';
import { transactions } from '../../../dummy/transactions';
import TransactionMonthNavi from './TransactionMonthNavi';
import TransactionFiltering from './TransactionFiltering';

import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

const TransactionList = () => {
  const date = new Date();
  const [currDate, setCurrDate] = useState({month: date.getMonth(), year: date.getFullYear()});

  const categoryMap = new Map<number, string>();

  transactions.forEach(tx => {
    if (!categoryMap.has(tx.categoryId)) {
      categoryMap.set(tx.categoryId, tx.categoryName);
    }
  });

  const categoryList: Category[] = Array.from(categoryMap.entries()).map(([categoryId, categoryName]) => ({
    categoryId,
    categoryName,
  }));



  return (
    <div className=''>
      <TransactionMonthNavi currDate={currDate} setCurrDate={setCurrDate}/>
      <TransactionFiltering categories={categoryList} />

      {/* 타임라인 형식의 transaction card들 */}
      <div className='relative py-3'>
        {/* 타임라인 세로선 */}
        <div className="absolute left-1/2 top-20 h-full w-[1px] bg-[#707070] z-0  hidden md:block" />

        {/* 거래내역 */}
        <div className="flex flex-col md:gap-1 gap-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="relative z-10 flex justify-between items-center w-full">
              {/* 왼쪽 카드 (거래 유형 = 입금(1)) */}
              {tx.transactionType === '1' ? (
                <>
                  <div className="md:w-[50%] w-[80%] flex justify-between">
                    <TransactionCard transaction={tx} isInline={true} />
                    <div className='flex items-center'>
                      {/* <span className='font-pre-extralight text-main200'>&lt;</span> */}
                      <GoTriangleLeft className='h-3 w-3 text-main200  hidden md:block' />
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
                    <div className='flex items-center'>
                      <div className="self-center w-8 border-t border-dashed border-main200  hidden md:block" />
                      <GoTriangleRight className='h-3 w-3 text-main200  hidden md:block' />
                    </div>
                    <TransactionCard transaction={tx} isInline={true} />
                  </div>
                </>
              )}

              {/* 타임라인 점 */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-main200  hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;