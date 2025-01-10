import { FC } from "react";

import { cleanPercentage } from "@/utils/cleanPercentage";

import styles from "./index.module.scss";

interface ICircleProps {
  color: string;
  pct?: number;
}

interface IProps {
  percentage: number;
}

const Circle: FC<ICircleProps> = ({ color, pct = 0 }) => {
  const r = 107;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;

  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={"10px"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text: FC<IProps> = ({ percentage }) => {
  return (
    <text
      className={styles.text}
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Progress: FC<IProps> = ({ percentage }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width="234px" height="234px">
      <g transform={`rotate(-90 117 100)`}>
        <Circle color={"#D8E2F1"} pct={100} />
        <Circle color={"#27AE60"} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default Progress;
