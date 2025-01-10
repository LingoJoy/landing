import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import AnalyzeOption from "@/components/molecules/AnalyzeOption";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import Progress from "@/components/molecules/Progress";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { DEFAULT_ANALYZE_DATA, DEFAULT_TIMER } from "@/constants";
import { ERoutes } from "@/constants/pages";

import styles from "./index.module.scss";

const AnalyzeHero = () => {
  const [percentage, setPercentage] = useState(0);
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const localization = useSelector(getLocalizationQuestionnaire);

  const navigate = useNavigate();

  const intervalId: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setStep((percentage * DEFAULT_ANALYZE_DATA.length) / 100);
      if (percentage < 100) {
        setPercentage((prev) => prev + 1);
      } else {
        clearInterval(intervalId.current as NodeJS.Timeout);
        navigate({
          pathname: ERoutes.QUESTIONNAIRE_EMAIL,
          search,
        });
      }
    }, DEFAULT_TIMER / 100);
    return () => {
      clearInterval(intervalId.current as NodeJS.Timeout);
    };
  }, [navigate, percentage, search]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="90px" height="40" />
      </Box>

      <Box>
        <Box className={styles.progressWrapper}>
          <Progress percentage={percentage} />
        </Box>
        <Box className={styles.contentWrapper}>
          {DEFAULT_ANALYZE_DATA.map((el, i) => {
            return (
              <AnalyzeOption
                key={el.id}
                finished={step >= i + 1}
                active={i === 0 ? true : step.toFixed() >= `${i + 1}`}
                text={localization[el.title]}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyzeHero;
