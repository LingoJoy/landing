import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import SwipeUsers from "@/components/organisms/SwipeUsers";
import UserCard from "@/components/organisms/UserCard";

import MapImage from "@/assets//map.png";
import LoveImage from "@/assets/emoji/love.png";

import {
  DEFAULT_USERS_DATA,
  DEFAULT_USERS_WEB_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const getUsersSwipeData = () => {
  const newData = [];
  for (let index = 0; index < DEFAULT_USERS_DATA.length / 2; index++) {
    const element = {
      top: DEFAULT_USERS_DATA[index],
      down: DEFAULT_USERS_DATA[
        Number((DEFAULT_USERS_DATA.length / 2 + index).toFixed())
      ],
    };
    newData.push(element);
  }
  return newData;
};

const UsersSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const usersData = getUsersSwipeData();

  return (
    <Box className={styles.usersWrapper}>
      <img src={MapImage} alt="" className={styles.usersBg} />
      <Box className={`${styles.contentBox} ${styles.indexBox}`}>
        <Box className={styles.titleWrapper}>
          <img src={LoveImage} alt="" />
          <h2 className={styles.title}>
            {localization[ELocalizationQuestionnaire.LANDING_USERS_TITLE]}
          </h2>
        </Box>
      </Box>
      <Box className={styles.usersSwapWrapper}>
        <SwipeUsers
          data={usersData.map((el) => (
            <Box
              className={`${styles.usersCard} ${styles.usersTopCard}`}
              key={el.top.id}
            >
              <UserCard
                data={el.top}
                commentStyle={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#6e6e6e",
                  width: "190px",
                }}
              />

              {el.down && (
                <Box className={`${styles.usersCard} ${styles.usersDownCard}`}>
                  <UserCard
                    data={el.down}
                    commentStyle={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#6e6e6e",
                      width: "190px",
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        />
      </Box>

      <Box className={styles.usersWebWrapper}>
        {DEFAULT_USERS_WEB_DATA.map((el) => (
          <Box className={`${styles.usersCard}`} key={el.id}>
            <UserCard
              data={el}
              commentStyle={{
                fontSize: "12px",
                lineHeight: "16px",
                color: "#6e6e6e",
                width: "190px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UsersSection;
