import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, RectangleBG } from "../../..";

import FirstImage from "../../../../images/screens/iPhone-5.png";
import SecondImage from "../../../../images/screens/iPhone-6.png";
import ThirdImage from "../../../../images/screens/iPhone-7.png";
import HeartImage from "../../../../images/main/heart.png";
import CheckIcon from "../../../../images/icons/check.svg";

import { DEFAULT_YOUR_PLAN_DATA, ERoutes, IPlan } from "../../../../constants";

import styles from "../index.module.css";

interface ICardProps {
  data: IPlan;
  active: boolean;
}

const PlanCard: FC<ICardProps> = ({ data, active }) => {
  return (
    <div
      className={styles.planCard}
      style={{ border: active ? "1px solid #27AE60" : "0.5px solid #CDD2D9" }}
    >
      <div className={styles.planTitleWrapper}>
        <div
          className={styles.optionCheckbox}
          style={{
            border: active ? "none" : "1px solid #CDD2D9",
            background: active ? "#27AE60" : "#fff",
          }}
        >
          <img
            src={CheckIcon}
            alt=""
            style={{
              display: active ? "block" : "none",
            }}
          />
        </div>
        <div>
          <div className={styles.planTitleBox}>
            <h3>{data.title}</h3>
            <img src={data.icon} alt="" />
          </div>
          <div className={styles.discountBox}>
            {data.thenPrice && (
              <p>
                <span>${data.price}</span>{" "}
                <span className={styles.thenPrice}>
                  and then ${data.thenPrice}/month
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
                <span>${data.price} per month</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.planPriceWrapper}>
        <div className={styles.planPriceBG}>
          <RectangleBG color={active ? "#27AE60" : "#EEF3F9"} />
        </div>
        <div className={styles.planPriceContent}>
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
        </div>
      </div>
    </div>
  );
};

const YourPlanSection = () => {
  const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);

  const navigate = useNavigate();

  return (
    <div className={styles.contentBox}>
      <div className={styles.yourPlanWrapper}>
        <div className={styles.yourPlanExampleBox}>
          <img src={FirstImage} alt="" />
          <img src={SecondImage} alt="" />
          <img src={ThirdImage} alt="" />
        </div>
        <div className={styles.indexBox}>
          <div className={styles.titleWrapper}>
            <img src={HeartImage} alt="" />
            <h2 className={styles.title} id="plan">
              Choose your plan
            </h2>
          </div>
          <div className={styles.yourPlanBox}>
            {DEFAULT_YOUR_PLAN_DATA.map((el) => (
              <div key={el.id} onClick={() => setPlan(el)}>
                <PlanCard data={el} active={plan.id === el.id} />
              </div>
            ))}
          </div>
          <Button onClick={() => navigate(ERoutes.PREMIUM)}>Get my plan</Button>
          <p className={styles.terms}>
            <a href="https://lingojoy.app/terms_and_conditions">
              Terms of service
            </a>
            , <a href="https://lingojoy.app/privacy_policy">Privacy policy</a>,
            <a href="https://lingojoy.app/terms_of_subcriptions">
              Subscription policy
            </a>{" "}
            and{" "}
            <a href="https://lingojoy.app/money_back_guarantee">
              Money-back policy
            </a>
            .
          </p>
          <p className={styles.terms}>
            By continuing you agree that if you don't cancel at least 24 hours
            prior to the end of period, you will automatically be charged the
            full price of ${plan.discount ? plan.discount : plan.price} every{" "}
            {plan.weeks > 1 ? `${plan.weeks} weeks` : "1 week"} until you cancel
            in settings. Learn more about cancellation and refund policy in{" "}
            <a href="https://lingojoy.app/terms_and_conditions">
              Subscription Terms
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourPlanSection;
