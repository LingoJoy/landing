import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import BackButton from "../BackButton";

import Close from "@/assets/close.svg";

import { DEFAULT_LEVELS, ELocalization, ERoutes, EUrls } from "@/constants";
import { getProfile, setProfile } from "@/store/profile";
import { getLocalization } from "@/store/localization";
import axios from "@/utils/AxiosConfig";
import { selectExercise } from "@/store/ActiveLesson";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const LevelModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  const modalContainerRef = useRef(null);

  const { pathname } = useLocation();

  const profile = useSelector(getProfile);
  const lesson = useSelector(selectExercise);
  const localization = useSelector(getLocalization);
  const dispatch = useDispatch();

  const handleClose = () => {
    if (pathname.includes(ERoutes.PROFILE))
      logEvent(`web_profile_${profile?.level}_language_on_close`);
    onClose();
  };

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalContainerRef.current === e.target) handleClose();
  };

  const handleLevel = async (level: string) => {
    if (profile) {
      try {
        if (pathname === ERoutes.COURSES)
          logEvent(`web_${level}_[{${lesson.category}]_level_on_change`);
        if (pathname.includes(ERoutes.PROFILE))
          logEvent(`web_profile_${level}_level_on_change`);

        await axios.patch(EUrls.USERS_PROFILE, { level });

        dispatch(setProfile({ ...profile, level }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Box
      className={`${styles.background} ${isOpen ? styles.open : ""}`}
      onClick={handleModal}
      ref={modalContainerRef}
    >
      <Box className={styles.wrapper}>
        <Box className={styles.paper}>
          <Box className={styles.header}>
            <p>{localization[ELocalization.PROFILE_ENGLISH_LEVEL]}</p>
            <button className={styles.close} onClick={handleClose}>
              <Close />
            </button>
          </Box>
          <Box className={styles.optionBox}>
            {DEFAULT_LEVELS.map((el) => (
              <button
                className={styles.level}
                key={el.id}
                onClick={() => handleLevel(el.level)}
              >
                <p>
                  {el.title} <span>({el.subTitle})</span>
                </p>
                <Box className={styles.back}>
                  <BackButton />
                </Box>
              </button>
            ))}
          </Box>
        </Box>
        <button className={styles.cancel} onClick={handleClose}>
          {localization[ELocalization.CANCEL]}
        </button>
      </Box>
    </Box>
  );
};

export default LevelModal;
