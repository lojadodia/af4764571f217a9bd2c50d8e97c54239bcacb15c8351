import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

 

import "swiper/swiper-bundle.css";
// dummy data

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1920: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

SwiperCore.use([Navigation]);

type SliderProps = {
  slides?: any;
};
const PromotionSlider = ({slides}: SliderProps) => {
  return (
    <>
      <div className="px-2 lg:pt-3 md:pb-4 md:px-8 xl:px-12 mt-2 pb-2">
        <div className="relative">
          <Swiper 
            id="offer"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={300}
            breakpoints={offerSliderBreakpoints}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
          > 
            {slides?.map((d:any) => (
              <SwiperSlide key={d.id}>
                <a href={d.link} target={d.mode}>

                  <div style={{background: `url(${d.image})`,backgroundSize:'cover',backgroundPosition:'center', width: '100%' }} className="rounded-lg h-40 lg:h-56 border border-primary "></div>
              
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="prev cursor-pointer absolute top-2/4 left-4  md:-left-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white dark:bg-neutral-900 shadow-xl border border-gray-200 border-opacity-70 flex items-center justify-center text-gray-800 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
            role="button"
          >
            <span className="sr-only">previous</span>
            <ArrowPrev width={18} height={18} />
          </div>
          <div
            className="next cursor-pointer absolute top-2/4 right-4 md:-right-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white dark:bg-neutral-900 shadow-xl border border-gray-200 border-opacity-70 flex items-center justify-center text-gray-800 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
            role="button"
          >
            <span className="sr-only">next</span>
            <ArrowNext width={18} height={18} />
          </div>
        </div>
      </div>
    </>
    
  );
}

export default PromotionSlider;