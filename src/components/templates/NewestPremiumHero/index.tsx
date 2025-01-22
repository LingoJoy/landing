import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ActionSection from "./ActionSection";
import HeroSection from "./HeroSection";
import HighlightsSection from "./HighlightsSection";
import UsersSection from "./UsersSection";
import WhatYouGetSection from "./WhatYouGetSection";
import YourPlanSection from "./YourPlanSection";

import PayModal from "@/components/organisms/modals/PayModal";
import { DEFAULT_PADDLE_PLAN_DATA, DEFAULT_YOUR_PLAN_DATA, ERoutes, PADDLE_STATUS_TRANSACTION } from "@/constants";
import { usePaddle } from "@/hooks/main/usePaddle";
import { IPlan } from "@/types";
import { createPlan, parseNumber } from "@/utils/objectCreators";

import styles from "./index.module.scss";

const NewestPremiumHero = () => {
  const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [plansError, setPlansError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getPrices, paddle, openCheckout, getStatus, closeCheckout } = usePaddle(ERoutes.NEWEST_LANDING);
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    setPlans([]);
    setLoading(true);

    try {
      const plan1Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[0]);
      const plan2Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[1]);
      const plan3Data = await getPrices(paddle, DEFAULT_PADDLE_PLAN_DATA[2]);

      if (!plan1Data || !plan2Data || !plan3Data) return;

      const plan1 = {
        id: plan1Data.data.details.lineItems[0].price.id,
        title: plan1Data.data.details.lineItems[1].product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[0].icon,
        price: parseNumber(
          plan1Data.data.details.lineItems[0].formattedTotals.total,
        ),
        thenPrice: parseNumber(
          plan1Data.data.details.lineItems[1].formattedTotals.total,
        ),
        period: "per day",
        periodPrice: (
          parseNumber(
            plan1Data.data.details.lineItems[0].formattedTotals.total,
          ) / 7
        ).toFixed(2),
        weeks: 1,
        createDate: plan1Data.data.details.lineItems[0].product.createdAt,
        isFourWeek: true,
        isMostPopular: false,
        productIds: plan1Data.data.details.lineItems.map((item) => item.price.id)
      };
      const plan2 = createPlan(plan2Data.data.details.lineItems, 1, true);
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

  const handlePlan = useCallback((plan: IPlan) => {
    openCheckout(plan.productIds, undefined, ERoutes.NEWEST_LANDING);
    setIsOpenPay(true);
  }, [openCheckout]);

  const onCloseHandler = useCallback(
    () => {
      setIsOpenPay(false);

      if (getStatus() !== PADDLE_STATUS_TRANSACTION.paid && getStatus() !== PADDLE_STATUS_TRANSACTION.completed) {
        window.scrollTo(0, 0);
        closeCheckout();

        navigate(ERoutes.PREMIUM);
      }
    },
    [closeCheckout, getStatus, navigate],
  );

  const actionStartHandler = useCallback(() => {
    if (plans?.length) {
      setPlan(plans[0]);
    }

    if (messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [plans]);

  const actionSkipHandler = useCallback(() => {
    if (plans?.length) {
      setPlan(plans[1]);
    }

    if (messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [plans]);

  useEffect(() => {
    getData();
  }, [paddle]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.contentWrapper}>
        <HeroSection />
        <UsersSection />
        <WhatYouGetSection />
        <HighlightsSection />
        <YourPlanSection
          plan={plan}
          onPlan={setPlan}
          openCheckout={handlePlan}
          className={styles.personalPlanWrapper}
          plans={plans}
          loading={!!loading}
          plansError={plansError}
        />
        <ActionSection
          actionStart={actionStartHandler}
          actionSkip={actionSkipHandler}
        />
        <span ref={messageRef} />
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

export default NewestPremiumHero;
