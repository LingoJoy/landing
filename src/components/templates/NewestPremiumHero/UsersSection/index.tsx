import { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import StarIcon from "@/components/atoms/icons/StarIcon";

import { DEFAULT_PREMIUM_USERS_DATA } from "@/constants";

import styles from "../index.module.scss";

const UsersSection = () => {
  return (
    <Box className={styles.usersWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.usersBox}>
          <Box className={styles.swiperBox}>
            <Swiper
              style={
                {
                  "--swiper-pagination-color": "#303030",
                } as CSSProperties
              }
              watchSlidesProgress={true}
              slidesPerView={1}
              modules={[Pagination]}
              className={styles.swiperComment}
              spaceBetween={16}
              pagination
              centeredSlides
            >
              {DEFAULT_PREMIUM_USERS_DATA.map((el, i) => (
                <SwiperSlide key={i}>
                  <Box className={styles.userCard}>
                    <h4>{el.name}</h4>
                    <Box className={styles.userStarsBox}>
                      {new Array(5).fill(undefined).map((_, i) => (
                        <StarIcon size="14px" key={i} />
                      ))}
                    </Box>
                    <p>{el.comment}</p>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersSection;
