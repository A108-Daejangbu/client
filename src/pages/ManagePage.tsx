import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCard from "../features/Manage/AccountCard";
import { bankData } from "../constants/bankData";
import AddAccountBtn from "../features/Manage/AddAccountBtn";
import EmptyAccount from "../features/Manage/EmptyAccount";
import { getMyAllAccounts } from "../apis/manage/getMyAllAccounts";
import { useAccountStore } from "../stores/useAccountStore";

function ManagePage() {
  const accounts = useAccountStore((state) => state.accounts); // 계좌 목록 상태
  const setAccounts = useAccountStore((state) => state.setAccounts); // 계좌 목록 설정 함수
  const selectAccount = useAccountStore((state) => state.selectAccount); // 선택된 계좌 ID 설정 함수
  const navigate = useNavigate();

  //렌더링시 계좌 정보 가져오기
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountData = await getMyAllAccounts();
        setAccounts(accountData); // 상태에 계좌 데이터 저장
      } catch (error) {
        console.error(error); // 에러 로그 출력
        // alert("계좌 정보를 가져오는 중 오류가 발생했습니다."); // 사용자에게 알림
      }
    };

    fetchAccounts();
  }, [setAccounts]);

  if (accounts.length === 0) {
    return <EmptyAccount />;
  }

  // 클릭 시 해당 계좌의 accountId를 URL에 포함하여 MainPage로 이동
  const handleCardClick = (accountId: number) => {
    selectAccount(accountId);
    navigate(`/main/${accountId}`);
  };

  return (
    <div className="md:content md:pt-[50px]">
      <AddAccountBtn />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] w-full mx-auto justify-items-center">
        {accounts.map((account, index) => {
          // 해당 계좌의 은행 정보를 bankData에서 찾기
          const bankInfo = bankData.find(
            (bank) => bank.bankCode === account.bankCode
          );
          if (!bankInfo) {
            console.log(`은행 정보를 찾을 수 없습니다`);
            return null; // bankInfo가 없으면 해당 계좌는 렌더링하지 않음
          }

          // bankInfo가 있을 경우, AccountCard 컴포넌트에 account와 bankInfo를 props로 전달
          return (
            <AccountCard
              key={index}
              account={account}
              bankInfo={bankInfo}
              onClick={() => handleCardClick(account.accountId)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ManagePage;
