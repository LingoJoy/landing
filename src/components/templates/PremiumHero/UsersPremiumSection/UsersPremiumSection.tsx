import { UserCard } from "../../..";

import { DEFAULT_USERS_PREMIUM_DATA } from "../../../../constants";

import styles from "../index.module.css";

const UsersPremiumSection = () => {
  return (
    <div className={styles.usersWrapper}>
      <div className={styles.contentBox}>
        <h2 className={styles.usersTitle}>Users Love Our Plan!</h2>
        {DEFAULT_USERS_PREMIUM_DATA.map((el, i) => (
          <div className={styles.usersCardWrapper} key={i}>
            <UserCard data={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPremiumSection;
