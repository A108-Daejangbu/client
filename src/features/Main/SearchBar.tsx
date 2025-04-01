import { useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import useDetectClose from "../../hooks/useDetectClose";

const SearchBar = () => {
  const dropMenuList = [
    { label: "입출금명 + 비고", value: "ALL" },
    { label: "입출금명", value: "SUMMARY" },
    { label: "비고", value: "DETAIL" },
    { label: "금액", value: "AMOUNT" },
  ];

  const [isFocused, setIsFocused] = useState<boolean>(false); // 검색 focus 여부
  const [inputValue, setInputValue] = useState<string>(""); // 검색 키워드
  const inputRef = useRef<HTMLInputElement>(null); // 검색 키워드

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const [isDropOpen, setIsDropOpen] = useDetectClose(dropdownRef, false);
  const [dropMenu, setDropMenu] = useState(dropMenuList[0]);

  const setDrop = (selectedMenu: { label: string; value: string }) => {
    setDropMenu(selectedMenu);
    setIsDropOpen(!isDropOpen);
  };

  return (
    <div className="flex gap-2 items-center w-full justify-end">
      <div ref={dropdownRef} className="relative font-pre-light text-[#666666]">
        {/* 드롭다운 */}
        <button
          onClick={() => setIsDropOpen(!isDropOpen)}
          className="border rounded-md px-3 py-1 border-gray300 w-32 max-w-36 text-12 flex justify-between items-center"
        >
          {dropMenu.label}
          {!isDropOpen ? <FiChevronDown /> : <FiChevronUp />}
        </button>
        {isDropOpen && (
          <ul className="absolute left-0 mt-1 bg-white border border-gray300 rounded-md w-32 max-w-36 shadow-md z-10 text-12 top-full">
            {dropMenuList.map((value, idx) => (
              <li
                key={idx}
                onClick={() => setDrop(value)}
                className="px-3 py-2 hover:bg-gray hover:bg-opacity-30 cursor-pointer"
              >
                {value.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-3xl justify-start w-2/5 max-w-60 bg-[#F7F6F6]">
        {/* 검색 input */}
        <div className="flex items-center gap-2 py-1 px-4">
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent outline-none w-full placeholder-[#767676] placeholder:font-pre-regular"
            placeholder={isFocused ? "" : "Search"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!inputValue.trim()) {
                setIsFocused(false);
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputRef.current?.blur();
              }
            }}
          />
          <FiSearch className="text-[#767676] font-pre-semibold" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
