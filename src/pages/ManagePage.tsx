import React from "react";
import AccountRegist from "../features/Manage/AccountRegist";
import Description from "../features/Manage/Description";

function AccountPage() {
  return (
    <div className="flex content">
      {/* 왼쪽 Description 컴포넌트 */}
      <div className="flex-1">
        <Description />
      </div>

      {/* 오른쪽 AccountRegist (RegistrationForm) 컴포넌트 */}
      <div className="flex-1">
        <AccountRegist />
      </div>
    </div>
  );
}

export default AccountPage;
