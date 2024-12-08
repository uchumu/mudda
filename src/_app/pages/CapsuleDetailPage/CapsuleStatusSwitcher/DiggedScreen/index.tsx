import IconMap from "@/assets/icons/map-icon.svg?react";
import AfterIcon from "@/assets/images/afterIcon.png";
import CapsuleIcons from "@/assets/images/capsuleIcons.png";
import DateIcons from "@/assets/images/dateIcons.png";
import CustomButtons from "@/components/CustomButtons";
import CircleProgress from "@/components/Progress/CircleProgress";
import { DiggedCapsule } from "@/types/server";

import { formatTimestampToDate, parseGoalTime } from "@/assets/ts/common.ts";
import { MapBottomSheet } from "@/components/BottomSheet";
import CapsuleNameHeader from "@/components/CapsuleNameHeader";
import { useInterval } from "@/hooks/useInterval";
import { queryKeys } from "@/queries/Capsule/useCapsuleService";
import { isUndefined } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Props {
  capsule: DiggedCapsule;
}

const DiggedScreen = ({ capsule }: Props) => {
  const navigate = useNavigate();

  const [percent, setPercent] = useState<number>(0);

  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);

  const queryClient = useQueryClient();

  const calculatePercent = (capsuleArgs: DiggedCapsule) => {
    const nowTime = Math.round(new Date().getTime() / 1000);

    const allDuration = capsuleArgs.goalTime - capsuleArgs.createTime; // 전체 기간

    const nowDuration = nowTime - capsuleArgs.createTime; // 현재까지 경과 시간

    const percentage = Math.min(
      Math.max(Math.round((nowDuration * 100) / allDuration), 0),
      100
    ); // 퍼센트 (0 ~ 100 사이로 제한)

    if (percent === 100) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.capsule({ code: capsuleCode }),
      });

      window.location.reload();

      return;
    }

    setPercent(percentage);
  };

  const [isMapShown, setIsMapShown] = useState<boolean>(false);
  const onClickOpenMap = () => setIsMapShown(true);

  useEffect(() => {
    calculatePercent(capsule);
  }, []);

  useInterval(() => {
    calculatePercent(capsule);
  }, 1000);

  return (
    <>
      <CapsuleNameHeader
        capsuleName={capsule.title}
        rightButton={
          <IconMap className="cursor-pointer" onClick={onClickOpenMap} />
        }
      />
      <div className="w-full h-full px-[22px] bg-primary-paper">
        <div className="relative mt-[18px]">
          <div className="w-full h-[calc(100vh-54px-31px)]">
            <div className="flex">
              <div className="w-full h-[42px] flex justify-center px-[16px] ">
                <div className="h-[32px] flex rounded-[16px] shadow-[0_0_15px_0_rgba(0,0,0,0.08)] items-center relative bg-white px-[13px] ">
                  오픈까지
                  <span className="mx-1 font-bold text-primary-main">
                    {parseGoalTime(capsule.goalTime).days}일
                  </span>
                  남았어요!
                  <img
                    src={AfterIcon}
                    className="absolute -bottom-[22px] left-[25%] w-[40px] h-[40px]"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_0_15px_0_rgba(0,0,0,0.07)] w-full h-[221px] mt-[66px] flex flex-col items-center justify-between px-[12px] pb-[12px]">
              <div>
                <CircleProgress percent={percent}></CircleProgress>
              </div>
              <div className="mt-[56px] text-[18px] leading-[32px] text-primary-main font-bold">
                {capsule.title}
              </div>
              <div className="flex gap-[10px] w-full">
                <div className="flex flex-col bg-[#F8F8F8] rounded-[16px] h-[86px] w-full items-center justify-center relative">
                  <div className="absolute -top-[16px] left-[16px] w-[32px] h-[32px] bg-white rounded-full flex justify-center items-center">
                    <img src={CapsuleIcons} alt="" className="w-[21px]" />
                  </div>

                  <div className="text-[#A1A1A1] text-[14px] ">캡슐 개수</div>
                  <div className="text-[#202020] text-[18px] font-bold">
                    {capsule.messageCount}개
                  </div>
                </div>

                <div className=" relative flex flex-col text-[14px] bg-[#F8F8F8] rounded-[16px] h-[86px] w-full items-center justify-center">
                  <div className="absolute -top-[16px] left-[16px] w-[32px] h-[32px] bg-white rounded-full flex justify-center items-center">
                    <img src={DateIcons} alt="" className="w-[14px]" />
                  </div>
                  <div className="text-[#A1A1A1] text-[14px]">
                    캡슐 생성 일자
                  </div>
                  <div className="text-[#202020] text-[18px] font-bold">
                    {formatTimestampToDate(capsule.createTime)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomButtons.CapsuleShareFAB code={capsuleCode} />

      {isMapShown && (
        <MapBottomSheet
          setIsShown={setIsMapShown}
          coordinateX={capsule.map.x}
          coordinateY={capsule.map.y}
        />
      )}

      <CustomButtons.BottomButton
        title={`${parseGoalTime(capsule.goalTime).days}일 ${
          parseGoalTime(capsule.goalTime).hours
        }시간 ${parseGoalTime(capsule.goalTime).minutes}분 후 오픈`}
        disabled={true}
        onClick={() => {}}
      />
    </>
  );
};

export default DiggedScreen;
