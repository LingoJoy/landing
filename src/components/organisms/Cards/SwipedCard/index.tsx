import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Swiper as SwiperComponent,
  SwiperRef,
  SwiperSlide,
} from "swiper/react";
import { Controller, EffectCards, Navigation } from "swiper/modules";
import { Swiper } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Button, Typography } from "@mui/material";

import PlayButton from "@/components/molecules/PlayButton";

import Arrow from "@/assets/arrow-full-right.svg";

import { selectExercise, setNextExercise } from "@/store/ActiveLesson";

import { ELocalization, ETranslate, FB_EVENT } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";
import { getProfile } from "@/store/profile";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";

import { Exercise } from "@/types";

import styles from "./index.module.scss";
import "./keyframes.css";

interface IProps {
  exercise: Exercise;
  nextId: string;
}

const SwipedCard: React.FC<IProps> = ({ exercise, nextId }) => {
  const [activeInd, setActiveInd] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);
  const lesson = useSelector(selectExercise);

  const swiperRef = useRef<SwiperRef>(null);

  const handleProgress = () => {
    dispatch(setNextExercise(nextId || ""));
    updatePostProgress(exercise.lesson, exercise._id, "completed");
  };

  const handleNextProgress = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_next_completed`);
    logFBEvent(
      `${FB_EVENT.EXERCISE_COMPLETED} ${profile?.level}_[{${lesson.category}]`,
    );
    logFBConventionsEvent(
      `${FB_EVENT.EXERCISE_COMPLETED} ${profile?.level}_[{${lesson.category}]`,
      profile?.email || "",
    );
    handleProgress();
  };

  const getText = (text: string) => {
    return text.replace(/\*(.*?)\*/g, function (value) {
      const filter = value.replace(/\*/g, "");
      return `<span class=${styles.checkText}>${filter}</span>`;
    });
  };

  const moveToNextCard = (swiper: Swiper, progress: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (swiper.navigation.nextEl) swiper.navigation.nextEl.disabled = false;

    setDisabled(false);
    if (progress > 1.1) handleProgress();
  };

  const handleNext = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_next`);

    const active = swiperRef.current?.swiper.activeIndex;

    if (active === undefined) return;

    setActiveInd(active);

    const prevSlide = document.querySelector<HTMLElement>(
      `.slide-${active - 1}`,
    );
    const activeSlide = document.querySelector<HTMLElement>(`.slide-${active}`);
    if (activeSlide && prevSlide) {
      activeSlide.classList.add(styles.activeTransition);
      prevSlide.style.transitionDuration = "1000ms";
      prevSlide.style.animationName = `prev-${active - 1}`;
      prevSlide?.classList.add(styles.animation);
      setDisabled(true);
      setTimeout(() => {
        prevSlide.style.transitionDuration = "0ms";
        prevSlide.style.animationName = ``;
        activeSlide?.classList.remove(styles.activeTransition);
        prevSlide?.classList.remove(styles.animation);
        setDisabled(false);
      }, 1000);
    }
  };

  const handlePrev = () => {
    const active = swiperRef.current?.swiper.activeIndex;

    if (active === undefined) return;

    setActiveInd(active);

    const nextSlide = document.querySelector<HTMLElement>(
      `.slide-${active + 1}`,
    );
    const activeSlide = document.querySelector<HTMLElement>(`.slide-${active}`);

    if (activeSlide && nextSlide) {
      activeSlide.classList.add(styles.activeTransition);
      nextSlide.style.transitionDuration = "1000ms";
      nextSlide.style.animationName = `next-${active + 1}`;
      nextSlide?.classList.add(styles.animation);
      setDisabled(true);
      setTimeout(() => {
        nextSlide.style.transitionDuration = "0ms";
        nextSlide.style.animationName = ``;
        activeSlide.classList.remove(styles.activeTransition);
        nextSlide?.classList.remove(styles.animation);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.webCard}>
        <Box className={styles.cardsContainer}>
          <Box className={styles.cardsSubBottom} />
          <Box className={styles.cardsBottom} />
          <SwiperComponent
            ref={swiperRef}
            effect={"cards"}
            loop={false}
            modules={[Controller, EffectCards, Navigation]}
            className={styles.cardSwiper}
            cardsEffect={{
              rotate: true,
              slideShadows: false,
              perSlideOffset: 1,
            }}
            onProgress={moveToNextCard}
            onActiveIndexChange={(swiperCore) => {
              setActiveInd(swiperCore.activeIndex);
            }}
            grabCursor
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            observeSlideChildren
            observer
            observeParents
          >
            {exercise.cards?.map((el, index) => {
              return (
                <SwiperSlide
                  id={el._id}
                  key={`Card-${index}`}
                  className={`${styles.cardBox} ${`slide-${index}`}`}
                >
                  <img alt="" src={el.imageURL} className={styles.cardImage} />
                  <Box className={styles.cardTextContainer}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          lineHeight: "1.25rem",
                          fontWeight: 400,
                          mb: 1,
                          mr: 1,
                        }}
                      >
                        {el.word}
                      </Typography>

                      <PlayButton url={el.audioURL || ""} />
                    </Box>
                    <Typography
                      className={styles.cardText}
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        lineHeight: "1.25rem",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: getText(
                          el.desc?.[profile?.locale || ETranslate.ENGLISH] ||
                            "",
                        ),
                      }}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </Box>
        <Box className={styles.taskContainer}>
          <Typography
            variant="subtitle2"
            className={styles.task}
            sx={{ fontSize: "0.75rem", lineHeight: "1.25rem" }}
          >
            {localization[ELocalization.SLIDE_CARDS]}
          </Typography>
          <Box className={styles.buttonContainer}>
            <Button
              disabled={activeInd === 0 || disabled}
              className={`prev ${styles.prevBtn}`}
              onClick={handlePrev}
            >
              <Arrow />
            </Button>
            {exercise.cards &&
            exercise.cards?.length > 1 &&
            activeInd !== exercise.cards?.length - 1 ? (
              <Button
                disabled={disabled}
                className={`next ${styles.nextBtn}`}
                onClick={handleNext}
              >
                {localization[ELocalization.NEXT]}
              </Button>
            ) : (
              <>
                <Button
                  disabled={disabled}
                  className={`${styles.nextBtn}`}
                  onClick={handleNextProgress}
                >
                  {localization[ELocalization.NEXT]}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SwipedCard;
