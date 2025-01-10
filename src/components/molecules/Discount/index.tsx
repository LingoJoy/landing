import { FC } from "react";
import { Box } from "@mui/material";

import GearIcon from "@/components/atoms/icons/GearIcon";

import styles from "./index.module.scss";

interface IProps {
  price: number | string;
  discount: number | string;
  background: string;
}

const Discount: FC<IProps> = ({ price, discount, background }) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.iconWrapper}>
        <GearIcon color={background} />
      </Box>
      <p className={styles.price}>{price}</p>
      <p className={styles.discount}>{discount}*</p>
    </Box>
  );
};

export default Discount;
