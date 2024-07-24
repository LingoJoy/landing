import { SwipeUsers, UserCard } from "../../..";

import MapImage from "../../../../images/map.png";
import LoveImage from "../../../../images/emoji/love.png";

import { DEFAULT_USERS_DATA } from "../../../../constants";

import styles from "../index.module.css";

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
  const usersData = getUsersSwipeData();

  return (
    <div className={styles.usersWrapper}>
      <img src={MapImage} alt="" className={styles.usersBg} />
      <div className={`${styles.contentBox} ${styles.indexBox}`}>
        <div className={styles.titleWrapper}>
          <img src={LoveImage} alt="" />
          <h2 className={styles.title}> Users love our plan </h2>
        </div>
      </div>
      <div className={styles.usersSwapWrapper}>
        <SwipeUsers
          data={usersData.map((el) => (
            <div className={`${styles.usersCard} ${styles.usersTopCard}`}>
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
                <div className={`${styles.usersCard} ${styles.usersDownCard}`}>
                  <UserCard
                    data={el.down}
                    commentStyle={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#6e6e6e",
                      width: "190px",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        />
      </div>
    </div>
  );
};

export default UsersSection;
