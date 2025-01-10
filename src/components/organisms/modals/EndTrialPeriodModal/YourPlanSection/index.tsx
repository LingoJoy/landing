import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PulseButton from "@/components/atoms/PulseButton";
import Loader from "@/components/atoms/Loader";

import CheckIcon from "@/assets/icons/check.svg";
import ArrowIcon from "@/assets/new-premium/icons/arrow.svg";

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
  onPlan: (value: IPlan) => void;
  openCheckout: (value: IPlan) => void;
  className?: string;
  plans: IPlan[];
  loading: boolean;
  plansError: string;
}

const PlanCard: FC<ICardProps> = ({ data, active }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box
      className={styles.planCard}
      style={{
        border: active ? "2px solid #27AE60" : "1px solid #CDD2D9",
        height: data.isMostPopular ? "100px" : "90px",
      }}
    >
      {data.isMostPopular && (
        <Box className={styles.planPopular}>
          {localization[ELocalizationQuestionnaire.NEW_PREMIUM_PLAN_POPULAR]}
        </Box>
      )}
      <Box className={styles.planFlex}>
        <Box className={styles.planTitleWrapper}>
          <Box
            className={styles.optionCheckbox}
            style={{
              border: active ? "none" : "2px solid #a4abb6",
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
              <h3
                style={{
                  fontWeight: data.isMostPopular ? "700" : "500",
                }}
              >
                {data.title}
              </h3>
            </Box>
            {data?.isFourWeek && (
              <Box className={styles.planFourWeekBox}>
                {
                  localization[
                    ELocalizationQuestionnaire.NEW_PREMIUM_PLAN_FOUR_WEEK
                  ]
                }
              </Box>
            )}
            <Box className={styles.discountBox}>
              {data.thenPrice ? (
                <p>
                  <span>${data.price}</span>{" "}
                  <span className={styles.thenPrice}>
                    {
                      localization[
                        ELocalizationQuestionnaire.LANDING_YOUR_PLAN_AND_THEN
                      ]
                    }{" "}
                    ${data.thenPrice}/
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
                  <span className={styles.discount}>${data.price}</span>{" "}
                  <ArrowIcon />{" "}
                  <span
                    style={{
                      fontWeight: data.isMostPopular ? "700" : "400",
                    }}
                  >
                    ${data.discount}
                  </span>
                </p>
              ) : null}
              {!data.discount && !data.thenPrice ? (
                <p>
                  <span>
                    ${data.price}{" "}
                    {
                      localization[
                        ELocalizationQuestionnaire.LANDING_YOUR_PLAN_PER_MONTH
                      ]
                    }
                  </span>
                </p>
              ) : null}
            </Box>
          </Box>
        </Box>
        <Box className={styles.planPriceWrapper}>
          <Box className={styles.planPriceContent}>
            <p
              className={
                data.periodDiscount
                  ? styles.planPriceDiscount
                  : styles.planPrice
              }
            >
              ${data.periodPrice}
            </p>
            {data.periodDiscount && (
              <p className={styles.planPrice}>${data.periodDiscount}</p>
            )}
            <p className={styles.planPeriod}>{data.period}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const YourPlanSection: FC<IProps> = ({
  plan,
  onPlan,
  openCheckout,
  className = "",
  plans,
  loading,
  plansError,
}) => {

  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={`${styles.yourPlanWrapper}`}>
      <Box className={styles.contentBox}>
        <Box className={styles.indexBox}>
          <Box className={`${styles.yourPlanSizeBox} ${className}`}>
            <Box className={styles.yourPlanBGBox}>
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

              <PulseButton
                onClick={() => openCheckout(plan)}
                className={styles.pulseBtn}
              >
                {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_BTN]}
              </PulseButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default YourPlanSection;
