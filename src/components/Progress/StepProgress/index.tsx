import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  max: number;
  current: number;
}

interface Colors {
  isColor: boolean;
}

const StepProgress = ({ max, current }: Props) => {
  const colors = useMemo<Array<Colors>>(
    () =>
      new Array(max)
        .fill(0)
        .map((_, index) => ({ isColor: index - 1 < current })),
    [max, current]
  );

  return (
    <div className="w-full flex gap-[6px] h-[4px] px-[22px]">
      {colors.map((color, index) => {
        return (
          <div
            key={`step-progress-step-${index}`}
            className={clsx(
              "rounded-full flex-1 h-full transition-width duration-500",
              color.isColor ? "bg-primary-main " : "bg-[#F8F8F8]"
            )}
          ></div>
        );
      })}
    </div>
  );
};

export default StepProgress;
