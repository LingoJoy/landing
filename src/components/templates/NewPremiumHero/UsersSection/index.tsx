import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import StarIcon from "@/components/atoms/icons/StarIcon";

import {
  DEFAULT_PREMIUM_USERS_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const UsersSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.usersWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {localization[ELocalizationQuestionnaire.NEW_PREMIUM_USERS_TITLE]}
          </h2>
        </Box>
        <Box className={styles.usersBox}>
          {DEFAULT_PREMIUM_USERS_DATA.map((el, i) => (
            <Box className={styles.userCard} key={i}>
              <h4>{el.name}</h4>
              <Box className={styles.userStarsBox}>
                {new Array(5).fill(undefined).map((_, i) => (
                  <StarIcon size="14px" key={i} />
                ))}
              </Box>
              <p>{el.comment}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UsersSection;
