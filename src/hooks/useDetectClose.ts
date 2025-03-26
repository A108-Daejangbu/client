import { RefObject, useEffect, useState } from "react";

const useDetectClose = (ref: RefObject<HTMLElement>, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e: PointerEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // pointerdown 이벤트를 사용해야 모바일과 input에서도 안정적
      window.addEventListener("pointerdown", onClick);
    }

    return () => {
      window.removeEventListener("pointerdown", onClick);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen] as const;
};

export default useDetectClose;
