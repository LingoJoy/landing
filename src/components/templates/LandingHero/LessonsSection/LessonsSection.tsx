import { Swipe } from "../../..";

import IphoneImage from "../../../../images/main/iphone.png";

import { DEFAULT_LESSON_DATA } from "../../../../constants";

import styles from "../index.module.css";

const LessonsSection = () => {
  return (
    <div className={styles.lessonsWrapper}>
      <div className={styles.titleWrapper}>
        <img src={IphoneImage} alt="" />
        <h2 className={styles.title}>
          Professional app with
          <br /> tons of interactive lessons
        </h2>
      </div>
      <div className={styles.lessonsBox}>
        <Swipe
          data={DEFAULT_LESSON_DATA.map((el) => (
            <img src={el} alt="" />
          ))}
        />
      </div>
    </div>
  );
};

export default LessonsSection;
