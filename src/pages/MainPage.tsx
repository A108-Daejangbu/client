import React from "react";
import TransactionList from "../features/Main/Transaction/TransactionList";
import SearchBar from "../features/Main/SearchBar";

import { accountInfo } from "../dummy/accountInfo";

function MainPage() {
  return(
    <div className="content !pt-0">
      <div className="w-full py-2">
        <SearchBar />
      </div>

      <div className="text-[28px] font-pre-extrabold justify-self-center items-center pt-4"><span>{accountInfo[0].accountName}</span></div>

      <div className="flex h-screen">
        <div className="w-1/6 justify-items-center">
          <div>점수...</div>
        </div>
        <div className="w-2/3">
          <TransactionList />
        </div>
        <div className="w-1/6 justify-items-center">
          <div>영수증..</div>
        </div>

      </div>
      <div></div>
    </div>
  );
}

export default MainPage;
