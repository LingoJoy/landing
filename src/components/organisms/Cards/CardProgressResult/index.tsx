import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, FormControl, Stack, Button } from "@mui/material";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";

import RocketResult from "@/assets/card-img/rocket-dynamic-color.svg";
import FireResult from "@/assets/card-img/fire-dynamic-color.svg";
import MedalResult from "@/assets/card-img/medal-dynamic-color.svg";
import ThumbUpResult from "@/assets/card-img/thumb-up-dynamic-color.svg";
import CrowResult from "@/assets/card-img/crow-dynamic-color.svg";
import TrophyResult from "@/assets/card-img/trophy-dynamic-color.svg";
import TargetResult from "@/assets/card-img/target-dynamic-color.svg";
import Pen from "@/assets/pen.svg";

import { hideGood, selectExercise, setStartFix } from "@/store/ActiveLesson";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";
import { getProfile } from "@/store/profile";

import styles from "./index.module.scss";

interface CardProgressResultProps {
  resultType: number;
  onClick: () => void;
}

const commonButtonStyles = {
  width: "100%",
  minWidth: "auto",
  mt: "auto",
  padding: {
    xs: "8px",
    sm: "12px",
  },
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
};

const resultConfig: Record<
  number,
  {
    title: ELocalization;
    subtitle: ELocalization;
    SVGComponent: ReactNode;
    backgroundColor: string;
  }
> = {
  0: {
    title: ELocalization.RESULT_START,
    subtitle: ELocalization.RESULT_SUB_START,
    SVGComponent: <RocketResult />,
    backgroundColor: "#fae7e3",
  },
  1: {
    title: ELocalization.RESULT_JOB,
    subtitle: ELocalization.RESULT_SUB_JOB,
    SVGComponent: <ThumbUpResult />,
    backgroundColor: "#ffedd2",
  },
  2: {
    title: ELocalization.RESULT_RESULT,
    subtitle: ELocalization.RESULT_SUB_JOB,
    SVGComponent: <MedalResult />,
    backgroundColor: "#ffd6e3",
  },
  3: {
    title: ELocalization.RESULT_EXCELLENT,
    subtitle: ELocalization.RESULT_SUB_JOB,
    SVGComponent: <TrophyResult />,
    backgroundColor: "#ffe9dd",
  },
  4: {
    title: ELocalization.RESULT_OUTSTANDING,
    subtitle: ELocalization.RESULT_SUB_OUTSTANDING,
    SVGComponent: <CrowResult />,
    backgroundColor: "#fae7e3",
  },
  5: {
    title: ELocalization.RESULT_SUPERB,
    subtitle: ELocalization.RESULT_SUB_SUPERB,
    SVGComponent: <FireResult />,
    backgroundColor: "#ffe8d2",
  },
  6: {
    title: ELocalization.RESULT_TERRIFIC,
    subtitle: ELocalization.RESULT_SUB_TERRIFIC,
    SVGComponent: <TargetResult />,
    backgroundColor: "#ffc1d8",
  },
};

const getMistakeBG = (count: number) => {
  switch (count) {
    case 1:
      return "#EDEDFF";
    case 2:
      return "#D1DFFF";
    default:
      return "#F9E5FF";
  }
};

const CardProgressResult: React.FC<CardProgressResultProps> = ({
  resultType,
  onClick,
}) => {
  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);

  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);

  const type =
    resultType > Object.keys(resultConfig).length - 1
      ? Object.keys(resultConfig).length - 1
      : resultType;

  const { title, subtitle, SVGComponent, backgroundColor } =
    lesson.gameFinished && lesson.wrongCompletedExercises.length > 0
      ? {
          title:
            lesson.wrongCompletedExercises.length === 1
              ? ELocalization.FOUND_MISTAKE
              : ELocalization.FOUND_MISTAKES,
          subtitle: ELocalization.FOUND_SUB_MISTAKE,
          SVGComponent: <Pen />,
          backgroundColor: getMistakeBG(lesson.wrongCompletedExercises.length),
        }
      : resultConfig[type];

  const handleFix = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_fix_mistakes`);
    dispatch(setStartFix(lesson.wrongCompletedExercises[0]._id));
    onClick();
  };

  const handleHide = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_inter_hide`);
    onClick();
  };

  const handleSkip = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_skip_mistakes`);
    dispatch(hideGood());
  };

  useEffect(() => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_inter_show`);
  }, []);

  return (
    <CardContentWrapper
      contentSx={{ p: 0, maxWidth: "100%", overflow: "hidden" }}
    >
      <Box className={styles.imagesBox}>
        <Box className={styles.ellipse}>
          <DreamsIcon color={backgroundColor} />
        </Box>
        <Box className={styles.mainSvg}>{SVGComponent}</Box>
      </Box>

      <Stack spacing={2} sx={{ textAlign: "center", maxHeight: "30vh" }}>
        <Typography className={styles.cardTextTitle}>
          {lesson.gameFinished && lesson.wrongCompletedExercises.length > 0 ? (
            <>
              {lesson.wrongCompletedExercises.length} {localization[title]}
            </>
          ) : (
            localization[title]
          )}
        </Typography>
        <Typography
          className={styles.cardTextSubTitle}
          variant="cardSubtitle"
          sx={{ mb: 2 }}
        >
          {localization[subtitle]}
        </Typography>
      </Stack>

      <FormControl fullWidth className={styles.button}>
        {lesson.gameFinished && lesson.wrongCompletedExercises.length > 0 ? (
          <>
            <p onClick={handleSkip}>
              {localization[ELocalization.SIMPLE_SKIP]}
            </p>
            <Button variant="main" sx={commonButtonStyles} onClick={handleFix}>
              {localization[ELocalization.FIX_MISTAKES]}
            </Button>
          </>
        ) : (
          <Button variant="main" sx={commonButtonStyles} onClick={handleHide}>
            {localization[ELocalization.CONTINUE]}
          </Button>
        )}
      </FormControl>
    </CardContentWrapper>
  );
};

export default CardProgressResult;
