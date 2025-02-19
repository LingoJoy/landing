import { Box, Button } from "@mui/material";
import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import Discount from "@/components/molecules/Discount";
import PayModal from "@/components/organisms/modals/PayModal";
import { IPlan } from "@/types";
import { createPlan } from "@/utils/objectCreators";

import BooksImage from "@/assets/books.png";

import { DEFAULT_ALL_DATA, ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { usePaddle } from "@/hooks/main/usePaddle";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { logEvent } from "../../../utils/amplitude";
import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const PayHero: FC<IProps> = ({ onNext }) => {
  const [price, setPrice] = useState<LineItem | null>(null);
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [isOpenPay, setIsOpenPay] = useState(false);

  const { getPrices, paddle, openCheckout, closeCheckout } = usePaddle(ERoutes.PAY);

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    try {
      const data = await getPrices(paddle, DEFAULT_ALL_DATA);
      if (data?.data?.details.lineItems[0]) {
        const planRes = createPlan(data?.data?.details.lineItems, 0);
        setPlan(planRes);
      }

      if (!data) return;

      setPrice(data.data.details.lineItems[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    logEvent(`web_showed_pay_last_page`);
  }, []);

  useEffect(() => {
    getData();
  }, [paddle]);

  const onCloseHandler = useCallback(
    () => {
      setIsOpenPay(false);

      closeCheckout();
    },
    [closeCheckout],
  );

  return (
    <Box data-class="PayHero">
      <Box className={styles.wrapper}>
        <Box className={styles.logoBox}>
          <LogoIcon textColor="#fff" width="100px" height="27px" />
        </Box>
        <Box className={styles.ellipse}>
          <DreamsIcon color="#EEF3F9" />
        </Box>
        <Box className={styles.logoWrapper}>
          <LogoIcon width="90px" height="40" />
        </Box>
        <Box className={styles.centerImageBox}>
          <img className={styles.centerImage} src={BooksImage} alt="" />
          {price && (
            <Box className={styles.discountWrapper}>
              <Discount
                background="#EB5757"
                price={price.formattedTotals.subtotal}
                discount={price.formattedTotals.total}
              />
            </Box>
          )}
        </Box>
        <Box className={styles.contentWrapper}>
          <h2 className={styles.title}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_TITLE_1]}
          </h2>
          <p className={styles.description}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_DESCR_1]}
            <br />
            {localization[ELocalizationQuestionnaire.QUEST_PAY_DESCR_2]}
          </p>
          <p className={styles.attention}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_SALE_ENDS]}
          </p>
        </Box>
      </Box>
      <Box className={styles.footerWrapper}>
        <Box className={styles.footerBox}>
          {price && (
            <Button
              sx={{ width: "100%" }}
              onClick={() => {
                openCheckout(price.price.id, price.discounts?.[0].discount.id, undefined, price.formattedTotals.total);
                setIsOpenPay(true);
              }}
            >
              {localization[ELocalizationQuestionnaire.GET_FOR]}{" "}
              {price.formattedTotals.total}
            </Button>
          )}
          <p
            className={`${styles.description} ${styles.shortDescription}`}
            onClick={onNext}
          >
            {localization[ELocalizationQuestionnaire.SKIP]}
          </p>
        </Box>
      </Box>
      {plan && (
        <PayModal
          isOpen={isOpenPay}
          onClose={onCloseHandler}
          title={plan.title}
          price={price?.formattedTotals.total}
          discount={plan.discount}
        />)}
    </Box>
  );
};

export default PayHero;
