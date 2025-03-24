import phoneImg from "../../assets/phones.svg";

const Description = () => {
  return (
    <div className="flex flex-col">
      {/* 문구 부분 */}
      <div className="mb-20">
        <div className="flex">
          <h2 className="text-24 font-pre-medium">거래의 투명함을 더하다,</h2>
          <h2 className="text-24 font-pre-bold text-purple mb-2 ml-2">
            대장부
          </h2>
        </div>
        <p className="text-12 text-gray-700 font-pre-light">
          대장부는 회비 관리와 거래 내역을 쉽게 투명하게 기록할 수 있는
          플랫폼입니다.
          <br /> 지금 바로 계좌를 등록하고, 체계적인 거래 관리를 시작하세요!
        </p>
      </div>

      {/* 이미지 부분 */}
      <img src={phoneImg} alt="Img" className="max-w-xs mx-auto" />
    </div>
  );
};

export default Description;
