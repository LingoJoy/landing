import { FC } from "react";

import { ISelectorData } from "../../../constants";

import styles from "./index.module.css";

interface IProps {
  data: ISelectorData[];
}

const OptionList: FC<IProps> = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map((el) => (
        <li className={styles.option} key={el.id}>
          <img src={el.icon} alt={el.title} className={styles.optionIcon} />
          <p className={styles.optionTitle}>{el.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
