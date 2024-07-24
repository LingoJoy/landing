import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.module.css";

interface IProps {
  data: ReactNode[];
}

const Swipe: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.swiperBox}>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        className={styles.swiperNew}
        spaceBetween={16}
        centeredSlides
        initialSlide={1}
      >
        {data.map((el, i) => (
          <SwiperSlide key={i}>{el}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipe;
