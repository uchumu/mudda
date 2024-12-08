import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "./index.css";

const CustomSwiper = () => {
  return (
    <Swiper
      slidesPerView={1.5}
      centeredSlides={true}
      spaceBetween={15}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="flex items-center justify-center w-full h-full bg-white rounded-[16px] px-[12px] pt-[12px] pb-[42px]">
          <div className="rounded-[16px] bg-[#e9e9e9] w-full h-full"></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center w-full h-full bg-white rounded-[16px] px-[12px] pt-[12px] pb-[42px]">
          <div className="rounded-[16px] bg-[#e9e9e9] w-full h-full"></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center w-full h-full bg-white rounded-[16px] px-[12px] pt-[12px] pb-[42px]">
          <div className="rounded-[16px] bg-[#e9e9e9] w-full h-full"></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-center w-full h-full bg-white rounded-[16px] px-[12px] pt-[12px] pb-[42px]">
          <div className="rounded-[16px] bg-[#e9e9e9] w-full h-full"></div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default CustomSwiper;
