import React, { useEffect } from "react";
import { IconButton } from "@mui/material";

import Play from "@/assets/play.svg";
import Pause from "@/assets/pause.svg";

import { useAudio } from "@/hooks/audio/useAudio";

import styles from "./index.module.scss";

interface IProps {
  url?: string;
  className?: string;
  stop?: boolean;
}

const PlayButton: React.FC<IProps> = ({ url = "", className, stop }) => {
  const { isPlaying, togglePlaying, setPlaying } = useAudio(url);

  const handleClick = () => {
    togglePlaying();
  };

  useEffect(() => setPlaying(false), [stop, url]);

  return (
    <IconButton
      onClick={handleClick}
      className={`${styles.iconBtn} ${className}`}
      sx={{ background: "#fff" }}
    >
      {isPlaying ? <Pause /> : <Play />}
    </IconButton>
  );
};

export default PlayButton;
