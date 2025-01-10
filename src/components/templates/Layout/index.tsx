import React, { ReactNode } from "react";
import { Box } from "@mui/material";

import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import AutoHeightWrapper from "@/components/organisms/AutoHeightWrapper";
import AuthContainer from "@/components/organisms/AuthContainer";

import styles from "./index.module.scss";

interface ILayout {
  children?: ReactNode;
  withoutPadding?: boolean;
  isSimpleType?: boolean;
}

export const Layout: React.FC<ILayout> = ({
  children,
  withoutPadding,
  isSimpleType,
}) => {
  return (
    <AuthContainer>
      <AutoHeightWrapper withoutPadding>
        <Box
          sx={{
            overflow: "auto",
            backgroundColor: "#fbfcff",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Header isSimpleType={isSimpleType} />

          <Box
            className={`${styles.content} ${
              withoutPadding ? styles.withoutPadding : ""
            }`}
            sx={{
              flex: 1,
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </AutoHeightWrapper>
    </AuthContainer>
  );
};
