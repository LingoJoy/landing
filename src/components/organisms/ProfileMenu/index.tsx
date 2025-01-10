import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import ContentWrapper from "../ContentWrapper";
import CustomDivider from "@/components/atoms/CustomDivider";
import Switcher from "@/components/atoms/Switcher";

import Arrow from "@/assets/arrow-right.svg";

import { IMenu } from "@/constants/data/profile.data";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

interface IProps {
  data: IMenu[];
  className?: string;
  withoutTitleDivider?: boolean;
}

const ProfileMenu: React.FC<IProps> = ({
  data,
  className,
  withoutTitleDivider,
}) => {
  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  return (
    <Box className={className}>
      {data.map((el, id) => (
        <Box key={`${el.title} - ${id}`}>
          <ContentWrapper>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.125rem",
                fontWeight: 500,
              }}
              className={styles.title}
            >
              {localization[el.title]}
            </Typography>
          </ContentWrapper>
          <Box className={styles.webDividerWrapper}>
            <CustomDivider
              borderColor={withoutTitleDivider ? "transparent" : "#CDD2D9"}
            />
          </Box>
          {el.subMenu.map((it, id) => (
            <ContentWrapper key={`${it.title} - ${id}`}>
              <Box
                className={styles.optionWrapper}
                onClick={() => {
                  if (!it.button && it.onClick) return it.onClick();
                  if (it.log) logEvent(it.log);
                  if (it.url) navigate(it.url);
                }}
              >
                <Box className={styles.optionBox}>
                  {it.icon}
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.125rem",
                    }}
                  >
                    {localization[it.title]}
                  </Typography>
                </Box>
                {it.button ? (
                  <Switcher
                    onClick={() => {
                      if (it.onClick) it.onClick();
                    }}
                  />
                ) : (
                  <Box className={styles.rightIconBox}>
                    {it?.rightIcon && (
                      <img
                        src={it.rightIcon}
                        alt=""
                        className={styles.rightIcon}
                      />
                    )}
                    <Arrow />
                  </Box>
                )}
              </Box>
              <CustomDivider />
            </ContentWrapper>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ProfileMenu;
