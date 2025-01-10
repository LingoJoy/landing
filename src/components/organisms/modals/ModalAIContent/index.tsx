import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Divider } from "@mui/material";

import ContentWrapper from "../../ContentWrapper";
import Check from "@/components/atoms/Check";

// import Trash from "@/assets/trash.svg";
import Trainer from "@/assets/main/girl-run.png";

import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

import { TAgent } from "@/types";

import styles from "./index.module.scss";

interface IAICardProps {
  agent: TAgent;
  active?: boolean;
  // onDelete: (id: string) => void;
}

interface IModalAIContentProps {
  agent: TAgent;
  agents: TAgent[];
  onClick: (agent: TAgent) => void;
  // onShowModal: () => void;
  // onDelete: (id: string) => void;
}

const AICard: FC<IAICardProps> = ({
  agent,
  active,
  // onDelete
}) => {
  return (
    <Box>
      <Box className={`${styles.cardImgBox}`}>
        <img
          src={agent.previewImage}
          alt=""
          className={`${styles.cardImg} ${active ? styles.cardImgActive : ""}`}
        />
        {/* {agent.userAgent && (
          <IconButton
            className={styles.delete}
            onClick={() => onDelete(agent.id)}
          >
            <Trash />
          </IconButton>
        )} */}
        {active && (
          <Box className={styles.cardCheck}>
            <Check isActive={true} size="24px" />
          </Box>
        )}
      </Box>
      <Box className={styles.cardTitleBox}>
        <p>{agent.previewName}</p>
        <img src={Trainer} alt="" />
      </Box>
    </Box>
  );
};

const ModalAIContent: FC<IModalAIContentProps> = ({
  agent,
  agents,
  onClick,
  // onShowModal,
  // onDelete,
}) => {
  const localization = useSelector(getLocalization);

  return (
    <>
      <ContentWrapper>
        <Box className={styles.modalHeader}>
          <p className={styles.modalTitle}>
            {localization[ELocalization.CHAT_CHOOSE_AVATAR]}
          </p>
        </Box>
      </ContentWrapper>
      <Divider />
      <ContentWrapper>
        <Box className={styles.modalGrid}>
          {/* (<Box className={styles.modalOptionBox}>
            <IconButton
              onClick={onShowModal}
              className={`${styles.uploadBtn} ${styles.modalOption}`}
            >
              <Plus />
            </IconButton>
            <p className={`${styles.uploadText}`}>
              {localization[ELocalization.CHAT_UPLOAD_AVATAR]}
            </p>
          </Box>) */}
          {agents.map((el) => (
            <Box
              onClick={() => onClick(el)}
              key={el.id}
              className={styles.modalOption}
            >
              <AICard
                agent={el}
                active={agent.id === el.id}
                // onDelete={onDelete}
              />
            </Box>
          ))}
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ModalAIContent;
