import { FC } from "react";
import { useSelector } from "react-redux";

import { ISelectorQuestNodeData } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  data: ISelectorQuestNodeData[];
}

const OptionList: FC<IProps> = ({ data }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <ul className={styles.list}>
      {data.map((el) => (
        <li className={styles.option} key={el.id}>
          {el.icon}
          <p className={styles.optionTitle}>{localization[el.title]}</p>
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
