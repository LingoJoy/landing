import React, { useRef, useState, useEffect } from "react";
import PlayButton from "@/components/molecules/PlayButton";
import styles from "./index.module.scss";
import { Box, Button } from "@mui/material";
import WaveSurfer from "wavesurfer.js";

interface PlayerProps {
  audio: string;
  border?: boolean;
}

const AudioPlayer: React.FC<PlayerProps> = ({ audio, border = true }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (waveformRef.current && !waveSurfer) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#3f97ff",
        progressColor: "#3f97ff",
        barWidth: 4,
        barGap: 3,
        barRadius: 6,
        height: 30,
      });
      ws.load(audio);
      setWaveSurfer(ws);

      ws.on("ready", () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });

      ws.on("audioprocess", () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
    }
  }, [audio, waveSurfer]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const changeSpeed = () => {
    if (waveSurfer) {
      const nextRate = playbackRate === 3 ? 1 : playbackRate + 0.5;
      waveSurfer.setPlaybackRate(nextRate);
      setPlaybackRate(nextRate);
      
      if(currentTime && duration)
        setCurrentTime(0)
    }
  };

  return (
    <Box className={styles.playerWrapper} sx={{ border: border ? "" : "none" }}>
      <PlayButton url={audio} />

      <div className={styles.waveformContainer}>
        <div ref={waveformRef} className={styles.waveform}></div>
      </div>

      <audio ref={audioRef} src={audio} className={styles.audioControl} />
      <Button className={styles.changeSpeedBtn} onClick={changeSpeed}>
        {playbackRate}x
      </Button>
    </Box>
  );
};

export default AudioPlayer;
