import { useState, useEffect, useCallback, useMemo, memo } from "react";

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
    e: React.MouseEvent,
    type: "hours" | "minutes" | "seconds"
  ) => void;
}

const NumberWheel = memo(
  ({ items, selectedValue, type, onWheel, onMouseDown }: NumberWheelProps) => {
    return (
      <div
        className="relative w-full h-40 overflow-hidden bg-gray-50 rounded-lg select-none"
        onWheel={(e) => onWheel(e, type)}
        onMouseDown={(e) => onMouseDown(e, type)}
      >
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div
          className="absolute left-0 right-0 top-1/2 h-10 -translate-y-1/2 pointer-events-none"
          style={{
            borderTop: "2px solid #5194F9",
            borderBottom: "2px solid#5194F9",
          }}
        />

        <div className="relative h-full">
          {items.map((item, index) => {
            const position =
              ((index - selectedValue + items.length) % items.length) - 2;
            return (
              <div
                key={item}
                className="absolute w-full text-center transition-transform duration-150"
                style={{
                  top: "50%",
                  transform: `translateY(-50%) translateY(${position * 40}px)`,
                  opacity:
                    Math.abs(position) < 3 ? 1 - Math.abs(position) * 0.3 : 0,
                  fontSize: Math.abs(position) === 0 ? "1.25rem" : "1rem",
                  fontWeight: Math.abs(position) === 0 ? "600" : "400",
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
  <div className="text-2xl font-bold text-gray-400">:</div>
));

const WheelTimePicker = ({
  onChange,
  initialValue = new Date(),
}: WheelTimePickerProps) => {
  const [hours, setHours] = useState(initialValue.getHours());
  const [minutes, setMinutes] = useState(initialValue.getMinutes());
  const [seconds, setSeconds] = useState(initialValue.getSeconds());
  const [startY, setStartY] = useState<number>(0);
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

  const calculateNewValue = useCallback(
    (currentValue: number, maxValue: number, delta: number) => {
      const newValue = currentValue + delta;
      if (newValue < 0) return maxValue - 1;
      if (newValue >= maxValue) return 0;
      return newValue;
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "hours" | "minutes" | "seconds") => {
      setIsDragging(true);
      setStartY(e.clientY);
      setActiveWheel(type);
      e.preventDefault();
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !activeWheel) return;

      const delta = startY - e.clientY;
      const deltaValue = Math.floor(delta / 20);

      if (activeWheel === "hours") {
        setHours((prev) => calculateNewValue(prev, 24, deltaValue));
      } else if (activeWheel === "minutes") {
        setMinutes((prev) => calculateNewValue(prev, 60, deltaValue));
      } else if (activeWheel === "seconds") {
        setSeconds((prev) => calculateNewValue(prev, 60, deltaValue));
      }

      setStartY(e.clientY);
    },
    [isDragging, startY, activeWheel, calculateNewValue]
  );

  const handleMouseUp = useCallback(() => {
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
      } else {
        setSeconds((prev) => calculateNewValue(prev, 60, delta));
      }
    },
    [calculateNewValue]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="flex items-center w-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-[16px] py-[30px] px-[50px]">
      <div className="flex items-center w-full gap-6">
        <div className="flex-1">
          <NumberWheel
            items={items.hours}
            selectedValue={hours}
            type="hours"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
          />
        </div>
        <Divider />
        <div className="flex-1">
          <NumberWheel
            items={items.minutes}
            selectedValue={minutes}
            type="minutes"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
          />
        </div>
        <Divider />
        <div className="flex-1">
          <NumberWheel
            items={items.seconds}
            selectedValue={seconds}
            type="seconds"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    </div>
  );
};

export default WheelTimePicker;
