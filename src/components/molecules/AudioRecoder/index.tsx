import React, { FC, useEffect, useState } from "react";

import { Box } from "@mui/material";

import Microphone from "@/assets/microphone.svg";

import styles from "./index.module.scss";

interface IProp {
  onTranscription: (value: string) => void;
  values: string[];
}

const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

const getMedia = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

const AudioRecoder: FC<IProp> = ({ onTranscription, values }) => {
  const recognition = SpeechRecognition ? new SpeechRecognition() : undefined;
  const recognitionList = SpeechGrammarList ? new SpeechGrammarList() : undefined;
  if (recognition && recognitionList) {
    recognition.grammars = recognitionList;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
  }
  const grammar =
    "#JSGF V1.0; grammar moods; public <values> = " + values.join(" | ") + ";";
  recognitionList?.addFromString(grammar, 1);

  const [pulse, setPulse] = useState(0);
  const [listening, setListening] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startListening = async () => {
    handleMedia();
    setListening(true);
    recognition?.start();

    if (recognition) {
      recognition.onresult = (event) => {
        const word = event.results[0][0].transcript;
        onTranscription(word);
      };
    }
  };

  const stopListening = async () => {
    recognition?.stop();

    setListening(false);
    if (stream)
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
  };

  const handleMedia = async () => {
    const newMedia = await getMedia();
    if (newMedia) setStream(newMedia);
  };

  useEffect(() => {
    let unmounted = false;
    if (listening || unmounted || !stream) return;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;
    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    scriptProcessor.onaudioprocess = function () {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;
      setPulse(Math.round(average));
    };

    return () => {
      unmounted = true;
    };
  }, [listening, stream]);

  useEffect(() => {
    stopListening();
  }, [values]);

  return (
    <Box
      className={`${styles.shadowWrapper} ${listening ? styles.shadowActive : ""
        }`}
      onClick={() => {
        listening ? stopListening() : startListening();
      }}
      sx={{ padding: pulse && listening ? `${pulse / 6}px` : "6px" }}
    >
      <Box
        className={`${styles.wrapper} ${listening ? styles.wrapperActive : ""}`}
      >
        <Microphone />
      </Box>
    </Box>
  );
};
export default AudioRecoder;
