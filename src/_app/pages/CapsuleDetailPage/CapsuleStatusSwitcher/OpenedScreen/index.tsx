import IconMap from "@/assets/icons/map-icon.svg?react";
import Capsule from "@/components/Capsule";
import CapsuleNameHeader from "@/components/CapsuleNameHeader";
import CustomButtons from "@/components/CustomButtons";
import CustomSwiper from "@/components/CustomSwiper";
import { OpenedCapsule } from "@/types/server";
import { isNull, isUndefined } from "@/utils";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import MessageDetailOverlay from "./MessageDetailOverlay";
import OpenedScreenBottom from "./OpenedScreenBottom";

interface Props {
  capsule: OpenedCapsule;
}
const OpenedScreen = ({ capsule }: Props) => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);

  const [focusedMessageIndex, setFocusedMessageIndex] = useState<number>(0);
  const focusedMessage = useMemo(
    () =>
      focusedMessageIndex < capsule.messages.length - 1
        ? capsule.messages[focusedMessageIndex]
        : null,
    [capsule, focusedMessageIndex]
  );

  const goPrev = () =>
    setFocusedMessageIndex((prev) =>
      prev === 0 ? capsule.messages.length - 1 : prev - 1
    );
  const goNext = () =>
    setFocusedMessageIndex((prev) =>
      prev === capsule.messages.length - 1 ? 0 : prev + 1
    );

  // TODO: 맵 바텀시트 구현
  const onClickOpenMap = () => console.log("bottom sheet open");

  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  const MessageIndexCapsule = () => (
    <Capsule>
      <p className="text-[14px] font-bold">
        {`캡슐 ${focusedMessageIndex + 1} / `}
        <span className="text-[#A1A1A1] font-normal">
          {capsule.messageCount}
        </span>
      </p>
    </Capsule>
  );

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-primary-paper">
        <CapsuleNameHeader
          capsuleName={capsule.title}
          rightButton={
            <IconMap className="cursor-pointer" onClick={onClickOpenMap} />
          }
        />

        <MessageIndexCapsule />

        <div className="h-[35%] mt-[42px]">
          <CustomSwiper></CustomSwiper>
        </div>

        <OpenedScreenBottom messageCount={capsule.messageCount} />
      </div>

      <CustomButtons.CapsuleShareFAB code={capsuleCode} />
      <CustomButtons.BottomButton
        title="캡슐 자세히보기"
        onClick={openOverlay}
      />

      {isOverlayOpen && !isNull(focusedMessage) && (
        <MessageDetailOverlay
          message={focusedMessage}
          closeOverlay={closeOverlay}
          MessageIndexCapsule={<MessageIndexCapsule />}
          goPrev={goPrev}
          goNext={goNext}
        />
      )}
    </div>
  );
};

export default OpenedScreen;
