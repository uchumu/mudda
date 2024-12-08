import Capsule from "@/components/Capsule";

interface Props {
  max: number;
  current: number;
}
const CapsuleProgress = ({ max, current }: Props) => {
  return (
    <Capsule>
      <p className="text-[14px] font-bold">
        {`알맹이 ${current + 1} / `}
        <span className="text-[#A1A1A1] font-normal">{`${max}${
          current === 2 ? ` (선택)` : ""
        }`}</span>
      </p>
    </Capsule>
  );
};

export default CapsuleProgress;
