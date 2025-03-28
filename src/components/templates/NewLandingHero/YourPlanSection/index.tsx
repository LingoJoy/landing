import { Box } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

import RectangleBGIcon from "@/components/atoms/icons/RectangleBGIcon";
import Loader from "@/components/atoms/Loader";
import PulseButton from "@/components/atoms/PulseButton";

import CheckIcon from "@/assets/icons/check.svg";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { IPlan } from "@/types";

import { AutoTextSize } from "auto-text-size";
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
            <AutoTextSize minFontSizePx={5} maxFontSizePx={24}>
              {data.periodPrice}
            </AutoTextSize>
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

const YourPlanSection: FC<IProps> = ({
  plan,
  onPlan,
  plans,
  loading,
  plansError,
  onPay,
}) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.yourPlanWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.yourPlanExampleBox}>
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-1.png`} alt="" />
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-2.png`} alt="" />
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-3.png`} alt="" />
        </Box>
        <Box className={styles.indexBox}>
          <Box className={styles.yourPlanSizeBox}>
            <Box className={styles.titleWrapper}>
              <h2 className={styles.title} id="plan">
                {
                  localization[
                  ELocalizationQuestionnaire.LANDING_YOUR_PLAN_TITLE
                  ]
                }
              </h2>
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
                {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_BTN]}
              </PulseButton>
            ) : null}
            <p className={styles.terms}>
              <a href="/privacy/terms_and_conditions.html">
                {localization[ELocalizationQuestionnaire.TERMS_OF_SERVICE]}
              </a>
              ,{" "}
              <a href="/privacy/privacy-policy.html">
                {localization[ELocalizationQuestionnaire.PRIVACY_POLICY]}
              </a>
              ,
              <a href="/privacy/terms_of_subcriptions.html">
                {localization[ELocalizationQuestionnaire.SUBSCRIPTION_POLICY]}
              </a>{" "}
              {localization[ELocalizationQuestionnaire.AND]}{" "}
              <a href="/privacy/money_back_guarantee.html">
                {localization[ELocalizationQuestionnaire.MONEY_BACK_POLICY]}
              </a>
              .
            </p>
            <p className={styles.terms}>
              {
                localization[
                ELocalizationQuestionnaire.LANDING_YOUR_PLAN_TERMS_1
                ]
              }{" "}
              {plan.discount ? plan.discount : plan.price}{" "}
              {localization[ELocalizationQuestionnaire.EVERY]}{" "}
              {plan.weeks > 1 ? (
                <>
                  {plan.weeks}{" "}
                  {
                    localization[
                    ELocalizationQuestionnaire.LANDING_YOUR_PLAN_WEEKS
                    ]
                  }
                </>
              ) : (
                <>
                  1{" "}
                  {
                    localization[
                    ELocalizationQuestionnaire.LANDING_YOUR_PLAN_WEEK
                    ]
                  }
                </>
              )}{" "}
              {
                localization[
                ELocalizationQuestionnaire.LANDING_YOUR_PLAN_TERMS_2
                ]
              }{" "}
              <a href="/privacy/terms_of_subcriptions.html">
                {localization[ELocalizationQuestionnaire.SUBSCRIPTION_POLICY]}
              </a>
              .
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default YourPlanSection;
