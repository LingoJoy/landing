import React, { CSSProperties } from "react";

import styles from "./index.module.scss";

interface IProps {
  data: string[];
  textStyle?: CSSProperties;
}

const TextList: React.FC<IProps> = ({ data, textStyle }) => {
  return (
    <ul className={styles.list}>
      {data.map((el) => (
        <li key={el} className={styles.item}>
          <p className={styles.text} style={textStyle}>
            {el}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TextList;
