import { MasonryGrid } from "@egjs/react-grid";
import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";

import { ELocalizationQuestionnaire } from "@/constants";
import { useScaleText } from "@/hooks/main/useScaleText";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import { TVocabularyAttributes } from "@/types";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
  vocabularyData: string[];
  storeKey: keyof TVocabularyAttributes;
  levelData: string[];
}

interface IBubbleProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const BUBBLE_PADDING = 8;

const Bubble: FC<IBubbleProps> = ({ title, active, onClick }) => {
  const { scale, textRef, boxRef } = useScaleText(BUBBLE_PADDING);

  return (
    <Box
      ref={boxRef}
      key={title}
      className={styles.bubble}
      onClick={onClick}
      sx={{
        background: active ? "#3F97FF" : "#ffffff",
        color: active ? "#FFFFFF" : "#303030",
      }}
    >
      <Box
        ref={textRef}
        sx={{
          transform: `scale(${scale})`,
        }}
      >
        {title}
      </Box>
    </Box>
  );
};

const VocabularySelector: FC<IProps> = ({
  onNext,
  onBack,
  progress,
  vocabularyData,
  storeKey,
  levelData,
}) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const handleNext = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    logEvent(
      `web_quest_vocabulary_test_on_continue`,
    );

    onNext();
  };

  const handleBack = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress - 1 || 1,
      }),
    );

    questFBProgressLog(progress - 1 || 1);

    onBack();
  };

  const handleOption = (word: string) => {
    if (vocabularyData.includes(word)) {
      const filteredData = vocabularyData.filter((el) => el !== word);
      return dispatch(
        setQuestionnaire({
          ...state,
          vocabulary: { ...state.vocabulary, [storeKey]: filteredData },
        }),
      );
    }
    dispatch(
      setQuestionnaire({
        ...state,
        vocabulary: {
          ...state.vocabulary,
          [storeKey]: [...vocabularyData, word],
        },
      }),
    );
  };

  return (
    <Box className={styles.selectorBG}>
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {localization[ELocalizationQuestionnaire.QUEST_VOCABULARY_TITLE]}
            </span>
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_VOCABULARY_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.positionWrapper}>
          <p className={styles.selectorHelperText}>
            {localization[ELocalizationQuestionnaire.QUEST_MORE_ONE]}
          </p>
          <Box className={styles.bubblesWrapper}>
            <Box className={styles.bubblesBox}>
              <MasonryGrid
                align="justify"
                defaultDirection="end"
                gap={10}
                column={4}
                useResizeObserver
                observeChildren
              >
                {levelData.map((el) => (
                  <Bubble
                    onClick={() => handleOption(el)}
                    key={el}
                    title={el}
                    active={vocabularyData.includes(el)}
                  />
                ))}
              </MasonryGrid>
            </Box>
            <Box className={styles.optionWordsBox}>
              <MasonryGrid gap={10} column={3}>
                {levelData.map((el, i) => (
                  <Box key={`${el} - ${i}`} className={styles.option}>
                    <SelectorOption
                      title={el}
                      onClick={() => handleOption(el)}
                      isMultiselect
                      isActive={vocabularyData.includes(el)}
                    />
                  </Box>
                ))}
              </MasonryGrid>
            </Box>
          </Box>
        </Box>
      </Box>
      <SelectorFooter
        onClick={handleNext}
        btnText={
          <span>
            {`${localization[ELocalizationQuestionnaire.CONTINUE]} (${
              vocabularyData.length
            })`}
          </span>
        }
      />
    </Box>
  );
};

export default VocabularySelector;
