import { useNavigate } from "react-router";
import { useState } from "react";

import {
  GuaranteeSection,
  Header,
  LessonsSection,
  PlanSection,
  UsersSection,
  WhatYouGetSection,
  YourPlanSection,
} from "../..";

import StarImage from "../../../images/main/star.png";
import PrizeImage from "../../../images/levels/prize.png";
import RocketImage from "../../../images/transport/rocket.png";
import GrowImage from "../../../images/grow.png";

import { DEFAULT_LEVEL_DATA, ERoutes } from "../../../constants";

import styles from "./index.module.css";

const LandingHero = () => {
  const [words, setWords] = useState(751);

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Header
        children={
          <div className={styles.headerContent}>
            <p className={styles.headerTitle}>Your plan is ready</p>
            <img src={StarImage} alt="" />
          </div>
        }
        onClick={() => navigate(ERoutes.PREMIUM)}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.contentBox}>
          <div className={styles.titleWrapper}>
            <img src={PrizeImage} alt="" />
            <h2 className={styles.title}>Your vocabulary test result</h2>
            <p className={styles.description}>{words} words</p>
          </div>
          <div className={styles.levelTable}>
            <div className={styles.levelHeader}>
              <p>Level</p>
              <p>Active</p>
              <p>Passive</p>
            </div>
            <div className={styles.levelBody}>
              {DEFAULT_LEVEL_DATA.map((el) => (
                <div
                  key={el.id}
                  className={
                    words > el.active && words < el.passive
                      ? styles.activeLevel
                      : styles.level
                  }
                >
                  <p>{el.title}</p>
                  <p>{el.active}</p>
                  <p>{el.passive}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.titleWrapper}>
            <img src={RocketImage} alt="" />
            <h2 className={styles.title}>
              Learn new words with us and boost your English level
            </h2>
          </div>
        </div>
        <img src={GrowImage} alt="" className={styles.chart} />
        <PlanSection />
        <LessonsSection />
        <WhatYouGetSection />
        <UsersSection />
        <GuaranteeSection />
        <YourPlanSection />
      </div>
    </div>
  );
};

export default LandingHero;
