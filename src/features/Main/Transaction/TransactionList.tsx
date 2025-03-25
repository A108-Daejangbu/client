import React, { useState } from 'react';
// import TransactionCard from './TransactionCard';
import { transactions } from '../../../dummy/transactions';
import TransactionMonthNavi from './TransactionMonthNavi';
import TransactionFiltering from './TransactionFiltering';

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
      {/* <TransactionCard transaction={transactions[6]} /> */}
    </div>
  );
}

export default TransactionList;