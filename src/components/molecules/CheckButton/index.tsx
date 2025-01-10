import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import { useCheckLogic } from "@/hooks/exercises/useCheckLogic";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

interface ICheckNextButton {
  isCorrect: boolean | null;
  isDisabled: boolean;
  onClick: () => void;
  setIsCorrect: (a: boolean | null) => void;
  nextId: string;
  currentId: string;
  lastCard?: boolean;
}

const commonButtonStyles = {
  width: "100%",
  minWidth: "auto",
  mt: "auto",
  padding: {
    xs: "8px",
    sm: "12px",
  },
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
};

const CheckButton: React.FC<ICheckNextButton> = ({
  isCorrect,
  isDisabled,
  lastCard,
  nextId,
  onClick,
  setIsCorrect,
  currentId,
}) => {
  useCheckLogic({ isCorrect, lastCard, nextId, setIsCorrect, currentId });

  const localization = useSelector(getLocalization);

  return (
    <Button
      variant="main"
      disabled={isDisabled}
      sx={commonButtonStyles}
      onClick={onClick}
    >
      {lastCard
        ? localization[ELocalization.COMPLETE]
        : localization[ELocalization.CHECK]}
    </Button>
  );
};

export default CheckButton;
