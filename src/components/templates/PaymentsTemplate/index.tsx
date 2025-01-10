import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography, Stack } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";
import BackButton from "@/components/atoms/BackButton";
import Modal from "@/components/atoms/Modal";
import TextArea from "@/components/atoms/TextArea";
import Check from "@/components/atoms/Check";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";

import Arrow from "@/assets/arrow-right.svg";
import Thumb from "@/assets/thumb-up.png";

import { ERoutes } from "@/constants/pages";
import { formatDate } from "@/utils/dateHelpers";
import { getPlan, setPlan } from "@/store/plan";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

import styles from "./index.module.scss";

const DEFAULT_UNSUBSCRIBE_OPTIONS = [
  ELocalization.PROFILE_UNSUBSCRIBE_1,
  ELocalization.PROFILE_UNSUBSCRIBE_2,
  ELocalization.PROFILE_UNSUBSCRIBE_3,
  ELocalization.PROFILE_UNSUBSCRIBE_4,
  ELocalization.PROFILE_UNSUBSCRIBE_5,
  ELocalization.PROFILE_UNSUBSCRIBE_6,
];

export const PaymentsTemplate: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [reason, setReason] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenFinishModal, setIsOpenFinishModal] = useState(false);

  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const plan = useSelector(getPlan);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      console.log({ options, reason });
      dispatch(setPlan(null));
      setIsOpenModal(false);
      setIsOpenFinishModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOption = (value: string) => {
    if (options.includes(value)) {
      const filteredData = options.filter((el) => el !== value);

      return setOptions(filteredData);
    }

    setOptions([...options, value]);
  };

  return (
    <Box className={styles.wrapper}>
      <CardWrapper
        customStyle={{
          padding: 0,
        }}
      >
        <ContentWrapper>
          <Box className={styles.webWrapper}>
            <Box className={styles.headerWrapper}>
              <Box className={styles.headerBack}>
                <BackButton
                  position="right"
                  onClick={() => navigate(ERoutes.PROFILE)}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: "1.125rem",
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                {localization[ELocalization.PROFILE_PAYMENTS]}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className={styles.webWrapper}>
            {plan && (
              <Box
                className={styles.paymentsBox}
                onClick={() => setIsOpenModal(true)}
              >
                <Box>
                  <Box className={styles.paymentsTitleBox}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.125rem",
                      }}
                    >
                      {plan.title}
                    </Typography>
                    <img src={plan.icon} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      color: "#6E6E6E",
                    }}
                  >
                    {localization[ELocalization.PROFILE_RENEWED]}{" "}
                    {formatDate(plan.createDate || "")}
                  </Typography>
                </Box>
                <Box className={styles.paymentsPriceBox}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "1rem",
                      lineHeight: "1.125rem",
                    }}
                  >
                    ${plan.discount ? plan.discount : plan.price}
                  </Typography>
                  <Arrow />
                </Box>
              </Box>
            )}
          </Box>
        </ContentWrapper>
      </CardWrapper>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        button={
          <Box className={styles.webWrapper}>
            <Button sx={{ width: "100%" }} onClick={handleSubmit}>
              {localization[ELocalization.UNSUBSCRIBE]}
            </Button>
          </Box>
        }
        cardClass={styles.card}
      >
        <ContentWrapper>
          <Box className={styles.modalHeader}>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
              }}
            >
              {localization[ELocalization.UNSUBSCRIBE]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          <Box className={styles.webWrapper}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: "1.125rem",
                mt: "24px",
              }}
            >
              {localization[ELocalization.PROFILE_UNSUBSCRIBE_QUESTION]}
            </Typography>
            <Stack className={styles.optionsWrapper}>
              {DEFAULT_UNSUBSCRIBE_OPTIONS.map((el) => (
                <Box
                  key={el}
                  className={styles.options}
                  onClick={() => handleOption(el)}
                >
                  <Check isActive={options.includes(el)} />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.125rem",
                      ml: "8px",
                    }}
                  >
                    {localization[el]}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <TextArea
              value={reason}
              onChange={setReason}
              placeholder={localization[ELocalization.PROFILE_DESCRIBE_REASON]}
              className={styles.textarea}
            />
          </Box>
        </ContentWrapper>
      </Modal>
      <Modal isOpen={isOpenFinishModal} button={<></>} cardClass={styles.card}>
        <Box className={styles.finishWrapper}>
          <Box className={styles.finishDreamsWrapper}>
            <DreamsIcon width="100%" height="100%" color="#FFEDD2" />
          </Box>
          <img src={Thumb} alt="" />
          <Stack className={styles.webWrapper} alignItems="center">
            <Typography
              sx={{
                fontSize: "1.5rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
                maxWidth: "350px",
                textAlign: "center",
                mb: "54px",
                mt: "88%",
                position: "relative",
              }}
            >
              {localization[ELocalization.PROFILE_SUBSCRIPTION_CANCELED]}
            </Typography>
            <Button
              sx={{ width: "100%", maxWidth: "351px" }}
              onClick={() => {
                setIsOpenFinishModal(false);
                navigate(ERoutes.PROFILE);
              }}
            >
              {localization[ELocalization.PROFILE_GO_TO]}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};
