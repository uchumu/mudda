import IconShare from "@/assets/icons/share-icon.svg?react";

interface Props {
  onClick: () => void;
}
const FAB = ({ onClick }: Props) => (
  <div className="fixed top-0 w-full max-w-[480px] h-full pointer-events-none">
    <div
      className="w-[56px] h-[56px] absolute z-50 right-[22px] bottom-[108px] pointer-events-auto cursor-pointer rounded-full shadow-md flex items-center justify-center"
      onClick={onClick}
    >
      <IconShare />
    </div>
  </div>
);

export default FAB;
