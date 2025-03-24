import { RefObject, useEffect, useState } from "react";

// ref 요소 외부 클릭 시 false로 상태 변경하는 custom hook
const useDetectClose = (ref: RefObject<HTMLElement>, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if(ref.current && !ref.current.contains(e.target as Node)){
        setIsOpen(false);
      }
    }

    if(isOpen){
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen] as const;
}

export default useDetectClose;