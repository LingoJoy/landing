import { Box } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

import Loader from "@/components/atoms/Loader";


import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { IPlan } from "@/types";

import GuardIcon from "@/assets/payments/guard-shield.svg";
import PaymentIcons from "@/assets/payments/payment_methods.png";
import classNames from "classnames";
import styles from "../index.module.scss";

interface ICardProps {
  data: IPlan;
  active: boolean;
  discount: number;
}

interface IProps {
  plan: IPlan;
  onPlan: (value: IPlan) => void;
  title: string;
  className?: string;
  plans: IPlan[];
  loading: boolean;
  plansError: string;
  onPay: (plan: IPlan) => void;
  // discount: number;
}

const parseCurrency = (value: string): { currency: string; i: number; f: string } => {
  value = value.trim();

  const match = value.match(/^([^\d]+)?(\d+)([.,](\d{1,2}))?$/);

  if (!match) {
    return { currency: "", i: 0, f: "0" };
  }

  const currency = match[1] || "";
  let i = parseInt(match[2], 10);
  let f = match[4] ? match[4].padEnd(2, "0") : "0"
  if (i == 1 && parseInt(f) == 0) {
    i = 0;
    f = "99";
  }
  return { currency, i, f };
};

const PlanCard: FC<ICardProps> = ({ data, active, discount }) => {
  const priceForrmated = discount > 0 ? parseCurrency(`${data.periodPrice}`) : data.isFourWeek ? parseCurrency(`${data.periodPrice}`)  : parseCurrency(`${data.periodPriceWithoutDiscount}`);
  const activeDiscount = discount > 0;
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box
      className={classNames(styles.planCard, { [styles.active]: active })}
    >
      {data.isMostPopular && (
        <Box className={styles.planPopular}>
          {localization[ELocalizationQuestionnaire.NEW_PREMIUM_PLAN_POPULAR]}
        </Box>
      )}
      <Box className={styles.planFlex}>
        <Box className={styles.planTitleWrapper}>
          <Box>
            <Box className={styles.planTitleBox}>
              <h3>
                {data.title}
              </h3>
            </Box>

            {activeDiscount ? (
              <Box
                className={classNames(styles.newDiscountBox, { [styles.active]: active })}
              >
                <span>SAVE {discount}%</span>
              </Box>
            ) : (<></>)}

            {/* {data.isFourWeek ? (
              <Box className={styles.priceWithoutDiscount}>
                <span>
                  {data.price}
                </span>
              </Box>
            ) : (<></>)
            } */}

            <Box className={styles.discountBox}>
              {data.discount ? (
                <p style={{
                  display: "inline",
                }}>
                  {activeDiscount && (
                    <span className={styles.discount}>{data.price}</span>)
                  }
                  {" "}
                  <span className={styles.priceWithoutDiscount}>
                    {activeDiscount ? data.discount : data.price}
                  </span>
                </p>
              ) : null}

              {data.isFourWeek ? (
                <Box className={styles.fourWeekBlock}>
                  <p>{data.price}</p>
                  <span>
                    {data.priceDetail}
                  </span>
                </Box>
              ) : (<></>)
              }
            </Box>
          </Box>
        </Box>
        <Box
          className={styles.planPriceWrapper}
          color={active ? "black" : "#CDD2D9"}
        >
          <Box className={styles.planPriceContent}>
            {activeDiscount ? (
              <Box className={styles.priceDiscountPerDay}>
                <span>
                  {data.periodPriceWithoutDiscount}
                </span>
              </Box>
            ) : (<></>)
            }
            <Box>
              <span style={{
                fontSize: "16px",
                fontWeight: "600",
                display: "inline-table",
                transform: "translateX(-10px)",
              }}>
                {priceForrmated.currency}
              </span>
              <Box>
                <span style={{
                  fontSize: "56px",
                  fontWeight: "600"
                }}>
                  {priceForrmated.i}
                </span>
              </Box>
            </Box>
            <Box>
              <span style={{
                fontSize: "16px",
                fontWeight: "600"
              }}>
                {priceForrmated.f}
              </span>
              <p className={styles.planPeriod}>{data.period}</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const YourPlanSection: FC<IProps> = ({
  plan,
  onPlan,
  className = "",
  plans,
  loading,
  plansError,
  onPay
}) => {

  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={`${styles.yourPlanWrapper}`} id="plan">
      <Box className={styles.contentBox}>
        <Box className={styles.indexBox}>
          <Box className={`${styles.yourPlanSizeBox} ${className}`}>
            <Box>
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
                          <PlanCard data={el} active={plan.id === el.id} discount={el.discountFormmated ?? 0} />
                        </Box>
                      ))
                    )}
                  </>
                )}
              </Box>
              {/* <PulseButton
                onClick={() => onPay(plan)}
                className={styles.pulseBtn}
              >
                {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_BTN]}
              </PulseButton> */}
              <button
                onClick={() => onPay(plan)}
                className={styles.buttonStartPlan}>
                {localization[ELocalizationQuestionnaire.NEW_PREMIUM_LANDING_PLAN_START_LEARN]}
              </button>

              <Box className={styles.planGuardShield}>
                <GuardIcon />
                <span>{localization[ELocalizationQuestionnaire.NEW_PREMIUM_LANDING_PLAN_PAY_SAFE]}</span>
              </Box>

              <img src={PaymentIcons} style={{ height: "46px" }} alt="Payment Methods" />

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
    </Box>
  );
};

export default YourPlanSection;
