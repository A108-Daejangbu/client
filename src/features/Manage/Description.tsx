import phoneImg from "../../assets/phones.svg";

const Description = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 문구 부분 - 상단 좌측 */}
      <div className="text-left">
        <div className="flex items-center">
          <h2 className="text-24 font-pre-medium">거래의 투명함을 더하다,</h2>
          <h2 className="text-[28px] font-pre-bold text-purple ml-3">대장부</h2>
        </div>
        <p className="text-16 text-gray-700 font-pre-light mt-2 leading-relaxed">
          대장부는 회비 관리와 거래 내역을 쉽게 투명하게 기록할 수 있는
          서비스입니다.
          <br /> 지금 바로 계좌를 등록하고, 체계적인 거래 관리를 시작하세요!
        </p>
      </div>

      {/* 이미지 부분 - 하단 우측 */}
      <div className="self-end mt-20 pr-24">
        <img src={phoneImg} alt="휴대폰 이미지" className="w-xs" />
      </div>
    </div>
  );
};

export default Description;
