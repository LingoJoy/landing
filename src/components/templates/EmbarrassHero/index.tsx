import { Box, Button } from "@mui/material";
import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LogoIcon from "@/components/atoms/icons/LogoIcon";
import OptionList from "@/components/molecules/OptionList";
import ContentContainer from "@/components/organisms/ContentContainer";
import PayModal from "@/components/organisms/modals/PayModal";
import { IPlan } from "@/types";
import { createPlan } from "@/utils/objectCreators";

import WomanImage from "@/assets/woman.png";

import {
  DEFAULT_EMBARRASS_DATA,
  DEFAULT_IRREGULAR_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
} from "@/constants";
import { usePaddle } from "@/hooks/main/usePaddle";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { logEvent } from "@/utils/amplitude";
import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const EmbarrassHero: FC<IProps> = ({ onNext }) => {
  const [price, setPrice] = useState<LineItem | null>(null);
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [isOpenPay, setIsOpenPay] = useState(false);

  const { getPrices, paddle, openCheckout, closeCheckout } = usePaddle(ERoutes.PAY);

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    try {
      const data = await getPrices(paddle, DEFAULT_IRREGULAR_DATA);
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
    logEvent(`web_showed_pay_embarrass_page`);
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
    <Box className={styles.wrapper} data-class="EmbarrassHero">
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="90px" height="40" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box className={styles.infoWrapper}>
            <img src={WomanImage} alt="" className={styles.infoImage} />
            <h3 className={styles.infoTitle}>
              {localization[ELocalizationQuestionnaire.QUEST_PAY_TITLE_2]}
            </h3>
            <Box className={styles.exampleWrapper}>
              <Box className={styles.exampleOption}>Speak</Box>
              <Box className={styles.exampleOption}>
                <Box className={styles.exampleRedLine} />
                Speaked
              </Box>
              <Box className={styles.exampleOption}>
                <Box className={styles.exampleRedLine} />
                Speaken
              </Box>
            </Box>
            <Box className={styles.correctWrapper}>
              <Box className={styles.correctOption}>Speak</Box>
              <Box className={styles.correctOption}>Spoke</Box>
              <Box className={styles.correctOption}>Spoken</Box>
            </Box>
            <h4 className={styles.subtitle}>
              {localization[ELocalizationQuestionnaire.QUEST_PAY_SUBTITLE_2]}
            </h4>
            {price && (
              <Box className={styles.priceWrapper}>
                <Box className={styles.price}>
                  {price.formattedTotals.total}
                </Box>
                <Box className={styles.discount}>
                  {price.formattedTotals.subtotal}
                </Box>
              </Box>
            )}
          </Box>
          <Box className={styles.textWrapper}>
            <h2 className={styles.title}>
              {localization[ELocalizationQuestionnaire.QUEST_PAY_MISTAKES]}
            </h2>
            <OptionList data={DEFAULT_EMBARRASS_DATA} />
          </Box>
        </Box>
      </ContentContainer>

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
          price={plan.price}
          discount={plan.discount}
        />)}
    </Box>
  );
};

export default EmbarrassHero;
