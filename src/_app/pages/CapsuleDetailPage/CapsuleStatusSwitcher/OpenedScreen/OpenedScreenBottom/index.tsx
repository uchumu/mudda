import AfterIcon from "@/assets/images/afterIcon.png";
import openBottomImg from "@/assets/images/openBottomImg.png";

interface Props {
  messageCount: number;
}
const OpenedScreenBottom = ({ messageCount }: Props) => (
  <div className="absolute bottom-0 left-0">
    <div className="w-full h-[42px] flex justify-center px-[16px] ">
      <div className="h-[32px] flex rounded-[16px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] items-center relative bg-white px-[13px] ">
        <span className="text-primary-main font-bold">{messageCount}개</span>
        의 캡슐을 확인할 수 있어요!
        <img
          src={AfterIcon}
          className="absolute -bottom-[22px] left-[25%] w-[40px] h-[40px]"
        />
      </div>
    </div>
    <img src={openBottomImg} alt="" className="w-full" />
  </div>
);

export default OpenedScreenBottom;
