import React from "react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "./carousel.scss";

function Carousel({ children }) {
  const swiperConfig = {
    modules: {
      Navigation,
      Pagination,
      EffectCoverflow,
    },
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 20,
      modifier: 1,
      slideShadows: true,
    },
    initialSlide: 3,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    className: "swiper",
  };

  return (
    <Swiper {...swiperConfig}>
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
