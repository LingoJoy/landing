import { useState, useEffect } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);

  const togglePlaying = () => setPlaying(!isPlaying);

  audio.onended = () => setPlaying(false);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  return { isPlaying, setPlaying, togglePlaying };
};
