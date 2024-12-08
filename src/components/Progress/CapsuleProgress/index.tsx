import clsx from "clsx";

interface Props {
  max: number;
  current: number;
}
const CapsuleProgress = ({ max, current }: Props) => {
  return (
    <div className="px-[22px]">
      <div
        className={clsx(
          current === 2 ? "w-[142px]" : "w-[104px]",
          "h-[32px] flex items-center justify-center rounded-full bg-[#E8EEF5]"
        )}
      >
        <p className="text-[14px] font-bold">
          {`알맹이 ${current + 1} / `}
          <span className="text-[#A1A1A1] font-normal">{`${max}${
            current === 2 ? ` (선택)` : ""
          }`}</span>
        </p>
      </div>
    </div>
  );
};

export default CapsuleProgress;
