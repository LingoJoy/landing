import { FC } from "react";

import { Check } from "../..";

import styles from "./index.module.css";

interface IOptionProps {
  finished: boolean;
  active: boolean;
  text: string;
}

const AnalyzeOption: FC<IOptionProps> = ({ finished, active, text }) => {
  const getIconBorderColor = () => {
    if (finished) return "#27AE60";
    if (active) return "#CDD2D9";
    return "transparent";
  };

  return (
    <div className={styles.optionWrapper}>
      <Check
        color={getIconBorderColor()}
        checkColor={finished ? "#27AE60" : "transparent"}
      />
      <p
        className={styles.optionText}
        style={{ fontWeight: active && !finished ? 600 : 400 }}
      >
        {text}
      </p>
    </div>
  );
};

export default AnalyzeOption;
