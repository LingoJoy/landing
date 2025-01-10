import React from "react";

import { Divider, SxProps } from "@mui/material";

interface IProps {
  borderColor?: string;
  sx?: SxProps;
}

const CustomDivider: React.FC<IProps> = ({ borderColor, sx }) => {
  return (
    <Divider
      sx={{
        borderBottomWidth: "0.5px",
        borderColor: borderColor || "#CDD2D9",
        m: "8px 0",
        ...sx,
      }}
    />
  );
};

export default CustomDivider;
