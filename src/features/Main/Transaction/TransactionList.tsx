import React, { useState } from 'react';
import TransactionCard from './TransactionCard';
import { transactions } from '../../../dummy/transactions';
import TransactionListNavi from './TransactionListNavi';

const TransactionList = () => {
  const date = new Date();
  const [currDate, setCurrDate] = useState({month: date.getMonth(), year: date.getFullYear()});


  return (
    <div className=''>

      <TransactionListNavi currDate={currDate} setCurrDate={setCurrDate}/>
      {/* <TransactionCard transaction={transactions[6]} /> */}
    </div>
  );
}

export default TransactionList;