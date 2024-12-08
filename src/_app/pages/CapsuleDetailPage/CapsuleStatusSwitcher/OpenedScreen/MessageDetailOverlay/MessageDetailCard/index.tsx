import overlaySrc from "@/assets/images/modal-bbaeggom-ggomuli.png";
import { backendUrl } from "@/constants/environments";
import { Message } from "@/types/server";
import { useMemo } from "react";

interface Props {
  message: Message;
}
const MessageDetailCard = ({ message }: Props) => {
  const hasImage = useMemo(() => message.imageUrl !== "", [message]);
  const imageSrc = useMemo(
    () => `${backendUrl}/images/${message.imageUrl}`,
    [message]
  );

  return (
    <div className="w-full flex-1 flex flex-col px-[22px]">
      <div className="relative p-[12px] w-full flex-1 flex flex-col backdrop:rounded-[16px]">
        <img
          src={overlaySrc}
          className="absolute top-[-27px] right-[20px] w-[42px] h-[31px]"
        />
        {hasImage && (
          <>
            <div className="w-full h-[256px] rounded-[16px] bg-[#E9E9E9] mb-[22px]">
              <img src={imageSrc} className="rounded-[16px] object-contain" />
            </div>
            <div className="h-[22px]" />
          </>
        )}
        <p className="text-[16px] font-bold">{message.userName}</p>
        <div className="h-[14px]" />
        <div className="w-full h-[calc(100vh-54px-20px-32px-42px-12px-256px-22px-24px-14px-12px-38px-54px)] overflow-y-auto">
          <p className="text-[14px]">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailCard;
