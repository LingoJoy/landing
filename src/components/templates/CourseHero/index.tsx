import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";
import { Box, Button } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import Discount from "@/components/molecules/Discount";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";

import BookImage from "@/assets/book.png";

import { DEFAULT_COURSE_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { usePaddle } from "@/hooks/main/usePaddle";

import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const CourseHero: FC<IProps> = ({ onNext }) => {
  const [price, setPrice] = useState<LineItem | null>(null);

  const { openCheckout, getPrices, paddle } = usePaddle();

  const localization = useSelector(getLocalizationQuestionnaire);

  const getData = async () => {
    try {
      const data = await getPrices(paddle, DEFAULT_COURSE_DATA);

      if (!data) return;

      setPrice(data.data.details.lineItems[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [paddle]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipse}>
        <DreamsIcon color="#FFEAE1" />
      </Box>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="90px" height="40" />
      </Box>
      <Box className={styles.centerImageBox}>
        <img className={styles.centerImage} src={BookImage} alt="" />
        {price && (
          <Box className={styles.discountWrapper}>
            <Discount
              background="#219653"
              price={price.formattedTotals.subtotal}
              discount={price.formattedTotals.total}
            />
          </Box>
        )}
      </Box>

      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box className={styles.chip}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_CHIP_4]}
          </Box>
          <h2 className={styles.title}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_TITLE_4]}
          </h2>
          <p className={styles.description}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_DESCR_4]}
          </p>
        </Box>
        <Box>
          <p className={styles.attention}>
            {localization[ELocalizationQuestionnaire.QUEST_PAY_SALE_ENDS]}
          </p>
        </Box>
      </ContentContainer>
      <Box className={styles.footerWrapper}>
        <Box className={styles.footerBox}>
          {price && (
            <Button
              sx={{ width: "100%" }}
              onClick={() =>
                openCheckout(price.price.id, price.discounts?.[0].discount.id)
              }
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
    </Box>
  );
};

export default CourseHero;