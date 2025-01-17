import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import ProfileMenu from "@/components/organisms/ProfileMenu";
import CardWrapper from "@/components/organisms/CardWrapper";
import AvatarModal from "@/components/organisms/modals/AvatarModal";

import Fox from "@/assets/fox.png";
import Hey from "@/assets/hey.png";
import England from "@/assets/united kingdom.svg";
import Notification from "@/assets/Notification.svg";
import Sound from "@/assets/sound.svg";
import Global from "@/assets/global.svg";
import Document from "@/assets/document-text.svg";
import Message from "@/assets/message-circle.svg";
import Key from "@/assets/key.svg";
import Person from "@/assets/person.svg";

import { DEFAULT_PAYMENT_MENU, IMenu } from "@/constants/data/profile.data";
import { ERoutes } from "@/constants/pages";
import { setPlan } from "@/store/plan";
import { getProfile, setProfile } from "@/store/profile";
import { removeToken } from "@/utils/AxiosConfig";
import { DEFAULT_LANGUAGE_DATA, ELocalization } from "@/constants";
import { Exitlogout } from "@/store/auth";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

export const ProfileTemplate: React.FC = () => {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);

  const localization = useSelector(getLocalization);

  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpen = () => {
    logEvent(`web_profile_${profile?.level}_image_on_press`);
    setIsOpenAvatar(true);
  };

  // const handleClose = () => {
  //   logEvent(`web_profile_${profile?.level}_image_on_close`);
  //   setIsOpenAvatar(false);
  // };

  const getLogout = async () => {
    try {
      logEvent(`web_profile_${profile?.level}_on_logout`);
      localStorage.removeItem("LingoJoyLoginDate");
      removeToken();
      dispatch(Exitlogout());
      dispatch(setProfile(null));
      dispatch(setPlan(null));
      navigate(ERoutes.QUESTIONNAIRE_START);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const DEFAULT_ACCOUNT_MENU: IMenu[] = [
    {
      id: 0,
      title: ELocalization.PROFILE_ACCOUNT_INFO,
      subMenu: [
        {
          id: 0,
          title: ELocalization.PROFILE_PASSWORD,
          icon: <Key />,
          url: ERoutes.PASSWORD,
          log: `profile_${profile?.level}_password_on_press`,
        },
        {
          id: 2,
          title: ELocalization.PROFILE_PERSONAL_INFO,
          icon: <Person />,
          url: ERoutes.MANAGE_INFORMATION,
          log: `profile_${profile?.level}_personal_info_on_press`,
        },
      ],
    },
  ];

  const generalMenu: IMenu[] = [
    {
      id: 0,
      title: ELocalization.PROFILE_GENERAL_TITLE,
      subMenu: [
        {
          id: 0,
          title: ELocalization.PROFILE_GENERAL_SOUND,
          icon: <Sound />,
          button: true,
          log: `profile_${profile?.level}_sound_on_press`,
        },
        {
          id: 1,
          title: ELocalization.PROFILE_GENERAL_LANGUAGE,
          icon: <Global />,
          rightIcon:
            DEFAULT_LANGUAGE_DATA.find((el) => el.translate === profile?.locale)
              ?.icon || DEFAULT_LANGUAGE_DATA[0].icon,
          url: ERoutes.LANGUAGE,
          log: `profile_${profile?.level}_language_on_press`,
        },
        {
          id: 2,
          title: ELocalization.PROFILE_GENERAL_TERMS,
          icon: <Document />,
          url: ERoutes.TERMS,
          log: `profile_${profile?.level}_terms_policies_on_press`,
        },
        {
          id: 3,
          title: ELocalization.PROFILE_GENERAL_CONTACT,
          icon: <Message />,
          url: ERoutes.CONTACT,
          log: `profile_${profile?.level}_contact_us_on_press`,
        },
      ],
    },
  ];

  return (
    <Box className={styles.wrapper}>
      <CardWrapper
        customStyle={{
          padding: 0,
          paddingBottom: "29px",
        }}
      >
        <ContentWrapper>
          <Box className={styles.headerWrapper}>
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.125rem",
                fontWeight: 500,
                color: "#333333",
              }}
            >
              {localization[ELocalization.PROFILE_TITLE]}
            </Typography>
            <Box className={styles.headerChipWrapper}>
              <Box className={styles.levelChip}>
                <England />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1.25rem",
                  }}
                >
                  {profile?.level || "A1"}
                </Typography>
              </Box>

              <Box className={styles.notificationChip}>
                <Box className={styles.notificationBox}>
                  <Notification />
                  <Box className={styles.notificationCircle} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.helloWrapper}>
            <Box className={styles.helloBox}>
              {profile?.image ? (
                <img
                  src={profile?.image}
                  alt={profile?.name}
                  className={styles.avatar}
                  onClick={handleOpen}
                />
              ) : (
                <Box className={styles.avatarWrapper} onClick={handleOpen}>
                  <img src={Fox} alt={profile?.name} />
                </Box>
              )}
              <Box className={styles.helloBox}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  {localization[ELocalization.PROFILE_HELLO]}
                  {profile?.name ? `, ${profile?.name}` : ""}!{" "}
                </Typography>
                <img src={Hey} alt="" className={styles.helloIcon} />
              </Box>
            </Box>
            {!profile && (
              <Box className={styles.loginWrapper}>
                <Box
                  className={styles.loginBox}
                  onClick={() => navigate(ERoutes.LOGIN)}
                >
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
                      fontWeight: 500,
                    }}
                  >
                    {localization[ELocalization.LOGIN]}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    width: "90px",
                    minWidth: "90px",
                    height: "31px",
                    p: 0,
                    fontSize: "0.875rem",
                  }}
                  onClick={() => navigate(ERoutes.SIGN_UP)}
                >
                  {localization[ELocalization.SIGN_UP]}
                </Button>
              </Box>
            )}
          </Box>
        </ContentWrapper>
        <Box className={styles.menuWrapper}>
          <ProfileMenu
            data={DEFAULT_PAYMENT_MENU}
            className={`${styles.paymentWrapper} ${styles.menuOption}`}
            withoutTitleDivider
          />
          <ProfileMenu
            data={DEFAULT_ACCOUNT_MENU}
            className={styles.menuOption}
          />
          <ProfileMenu data={generalMenu} className={styles.menuOption} />
          {profile && (
            <ContentWrapper>
              <Button
                sx={{ width: "100%", bgcolor: "#D8E2F1", color: "#303030" }}
                onClick={getLogout}
              >
                {localization[ELocalization.LOGOUT]}
              </Button>
            </ContentWrapper>
          )}
        </Box>
      </CardWrapper>
      <AvatarModal
        isOpen={isOpenAvatar}
        onClose={() => setIsOpenAvatar(false)}
      />
    </Box>
  );
};
