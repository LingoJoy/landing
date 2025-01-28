import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PulseButton from "@/components/atoms/PulseButton";
import PayModal from "@/components/organisms/modals/PayModal";
import ChartSection from "./ChartSection";
import GuaranteeSection from "./GuaranteeSection";
import LessonsSection from "./LessonsSection";
import PlanReservedSection from "./PlanReservedSection";
import PlanSection from "./PlanSection";
import WhatYouGetSection from "./WhatYouGetSection";
import YourPlanSection from "./YourPlanSection";

import PercentImage from "@/assets/icons/badge-percent.svg";

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

import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const NewLandingHero = () => {
  const [time, setTime] = useState(600);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [plansError, setPlansError] = useState("");
  const navigate = useNavigate();

  const { getPrices, paddle, openCheckout, getStatus, closeCheckout } = usePaddle(ERoutes.FACT);

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    setPlans([]);
    setLoading(true);

    try {
      const plan1Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[0]);
      const plan2Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[1]);
      const plan3Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[2]);

      if (!plan1Data || !plan2Data || !plan3Data) return;

      setPlansError("");

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
        productIds: plan1Data.data.details.lineItems.map((item) => item.price.id)
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
    openCheckout(plan.productIds, undefined, ERoutes.SIGN_UP);
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

  return (
    <Box className={styles.wrapper} data-class="NewLandingHero">
      <Box className={styles.headerContent}>
        <Box className={styles.headerBox}>
          <Box>
            <Box className={styles.headerTitleBox}>
              <PercentImage />
              <p className={styles.headerTitle}>
                {localization[ELocalizationQuestionnaire.YOUR]} <b>50%</b>{" "}
                {
                  localization[
                  ELocalizationQuestionnaire.NEW_LANDING_HEADER_TITLE
                  ]
                }
              </p>
            </Box>
            <p className={styles.headerTime}>
              {`${Math.floor(time / 60)}`.padStart(2, "0")}:
              {`${time % 60}`.padStart(2, "0")}
            </p>
          </Box>
          <PulseButton
            className={styles.headerBtn}
            onClick={() => {
              window.location.href = "#discount-plan";
            }}
          >
            {localization[ELocalizationQuestionnaire.GET]}
          </PulseButton>
        </Box>
      </Box>
      <Box className={styles.contentWrapper} data-class="NewLandingHero-content">
        <ChartSection />
        <PlanSection />
        <PlanReservedSection
          plan={plan}
          onPlan={setPlan}
          plans={plans}
          loading={loading}
          plansError={plansError}
          onPay={handlePlan}
        />
        <LessonsSection />
        <WhatYouGetSection />
        <GuaranteeSection />
        <YourPlanSection
          plan={plan}
          onPlan={setPlan}
          plans={plans}
          loading={loading}
          plansError={plansError}
          onPay={handlePlan}
        />
      </Box>
      <PayModal
        isOpen={isOpenPay}
        onClose={onCloseHandler}
        title={plan.title}
        price={plan.price}
        discount={plan.discount}
      />
    </Box>
  );
};

export default NewLandingHero;
