import React, { FC, useState } from "react";
import { IconButton } from "@mui/material";

import Play from "@/assets/play.svg";
import Pause from "@/assets/pause.svg";

import styles from "./index.module.scss";

const synth = window.speechSynthesis;

interface IProp {
  textValue: string;
}

const AudioSpeechButton: FC<IProp> = ({ textValue }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (e: React.MouseEvent) => {
    e.preventDefault();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textValue);
    utterance.voice =
      synth.getVoices().find((el) => el.lang.includes("en")) ||
      synth.getVoices()[0];

    synth.speak(utterance);
    setIsPlaying(true);

    setTimeout(() => setIsPlaying(false), 3000);
  };

  if (!synth) return <></>;

  return (
    <IconButton onClick={speak} className={styles.iconBtn}>
      {isPlaying ? <Pause /> : <Play />}
    </IconButton>
  );
};
export default AudioSpeechButton;
