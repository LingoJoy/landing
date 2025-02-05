import { FC, ReactNode } from "react";
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
  const handleClick = onTouchEnd || onClick;

  return (
    <button
      className={styles.optionWrapper}
      onClick={onClick}
      onTouchEnd={onTouchEnd ? handleClick : undefined}
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
