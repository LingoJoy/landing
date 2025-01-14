import React, { FC, ChangeEvent, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";

import ChatWaveform from "@/components/molecules/ChatWaveform";

import Microphone from "@/assets/simple-microphone.svg";
import Pause from "@/assets/pause-outline.svg";
import Union from "@/assets/Union.svg";
import Trash from "@/assets/trash.svg";
import Send from "@/assets/send.svg";

import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";
import { useGoogleSpeech } from "@/hooks/audio/useGoogleSpeech";

import styles from "./index.module.scss";

const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

interface IAIChatProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onSubmitAudio: (url: string) => void;
  onTranscription: (value: string) => void;
  loading?: boolean;
  videoLoad?: boolean;
}

const AIChatInput: FC<IAIChatProps> = ({
  value,
  onChange,
  onSubmit,
  onSubmitAudio,
  onTranscription,
  loading,
  videoLoad,
}) => {
  const recognition = SpeechRecognition ? new SpeechRecognition() : undefined;
  const recognitionList = SpeechGrammarList ? new SpeechGrammarList() : undefined;
  if (recognition && recognitionList) {
    recognition.grammars = recognitionList;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
  }
  const grammar = "#JSGF V1.0; grammar moods; public <values> = [];";
  recognitionList?.addFromString(grammar, 1);

  const localization = useSelector(getLocalization);

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [sentence, setSentence] = useState("");
  const mediaStream = useRef<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();
  const chunks = useRef<Blob[]>([]);
  const [isLoadGoogle, setIsLoadGoogle] = useState(false);
  // const [isEndRecord, setIsEndRecord] = useState(true);

  const {
    resetRecordingGoogle,
    startRecordingGoogle,
    fetchRecordingGoogle,
    stopRecordingGoogle,
  } = useGoogleSpeech();

  const timeInterval = useRef<NodeJS.Timeout>();

  const handleRecord = () => {
    startRecording();
    setIsActive(true);
    timeInterval.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = async () => {
    stopRecording();
    setTime(0);
    setIsActive(false);
    stopRecordingGoogle();
    clearInterval(timeInterval.current as NodeJS.Timeout);

    // if (isEndRecord && !(recognition || sentence)) {
    setIsLoadGoogle(true);
    await fetchRecordingGoogle({
      // mediaRecorder: mediaRecorder.current,
      setSentence: setSentence,
      setTranscript: onTranscription,
      setIsLoad: setIsLoadGoogle,
    });
    // }
  };

  const handleCancel = () => {
    handleStop();
    setRecordedUrl("");
    setSentence("");
    resetRecordingGoogle();
  };

  const handleSubmitAudio = () => {
    onSubmitAudio(recordedUrl);
    onTranscription(sentence);
    setRecordedUrl("");
    setSentence("");
  };

  const startRecording = async () => {
    try {
      // let word = '';
      setSentence('');
      onTranscription('');
      startRecordingGoogle();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();

      if (recognition) {
        // setIsEndRecord(false);
        // recognition?.start();

        //   recognition.onresult = async (event) => {
        //     word = event.results[0][0].transcript;
        //     setSentence(word);
        //     onTranscription(word);
        //   };

        //   recognition.onend = async () => {
        //     if (!word && !isEndRecord) {
        //       setIsLoadGoogle(true);
        //       await fetchRecordingGoogle({
        //         // mediaRecorder: mediaRecorder.current,
        //         setSentence: setSentence,
        //         setTranscript: onTranscription,
        //         setIsLoad: setIsLoadGoogle,
        //       });
        //     }

        //     setIsEndRecord(true);
        //   }
        // }

        // if (!recognition && !isLoadGoogle) {
        //   startRecordingGoogle();
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    recognition?.stop();

    stopRecordingGoogle();
  };

  if (recordedUrl)
    return (
      <Box className={styles.chatInputWrapper}>
        <Box className={styles.chatAudioWrapper}>
          <IconButton
            onClick={handleCancel}
            className={styles.chatCloseBtn}
            size="medium"
          >
            <Trash />
          </IconButton>
          <ChatWaveform url={recordedUrl} />
          <IconButton
            onClick={handleSubmitAudio}
            className={styles.chatPauseBtn}
            size="medium"
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    );

  if (!value && isActive)
    return (
      <Box className={styles.chatInputWrapper}>
        <Box className={styles.chatAudioWrapper}>
          <IconButton
            onClick={handleCancel}
            className={styles.chatCloseBtn}
            size="medium"
          >
            <Union />
          </IconButton>
          <Box className={styles.timeBox}>
            <Box className={styles.timeRound} />
            <p className={styles.time}>
              {`${Math.floor(time / 60)}`.padStart(2, "0")}:
              {`${time % 60}`.padStart(2, "0")}
            </p>
          </Box>
          <IconButton
            onClick={handleStop}
            className={styles.chatPauseBtn}
            size="medium"
          >
            <Pause />
          </IconButton>
        </Box>
      </Box>
    );

  if (!value && !isActive)
    return (
      <Box className={styles.chatInputWrapper}>
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={localization[ELocalization.CHAT_TYPE_HERE]}
        />

        <IconButton
          onClick={handleRecord}
          className={styles.chatIconBtn}
          size="medium"
        >
          {isLoadGoogle ? (
            <Box className={styles.chatLoaderWrapper}>
              <Box className={styles.chatLoader} />
            </Box>
          ) : (<Microphone />)}
        </IconButton>
      </Box>
    );

  return (
    <Box className={styles.chatInputWrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={localization[ELocalization.CHAT_TYPE_HERE]}
      />
      {loading ? (
        <Box className={styles.chatLoaderWrapper}>
          <Box className={styles.chatLoader} />
        </Box>
      ) : (
        <IconButton
          onClick={onSubmit}
          className={videoLoad ? styles.chatSendBtn : styles.chatSendDisabledBtn}
          size="medium"
          disabled={!videoLoad}
        >
          <Send />
        </IconButton>
      )}
    </Box>
  );
};

export default AIChatInput;
