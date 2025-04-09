import { CiReceipt } from "react-icons/ci";
import CategoryCard from "./CategoryCard";
// import { useState } from "react";
import ReciptModal from "../ReciptModal";
import ReactDOM from "react-dom";
import { Transaction } from "../../../types/Transaction";
import HighImportance from "../../../assets/HighImportance.png";

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
    return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)}`;
  };
  const calcTransactipnTime = (time: string): string => {
    let hour = parseInt(time.substring(0, 2));
    const minute = time.substring(2, 4);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const calcBalance = (balance: number, type: string): string => {
    const typeStr = type === "DEPOSIT" ? "+" : "-";
    return `${typeStr} ${balance.toLocaleString()}`;
  };

  const category: Category = {
    categoryId: transaction.categoryId,
    name: transaction.categoryName,
  };

  return (
    <div className="border md:py-2 md:px-6 p-2 px-4 rounded-xl border-[#E0E8F2] border-opacity-60 md:w-[40em] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-pre-extrabold md:text-16 text-[18px] pr-2 line-clamp-1 text-ellipsis">
            {transaction.transactionSummary}
          </div>
        </div>
        <div className="font-pre-bold text-[18px] md:text-16 text-10">
          {calcBalance(
            transaction.transactionBalance,
            transaction.transactionType
          )}
        </div>
      </div>
      <div className="flex gap-1 text-12 text-[#26273A] text-opacity-60 font-pre-regular">
        <div>{calcTransactionDate(transaction.transactionDate)}</div>
        <div>{calcTransactipnTime(transaction.transactionDate)}</div>
      </div>
      <div className="pt-0 whitespace-pre-line text-start text-12 font-pre-regular">
        {transaction.detail}
      </div>
      <div className="flex justify-between pt-0 items-center">
        <div className="pe-3">
          {isInline ? (
            <CategoryCard category={category} isInline={true} handleClickCard={true} />
          ) : (
            <CategoryCard category={category} handleClickCard={true} />
          )}
        </div>
        { transaction.transactionType !== "DEPOSIT" && <div className="items-end relative">
          <CiReceipt
            className="h-6 w-6 md:h-8 md:w-8 cursor-pointer"
            onClick={onModalToggle}
          />
          {/* passStatus에 따라 이미지 오버레이 */}
          {(transaction.passStatus === "NONE" ||
            transaction.passStatus === "FAIL" ||
            transaction.passStatus === "WARNING") && (
            <img
              src={HighImportance}
              alt="High Importance"
              className="absolute top-0 right-0 h-3 w-3 z-50 md:h-4 md:w-4 md:-top-1"
            />
          )}
          {isModalOpen &&
            ReactDOM.createPortal(
              <>
                {/* 모바일 배경 흐림 (Tailwind는 md 이하에서만 보이도록 처리) */}
                <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => onModalToggle()} />

                <div className="fixed right-[15%] md:right-20 top-[50%] md:top-[55%] transform -translate-y-1/2 z-50">
                  <ReciptModal
                    date={calcTransactionDate(transaction.transactionDate)}
                    balance={transaction.transactionBalance.toLocaleString()}
                    detail={transaction.detail}
                    onClose={onModalToggle}
                  />
                </div>
              </>,
              document.body
            )}
        </div>}
      </div>
    </div>
  );
};

export default TransactionCard;
