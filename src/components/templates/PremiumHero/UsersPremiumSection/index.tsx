import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import UserCard from "@/components/organisms/UserCard";

import {
  DEFAULT_USERS_PREMIUM_DATA,
  DEFAULT_USERS_WEB_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const UsersPremiumSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.usersWrapper}>
      <Box className={styles.contentBox}>
        <h2 className={styles.usersTitle}>
          {localization[ELocalizationQuestionnaire.PREMIUM_USERS_TITLE]}
        </h2>
        <Box className={styles.cardBox}>
          {DEFAULT_USERS_PREMIUM_DATA.map((el, i) => (
            <Box className={styles.usersCardWrapper} key={i}>
              <UserCard data={el} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={styles.cardWebBox}>
        {DEFAULT_USERS_WEB_DATA.map((el, i) => (
          <Box className={styles.usersCardWrapper} key={i}>
            <UserCard data={el} commentStyle={{ color: "#6E6E6E" }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UsersPremiumSection;
