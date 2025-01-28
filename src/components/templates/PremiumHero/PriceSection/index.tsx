import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

import CupImage from "@/assets/icons/cup.svg";
import FireImage from "@/assets/main/fire.png";

import { DEFAULT_MONTH_DATA, ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";
import { FC, useCallback, useEffect, useState } from "react";
import { usePaddle } from "../../../../hooks/main/usePaddle";
import { IPlan } from "../../../../types";
import { createPlan } from "../../../../utils/objectCreators";
import PayModal from "../../../organisms/modals/PayModal";
import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
}

const PriceSection: FC<IProps> = ({ onNext }) => {
  const [offerProductPrice, setOfferProductPrice] = useState<LineItem | null>(null);
  const [price, setPrice] = useState<LineItem | null>(null);
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [isOpenPay, setIsOpenPay] = useState(false);

  const { getPrices, paddle, openCheckout, closeCheckout } = usePaddle(ERoutes.SIGN_UP);

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    try {
      const data = await getPrices(paddle, DEFAULT_MONTH_DATA);
      if (data?.data?.details.lineItems[0]) {
        const planRes = createPlan(data?.data?.details.lineItems, 0);
        setPlan(planRes);
      }

      if (!data) return;

      setPrice(data.data.details.lineItems[1]);
      setOfferProductPrice(data.data.details.lineItems[0]);
    } catch (error) {
      console.error(error);
    }
  };

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
    <Box className={styles.priceWrapper}>
      <Box className={styles.chipWrapper}>
        <CupImage />
        <p>{localization[ELocalizationQuestionnaire.PREMIUM_PRICE_CHIP]}</p>
      </Box>
      <h2 className={styles.priceTitle}>
        {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_TITLE]}
      </h2>
      <Box className={styles.contentBox}>
        <Box className={styles.priceBox}>
          <Box className={styles.oldPriceBox}>
            <p className={styles.oldPriceTitle}>
              {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_OLD_TITLE]}
            </p>
            <p className={styles.oldPrice}>
              {price && (
                price.formattedTotals.subtotal
              )}
              /{localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_MONTH]}
            </p>
          </Box>
          <Box className={styles.newPriceBox}>
            <Box className={styles.newPriceTitleBox}>
              <p>
                {
                  localization[
                  ELocalizationQuestionnaire.PREMIUM_PRICE_NEW_TITLE
                  ]
                }
              </p>
              <img src={FireImage} alt="" />
              <img src={FireImage} alt="" />
            </Box>
            <p className={styles.newPrice}>
              {price && (
                price.formattedTotals.total
              )}/
              {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_MONTH]}
            </p>
            <p>
              7-
              {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_TRIAL]}
              {offerProductPrice && (
                `${offerProductPrice.formattedTotals.total} `
              )}
            </p>
          </Box>
          <Box className={styles.discountBox}>
            <p>
              50% {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_OFF]}
            </p>
          </Box>
        </Box>
      </Box>
      <Box mt="50px">
        <Box className={styles.footerWrapper}>
          <Box className={styles.footerBox}>
            {offerProductPrice && (
              <Button
                sx={{ width: "100%" }}
                onClick={() => {
                  openCheckout(offerProductPrice.price.id, offerProductPrice.discounts?.[0].discount.id);
                  setIsOpenPay(true);
                }}
              >
                {localization[ELocalizationQuestionnaire.GET_FOR]}{" "}
                {offerProductPrice.formattedTotals.total}
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
      </Box>
      {plan && (
        <PayModal
          isOpen={isOpenPay}
          onClose={onCloseHandler}
          title={plan.title}
          price={plan.price}
          discount={plan.discount}
        />)}
    </Box>
  );
};

export default PriceSection;
