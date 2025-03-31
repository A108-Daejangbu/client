import Edit from "../../assets/Edit.png";
import { useState } from "react";

interface ReciptContentProps {
  date: string;
  balance: string;
  detail: string;
}

const ReciptContent = ({ date, balance, detail }: ReciptContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("영수증을 첨부하거나 상세품목을 입력해주세요.");
  const [isDetailEditing, setIsDetailEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState(detail);

  const handleEditClick = () => {
    if (isDetailEditing) setIsDetailEditing(false);
    setIsEditing(true);
  };

  const handleDetailEditClick = () => {
    if (isEditing) setIsEditing(false);
    setIsDetailEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDetail(e.target.value);
  };

  const handleBlur = (type: 'detail' | 'item') => {
    if (type === 'item') {
      setIsEditing(false);
    } else {
      setIsDetailEditing(false);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full gap-4">
      {/* 날짜 섹션 */}
      <div className="flex justify-between items-center pb-2">
        <div className="text-12 font-pre-medium text-gray-500">날짜</div>
        <div className="text-14 font-pre-bold">{date}</div>
      </div>

      {/* 상세품목 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <div className="text-12 font-pre-medium text-gray-500">상세품목</div>
          <img 
            src={Edit} 
            alt="edit" 
            className="w-4 h-4 ml-2 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleEditClick}
          />
        </div>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            onBlur={() => handleBlur('item')}
            className="text-14 font-pre-regular text-gray-700 min-h-[60px] w-full bg-gray-50 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="text-14 font-pre-regular text-gray-700 bg-gray-50 rounded-lg p-2 whitespace-pre-wrap">
            {editedText}
          </div>
        )}
      </div>

      {/* 총합 섹션 */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
        <div className="text-12 font-pre-medium text-gray-500">총합</div>
        <div className="text-16 font-pre-bold text-blue-600">{balance}원</div>
      </div>

      {/* 비고 섹션 */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center">
          <div className="text-12 font-pre-medium text-gray-500">비고</div>
          <img 
            src={Edit} 
            alt="edit" 
            className="w-4 h-4 ml-2 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleDetailEditClick}
          />
        </div>
        {isDetailEditing ? (
          <textarea
            value={editedDetail}
            onChange={handleDetailChange}
            onBlur={() => handleBlur('detail')}
            className="text-14 font-pre-regular text-gray-700 bg-gray-50 p-2 rounded-lg min-h-[40px] w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="text-14 font-pre-regular text-gray-700 bg-gray-50 p-2 rounded-lg min-h-[40px] break-words whitespace-pre-wrap">
            {editedDetail}
          </div>
        )}
      </div>

      {/* 저장 버튼 */}
      <button className="w-full py-2.5 bg-main200 hover:bg-main100 text-white rounded-lg font-pre-medium transition-all duration-200 text-14 shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-1">
        <span>변경사항 저장하기</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
    </div>
  );
};

export default ReciptContent;