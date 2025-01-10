import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/bundle";

import styles from "./index.module.scss";

interface IProps {
  data: ReactNode[];
}

const SwipeUsers: FC<IProps> = ({ data }) => {
  return (
    <Box className={styles.swiperBox}>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={1.6}
        className={styles.swiperNew}
        spaceBetween={16}
        centeredSlides
        initialSlide={1}
      >
        {data.map((el, i) => (
          <SwiperSlide key={`Users-${i}`}>{el}</SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwipeUsers;
