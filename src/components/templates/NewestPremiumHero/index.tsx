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
import { createPlan, parseNumber, updatePriceFormatted } from "@/utils/objectCreators";

import { logEvent } from "@/utils/amplitude";
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
          (parseNumber(plan1Data.data.details.lineItems[0].formattedTotals.total) / 3).toFixed(2)
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

  const handlePlan = useCallback((plan: IPlan) => {
    openCheckout(plan.productIds, undefined, ERoutes.SIGN_UP, plan.thenPrice || plan.price);
    setIsOpenPay(true);
  }, [openCheckout]);

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
    logEvent(`web_showed_newest-landing_page`);
  }, [])

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
        price={plan.priceDetail ? plan.priceDetail : plan.price}
        discount={plan.discount}
        period={plan.billingInterval}
      />
    </Box>
  );
};

export default NewestPremiumHero;
