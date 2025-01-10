import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.module.scss";

interface IProps {
  data: ReactNode[];
}

const Swipe: FC<IProps> = ({ data }) => {
  return (
    <Box className={styles.swiperBox}>
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
    </Box>
  );
};

export default Swipe;
