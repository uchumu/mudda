import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";

interface WheelTimePickerProps {
  onChange?: (hours: number, minutes: number, seconds: number) => void;
  initialValue?: Date;
}

interface NumberWheelProps {
  items: string[];
  selectedValue: number;
  type: "hours" | "minutes" | "seconds";
  onWheel: (e: React.WheelEvent, type: "hours" | "minutes" | "seconds") => void;
  onMouseDown: (
    e: React.MouseEvent | React.TouchEvent,
    type: "hours" | "minutes" | "seconds"
  ) => void;
}

const NumberWheel = memo(
  ({ items, selectedValue, type, onWheel, onMouseDown }: NumberWheelProps) => {
    const itemHeight = 46;

    return (
      <div
        className="relative w-full h-40 overflow-hidden bg-white rounded-lg select-none"
        onWheel={(e) => onWheel(e, type)}
        onMouseDown={(e) => onMouseDown(e, type)}
        onTouchStart={(e) => onMouseDown(e, type)}
      >
        <div
          className="absolute left-0 right-0 top-1/2 h-10 -translate-y-1/2 pointer-events-none py-[22px]"
          style={{
            borderTop: "2px solid #5194F9",
            borderBottom: "2px solid #5194F9",
          }}
        />
        <div className="relative h-full">
          {items.map((item, index) => {
            const position = index - selectedValue;
            if (Math.abs(position) > 1) return null;
            return (
              <div
                key={item}
                className="absolute w-full text-center"
                style={{
                  top: "50%",
                  transform: `translateY(-50%) translateY(${
                    position * itemHeight
                  }px)`,
                  fontSize: position === 0 ? "20px" : "16px",
                  color: position === 0 ? "#000000" : "#CACACA",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

const Divider = memo(() => (
  <div className="text-2xl font-bold text-[#202020]">:</div>
));

const WheelTimePicker = ({
  onChange,
  initialValue = new Date(),
}: WheelTimePickerProps) => {
  const [hours, setHours] = useState(initialValue.getHours());
  const [minutes, setMinutes] = useState(initialValue.getMinutes());
  const [seconds, setSeconds] = useState(initialValue.getSeconds());
  const [startY, setStartY] = useState<number>(0);
  const isMoving = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [activeWheel, setActiveWheel] = useState<
    "hours" | "minutes" | "seconds" | null
  >(null);

  const items = useMemo(
    () => ({
      hours: Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
      ),
      minutes: Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, "0")
      ),
      seconds: Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, "0")
      ),
    }),
    []
  );

  useEffect(() => {
    onChange?.(hours, minutes, seconds);
  }, [hours, minutes, seconds, onChange]);

  // 시간 순환 계산
  const calculateNewValue = useCallback(
    (currentValue: number, maxValue: number, delta: number) => {
      let newValue = currentValue + delta;
      newValue = ((newValue % maxValue) + maxValue) % maxValue;
      return newValue;
    },
    []
  );

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      type: "hours" | "minutes" | "seconds"
    ) => {
      setIsDragging(true);
      setActiveWheel(type);
      const clientY =
        e.type === "touchstart"
          ? (e as React.TouchEvent).touches[0].clientY
          : (e as React.MouseEvent).clientY;
      setStartY(clientY);
      e.preventDefault();
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !activeWheel) return;

      const clientY =
        e.type === "touchmove"
          ? (e as TouchEvent).touches[0].clientY
          : (e as MouseEvent).clientY;

      const delta = startY - clientY;

      // 최소 이동 거리
      if (Math.abs(delta) < 30) return;

      // 이미 이동 중이면 무시
      if (isMoving.current) return;
      const direction = Math.sign(delta);

      isMoving.current = true;

      if (activeWheel === "hours") {
        setHours((prev) => {
          const next = calculateNewValue(prev, 24, direction);
          setStartY(clientY);
          isMoving.current = false;
          return next;
        });
      } else if (activeWheel === "minutes") {
        setMinutes((prev) => {
          const next = calculateNewValue(prev, 60, direction);
          setStartY(clientY);
          isMoving.current = false;
          return next;
        });
      } else if (activeWheel === "seconds") {
        setSeconds((prev) => {
          const next = calculateNewValue(prev, 60, direction);
          setStartY(clientY);
          isMoving.current = false;
          return next;
        });
      }
    },
    [isDragging, startY, activeWheel, calculateNewValue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveWheel(null);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setActiveWheel(null);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent, type: "hours" | "minutes" | "seconds") => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;

      if (type === "hours") {
        setHours((prev) => calculateNewValue(prev, 24, delta));
      } else if (type === "minutes") {
        setMinutes((prev) => calculateNewValue(prev, 60, delta));
      } else if (type === "seconds") {
        setSeconds((prev) => calculateNewValue(prev, 60, delta));
      }
    },
    [calculateNewValue]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchEnd]);

  return (
    <div className="flex items-center w-full h-[182px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-[16px] py-[30px] px-[50px]">
      <div className="flex items-center w-full gap-6">
        <div className="flex-1">
          <NumberWheel
            items={items.hours}
            selectedValue={hours}
            type="hours"
            onWheel={handleWheel}
            onMouseDown={(e) => handleMouseDown(e, "hours")}
          />
        </div>
        <Divider />
        <div className="flex-1">
          <NumberWheel
            items={items.minutes}
            selectedValue={minutes}
            type="minutes"
            onWheel={handleWheel}
            onMouseDown={(e) => handleMouseDown(e, "minutes")}
          />
        </div>
        <Divider />
        <div className="flex-1">
          <NumberWheel
            items={items.seconds}
            selectedValue={seconds}
            type="seconds"
            onWheel={handleWheel}
            onMouseDown={(e) => handleMouseDown(e, "seconds")}
          />
        </div>
      </div>
    </div>
  );
};

export default WheelTimePicker;
