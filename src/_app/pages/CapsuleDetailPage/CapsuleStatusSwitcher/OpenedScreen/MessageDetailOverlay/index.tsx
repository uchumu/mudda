import BackButtonHeader from "@/components/BackButtonHeader";
import { Message } from "@/types/server";
import { ReactNode } from "react";
import MessageDetailCard from "./MessageDetailCard";

interface Props {
  message: Message;
  closeOverlay: () => void;
  MessageIndexCapsule: ReactNode;
  goPrev: () => void;
  goNext: () => void;
}
const MessageDetailOverlay = ({
  message,
  closeOverlay,
  MessageIndexCapsule,
  goPrev,
  goNext,
}: Props) => {
  return (
    <div className="absolute z-[1000] top-0 left-0 w-full h-full bg-primary-paper flex flex-col">
      <BackButtonHeader onClick={closeOverlay} />

      <div className="h-[20px]" />
      {MessageIndexCapsule}
      <div className="h-[42px]" />

      <MessageDetailCard message={message} />

      <div className="h-[38px]" />
      <div className="w-full px-[22px] pb-[30px] flex justify-between">
        <div
          className="text-[#A1A1A1] cursor-pointer text-[16px]"
          onClick={goPrev}
        >
          <span>이전</span>
        </div>
        <div
          className="text-[#A1A1A1] cursor-pointer text-[16px]"
          onClick={goNext}
        >
          <span>다음</span>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailOverlay;
