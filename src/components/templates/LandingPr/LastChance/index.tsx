import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ELocalizationQuestionnaire } from "../../../../constants/localizationQuestionnaire";
import { getLocalizationQuestionnaire } from "../../../../store/localization-questionnaire/selectors";
import styles from "./index.module.scss";

interface LastChanceModalProps {
    onClose: () => void;
}

export default function LastChanceModal({ onClose }: LastChanceModalProps) {
    const localization = useSelector(getLocalizationQuestionnaire);
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };
    
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
        
        return () => {
          document.body.style.overflow = "";
        };
      }, [isOpen]);

    return (
        isOpen && (
            <Box className={styles.modalOverlay}>
                <div className={styles.modalContainer}>
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}ln-ls_offer.png`} style={{ height: "248px" }} alt="" />
                    <Box className={styles.modalContentContainer}>
                        <h2>{localization[ELocalizationQuestionnaire.LANDING_LAST_CHANCE_TITLE]}</h2>
                        <p>{localization[ELocalizationQuestionnaire.LANDING_LAST_CHANCE_DESC]}</p>

                        <button
                            onClick={() => handleClose()}
                            className={styles.buttonStartPlan}>
                            {localization[ELocalizationQuestionnaire.LANDING_LAST_CHANCE_BUTTON]}
                        </button>
                    </Box>
                </div>
            </Box>
        )
    );
}