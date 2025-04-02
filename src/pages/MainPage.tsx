import TransactionList from "../features/Main/Transaction/TransactionList";
import SearchBar from "../features/Main/SearchBar";
import { useParams } from "react-router-dom";
import { useAccountStore } from "../stores/useAccountStore";
import ScoreComponent from "../features/Main/ScoreComponent";
// useParams를 사용해 accountId를 받아오고, 해당 ID에 맞는 계좌 데이터를 store에서 찾은 후 보여줌

function MainPage() {
  // URL에서 accountId 파라미터를 가져옴 (문자열이므로 숫자로 변환)
  const { accountId } = useParams<{ accountId: string }>();
  const accounts = useAccountStore((state) => state.accounts);
  // 선택된 accountId에 해당하는 계좌 정보 찾기
  const selectedAccount = accounts.find(
    (account) => account.accountId === Number(accountId)
  );
  return (
    // <div className="px-4 md:content md:!pt-0">
    <div className="content !p-2 !px-8 md:!px-[50px]">
      <div className="w-full py-2">
        <SearchBar />
      </div>

      {selectedAccount ? (
        <div className="text-20 md:text-[28px] font-pre-extrabold justify-self-center items-center md:pt-4">
          <span>{selectedAccount.accountNickname}</span>
        </div>
      ) : (
        <div className="text-20 md:text-[28px] font-pre-extrabold justify-self-center items-center md:pt-4">
          <span>계좌 정보 없음</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row h-auto">
        <div className="w-full md:w-1/4 justify-items-center">
          <ScoreComponent 
            score={10} 
            transactions={7}
          />
        </div>
        <div className="w-full md:w-1/2">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
