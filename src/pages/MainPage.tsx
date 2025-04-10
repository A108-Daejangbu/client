import TransactionList from "../features/Main/Transaction/TransactionList";
import { useParams } from "react-router-dom";
import { useAccountStore } from "../stores/useAccountStore";
import ScoreComponent from "../features/Main/Score/ScoreComponent";
import { useEffect } from "react";
import { useTransactionStore } from "../stores/useTransactionStore";
import { getMyScore } from "../apis/transaction/getMyScore";
import { getViewerAccountInfo } from "../apis/account/getViewerAccountInfo";


function MainPage() {

  const isViewer = location.pathname.startsWith('/viewer/');
    
  const {accountId} = useParams<{accountId: string}>();
  const accountsForManager = useAccountStore((state) => state.accounts)
  const accountForViewer = useAccountStore((state) => state.viewerAccount)
  const setViewerAccount = useAccountStore((state) => state.setViewerAccount)
  
  // 선택된 accountId에 해당하는 계좌 정보 찾기
  const selectedAccount = isViewer
  ? accountForViewer
  : accountsForManager.find(
      (account) => account.accountId === Number(accountId)
    );

  const score = useTransactionStore((state) => state.score)
  const setScore = useTransactionStore((state) => state.setScore)

  const getScore = async (accountId: string) => {
    if(!accountId) return;
    const data = await getMyScore(accountId)
    setScore(data)
  }

  useEffect(() => {
    document.body.classList.add("scrollbar-stable");

    if(!accountId) return;
    getScore(accountId);
  }, [])

  // Viewer일 경우 서버에서 계좌 정보 받아오기
  useEffect(() => {
    const fetchViewerAccount = async () => {
      if (isViewer && accountId) {
        try {
          const data = await getViewerAccountInfo(accountId);
          setViewerAccount(data);
        } catch (error) {
          console.error("Viewer 계좌 정보 불러오기 실패:", error);
        }
      }
    };

    fetchViewerAccount();
  }, [isViewer, accountId, setViewerAccount]);

  return (
    // <div className="px-4 md:content md:!pt-0">
    <div className="content !p-2 !px-8 md:!px-[50px]">
      {selectedAccount ? (
        <div className="text-20 md:text-[24px] font-pre-extrabold justify-self-center items-center md:pt-2">
          <span>{selectedAccount.accountNickname}</span>
        </div>
      ) : (
        <div className="text-20 md:text-[28px] font-pre-extrabold justify-self-center items-center md:pt-4">
          <span>계좌 정보 없음</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row h-auto">
        <div className="w-full md:w-1/5 md:justify-items-end justify-items-center">
          <div className="md:sticky md:top-[100px]">
            {score && <ScoreComponent score={score} />}
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <TransactionList accountId={accountId} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
