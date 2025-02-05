import { FC, ReactNode, TouchEvent, useState } from "react";
import { Box } from "@mui/material";

import BackButton from "@/components/atoms/BackButton";
import Check from "@/components/atoms/Check";

import styles from "./index.module.scss";

interface IProps {
  icon?: string;
  title: ReactNode;
  onClick: () => void;
  onTouchEnd?: () => void;
  isMultiselect?: boolean;
  isActive?: boolean;
}

const SelectorOption: FC<IProps> = ({
  icon,
  title,
  isMultiselect,
  isActive,
  onClick,
  onTouchEnd
}) => {
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = () => setIsTouching(true);
  const handleTouchMove = () => setIsTouching(false)

  const handleTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    if (isTouching) {
      event.preventDefault();
      onTouchEnd ? onTouchEnd() : onClick();
    }

    setIsTouching(false);
  };

  return (
    <button
      className={styles.optionWrapper}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={onTouchEnd ? handleTouchEnd : undefined}
      style={isActive && !isMultiselect ? { background: "#EEF3F9" } : {}}
    >
      <Box className={styles.infoWrapper}>
        {icon && <img src={icon} alt="" className={styles.optionIcon} />}
        <p className={styles.optionTitle}>{title}</p>
      </Box>
      {isMultiselect ? <Check isActive={isActive || false} /> : <BackButton />}
    </button>
  );
};

export default SelectorOption;

