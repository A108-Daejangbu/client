import AccountCard from "../features/Manage/AccountCard";

function ManagePage() {
  return (
    <div className="content">
      {/* 기본: 모바일에서는 한 줄에 한 카드만 (grid-cols-1) 
      sm:grid-cols-2: 화면 크기가 sm 이상일 때, 한 줄에 두 카드. 
      md:grid-cols-3: 화면 크기가 md 이상일 때, 한 줄에 세 카드. 
      lg:grid-cols-4: 화면 크기가 lg 이상일 때, 한 줄에 네 카드. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] w-full mx-auto justify-items-center">
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
        <AccountCard></AccountCard>
      </div>
    </div>
  );
}
export default ManagePage;
