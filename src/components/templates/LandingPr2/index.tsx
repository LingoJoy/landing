import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import TimerIcon from "@/assets/payments/timern.svg";
import PayModal from "@/components/organisms/modals/PayModal";
import GuaranteeSection from "./GuaranteeSection";
import LessonsSection from "./LessonsSection";
import PlanSection from "./PlanSection";
import WhatYouGetSection from "./WhatYouGetSection";
import YourPlanSection from "./YourPlanSection";

import {
  DEFAULT_YOUR_PLAN_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
  PADDLE_LANDING_PR2_LAST_CHANCE_PLAN_DATA,
  PADDLE_LANDING_PR2_PLAN_DATA,
  PADDLE_STATUS_TRANSACTION
} from "@/constants";
import { usePaddle } from "@/hooks/main/usePaddle";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { createPlan, parseNumber, updatePriceFormatted } from "@/utils/objectCreators";

import { IPlan } from "@/types";

import { logEvent } from "@/utils/amplitude";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import LastChanceModal from "./LastChance";

const useCountdown = (initialTime: number, onEnd: any) => {
  const [time, setTime] = useState(initialTime);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timerRef.current);
      onEnd?.();
      return;
    }

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          onEnd?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [time]);

  const restartTimer = (newTime: number) => {
    clearInterval(timerRef.current);
    setTime(newTime);
  };

  return { time, restartTimer };
};

const LandingPr2 = () => {
  const { time, restartTimer } = useCountdown(600, () => {
    setSpecialDiscountProc(0);
  });
  const [specialDiscountProc, setSpecialDiscountProc] = useState(60);
  const [lastChance, setLastChance] = useState(false);
  const [isLastChanceModal, setIsLastChanceModal] = useState(false);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [lastChancePlans, setLastChancePlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [plansError, setPlansError] = useState("");
  const navigate = useNavigate();

  const { getPrices, paddle, openCheckout, getStatus, closeCheckout } = usePaddle();

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    setPlans([]);
    setLoading(true);

    try {
      const [planWeekData, plan1Data, plan2Data, planLastChance1Data, planLastChance2Data] = await Promise.all([
        getPrices(paddle, PADDLE_LANDING_PR2_PLAN_DATA[0]), 
        getPrices(paddle, PADDLE_LANDING_PR2_PLAN_DATA[1]), 
        getPrices(paddle, PADDLE_LANDING_PR2_PLAN_DATA[2]),
        getPrices(paddle, PADDLE_LANDING_PR2_LAST_CHANCE_PLAN_DATA[1]),
        getPrices(paddle, PADDLE_LANDING_PR2_LAST_CHANCE_PLAN_DATA[2]),
      ]);

      if (!planWeekData || !plan1Data || !plan2Data || !planLastChance1Data || !planLastChance2Data) return;

      setPlansError("");

      // const planWeek = createPlan(planWeekData.data.details.lineItems, 0);
      const url = window.location.pathname;
      let popularIdx = 0;

      if (url.includes(ERoutes.LANDING_PR2)) popularIdx = 0;
      if (url.includes(ERoutes.LANDING_PR3)) popularIdx = 1;
      if (url.includes(ERoutes.LANDING_PR4)) popularIdx = 2;

      const planWeek = {
        id: planWeekData.data.details.lineItems[0].price.id,
        title: planWeekData.data.details.lineItems[0].product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[0].icon,
        price: planWeekData.data.details.lineItems[0].formattedTotals.total,
        thenPrice: planWeekData.data.details.lineItems[1].formattedTotals.total,
        period: "per day",
        periodPrice: updatePriceFormatted(
          planWeekData.data.details.lineItems[0].formattedTotals.total, 
          (parseNumber(planWeekData.data.details.lineItems[0].formattedTotals.total) / 7).toFixed(2)
        ),
        weeks: 1,
        createDate: planWeekData.data.details.lineItems[0].product.createdAt,
        isFourWeek: true,
        isMostPopular: false,
        productIds: planWeekData.data.details.lineItems.map((item) => item.price.id),
        priceDetail: `then ${planWeekData.data.details.lineItems[1].price.billingCycle?.frequency} ${planWeekData.data.details.lineItems[1].price.billingCycle?.interval} / ${planWeekData.data.details.lineItems[1].formattedTotals.total}`
      };

      const plan1 = createPlan(plan1Data.data.details.lineItems, 1);
      const plan2 = createPlan(plan2Data.data.details.lineItems, 2);

      const planLastChance1 = createPlan(planLastChance1Data.data.details.lineItems, 1);
      const planLastChance2 = createPlan(planLastChance2Data.data.details.lineItems, 2);

      const newPlans = [planWeek, plan1, plan2];
      const lastChancePlans = [planWeek, planLastChance1, planLastChance2];

      newPlans.forEach((el, i) => {
        if(i == popularIdx){
          el.isMostPopular = true;
        }
      });

      lastChancePlans.forEach((el, i) => {
        if(i == popularIdx){
          el.isMostPopular = true;
        }
      });

      setLastChancePlans(lastChancePlans);

      setPlans(newPlans);
      setPlan(newPlans.find((el) => el.isMostPopular) || newPlans[0]);
    } catch (error) {
      setPlansError("Can't get data");
    } finally {
      setLoading(false);
    }
  };

  const handlePlan = (plan: IPlan) => {
    openCheckout(plan.productIds, time > 0 ? plan.discountID : undefined, ERoutes.SIGN_UP, plan.thenPrice || plan.discount);
    setIsOpenPay(true);
  };

  const onCloseHandler = useCallback(
    () => {
      setIsOpenPay(false);

      if (getStatus() !== PADDLE_STATUS_TRANSACTION.paid && getStatus() !== PADDLE_STATUS_TRANSACTION.completed) {
        window.scrollTo(0, 0);
        closeCheckout();

        if (!lastChance) {
          setIsLastChanceModal(true);
        } else {
          navigate(ERoutes.FACT);
        }
      }
    },
    [closeCheckout, getStatus, navigate],
  );

  useEffect(() => {
    logEvent(`web_showed_landing_pr`);
  }, []);

  useEffect(() => {
    getData();
  }, [paddle]);

  return (
    <Box className={styles.wrapper} data-class="NewLandingHero">
      <Box className={styles.contentWrapper} data-class="NewLandingHero-content">
        <Box className={styles.offerCardMain}>
          {specialDiscountProc > 0 && (
            <Box className={styles.headerContent}>
              <Box className={styles.headerBox}>
                <Box>
                  <Box className={styles.headerTitleBox}>
                    <span className={styles.headerTitle}>
                      {localization[ELocalizationQuestionnaire.NEW_LANDING_HEADER_TITLE]}
                    </span>
                  </Box>
                  <Box className={styles.headerTime}>
                    <TimerIcon />
                    <p >
                      {`${Math.floor(time / 60)}`.padStart(2, "")}:
                      {`${time % 60}`.padStart(2, "0")}
                    </p>
                  </Box>
                </Box>
                <button
                  className={styles.headerBtn}
                  onClick={() => { handlePlan(plan) }}
                >
                  {localization[ELocalizationQuestionnaire.CONTINUE]}
                </button>
              </Box>
            </Box>
          )}
          {lastChance && specialDiscountProc > 0 && (
            <Box className={styles.offerLastChance}>
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}ln-boxoffer_banner.png`} alt="" />
              <Box className={styles.offerLastChanceText}>
                <span>{localization[ELocalizationQuestionnaire.LANDING_LAST_CHANCE_BOX_1]}</span>
                <span style={{ color: "gray", textDecorationLine: "line-through" }}>33%</span>
                <span> {localization[ELocalizationQuestionnaire.LANDING_LAST_CHANCE_BOX_2]}</span>
              </Box>
            </Box>
          )}
          <PlanSection />
          <YourPlanSection
            plan={plan}
            onPlan={setPlan}
            plans={plans}
            loading={loading}
            plansError={plansError}
            onPay={handlePlan} title={""}
            // discount={specialDiscountProc}
          />
        </Box>
        <LessonsSection />
        <WhatYouGetSection />
        <GuaranteeSection />
        <YourPlanSection
          plan={plan}
          onPlan={setPlan}
          plans={plans}
          loading={loading}
          plansError={plansError}
          onPay={handlePlan} title={""}
          // discount={specialDiscountProc}
        />
      </Box>
      <PayModal
        isOpen={isOpenPay}
        onClose={onCloseHandler}
        price={plan.priceDetail ? plan.priceDetail : plan.discount}
        discount={plan.discount}
        period={plan.billingInterval}
      />
      {isLastChanceModal && <LastChanceModal onClose={() => {
        restartTimer(600);
        setSpecialDiscountProc(71);

        setLastChance(true);
        setPlans(lastChancePlans);
        setPlan(lastChancePlans.find((el) => el.isMostPopular) || lastChancePlans[0]);
      }} />}
    </Box>
  );
};

export default LandingPr2;
