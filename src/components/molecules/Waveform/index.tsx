import React, { useCallback, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";

import { Box, Button } from "@mui/material";

import PlayButton from "../PlayButton";

import Union from "@/assets/Union.svg";

import styles from "./index.module.scss";

interface IProps {
  url: string;
}

const MAX_SPEED = 3;

const Waveform: React.FC<IProps> = ({ url }) => {
  const containerRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [stop, setStop] = useState(true);

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 30,
    waveColor: "#D8E2F1",
    progressColor: "#3F97FF",
    url: url,
    barGap: 3,
    barWidth: 3,
    cursorWidth: 0,
    audioRate: speed,
  });

  wavesurfer?.on("finish", () => {
    setStop(!stop);
  });

  const handlePlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const handleSpeed = () => {
    if (speed >= MAX_SPEED) return setSpeed(1);
    return setSpeed(speed + 1);
  };

  return (
    <Box className={styles.wrapper}>
      <Box onClick={handlePlayPause}>
        <PlayButton stop={stop} />
      </Box>
      <Box ref={containerRef} className={styles.wave} />
      <Button
        variant="contained"
        onClick={handleSpeed}
        className={styles.speedBtn}
      >
        {speed}x
        <Union />
      </Button>
    </Box>
  );
};

export default Waveform;
