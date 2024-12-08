import { OpenedCapsule } from "@/types/server";
import openMapIcon from "@/assets/images/openMapIcon.png";
import openBottomImg from "@/assets/images/openBottomImg.png";
import CustomSwiper from "@/components/CustomSwiper";
import AfterIcon from "@/assets/images/afterIcon.png";
import ExportIcon from "@/assets/images/exportIcon.png";
import CustomButtons from "@/components/CustomButtons";
import { useEffect } from "react";

interface Props {
  capsule: OpenedCapsule;
}
const OpenedScreen = ({ capsule }: Props) => {
  useEffect(() => {
    console.log(capsule);
  }, []);
  return (
    <>
      <div className="w-full h-full px-[22px] bg-primary-paper">
        <div className="h-[54px] flex items-center justify-between mb-[31px]">
          <div>캡슐이름이름</div>

          <img
            src={openMapIcon}
            alt=""
            className="w-[28px] h-[31px] bottom-1"
          />
        </div>

        <div className="justify-center max-w-[94px] text-[14px] h-[32px] bg-[#E8EEF5] flex items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[100px] text-[#202020] px-[18px] py-[4px] leading-[22px]">
          캡슐 3 / <span className="ml-1 text-[#a1a1a1]"> 1</span>
        </div>

        <div className="h-[35%] mt-[42px]">
          <CustomSwiper></CustomSwiper>
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="w-full h-[42px] flex justify-center px-[16px] ">
            <div className="h-[32px] flex rounded-[16px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] items-center relative bg-white px-[13px] ">
              <span>{3}개</span>의 캡슐을 확인할 수 있어요!
              <img
                src={AfterIcon}
                className="absolute -bottom-[22px] left-[25%] w-[40px] h-[40px]"
              />
            </div>
          </div>
          <img src={openBottomImg} alt="" className="w-full" />
        </div>
      </div>
      <div className="absolute bottom-[108px] right-[22px]">
        <img src={ExportIcon} alt="" />
      </div>

      <CustomButtons.BottomButton title="캡슐 채우기" onClick={() => {}} />
    </>
  );
};

export default OpenedScreen;
