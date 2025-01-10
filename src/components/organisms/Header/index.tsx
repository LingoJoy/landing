import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, Box, Typography, AppBar, Toolbar } from "@mui/material";

import Logo from "@/assets/logo.svg";
import England from "@/assets/united kingdom.svg";
import Notification from "@/assets/Notification.svg";
import Fox from "@/assets/fox.png";

import { NAVIGATION_DATA } from "@/constants/data/navigation.data";
import { getProfile } from "@/store/profile";
import LevelModal from "@/components/atoms/LevelModal";
import { ERoutes } from "@/constants";
import { getLocalization } from "@/store/localization";
import { selectExercise } from "@/store/ActiveLesson";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

interface HeaderProps {
  isSimpleType?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSimpleType = false }) => {
  const [isOpenLevel, setIsOpenLevel] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);
  const localization = useSelector(getLocalization);

  const handleOpenLevel = () => {
    if (pathname === ERoutes.COURSES)
      logEvent(`web_${profile?.level}_[{${lesson.category}]_level_show`);
    if (pathname.includes(ERoutes.COURSES))
      logEvent(`web_profile_${profile?.level}_level_show`);

    setIsOpenLevel(true);
  };

  const handleNotification = () => {
    if (pathname === ERoutes.COURSES)
      logEvent(`web_${profile?.level}_[{${lesson.category}]_notification_show`);
    if (pathname.includes(ERoutes.COURSES))
      logEvent(`web_profile_${profile?.level}_notification_show`);

    navigate(ERoutes.NOTIFICATION);
  };

  const handleAvatar = () => {
    navigate(ERoutes.PROFILE);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="secondary"
        sx={{
          boxShadow: "none",
          backgroundColor: "#eef3f9",
        }}
        className={`${isSimpleType ? styles.simpleType : ""}`}
      >
        <Toolbar>
          <Box className={`${styles.content}`}>
            <Box className={styles.leftContent}>
              <Logo />
              <Box className={styles.navigationWrapper}>
                {NAVIGATION_DATA.map((el) => (
                  <Box
                    className={`${styles.button} ${
                      pathname.includes(el.url) ? styles.active : ""
                    }`}
                    key={el.url}
                    onClick={() => navigate(el.url)}
                  >
                    {el.icon}
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        color: "inherit",
                      }}
                    >
                      {localization[el.text]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className={styles.rightContent}>
              <Box className={styles.headerChipWrapper}>
                <Box className={styles.levelChip} onClick={handleOpenLevel}>
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
                <Box
                  className={styles.notificationChip}
                  onClick={handleNotification}
                >
                  <Notification />
                  {/* <Box className={styles.notificationCircle} /> */}
                </Box>
              </Box>
            </Box>
            {profile?.image ? (
              <img
                src={profile?.image}
                alt={profile?.name}
                className={styles.avatar}
                onClick={handleAvatar}
              />
            ) : (
              <Box className={styles.avatarWrapper} onClick={handleAvatar}>
                <img src={Fox} alt={profile?.name} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
      <LevelModal isOpen={isOpenLevel} onClose={() => setIsOpenLevel(false)} />
    </>
  );
};

export default Header;
