import CapsuleIcon from "@/assets/images/capsuleIcon.png";

interface Props {
  percent: number;
}

const CircleProgress = ({ percent }: Props) => {
  return (
    <div className="relative w-full h-full">
      {/* 체일 안에 이미지가 들어갈 div */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] size-[78px] z-[3] rounded-full bg-primary-paper">
        <img src={CapsuleIcon} alt="" className="w-full h-full rounded-full" />
      </div>
      {/* 연한 배경색  */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] size-[84px] z-[2] rounded-full bg-primary-paper"></div>
      {/* 흰색  */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] size-[90px] z-[2] rounded-full bg-[#ffffff]"></div>
      {/* 부채꼴 */}
      <div
        style={{
          background: `conic-gradient(
            #5194F9 0% ${percent}%, 
            #ffffff ${percent}% 100%
          )`,
        }}
        className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] size-[96px] z-[1] rounded-full bg-[#619EFF]"
      ></div>
    </div>
  );
};

export default CircleProgress;
