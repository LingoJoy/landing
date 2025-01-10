import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

import VerifyImage from "@/assets/new-premium/icons/official.svg";
import LikeImage from "@/assets/new-premium/icons/like.svg";
import CommentImage from "@/assets/new-premium/icons/comment.svg";
import MessengerImage from "@/assets/new-premium/icons/messenger.svg";
import SaveImage from "@/assets/new-premium/icons/save.svg";

import {
  DEFAULT_PREMIUM_COMMENT_DATA,
  ELocalizationQuestionnaire,
  ICommentData,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

interface ICommentCardProps {
  data: ICommentData;
}

const CommentCard: FC<ICommentCardProps> = ({ data }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.commentCardWrapper}>
      <Box className={styles.commentCardHeader}>
        <Box className={styles.commentCardAvatarBox}>
          <img src={data.image} />
        </Box>
        <Box className={styles.commentCardHeaderNameBox}>
          <Box className={styles.commentCardNameBox}>
            <h3>{data.name}</h3>
            <VerifyImage />
          </Box>
          <p>{data.country}</p>
        </Box>
      </Box>
      <img className={styles.commentCardImage} src={data.image} alt="" />
      <Box className={styles.commentCardActiveWrapper}>
        <Box className={styles.commentCardActiveBox}>
          <button>
            <LikeImage />
          </button>
          <button>
            <CommentImage />
          </button>
          <button>
            <MessengerImage />
          </button>
        </Box>
        <Box className={styles.commentCardPaginationBox}>
          <button></button>
          <button></button>
          <button></button>
        </Box>
        <button>
          <SaveImage />
        </button>
      </Box>
      <Box className={styles.commentCardLikedWrapper}>
        <Box className={styles.commentCardLikedAvatarBox}>
          <img src={data.imageLiked} />
        </Box>
        <p>
          {localization[ELocalizationQuestionnaire.NEW_PREMIUM_COMMENT_LIKED]}{" "}
          <span>{data.nameLiked}</span>{" "}
          {localization[ELocalizationQuestionnaire.AND]}{" "}
          <span>
            {data.liked}{" "}
            {
              localization[
                ELocalizationQuestionnaire.NEW_PREMIUM_COMMENT_OTHERS
              ]
            }
          </span>
        </p>
      </Box>
      <p className={styles.userComment}>{data.comment}</p>
    </Box>
  );
};

const CommentSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const [commentMode, setCommentMode] = useState(1);

  return (
    <Box className={styles.commentWrapper}>
      <Box className={styles.commentBG} />
      <Box className={styles.commentBox}>
        <Box className={styles.contentBox}>
          <Box className={styles.titleWrapper}>
            <h2 className={styles.title}>
              {
                localization[
                  ELocalizationQuestionnaire.NEW_PREMIUM_COMMENT_TITLE
                ]
              }
            </h2>
          </Box>
          <Box className={styles.commentNavWrapper}>
            <Box
              className={`${styles.commentNav} ${
                commentMode === 1 ? styles.commentNavActive : ""
              }`}
              onClick={() => setCommentMode(1)}
            >
              {localization[ELocalizationQuestionnaire.NEW_PREMIUM_COMMENT_TOP]}
            </Box>
            <Box
              className={`${styles.commentNav} ${
                commentMode === 2 ? styles.commentNavActive : ""
              }`}
              onClick={() => setCommentMode(2)}
            >
              {
                localization[
                  ELocalizationQuestionnaire.NEW_PREMIUM_COMMENT_NEWEST
                ]
              }
            </Box>
          </Box>
          <Box className={styles.commentUserWrapper}>
            <Swiper
              watchSlidesProgress={true}
              slidesPerView={1}
              spaceBetween={16}
              centeredSlides
              grabCursor
            >
              {DEFAULT_PREMIUM_COMMENT_DATA.map((el) => (
                <SwiperSlide key={el.id}>
                  <CommentCard data={el} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
