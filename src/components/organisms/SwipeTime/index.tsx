import { FC } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.module.scss";

interface IProps {
  data: string[];
  name: string;
  defaultValue: string;
  onIndex: (index: number) => void;
}

const SwipeTime: FC<IProps> = ({ data, onIndex, name, defaultValue }) => {
  const defaultIndex = data.findIndex((value) => value === defaultValue);
  return (
    <Box className={styles.swiperBox}>
      <Box className={styles.activeLine} />
      <Swiper
        initialSlide={defaultIndex}
        onActiveIndexChange={(swiperCore: SwiperClass) => {
          onIndex(swiperCore.activeIndex);
        }}
        slidesPerView={5}
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        loop
        centeredSlides
        mousewheel
        modules={[Mousewheel]}
        className={styles.swiper}
        slidePrevClass={styles.prev}
        slideNextClass={styles.next}
        slideActiveClass={styles.active}
      >
        {data.map((el, i) => (
          <SwiperSlide
            key={`swipe-${name}-${i}`}
            className={styles.swiperSlide}
          >
            {el}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwipeTime;
