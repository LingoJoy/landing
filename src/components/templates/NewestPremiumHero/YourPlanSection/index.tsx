import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PulseButton from "@/components/atoms/PulseButton";
import Loader from "@/components/atoms/Loader";
import RectangleBGIcon from "@/components/atoms/icons/RectangleBGIcon";

import CheckIcon from "@/assets/icons/check.svg";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { IPlan } from "@/types";

import styles from "./index.module.scss";

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
      style={{ border: active ? "1px solid #FFD234" : "0.5px solid #CDD2D9" }}
    >
      <Box className={styles.planTitleWrapper}>
        <Box
          className={styles.optionCheckbox}
          style={{
            border: active ? "none" : "1px solid #CDD2D9",
            background: active ? "#FFD234" : "#fff",
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
            {data.thenPrice && (
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
            )}
            {data.discount && (
              <p>
                <span className={styles.discount}>${data.price}</span>{" "}
                <span>${data.discount}</span>
              </p>
            )}
            {!data.discount && !data.thenPrice && (
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
            )}
          </Box>
        </Box>
      </Box>
      <Box className={styles.planPriceWrapper}>
        <Box className={styles.planPriceBG}>
          <RectangleBGIcon color={active ? "#FFD234" : "#EEF3F9"} />
        </Box>
        <Box className={styles.planPriceContent}>
          <p
            className={styles.planPrice}
            style={{ color: active ? "#FFFFFF" : "#303030" }}
          >
            ${data.periodPrice}
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
  openCheckout,
  className = "",
  plans,
  loading,
  plansError,
}) => {

  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={`${styles.yourPlanWrapper}`} data-class="NewestPremiumHero-YourPlanSection">
      <Box className={styles.contentBox}>
        <Box className={styles.indexBox}>
          <Box className={styles.titleWrapper}>
            <h2 className={styles.title} id="plan">
              {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_TITLE]}
            </h2>
          </Box>
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
                      plans?.map((el) => (
                        <Box key={el.id} onClick={() => onPlan(el)}>
                          <PlanCard data={el} active={plan.id === el.id} />
                        </Box>
                      ))
                    )}
                  </>
                )}
              </Box>

              <PulseButton
                id="LANDING_YOUR_PLAN_BTN"
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
