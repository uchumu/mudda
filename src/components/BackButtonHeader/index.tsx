import IconLeftArrow from "@/assets/icons/left-arrow-black.svg?react";

interface Props {
  onClick: () => void;
}
const BackButtonHeader = ({ onClick }: Props) => (
  <div className="h-[54px] px-[22px] flex items-center ">
    <IconLeftArrow className="cursor-pointer" onClick={onClick} />
  </div>
);

export default BackButtonHeader;
