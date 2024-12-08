import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";

const useBottomSheet = (setIsShown: Dispatch<SetStateAction<boolean>>) => {
  const [isMapBottomSheetOpen, setIsMapBottomSheetOpen] = useState<boolean>(false);
  const [startY, setStartY] = useState<number | null>(null);

  const handleStart = (eventType: string, event: React.TouchEvent | React.MouseEvent) => {
    if (eventType === "mouse") {
      setStartY((event as React.MouseEvent).clientY);
    }
    if (eventType === "touch") {
      setStartY((event as React.TouchEvent).touches[0].clientY);
    }
  };
  const handleMove = (eventType: string, event: React.TouchEvent | React.MouseEvent) => {
    if (startY === null) return;
    let currentY = 0;
    if (eventType === "mouse") {
      currentY = (event as React.MouseEvent).clientY;
    }
    if (eventType === "touch") {
      currentY = (event as React.TouchEvent).touches[0].clientY;
    }
    const diffY = startY - currentY;

    if (diffY > 7) {
      // 스와이프 업: 화면 열림
      setIsMapBottomSheetOpen(true);
    } else if (diffY < -12) {
      // 스와이프 다운: 화면 닫힘
      setIsMapBottomSheetOpen(false);
    }
    setStartY(null);
  };

  useEffect(() => {
    setIsMapBottomSheetOpen(true);
  }, []);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current && !isMapBottomSheetOpen) {
      setTimeout(() => {
        setIsShown(false);
      }, 100);
    } else {
      isMounted.current = true;
    }
  }, [isMapBottomSheetOpen]);

  return {
    isMapBottomSheetOpen,
    handleMove,
    handleStart,
    setIsMapBottomSheetOpen,
  };
};

export default useBottomSheet;
