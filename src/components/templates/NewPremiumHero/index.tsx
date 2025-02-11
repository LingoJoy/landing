import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PulseButton from "@/components/atoms/PulseButton";
import CommentSection from "./CommentSection";
import FAQSection from "./FAQSection";
import HighlightsSection from "./HighlightsSection";
import LevelSection from "./LevelSection";
import UsersSection from "./UsersSection";
import YourPlanSection from "./YourPlanSection";

import {
  DEFAULT_PADDLE_PLAN_DATA,
  DEFAULT_YOUR_PLAN_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
  PADDLE_STATUS_TRANSACTION,
} from "@/constants";
import { usePaddle } from "@/hooks/main/usePaddle";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { createPlan, parseNumber, updatePriceFormatted } from "@/utils/objectCreators";

import { IPlan } from "@/types";

import PayModal from "@/components/organisms/modals/PayModal";
import { logEvent } from "@/utils/amplitude";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const NewPremiumHero = () => {
  const [time, setTime] = useState(600);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [plansError, setPlansError] = useState("");
  const { getPrices, paddle, openCheckout, getStatus, closeCheckout } = usePaddle(ERoutes.NEW_PREMIUM);
  const navigate = useNavigate();

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    setPlans([]);
    setLoading(true);

    try {
      const [plan1Data, plan2Data, plan3Data] = await Promise.all([
        getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[0]),
        getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[1]),
        getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[2])
      ]);

      if (!plan1Data || !plan2Data || !plan3Data) return;

      const plan1 = {
        id: plan1Data.data.details.lineItems[0].price.id,
        title: plan1Data.data.details.lineItems[1].product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[0].icon,
        price: plan1Data.data.details.lineItems[0].formattedTotals.total,
        thenPrice: plan1Data.data.details.lineItems[1].formattedTotals.total,
        period: "per day",
        periodPrice: updatePriceFormatted(
          plan1Data.data.details.lineItems[0].formattedTotals.total,
          (parseNumber(plan1Data.data.details.lineItems[0].formattedTotals.total)).toFixed(2),
          (parseNumber(plan1Data.data.details.lineItems[0].formattedTotals.total,) / 3).toFixed(2)
        ),
        weeks: 1,
        createDate: plan1Data.data.details.lineItems[0].product.createdAt,
        isFourWeek: true,
        isMostPopular: true,
        productIds: plan1Data.data.details.lineItems.map((item) => item.price.id),
        priceDetail: `3 days / ${plan1Data.data.details.lineItems[0].formattedTotals.total} then ${plan1Data.data.details.lineItems[1].price.billingCycle?.frequency} ${plan1Data.data.details.lineItems[1].price.billingCycle?.interval} / ${plan1Data.data.details.lineItems[1].formattedTotals.total}`
      };
      const plan2 = createPlan(plan2Data.data.details.lineItems, 1);
      const plan3 = createPlan(plan3Data.data.details.lineItems, 2);

      const newPlans = [plan1, plan2, plan3];

      setPlans(newPlans);
      setPlan(newPlans.find((el) => el.isMostPopular) || newPlans[0]);
    } catch (error) {
      setPlansError("Can't get data");
    } finally {
      setLoading(false);
    }
  };

  const handlePlan = (plan: IPlan) => {
    openCheckout(plan.productIds, undefined, ERoutes.SIGN_UP, plan.price);
    setIsOpenPay(true);
  };

  const onCloseHandler = useCallback(
    () => {
      setIsOpenPay(false);

      if (getStatus() !== PADDLE_STATUS_TRANSACTION.paid && getStatus() !== PADDLE_STATUS_TRANSACTION.completed) {
        window.scrollTo(0, 0);
        closeCheckout();

        navigate(ERoutes.FACT);
      }
    },
    [closeCheckout, getStatus, navigate],
  );

  useEffect(() => {
    logEvent(`web_showed_new-premium_page`);
  }, []);

  useEffect(() => {
    getData();
  }, [paddle]);

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

  const onClickHandler = () => {
    const planElement = document.querySelector("#plan");

    if (planElement) {
      const top = planElement.getBoundingClientRect().top + window.scrollY - 65;

      window.scrollTo({
        top,
        behavior: "smooth"
      })
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.headerContent}>
        <Box className={styles.headerBox}>
          <Box>
            <p className={styles.headerTime}>
              {`${Math.floor(time / 60)}`.padStart(2, "0")}
              <span className={styles.headerTimeDots}>:</span>
              {`${time % 60}`.padStart(2, "0")}
            </p>
            <Box className={styles.headerTimeTitles}>
              <span>
                {
                  localization[
                  ELocalizationQuestionnaire.NEW_PREMIUM_HEADER_MINUTES
                  ]
                }
              </span>
              <span>
                {
                  localization[
                  ELocalizationQuestionnaire.NEW_PREMIUM_HEADER_SECONDS
                  ]
                }
              </span>
            </Box>
          </Box>
          <PulseButton
            className={styles.headerBtn}
            onClick={onClickHandler}
          >
            {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_BTN]}
          </PulseButton>
        </Box>
      </Box>
      <Box className={styles.contentWrapper}>
        <LevelSection />
        <YourPlanSection
          plan={plan}
          onPlan={setPlan}
          onPay={handlePlan}
          title={
            localization[
            ELocalizationQuestionnaire.NEW_PREMIUM_PERSONAL_PLAN_TITLE
            ]
          }
          className={styles.personalPlanWrapper}
          plans={plans}
          loading={loading}
          plansError={plansError}
        />
        <HighlightsSection />
        <CommentSection />
        <FAQSection />
        <UsersSection />
        <YourPlanSection
          plan={plan}
          onPlan={setPlan}
          onPay={handlePlan}
          title={
            localization[ELocalizationQuestionnaire.NEW_PREMIUM_PLAN_TITLE]
          }
          className={styles.planWrapper}
          plans={plans}
          loading={loading}
          plansError={plansError}
        />
      </Box>
      <PayModal
        isOpen={isOpenPay}
        onClose={onCloseHandler}
        price={plan.priceDetail ? plan.priceDetail : plan.price}
        discount={plan.discount}
        period={plan.billingInterval}
      />
    </Box>
  );
};

export default NewPremiumHero;
