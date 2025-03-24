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
      note: '여기는 영수증 비고 내용이 들어갈 곳'
    },
    // 추가 데이터
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">경희대학교 응용수학과</h1>
      </div>

      {/* 테이블 컨테이너 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* 테이블 헤더 */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">내용</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">입금</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출금</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">잔액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">비고</th>
              </tr>
            </thead>
            {/* 테이블 바디 */}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.deposit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.withdraw}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          보고서 다운받기
        </button>
      </div>
    </div>
  );
}

export default ReportPage;
