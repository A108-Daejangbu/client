import uploadImg from "../../assets/upload.svg";
import dividerImg from "../../assets/Divider.svg";
import { useState } from "react";
import prevarrow from "../../assets/prev_arrow.svg";
import nextarrow from "../../assets/next_arrow.svg";
import download from "../../assets/download.svg";
import CloseIcon from "../../assets/CloseIcons.svg";

const ReciptImg = () => {
  // 이미지 Base64 URL을 저장할 배열
  const [images, setImages] = useState<string[]>([]);
  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 클릭한 이미지를 크게 보여줄 때 사용 (null이면 모달 비표시)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /** 파일 업로드 핸들러 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        // 새로운 이미지 URL을 배열에 추가
        setImages((prev) => [...prev, event.target!.result as string]);
        // 새 슬라이드로 이동 (마지막 이미지가 추가되었으므로 images.length로 이동)
        setCurrentIndex(images.length);
      }
    };
    reader.readAsDataURL(file);
  };

  /** 이전 슬라이드로 이동 */
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  /** 다음 슬라이드로 이동 */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  /**
   * 실제 캐러셀에 표시될 '슬라이드' 데이터
   * - images 배열만큼 이미지 슬라이드 생성
   * - 마지막에는 업로드 슬라이드
   */
  const slides = [
    // 이미지 슬라이드들
    ...images.map((imgSrc, idx) => (
      <div key={`slide-${idx}`} className="inline-block align-top w-full p-2">
        {/* 검은색 영역(이미지 표시 부분) 높이 고정: h-[180px] */}
        <div className="w-full h-[180px] flex items-center justify-center bg-black rounded-md">
          {/* 이미지 & 다운로드 아이콘 */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={imgSrc}
              alt={`slide-${idx}`}
              className="max-h-full object-contain"
              // 이미지 클릭 시 모달로 크게 보기
              onClick={() => setSelectedImage(imgSrc)}
            />
            {/* 클릭 시 파일 다운로드:
                download 속성에 파일명 지정하면 receipt-0.jpg 등으로 다운로드됨 */}
            <a
              href={imgSrc}
              download={`receipt-${idx}.jpg`}
              className="absolute top-2 right-2 text-white"
            >
              <img src={download} alt="download-icon" />
            </a>
          </div>
        </div>
      </div>
    )),

    // 업로드 슬라이드
    <div key="upload-slide" className="inline-block align-top w-full p-2">
      {/* 검은색 영역 대신, 업로드 박스도 동일 높이로 맞추고 싶다면 h-[180px] 사용 가능
          여기서는 편의상 자동 높이로 두어도 됩니다. (아래는 예시로 h-[180px] 적용) */}
      <div className="w-full h-[180px] flex items-center justify-center">
        <div className="w-[180px] h-[100px] border-2 border-dashed border-[#1849D6] rounded-md text-center flex flex-col items-center gap-1 p-2">
          {/* 폴더 + 업로드 화살표 아이콘 */}
          <img src={uploadImg} alt="uploadImg" className="w-5" />

          {/* 안내 문구 */}
          <p className="text-gray-700 text-[8px] font-pre-medium">
            영수증을 드래그하여 사진을 업로드해주세요
          </p>

          {/* 구분선 */}
          <img src={dividerImg} alt="dividerImg" className="w-[150px]" />

          {/* 파일 찾아보기 버튼 */}
          <label className="cursor-pointer text-[8px] text-[#1849D6] font-pre-medium border-[#1849D6] border rounded-md px-3 py-1">
            파일 찾아보기
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* 캐러셀 컨테이너: 높이를 고정하여(예: h-[250px]) 검은색 영역 아래에 여백 확보 */}
      <div className="relative w-full h-[200px] overflow-hidden">
        {/* 슬라이드들을 가로로 나열 (whitespace-nowrap) */}
        <div
          className="whitespace-nowrap transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`carousel-slide-${index}`}
              className="inline-block align-top w-full h-full"
            >
              {slide}
            </div>
          ))}
        </div>

        {/* 좌우 이동 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-3.5 -translate-y-1/2 bg-white rounded-full px-1.5 py-1 text-sm shadow"
        >
          <img src={prevarrow} alt="prev-arrow" />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-3.5 -translate-y-1/2 bg-white rounded-full px-1.5 py-1 text-sm shadow"
        >
          <img src={nextarrow} alt="next-arrow" />
        </button>
      </div>

      {/* 하단 슬라이드 인디케이터 (도트) - 검은색 영역(슬라이드) 밖에 위치 */}
      <div className="flex justify-center space-x-2">
        {slides.map((_, dotIndex) => (
          <button
            key={`dot-${dotIndex}`}
            onClick={() => setCurrentIndex(dotIndex)}
            className={`w-2 h-2 rounded-full ${
              dotIndex === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* 하단에 가로 줄(가로 길이 짧게) - 예: dashed 스타일 */}
      <div className="flex justify-center mt-2">
        <hr className="w-[220px] border-dashed border-gray-300" />
      </div>

      {/* 모달 (이미지를 클릭했을 때 크게 보기) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative">
            {/* 업로드된 이미지 크게 표시 (최대 화면 90%) */}
            <img
              src={selectedImage}
              alt="preview"
              className="max-w-[90vw] max-h-[90vh]"
            />
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3"
            >
              <img src={CloseIcon} alt="closeIcon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReciptImg;
