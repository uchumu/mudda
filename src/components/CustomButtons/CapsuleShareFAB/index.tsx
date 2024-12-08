import IconShare from "@/assets/icons/share-icon.svg?react";
import { useNavigate } from "react-router";

interface Props {
  code: string;
}
const CapsuleShareFAB = ({ code }: Props) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/capsule/${encodeURIComponent(code)}/share`);
  return (
    <div className="fixed top-0 w-full max-w-[480px] h-full pointer-events-none">
      <div
        className="w-[56px] h-[56px] bg-white absolute z-50 right-[22px] bottom-[108px] pointer-events-auto cursor-pointer rounded-full shadow-[0_0_15px_0_rgba(0,0,0,0.08)] flex items-center justify-center"
        onClick={onClick}
      >
        <IconShare />
      </div>
    </div>
  );
};

export default CapsuleShareFAB;
