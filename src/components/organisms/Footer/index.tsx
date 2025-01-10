import React, { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";

import { NAVIGATION_DATA } from "@/constants/data/navigation.data";
import { getLocalization } from "@/store/localization";

import styles from "./index.module.scss";

const Footer: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const localization = useSelector(getLocalization);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(NAVIGATION_DATA[newValue].url);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={{ width: "100%" }}
      className={styles.wrapper}
    >
      {NAVIGATION_DATA.map((el) => (
        <BottomNavigationAction
          key={el.id}
          label={
            <Typography
              sx={{
                fontSize: "0.563rem",
                lineHeight: "1.25rem",
                color: "inherit",
              }}
            >
              {localization[el.text]}
            </Typography>
          }
          icon={el.icon}
          className={`${styles.button} ${
            pathname.includes(el.url) ? styles.active : ""
          }`}
          sx={{ p: 0 }}
        />
      ))}
    </BottomNavigation>
  );
};

export default Footer;
