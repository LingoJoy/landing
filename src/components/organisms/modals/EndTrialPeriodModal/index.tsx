import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Modal from "@/components/atoms/Modal";

import Infinity from "@/assets/main/infinity.png";
import VerifyImage from "@/assets/icons/verify-opacity.svg";

import { DEFAULT_PADDLE_PLAN_DATA, DEFAULT_YOUR_PLAN_DATA, ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";
import { IPlan } from "@/types";
import { usePaddle } from "@/hooks/main/usePaddle";
import { createPlan, parseNumber } from "@/utils/objectCreators";
import YourPlanSection from "./YourPlanSection";
import PayModal from "../PayModal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  discount?: number;
}

const EndTrialPeriodModal: FC<IProps> = ({
  isOpen, onClose,
}) => {
  const localization = useSelector(getLocalizationQuestionnaire); const [plan, setPlan] = useState<IPlan>(DEFAULT_YOUR_PLAN_DATA[1]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [plansError, setPlansError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getPrices, paddle, openCheckout } = usePaddle(ERoutes.COURSES);

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
      };
      const plan2 = createPlan(plan2Data.data.details.lineItems[0], 1, true);
      const plan3 = createPlan(plan3Data.data.details.lineItems[0], 2);

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
    openCheckout(plan.id, undefined, ERoutes.COURSES);
    setIsOpenPay(true);
  }, [openCheckout]);

  useEffect(() => {
    getData();
  }, [paddle]);

  const childrenContent = useMemo(() => (
    <Box className={styles.contentPayWrapper} data-class="YourPlanSection">
      <YourPlanSection
        plan={plan}
        onPlan={setPlan}
        openCheckout={handlePlan}
        className={styles.personalPlanWrapper}
        plans={plans}
        loading={!!loading}
        plansError={plansError}
      />
    </Box>
  ), [handlePlan, loading, plan, plans, plansError]);


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      button={<></>}
      cardClass={styles.card}
      paperClass={styles.paper}
      headerClass={styles.header}
      closeClass={styles.close}
      contentClass={styles.contentClass}
      bottomPaper={styles.bottomPaper}
      childrenContent={childrenContent}
    >
      <Box className={styles.webWrapper} data-class="EndTrialPeriodModal">
        <Box className={styles.contentWrapper}>
          <Box className={styles.headerWrapper}>
            <Box className={styles.headerBox}>
              <h4>{localization[ELocalizationQuestionnaire.END_TRIAL_HEADER]}</h4>
            </Box>
            <img alt="" src={Infinity} className={styles.cardImage} />
            <Box className={styles.headerWrapperBg} data-class="EndTrialPeriodModalEllipseBg"/>
            <Box className={styles.headerBox}>
              <h5>{localization[ELocalizationQuestionnaire.END_TRIAL_TITLE]}</h5>
              <Box className={styles.headerBoxSecond}>
                <div><VerifyImage /> <p>{localization[ELocalizationQuestionnaire.END_TRIAL_DESCR_1]}</p></div>
                <div><VerifyImage /> <p>{localization[ELocalizationQuestionnaire.END_TRIAL_DESCR_2]}</p></div>
                <div><VerifyImage /> <p>{localization[ELocalizationQuestionnaire.END_TRIAL_DESCR_3]}</p></div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <PayModal
        isOpen={isOpenPay}
        onClose={() => setIsOpenPay(false)}
        title={plan.title}
        price={plan.price}
        discount={plan.discount}
      />
    </Modal>
  );
};

export default EndTrialPeriodModal;