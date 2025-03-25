import { CiReceipt } from "react-icons/ci";
import CategoryCard from "./CategoryCard";

interface TransactionProp {
  transaction: Transaction;
}

const TransactionCard = ({transaction}:TransactionProp) => {

  const calcTransactionDate = (date: string): string => {
    return `${date.substring(2,4)}.${date.substring(4,6)}.${date.substring(6, 8)}`;
  }
  const calcTransactipnTime = (time: string): string => {
    let hour = parseInt(time.substring(0, 2));
    const minute = time.substring(2, 4);
    const period = hour>=12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  }

  const calcBalance = (balance: number, type: string):string => {
    const typeStr = type==='1'? '+' : '-'
    return `${typeStr} ${balance.toLocaleString()}`;
  }

  const category:Category = {
    categoryId: transaction.categoryId,
    categoryName: transaction.categoryName
  }

  return (
    <div className='border p-4 rounded-xl border-[#E0E8F2] border-opacity-60'>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-pre-extrabold text-16 pr-2 line-clamp-1 text-ellipsis">{transaction.transactionSummary}</div>
          <div className="flex gap-1 text-12 text-[#26273A] text-opacity-60">
            <div>{calcTransactionDate(transaction.transactionDate)}</div>
            <div>{calcTransactipnTime(transaction.transactionDate)}</div>
          </div>
        </div>
        <div className="font-pre-bold text-16">{calcBalance(transaction.transactionBalance, transaction.transactionType)}</div>
      </div>
      <div className="pt-1 whitespace-pre-line text-start text-12">{transaction.detail}</div>
      <div className="flex justify-between pt-1 items-center">
        <div className="pe-3">
          <CategoryCard category={category} />
        </div>
        <div className="items-end"><CiReceipt className="h-5 w-5" /></div>
      </div>
    </div>
  );
}

export default TransactionCard;