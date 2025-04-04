import { CiReceipt } from "react-icons/ci";
import CategoryCard from "./CategoryCard";
// import { useState } from "react";
import ReciptModal from "../ReciptModal";
import ReactDOM from "react-dom";
import { Transaction } from "../../../types/Transaction";

interface TransactionProp {
  transaction: Transaction;
  isInline?: boolean;
  isModalOpen: boolean;
  onModalToggle: () => void;
}

const TransactionCard = ({
  transaction,
  isInline,
  isModalOpen,
  onModalToggle,
}: TransactionProp) => {
  const calcTransactionDate = (date: string): string => {
    return `${date.substring(2, 4)}.${date.substring(4, 6)}.${date.substring(6, 8)}`;
  };
  const calcTransactipnTime = (time: string): string => {
    let hour = parseInt(time.substring(0, 2));
    const minute = time.substring(2, 4);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const calcBalance = (balance: number, type: string): string => {
    const typeStr = type === "1" ? "+" : "-";
    return `${typeStr} ${balance.toLocaleString()}`;
  };

  const category: Category = {
    categoryId: transaction.categoryId,
    name: transaction.categoryName,
  };

  return (
    <div className="border md:p-4 p-2 rounded-xl border-[#E0E8F2] border-opacity-60 md:w-[40em] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-pre-extrabold md:text-16 text-10 pr-2 line-clamp-1 text-ellipsis">
            {transaction.transactionSummary}
          </div>
          {/* <div className="flex gap-1 text-[10px] text-[#26273A] text-opacity-60 font-pre-medium">
            <div>{calcTransactionDate(transaction.transactionDate)}</div>
            <div>{calcTransactipnTime(transaction.transactionDate)}</div>
          </div> */}
        </div>
        <div className="font-pre-bold md:text-16 text-10">
          {calcBalance(
            transaction.transactionBalance,
            transaction.transactionType
          )}
        </div>
      </div>
      <div className="flex gap-1 md:text-10 text-8 text-[#26273A] text-opacity-60 font-pre-regular">
        <div>{calcTransactionDate(transaction.transactionDate)}</div>
        <div>{calcTransactipnTime(transaction.transactionDate)}</div>
      </div>
      <div className="md:pt-1 pt-0 whitespace-pre-line text-start md:text-12 text-10 font-pre-regular">
        {transaction.detail}
      </div>
      <div className="flex justify-between md:pt-1 pt-0 items-center">
        <div className="pe-3">
          {isInline ? (
            <CategoryCard category={category} isInline={true} />
          ) : (
            <CategoryCard category={category} />
          )}
        </div>
        <div className="items-end relative">
          <CiReceipt
            className="h-5 w-5 cursor-pointer"
            onClick={onModalToggle}
          />
          {isModalOpen &&
            ReactDOM.createPortal(
              <div className="fixed right-20 top-[55%] transform -translate-y-1/2 z-50">
                <ReciptModal
                  date={calcTransactionDate(transaction.transactionDate)}
                  balance={transaction.transactionBalance.toLocaleString()}
                  detail={transaction.detail}
                  onClose={onModalToggle}
                />
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
