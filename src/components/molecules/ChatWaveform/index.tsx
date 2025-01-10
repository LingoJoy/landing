import React, { useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

import { Box, IconButton } from "@mui/material";

import Play from "@/assets/play.svg";
import Pause from "@/assets/pause.svg";

import styles from "./index.module.scss";

interface IProps {
  url: string;
}

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const ChatWaveform: React.FC<IProps> = ({ url }) => {
  const containerRef = useRef(null);

  const { wavesurfer, currentTime, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 36,
    waveColor: "#fff",
    progressColor: "#2A5A96",
    url: url,
    barGap: 1,
    barWidth: 2,
    cursorWidth: 0,
  });

  const handlePlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <Box className={styles.wrapper}>
      <Box onClick={handlePlayPause} className={styles.playBtnBox}>
        <IconButton className={`${styles.playBtn}`}>
          {isPlaying ? <Pause /> : <Play />}
        </IconButton>
      </Box>
      <Box className={styles.waveBox}>
        <Box ref={containerRef} className={styles.wave} />
      </Box>
      <p className={styles.time}>{formatTime(currentTime)}</p>
    </Box>
  );
};

export default ChatWaveform;
