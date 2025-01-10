import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { useHorizontalScroll } from "@/hooks/main/useHorizontalScroll";

import styles from "./index.module.scss";

export interface IFilter {
  title: string;
  key: string;
}

interface IProps {
  filters: IFilter[];
  onActive: (filter: string) => void;
  activeFilter: string;
}

const FilterCarousel: React.FC<IProps> = ({
  filters,
  onActive,
  activeFilter,
}) => {
  const scrollRef = useHorizontalScroll();

  const handleButtonClick = (index: number) => {
    onActive(filters[index].key);
  };

  return (
    <Box className={styles.filterCarousel}>
      <Box className={styles.carouselContainer} ref={scrollRef}>
        {filters.map((filter, index) => (
          <Button
            key={index}
            variant={filter.key === activeFilter ? "empty" : "text"}
            className={
              filter.key === activeFilter
                ? styles.filterButton
                : styles.textButton
            }
            onClick={() => handleButtonClick(index)}
          >
            <Typography className={styles.filterButtonText}>
              {filter.title}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default FilterCarousel;
