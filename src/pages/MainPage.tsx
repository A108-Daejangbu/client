import React from "react";
import TransactionList from "../features/Main/Transaction/TransactionList";
import SearchBar from "../features/Main/SearchBar";
import ReciptModal from "../features/Main/ReciptModal";

import { accountInfo } from "../dummy/accountInfo";

function MainPage() {
  return (
    // <div className="px-4 md:content md:!pt-0">
    <div className="content !p-2 !px-8 md:!px-[50px]">
      <div className="w-full py-2">
        <SearchBar />
      </div>

      <div className="text-20 md:text-[28px] font-pre-extrabold justify-self-center items-center md:pt-4">
        <span>{accountInfo[0].accountName}</span>
      </div>

      <div className="flex flex-col md:flex-row h-auto">
        <div className="w-full md:w-1/4 justify-items-center">
          <div>점수...</div>
        </div>
        <div className="w-full md:w-1/2">
          <TransactionList />
        </div>
        <div className=" hidden md:block w-1/4 justify-items-center">
          <div>
            <ReciptModal></ReciptModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
