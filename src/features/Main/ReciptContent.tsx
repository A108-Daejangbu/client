import { useEffect, useRef, useState } from "react";
import { useReceiptStore } from "../../stores/useReceiptStore";
import { changeDetail } from "../../apis/receipt/changeDetail";
import { useTransactionStore } from "../../stores/useTransactionStore";
import { deleteReceiptItem } from "../../apis/receipt/deleteReceiptItem";
import { registNewReceiptItem } from "../../apis/receipt/registNewReceiptItem";
import { updateReceiptItem } from "../../apis/receipt/updateReceiptItem";
import { deleteReceipt } from "../../apis/receipt/deleteReceipt";
import { getReceipts } from "../../apis/receipt/getReceipts";
import { FcApproval } from "react-icons/fc";

interface ReciptContentProps {
  date: string;
  balance: string;
  detail: string;
  isManager: boolean;
}

const ReciptContent = ({ date, balance, detail, isManager }: ReciptContentProps) => {
  const receipts = useReceiptStore((state) => state.receipts)
  const selectedTransactionId = useReceiptStore((state) => state.selectedTransactionId)
  const recentFilters = useTransactionStore((state) => state.recentFilters)
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions)
  const receiptsIdx = useReceiptStore((state) => state.receiptsIdx)
  const isUploadSlide = useReceiptStore((state) => state.isUploadSlide)
  const setRecetips = useReceiptStore((state) => state.setReceipt)
  const setReceiptsIdx = useReceiptStore((state) => state.setReceiptsIdx)
  const setIsUploadSlide = useReceiptStore((state) => state.setIsUploadSlide)
  
  const [isEditing, setIsEditing] = useState(false);
  const [receiptTotalAmount, setReceiptTotalAmount] = useState<number>(0); // 영수증 총합
  
  const [isDetailEditing, setIsDetailEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState(detail || "");

  const [editedItems, setEditedItems] = useState<ReceiptItem[]>([]); // 영수증 상세항목 초기화
  const editedItemsRef = useRef<ReceiptItem[]>([]);

  const totalAllReceiptsAmount = receipts.length > 0
  ? receipts.reduce((sum, receipt) => {
      const amount = parseFloat(receipt.totalAmount as unknown as string);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0)
  : 0;



  useEffect(() => {
    if (receipts.length > 0 && receipts[receiptsIdx].items) {
      setEditedItems(receipts[receiptsIdx].items);
      editedItemsRef.current = receipts[receiptsIdx].items;

      const items = receipts[receiptsIdx].items;
      const total = items.reduce((sum, item) => {
        const amount = parseFloat(item.totalAmount as unknown as string);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      setReceiptTotalAmount(Number(total))
    }
  }, [receipts, receiptsIdx]);

  useEffect(() => {
    const total = editedItems.reduce((sum, item) => {
      const amount = parseFloat(item.totalAmount as unknown as string);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    setReceiptTotalAmount(total);
  }, [editedItems]);
  

  const handleItemChange = (itemId: number | undefined, field: "name" | "count" | "totalAmount", value: string) => {
    if(!itemId) return;

    setEditedItems((prev) => {
      const updated = prev.map((item) =>
        item.itemId === itemId ? { ...item, [field]: value } : item
      );
      editedItemsRef.current = updated;
      return updated;
    });
  }; 

  const ReceiptItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && ReceiptItemsRef.current && !ReceiptItemsRef.current.contains(event.target as Node)) {
        handleCloseEditItems();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  const handleCloseEditItems = async() => {
    setIsEditing(false);
    
    if(!selectedTransactionId) return;
    const originalItems = receipts[receiptsIdx]?.items ?? [];
    const editedItems = editedItemsRef.current;

    for(const item of editedItems){
      const original = originalItems.find((ori) => ori.itemId === item.itemId)

      if(!original){
        const isValid = item.name.trim() !== "" && item.count > 0;

        if(isValid){
          try{
            await registNewReceiptItem(receipts[receiptsIdx].receiptId, {
              name: item.name,
              count: item.count,
              amount: item.totalAmount
            })
          }catch(error){
            console.log("신규 항목 등록 실패", error)
          }
        }else{
          // 유효하지 않으면 화면에서 제거
          setEditedItems((prev) => prev.filter((i) => i.itemId !== item.itemId));
        }
        continue;
      }

      // 기존 항목인데 변경된 경우
      const isModified = item.name !== original.name || item.count !== original.count || item.totalAmount !== original.totalAmount;

      if(isModified){
        try{
          await updateReceiptItem(item);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(err){
          // console.error("❌ 항목 수정 실패", err);
        }
      }
    }
  }

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDetail(e.target.value);
  };

  const handleEditDetail = async() => {
    if(detail !== editedDetail && selectedTransactionId){
      await changeDetail(selectedTransactionId, editedDetail)
      await fetchTransactions(recentFilters!)
    }
    setIsDetailEditing(false);
  };

  const handleDeleteItem = async(itemId: number) => {
    try{
      await deleteReceiptItem(itemId).then(() => {
        // 화면에서 삭제
        setEditedItems((prev) => prev.filter((item) => item.itemId !== itemId));
      })
    }catch(error){
      console.log('삭제 실패: ', error)
      alert('항목 삭제 중 문제가 발생했습니다.. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleDeleteReceipt = async(receiptId: number) => {
    const confirmDelete = window.confirm("정말로 영수증을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try{
      await deleteReceipt(receiptId);

      // 1. 서버에서 영수증 목록 다시 받아오기
      const updatedReceipts = await getReceipts(selectedTransactionId!);

      // 2. store에 반영
      setRecetips(updatedReceipts);

      // 3. receiptsIdx 조정
      if (updatedReceipts.length === 0) {
        // 아무것도 없을 때
        setReceiptsIdx(0);
        setEditedItems([])
      } else if (receiptsIdx >= updatedReceipts.length) {
        // 삭제 후 인덱스가 out of bounds일 때
        setReceiptsIdx(updatedReceipts.length - 1);
      }
      
      // 4. 업로드 슬라이드 상태는 유지
      setIsUploadSlide(true);
    }catch(err){
      console.log("영수증 삭제 중 에러:", err)
    }
  }

  useEffect(() => {
    if (receipts.length > 0 && receiptsIdx < receipts.length && receipts[receiptsIdx].items) {
      setEditedItems(receipts[receiptsIdx].items);
    }
  }, [receipts, receiptsIdx, isUploadSlide]);

  return (
    <div className="p-4 flex flex-col h-full gap-4">
      {/* 날짜 섹션 */}
      <div className="flex justify-between items-center pb-2">
        <div className="text-14 font-pre-medium text-gray-500">날짜</div>
        <div className="text-14 font-pre-bold">{date}</div>
      </div>

      {/* 상세품목 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <div className="text-14 font-pre-medium text-gray-500">상세품목</div>
        </div>
        {isUploadSlide && <div 
        ref={ReceiptItemsRef}
        className="flex flex-col gap-2 text-12 font-pre-medium text-gray-700 bg-gray-50 rounded-lg p-2 text-end pr-0">
          {editedItems && editedItems.map((item) => (
            <div
              key={item.itemId}
              className="grid grid-cols-3 items-center grid-cols-[1.5fr_0.6fr_0.9fr_auto]"
              onClick={() => {
                if(isManager) setIsEditing(true)}} // 하나라도 클릭하면 전체 편집 모드
            >
              {isManager  && isEditing ? (
                <>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.itemId, "name", e.target.value)}
                    className="bg-white border border-gray-300 rounded-md p-1 text-end w-full"
                  />
                  <input
                    type="number"
                    value={item.count}
                    onChange={(e) => handleItemChange(item.itemId, "count", e.target.value)}
                    className="bg-white border border-gray-300 rounded-md p-1 text-end w-full"
                  />
                  <input
                    type="text"
                    value={item.totalAmount}
                    onChange={(e) => handleItemChange(item.itemId, "totalAmount", e.target.value)}
                    className="bg-white border border-gray-300 rounded-md p-1 text-end w-full"
                  />
                  <button onClick={() => handleDeleteItem(item.itemId)} className="text-red-500 text-xs hover:underline">
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <div className="text-end">{item.name}</div>
                  <div>{item.count}개</div>
                  <div>{Number(item.totalAmount).toLocaleString()}원</div>
                </>
              )}
            </div>
          ))}

          {/* ➕ 버튼 */}
          {isManager && isEditing && <button
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 self-end"
            onClick={() => {
              const newItem = {
                itemId: Date.now(),
                name: "",
                count: 0,
                totalAmount: 0
              };

              setEditedItems((prev) => {
                const updated = [...prev, newItem];
                editedItemsRef.current = updated;
                return updated;
              })
            }}
          >
            + 품목 추가
          </button>}
        </div>}
      </div>

      {/* 영수증 총합 섹션 */}
      {receipts.length > 0 && isUploadSlide && <div className="flex justify-between items-center border-b border-gray-100 pb-2">
        <div className="text-14 font-pre-medium text-gray-500">영수증 총합</div>
        <div className="text-14 font-pre-medium text-gray-600">{receiptTotalAmount}원</div>
      </div>}

      {/* 총합 섹션 */}
      <div className="items-center border-b border-gray-100 pb-2">
        <div className="flex justify-between">
          <div className="text-14 font-pre-medium text-gray-500">총합</div>
          <div className="flex items-center">
            {receipts.length > 0 && totalAllReceiptsAmount === Number(balance) && <FcApproval size={20} className="pr-1 cursor" title="영수증과 금액이 일치합니다!"/>}
            <div className="text-16 font-pre-bold text-blue-600">{balance}원</div>
          </div>
        </div>
        {(receipts.length > 0 && totalAllReceiptsAmount !== Number(balance) && <div className="text-red-500 text-12 justify-self-start font-pre-medium pt-1">영수증과 거래내역의 금액이 다릅니다!</div>)}
      </div>

      {/* 비고 섹션 */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center">
          <div className="text-14 font-pre-medium text-gray-500">비고</div>
        </div>
        {isManager && isDetailEditing ? (
          <textarea
            value={editedDetail}
            onChange={handleDetailChange}
            onBlur={() => handleEditDetail()}
            className="text-14 font-pre-regular text-gray-700 bg-gray-50 p-2 rounded-lg min-h-[40px] w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="text-14 font-pre-regular text-gray-700 bg-gray-50 p-2 rounded-lg min-h-[40px] break-words whitespace-pre-wrap"
          onClick={() => {
            if(isManager) setIsDetailEditing(true)}}>
            {editedDetail}
          </div>
        )}
      </div>

      {/* 삭제 버튼 */}
      {isManager && <button className="w-full py-2.5 bg-main200 hover:bg-main100 text-white rounded-lg font-pre-medium transition-all duration-200 text-14 shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-1"
      onClick={() => handleDeleteReceipt(receipts[receiptsIdx].receiptId)}>
        <span>삭제하기</span>
      </button>}
    </div>
  );
};

export default ReciptContent;