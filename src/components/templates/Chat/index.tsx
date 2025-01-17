import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { AxiosError } from "axios";
import { Box, Button, IconButton } from "@mui/material";

import AutoHeightWrapper from "@/components/organisms/AutoHeightWrapper";
import Header from "@/components/organisms/Header";
import Modal from "@/components/atoms/Modal";
import Sidebar from "@/components/atoms/Sidebar";
import ModalAIContent from "@/components/organisms/modals/ModalAIContent";
import AIChatInput from "@/components/organisms/AIChatInput";
import { useAlert } from "@/components/organisms/AlertMessage";
import EndTrialPeriodModal from "@/components/organisms/modals/EndTrialPeriodModal";

import Union from "@/assets/Union.svg";
import Volume from "@/assets/volume-high.svg";
import NoVolume from "@/assets/volume-cross.svg";

import { ELocalization, ERoutes, EUrls } from "@/constants";
import axiosInter, { getToken } from "@/utils/AxiosConfig";
import { getLocalization } from "@/store/localization";

import { EDefaultAxiosError, IAxiosError, IMessage, TAgent, TAgentResponse } from "@/types";

import styles from "./index.module.scss";

const Chat = () => {
  const [chatValue, setChatValue] = useState("");
  const [showPhrases, setShowPhrases] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [muted, setMuted] = useState(false);
  const [agents, setAgents] = useState<TAgent[]>([]);
  const [agent, setAgent] = useState<TAgent | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [talkVideo, setTalkVideo] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  // const [showUploadModal, setShowUploadModal] = useState(false);
  const [connectLoading, setConnectLoading] = useState(true);
  const [videoLoad, setVideoLoad] = useState(true);

  const messageRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket>();
  const [modalEndFreePeriod, setModalEndFreePeriod] = useState(false);
  const [isEndFree, setIsEndFree] = useState(false);

  const { showAlert } = useAlert();

  const localization = useSelector(getLocalization);

  const navigate = useNavigate();

  const handleActiveAgent = (value: TAgent) => {
    setAgent(value);
    setMessages([
      {
        content: value.greeting,
        role: "assistant",
      },
    ]);
    setOptions([]);
    socketRef.current?.emit("session_close");
  };

  const getAgents = async () => {
    try {
      const { data }: TAgentResponse = await axiosInter.get(EUrls.AGENTS);

      setAgents(data);
      handleActiveAgent(data[0]);
    } catch (error) {
      const err = error as AxiosError;
      const errData = err?.response?.data as IAxiosError;

      console.log('log: getAgents setModalEndFreePeriod', err, errData?.message);
      if (err?.response?.status === 403 && errData?.message === EDefaultAxiosError.NEED_SUBSCRIPTION) {
        setModalEndFreePeriod(true);
        setIsEndFree(true);
      } else {
        showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
      }
    }
  };

  const submitText = async (text: string) => {
    const content = text;
    setChatValue("");
    setVideoLoad(false);

    if (isEndFree) {
      setModalEndFreePeriod(true);
      setVideoLoad(true);
      return;
    }

    if (!socketRef.current) return;

    socketRef.current.emit("start_chat", {
      message: content,
      agentId: agent?.id,
      history: messages,
    });
    setMessages((messages) => [
      ...messages,
      {
        content,
        role: "user",
      },
    ]);
  };

  const clearChat = () => {
    if (agent) handleActiveAgent(agent);
  };

  useEffect(() => {
    if (vidRef.current) vidRef.current.play();
  }, [talkVideo]);

  useEffect(() => {
    if (messageRef.current)
      messageRef.current.scrollBy({ top: messageRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    getAgents();
    const token = getToken();

    const socket = io(import.meta.env.VITE_BACKEND_API_URL, {
      extraHeaders: {
        Authorization: token || "",
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnectLoading(false);
      console.log("Connected to WebSocket server");
    });

    socket.on("session_open", (data) => {
      console.log("Session opened:", data);
    });

    socket.on("chat_message", (data) => {
      console.log("Chat message received:", data);
      setMessages(data.history);
      setOptions(data.answers);
    });

    socket.on("chat_clip", (data) => {
      console.log("Clip received:", data);
      setTalkVideo(data);
      setVideoLoad(true);
    });

    socket.on("session_close", (data) => {
      console.log("Session closed:", data);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return (
    <Box className={styles.wrapper} data-class="ChatAgents">
      <Box
        className={styles.webBgWrapper}
        sx={{ backgroundImage: `url(${agent?.previewImage})` }}
      />
      <Box className={styles.webHeaderWrapper}>
        <Header isSimpleType />
      </Box>
      <Box className={styles.bgWrapper}>
        <video autoPlay={true} playsInline loop muted src={agent?.idleVideo} />
        {talkVideo && (
          <video
            ref={vidRef}
            autoPlay={true}
            playsInline
            src={talkVideo}
            onEnded={() => {
              if (talkVideo) setTalkVideo("");
            }}
            className={styles.talkVideo}
          />
        )}

        <AutoHeightWrapper backgroundType={3} withoutPadding>
          <Box className={styles.contentWrapper}>
            <Box className={styles.headerWrapper}>
              <Box className={styles.headerBox}>
                <Button
                  className={styles.headerAvatarBtn}
                  onClick={() => setOpenModal(true)}
                >
                  <img
                    src={agent?.previewImage}
                    alt=""
                    className={styles.headerAvatar}
                  />
                  {agent?.previewName ||
                    localization[ELocalization.CHAT_NO_AGENTS]}
                </Button>
                <IconButton
                  onClick={() => setMuted(!muted)}
                  className={styles.iconBtn}
                >
                  {muted ? <NoVolume /> : <Volume />}
                </IconButton>
                <Button className={styles.headerClearBtn} onClick={clearChat}>
                  {localization[ELocalization.CHAT_CLEAR_HISTORY]}
                </Button>
              </Box>
              <IconButton
                onClick={() => navigate(ERoutes.COURSES)}
                className={`${styles.iconBtn} ${styles.closeBtn}`}
              >
                <Union />
              </IconButton>
            </Box>
          </Box>
          <Box className={styles.contentWrapper}>
            <Box className={styles.chatWrapper} ref={messageRef}>
              <Box className={styles.chatShadow} />
              {messages.map((el, i) => (
                <Box
                  className={`${styles.chat} ${el.role === "user" ? styles.chatOptionUser : ""
                    }`}
                  key={`message-${i}`}
                >
                  {el.content}
                </Box>
              ))}
            </Box>
            <Box className={`${styles.chatOptionWrapper} `}>
              <p className={styles.chatOptionTitle}>
                {localization[ELocalization.CHAT_WRITER_HELP]}{" "}
                <span
                  className={styles.chatOptionLink}
                  onClick={() => setShowPhrases(!showPhrases)}
                >
                  {!showPhrases
                    ? localization[ELocalization.CHAT_SHOW]
                    : localization[ELocalization.CHAT_HIDE]}{" "}
                  {localization[ELocalization.CHAT_PHRASES]}
                </span>
              </p>
              {options.length > 0 && (
                <Box
                  className={`${styles.chatOptionBox} ${!showPhrases ? styles.chatOptionClosed : ""
                    }`}
                >
                  {options.map((el, i) => (
                    <Button
                      className={styles.chatOption}
                      onClick={() => submitText(el)}
                      key={`option-${i}`}
                    >
                      {el}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
            <AIChatInput
              value={chatValue}
              loading={connectLoading}
              videoLoad={videoLoad}
              onChange={(e) => {
                setChatValue(e.currentTarget.value);
              }}
              onSubmit={() => submitText(chatValue)}
              onSubmitAudio={(value) => console.log("audio", value)}
              onTranscription={setChatValue}
            />
          </Box>
        </AutoHeightWrapper>
      </Box>
      <Box className={styles.modalWrapper}>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          button={<></>}
          cardClass={styles.cardModal}
        >
          {agent && (
            <ModalAIContent
              agent={agent}
              agents={agents}
              onClick={handleActiveAgent}
            // onShowModal={() => setShowUploadModal(true)}
            // onDelete={handleDeleteAgent}
            />
          )}
        </Modal>
      </Box>
      <Box className={styles.sidebarWrapper}>
        <Sidebar isOpen={openModal} onClose={() => setOpenModal(false)}>
          {agent && (
            <ModalAIContent
              agent={agent}
              agents={agents}
              onClick={handleActiveAgent}
            // onShowModal={() => setShowUploadModal(true)}
            // onDelete={handleDeleteAgent}
            />
          )}
        </Sidebar>
      </Box>
      <EndTrialPeriodModal
        isOpen={modalEndFreePeriod}
        onClose={() => setModalEndFreePeriod(false)}
        title=""
        price={0}
      />
      {/* <UploadAgentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      /> */}
    </Box>
  );
};

export default Chat;
