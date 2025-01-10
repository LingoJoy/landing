import { FC, useRef, useState } from "react";
import { Box } from "@mui/material";

import ArrowIcon from "@/assets/arrow-right.svg";

import styles from "./index.module.scss";

export interface IAccordionData {
  answer: string;
  question: string;
}

interface IProps {
  data: IAccordionData[];
}

interface IAccordionItemProps {
  data: IAccordionData;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: FC<IAccordionItemProps> = ({ data, isOpen, onClick }) => {
  const contentHeight = useRef<HTMLDivElement>(null);
  return (
    <Box className={styles.itemWrapper}>
      <button
        className={`${styles.questionContainer} ${isOpen ? styles.active : ""}`}
        onClick={onClick}
      >
        <p className={styles.questionContent}>{data.question}</p>
        <Box className={`${styles.arrow} ${isOpen ? styles.active : ""}`}>
          <ArrowIcon />
        </Box>
      </button>

      <Box
        ref={contentHeight}
        className={styles.answerContainer}
        style={{ height: isOpen ? contentHeight.current?.scrollHeight : "0px" }}
      >
        <p className={`${styles.answerContent} ${isOpen ? styles.active : ""}`}>
          {data.answer}
        </p>
      </Box>
    </Box>
  );
};

const Accordion: FC<IProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box className={styles.accordion}>
      {data.map((item, i) => (
        <AccordionItem
          key={i}
          data={item}
          isOpen={activeIndex === i}
          onClick={() => handleItemClick(i)}
        />
      ))}
    </Box>
  );
};

export default Accordion;
