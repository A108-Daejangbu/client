import AccountRegist from "../features/Manage/AccountRegist";
import Description from "../features/Manage/Description";

function AccountPage() {
  return (
    <div className="w-full flex flex-col md:flex-row px-5 pt-2.5 md:px-[80px] md:pt-[40px]">
      {/* 모바일에서 px-3 pt-5 데스크탑에서 md:px-0 md:pt-0 md:content */}
      {/* 좌측 Description (데스크탑에서만) */}
      <div className="hidden md:flex w-1/2 md:pl-14">
        <Description />
      </div>

      {/* 우측 AccountRegist */}
      <div className="flex pt-12 w-full md:w-1/2 md:justify-center">
        <AccountRegist />
      </div>
    </div>
  );
}

export default AccountPage;
