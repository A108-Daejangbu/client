import React from "react";

function ReportPage() {
  const data = [
    {
      id: 1,
      category: 'MT',
      date: '2025.03.13',
      content: 'MT 간식',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: '여기는 영수증 비고 내용이 들어갈 곳입니다'
    },
    {
      id: 2,
      category: 'MT',
      date: '2025.03.13',
      content: 'MT 숙소',
      deposit: '800,000,000',
      withdraw: '-',
      balance: '3,057,300',
      note: ''
    },
    {
      id: 3,
      category: 'MT',
      date: '2025.03.13',
      content: 'MT 준비물품',
      deposit: '-',
      withdraw: '120,000',
      balance: '2,937,300',
      note: ''
    },
    {
      id: 4,
      category: '개강총회',
      date: '2025.03.13',
      content: 'MT 준비물품',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    },
    {
      id: 5,
      category: '개강총회',
      date: '2025.03.13',
      content: 'MT 준비물품',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    },
    {
      id: 6,
      category: '축제',
      date: '2025.03.13',
      content: 'MT 간식',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    },
    {
      id: 7,
      category: '축제',
      date: '2025.03.13',
      content: 'MT 간식',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    },
    {
      id: 8,
      category: '축제',
      date: '2025.03.13',
      content: 'MT 간식',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    },
    {
      id: 9,
      category: '축제',
      date: '2025.03.13',
      content: 'MT 간식',
      deposit: '-',
      withdraw: '156,000',
      balance: '3,857,300',
      note: ''
    }
  ];

  // 칼럼 이름 정의
  const columns = ['카테고리', '날짜', '내용', '입금', '출금', '잔액', '비고'];

  return (
    <div className="content bg-white flex justify-center">
      <div className="max-w-[900px] w-full">
        {/* 헤더 */}
        <div className="mb-[30px]">
          <h1 className="font-pre-extrabold text-[28px] text-center text-main200">경희대학교 응용수학과</h1>
        </div>

        {/* Preview 섹션과 다운로드 버튼 */}
        <div className="mx-4 mb-1 flex justify-between items-center">
          <div>
            <h2 className="font-pre-semibold text-20 text-main200">Preview</h2>
            <div className="flex items-center gap-2 text-gray200 font-pre-bold text-10">
              <span>2025. 03. 01</span>
              <span>~</span>
              <span>2025. 03. 18</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue to-purple hover:opacity-80 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-pre-bold text-14">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            보고서 다운받기
          </button>
        </div>

        {/* 테이블 컨테이너 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden modal mx-auto">
          <div className="overflow-x-auto">
            {/* 헤더 영역 - 스크롤과 관계없이 고정 */}
            <div className="sticky top-0 z-10 bg-white">
              <table className="w-full border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                
                {/* 테이블 헤더 */}
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index} className="px-6 pt-5 pb-3 text-center bg-white">
                        <button className="w-full text-center whitespace-nowrap text-14 font-pre-light text-main200 hover:text-purple">
                          {column}
                          <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
              
              {/* 그라데이션 선 - 헤더와 함께 고정 */}
              <div className="h-[1px] w-[860px] bg-gradient-to-r from-[#3262DE] to-[#9A1EBC] mx-auto"></div>
            </div>
            
            {/* 데이터 영역 - 스크롤 가능 */}
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
              <table className="w-full border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                
                {/* 데이터 행 */}
                <tbody className="bg-white">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.category}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.date}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.content}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.deposit}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.withdraw}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200">{item.balance}</td>
                      <td className="px-4 py-4 text-center whitespace-nowrap font-pre-regular text-14 text-main200 truncate" title={item.note}>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
