import React from "react";

import { Card, CardContent, CardMedia, SxProps, Theme } from "@mui/material";

import styles from "./index.module.scss";

interface ICardWrapper {
  image?: string;
  children?: React.ReactNode;
  contentSx?: SxProps<Theme>;
  cardSx?: SxProps<Theme>;
  cardMediaSx?: SxProps<Theme>;
  cardVariant?: "elevation" | "outlined";
}

export const CardContentWrapper: React.FC<ICardWrapper> = ({
  image,
  children,
  contentSx,
  cardSx,
  cardVariant,
  cardMediaSx,
}) => {
  const baseContentSx: SxProps<Theme> = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "auto",
    ...contentSx,
  };

  return (
    <Card variant={cardVariant} className={styles.card} sx={cardSx}>
      {image && <CardMedia sx={cardMediaSx} image={image} />}
      <CardContent className={styles.cardContent} sx={baseContentSx}>
        {children}
      </CardContent>
    </Card>
  );
};
