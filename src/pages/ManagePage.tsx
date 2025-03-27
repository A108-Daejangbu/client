import AccountCard from "../features/Manage/AccountCard";
import { bankData } from "../constants/bankData";
import { accountInfo } from "../dummy/accountInfo";
import AddAccountBtn from "../features/Manage/AddAccountBtn";

function ManagePage() {
  return (
    <div className="content">
      {/* API연결후 여기에 계좌 개수 0보다크면 아래 버튼과 카드컴포넌트 보여주는 분기문 적기 */}
      <AddAccountBtn />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] w-full mx-auto justify-items-center">
        {accountInfo.map((account, index) => {
          // 해당 계좌의 은행 정보를 bankData에서 찾기
          const bankInfo = bankData.find(
            (bank) => bank.bankCode === account.bankCode
          );
          if (!bankInfo) {
            console.log(`은행 정보를 찾을 수 없습니다: ${account.bankName}`);
            return null; // bankInfo가 없으면 해당 계좌는 렌더링하지 않음
          }

          // bankInfo가 있을 경우, AccountCard 컴포넌트에 account와 bankInfo를 props로 전달
          return (
            <AccountCard key={index} account={account} bankInfo={bankInfo} />
          );
        })}
      </div>
    </div>
  );
}
export default ManagePage;
