import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { backendUrl } from "@/constants/environments";
import { Message } from "@/types/server";
import clsx from "clsx";
import { useMemo } from "react";
import "./index.css";

interface Props {
  messages: Array<Message>;
  openOverlay: () => void;
  handleClickThumbnail: (index: number) => void;
}
const CustomSwiper = ({
  messages,
  openOverlay,
  handleClickThumbnail,
}: Props) => {
  return (
    <Swiper
      slidesPerView={1.5}
      centeredSlides={true}
      spaceBetween={40}
      grabCursor={true}
      onSlideChange={(swiper) => handleClickThumbnail(swiper.activeIndex)}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {messages.map((message, index) => (
        <SwiperSlide
          key={`message-thumbnail${message.userName}-${index}`}
          onClick={() => {
            handleClickThumbnail(index);
            openOverlay();
          }}
          style={{
            backgroundColor: "#0000",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageThumbnail message={message} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

interface MessageThumbnailProps {
  message: Message;
}
const MessageThumbnail = ({ message }: MessageThumbnailProps) => {
  const hasImage = useMemo(() => message.imageUrl !== "", [message]);
  const imageSrc = useMemo(
    () => `${backendUrl}/images/${message.imageUrl}`,
    [message]
  );

  return (
    <div
      className={clsx(
        "flex w-full h-[90%] bg-white rounded-[16px] px-[12px] py-[12px] shadow-[0_0_15px_0_rgba(0,0,0,0.08)]",
        hasImage && "pb-[40px]"
      )}
      style={{
        transform: `rotate(${(Math.random() - 0.5) * 20}deg)`, // 랜덤 회전 적용
      }}
    >
      {hasImage ? (
        <>
          <div className="rounded-[16px] bg-[#e9e9e9] w-full h-full flex items-center">
            <img
              className="w-full h-full rounded-[16px] object-contain"
              src={imageSrc}
            />
          </div>
        </>
      ) : (
        <div className="text-left text-[14px] overflow-hidden text-ellipsis whitespace-normal break-word">
          {message.text.length > 330
            ? `${message.text.slice(0, 330)}...`
            : message.text}
        </div>
      )}
    </div>
  );
};

export default CustomSwiper;
