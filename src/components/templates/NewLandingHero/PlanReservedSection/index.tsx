import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RectangleBGIcon from "@/components/atoms/icons/RectangleBGIcon";
import Loader from "@/components/atoms/Loader";
import PulseButton from "@/components/atoms/PulseButton";

import CheckIcon from "@/assets/icons/check.svg";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { IPlan } from "@/types";

import styles from "../index.module.scss";

interface ICardProps {
  data: IPlan;
  active: boolean;
}

interface IProps {
  plan: IPlan;
  plans: IPlan[];
  onPlan: (value: IPlan) => void;
  loading: boolean;
  plansError: string;
  onPay: (plan: IPlan) => void;
}

const PlanCard: FC<ICardProps> = ({ data, active }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box
      className={styles.planCard}
      style={{ border: active ? "1px solid #27AE60" : "0.5px solid #CDD2D9" }}
    >
      <Box className={styles.planTitleWrapper}>
        <Box
          className={styles.optionCheckbox}
          style={{
            border: active ? "none" : "1px solid #CDD2D9",
            background: active ? "#27AE60" : "#fff",
          }}
        >
          <Box
            sx={{
              display: active ? "block" : "none",
            }}
          >
            <CheckIcon />
          </Box>
        </Box>
        <Box>
          <Box className={styles.planTitleBox}>
            <h3>{data.title}</h3>
            <img src={data.icon} alt="" />
          </Box>
          <Box className={styles.discountBox}>
            {data.thenPrice && data.thenPrice.length > 0 ? (
              <p>
                <span>{data.price}</span>{" "}
                <span className={styles.thenPrice}>
                  {
                    localization[
                      ELocalizationQuestionnaire.LANDING_YOUR_PLAN_AND_THEN
                    ]
                  }{" "}
                  {data.thenPrice}/
                  {
                    localization[
                      ELocalizationQuestionnaire.LANDING_YOUR_PLAN_MONTH
                    ]
                  }
                </span>
              </p>
            ) : null}
            {data.discount ? (
              <p>
                <span className={styles.discount}>{data.price}</span>{" "}
                <span>{data.discount}</span>
              </p>
            ) : null}
            {!data.discount && !data.thenPrice && (
              <p>
                <span>
                  {data.price}{" "}
                  {
                    localization[
                      ELocalizationQuestionnaire.LANDING_YOUR_PLAN_PER_MONTH
                    ]
                  }
                </span>
              </p>
            )}
          </Box>
        </Box>
      </Box>
      <Box className={styles.planPriceWrapper}>
        <Box className={styles.planPriceBG}>
          <RectangleBGIcon color={active ? "#27AE60" : "#EEF3F9"} />
        </Box>
        <Box className={styles.planPriceContent}>
          <p
            className={styles.planPrice}
            style={{ color: active ? "#FFFFFF" : "#303030" }}
          >
            {data.periodPrice}
          </p>
          <p
            className={styles.planPeriod}
            style={{ color: active ? "#FFFFFF" : "#a4abb6" }}
          >
            {data.period}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

const PlanReservedSection: FC<IProps> = ({
  plan,
  onPlan,
  plans,
  loading,
  plansError,
  onPay,
}) => {
  const [time, setTime] = useState(600);

  const localization = useSelector(getLocalizationQuestionnaire);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <Box className={styles.planReservedBg} data-class="NewLandingHero-PlanReservedSection" id="discount-plan">
      <Box className={styles.planReservedWrapper}>
        <Box className={styles.contentBox}>
          <Box className={styles.yourPlanSizeBox}>
            <Box className={styles.indexBox}>
              <Box className={styles.reservedLineBox}>
                <Box
                  className={styles.reservedLine}
                  sx={{ width: `${(time / 600) * 100}%` }}
                />
                <Box className={styles.reservedLineContent}>
                  <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}badge-percent.svg`} alt=""/>
                  <p>
                    {
                      localization[
                        ELocalizationQuestionnaire.NEW_LANDING_RESERVED_TITLE
                      ]
                    }
                  </p>
                </Box>
                <p className={styles.reservedTime}>
                  {`${Math.floor(time / 60)}`.padStart(2, "0")}:
                  {`${time % 60}`.padStart(2, "0")}
                </p>
              </Box>
              <Box className={styles.yourPlanBox}>
                {plansError ? (
                  <p className={styles.plansError}>{plansError}</p>
                ) : (
                  <>
                    {loading ? (
                      <Loader />
                    ) : (
                      plans.map((el) => (
                        <Box key={el.id} onClick={() => onPlan(el)}>
                          <PlanCard data={el} active={plan.id === el.id} />
                        </Box>
                      ))
                    )}
                  </>
                )}
              </Box>
              {!plansError && !loading && plans.length > 0 ? (
                <PulseButton
                  className={styles.fullBtn}
                  onClick={() => onPay(plan)}
                >
                  {
                    localization[
                      ELocalizationQuestionnaire.LANDING_YOUR_PLAN_BTN
                    ]
                  }
                </PulseButton>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanReservedSection;
