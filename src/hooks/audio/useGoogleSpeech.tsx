import { useState } from "react";
import { AxiosError } from "axios";

import axios from "@/utils/AxiosConfig";

import { logEvent } from "@/utils/amplitude";
import { useSelector } from "react-redux";
import { getProfile } from "@/store/profile";
import { EUrls } from "@/constants";

interface IFetchRecordingGoogleProps {
  mediaRecorder?: MediaRecorder;
  setSentence?: React.Dispatch<React.SetStateAction<string>>;
  setTranscript?: (value: string) => void;
  setIsLoad?: (value: React.SetStateAction<boolean>) => void
}

export const useGoogleSpeech = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorderGoogle, setMediaRecorderGoogle] = useState<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const profile = useSelector(getProfile);

  const resetRecordingGoogle = async () => {
    setRecording(false);
    setMediaRecorderGoogle(null);
    setTranscription('');
    setErrorMsg('');
  };

  const startRecordingGoogle = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();

      setRecording(true);
      setMediaRecorderGoogle(recorder);
    } catch (error) {
      setErrorMsg(`Error getting user media: ${error}`);
    }
  };

  const fetchRecordingGoogle = async (props?: IFetchRecordingGoogleProps) => {
    const {
      mediaRecorder,
      setSentence,
      setTranscript,
      setIsLoad,
    } = props || {};

    const media = mediaRecorder || mediaRecorderGoogle;
    let resTranscript = '';

    try {
      if (!mediaRecorder) {
        media?.stop();
      }

      media?.addEventListener('dataavailable', async (event) => {
        const audioBlob = event.data;

        try {
          const startTime = performance.now();
          const data = new FormData();
          data.append("audio", audioBlob);

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}${EUrls.GOOGLE_SPEECH_TRANSCRIBE}`,
            data,
          );

          const endTime = performance.now();
          const elapsedTime = endTime - startTime;

          console.log('Time taken (ms):', elapsedTime);

          resTranscript = response.data?.transcription;

          if (response.data.results && response.data.results.length > 0) {
            setTranscription(resTranscript);
          } else {
            setTranscription(resTranscript);
          }

          if (setSentence) {
            setSentence(resTranscript);
          }
          if (setTranscript) {
            setTranscript(resTranscript);
          }
        } catch (error) {
          console.error('Error with Google Speech-to-Text API:', (error as AxiosError)?.response?.data);
          logEvent(`web_google_speech_${profile?.level}_error_get_media_${(error as AxiosError)?.response?.data}`);
        } finally {
          setIsLoad && setIsLoad(false);
        }
      });

      setRecording(true);
      setMediaRecorderGoogle(mediaRecorderGoogle);
    } catch (error) {
      setErrorMsg(`Error getting user media: ${error}`);
    } finally {
      setIsLoad && setIsLoad(false);
    }

    return resTranscript;
  };

  const stopRecordingGoogle = async () => {
    if (mediaRecorderGoogle) {
      await mediaRecorderGoogle?.stop();
      setRecording(false);
    }
  };

  return {
    resetRecordingGoogle,
    startRecordingGoogle,
    fetchRecordingGoogle,
    stopRecordingGoogle,
    recording,
    transcription,
    errorMsg,
  };
};
