import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Chip, Divider, Typography } from "@mui/material";

import { ProfileTemplate } from "@/components/templates";
import ContentWrapper from "@/components/organisms/ContentWrapper";
import Modal from "@/components/atoms/Modal";
import BackButton from "@/components/atoms/BackButton";

import { ERoutes } from "@/constants/pages";
import { DEFAULT_LANGUAGE_DATA } from "@/constants/data/language.data";
import { getProfile, setProfile } from "@/store/profile";
import { ELocalization, EUrls } from "@/constants";
import { ILanguage, User } from "@/store/auth/query";
import { getLocalization, setLocalization } from "@/store/localization";
import axiosConfig from "@/utils/AxiosConfig";
import { getServerLocalization } from "@/utils/apiHelpers";
import { logEvent } from "@/utils/amplitude";

import { TLocalizationType } from "@/types";

import styles from "./index.module.scss";

export const LanguageTemplate: React.FC = () => {
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const handleSubmit = async (language: ILanguage) => {
    try {
      if (profile)
        try {
          const { data }: { data: User } = await axiosConfig.patch(
            EUrls.USERS_PROFILE,
            {
              locale: language.translate,
            },
          );

          dispatch(setProfile({ ...data, language }));

          const { localization } = await getServerLocalization();

          const { data: dataLang }: { data: TLocalizationType } =
            await axios.get(`${localization}/${language.translate}.json`);

          localStorage.setItem("localeQuest", language.translate);

          dispatch(setLocalization(dataLang));

          logEvent(
            `profile_${profile?.level}_language_${language.translate}_on_change`,
          );
        } catch (e) {
          console.error(e);
        }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={styles.wrapper} data-class="LanguageTemplate">
      <ProfileTemplate />
      <Modal
        isOpen={true}
        onClose={() => navigate(ERoutes.PROFILE)}
        button={<></>}
        cardClass={styles.card}
        zIndex="1110"
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
              {localization[ELocalization.PROFILE_CHANGE_LANGUAGE]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          {profile && (
            <Box className={styles.webWrapper}>
              {DEFAULT_LANGUAGE_DATA.map((el) => (
                <Box key={el.id}>
                  <Box
                    className={styles.optionWrapper}
                    onClick={() => handleSubmit(el)}
                  >
                    <Box className={styles.optionBox}>
                      <img src={el.icon} alt="" />
                      <Typography>{localization[el.title]}</Typography>
                      {el.translate === profile?.locale && (
                        <Chip
                          label={localization[ELocalization.SELECTED]}
                          sx={{
                            ml: "6px",
                            width: "68px",
                            height: "16px",
                            color: "#fff",
                            bgcolor: "#27AE60",
                            fontSize: "0.563rem",
                          }}
                        />
                      )}
                    </Box>
                    <BackButton />
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
        </ContentWrapper>
      </Modal>
    </Box>
  );
};