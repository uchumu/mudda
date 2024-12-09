import UndiggedImage0Src from "@/assets/images/undiggedImage.png";
import UndiggedImage1Src from "@/assets/images/undiggedImage1.png";
import UndiggedImage2Src from "@/assets/images/undiggedImage2.png";
import UndiggedImage3Src from "@/assets/images/undiggedImage3.png";
import UndiggedImage4Src from "@/assets/images/undiggedImage4.png";
import UndiggedImage5Src from "@/assets/images/undiggedImage5.png";
import { useMemo } from "react";
const undiggedImageSrcs = [
  UndiggedImage0Src,
  UndiggedImage1Src,
  UndiggedImage2Src,
  UndiggedImage3Src,
  UndiggedImage4Src,
];

interface Props {
  messageCount: number;
}
const CapsuleMessageCount = ({ messageCount }: Props) => {
  const undeggedImageSrc = useMemo(
    () =>
      messageCount > 4 ? UndiggedImage5Src : undiggedImageSrcs[messageCount],
    [messageCount]
  );
  return (
    <div className="w-full h-[calc(100vh-54px-56px-30px)] max-h-[calc(100vh-54px-56px-30px)] flex flex-col">
      <div className="justify-around w-full flex font-bold text-[22px] leading-[32px] flex-col mb-4">
        <div className="flex w-full justify-center">
          <span className="text-primary-main">캡슐 채우기</span>를 통해
        </div>

        <div className="flex w-full justify-center">
          더 많은 추억을 쌓으세요!
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <img
          className="h-[calc(100vh-54px-56px-30px-64px-16px-52px-16px)] max-h-[464px] object-contain"
          src={undeggedImageSrc}
          alt=""
        />
      </div>

      <div className="mt-4">
        <div className="items-center text-[18px] leading-[26px] w-full flex flex-col">
          <div>
            현재까지{" "}
            <span className="text-primary-main font-bold ">
              {messageCount}개
            </span>
            의
          </div>
          <div>캡슐이 채워졌습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleMessageCount;
