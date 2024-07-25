import { AnalyzeOption, Button } from "../../..";

import BoxImage from "../../../../images/main/box.png";

import { DEFAULT_PLAN_DATA } from "../../../../constants";

import styles from "../index.module.css";

const PlanSection = () => {
  return (
    <div className={styles.planWrapper}>
      <div className={styles.contentBox}>
        <div className={styles.titleWrapper}>
          <img src={BoxImage} alt="" />
          <h2 className={styles.title}>
            Your Personalized Plan
            <br /> Is Ready!
          </h2>
        </div>
        <div className={styles.analyzeOptionWrapper}>
          {DEFAULT_PLAN_DATA.map((el, i) => {
            return (
              <div key={el.id} className={styles.analyzeOption}>
                <AnalyzeOption finished text={el.title} active={false} />
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => {
            window.location.href = "#plan";
          }}
        >
          Get it now
        </Button>
      </div>
    </div>
  );
};

export default PlanSection;
