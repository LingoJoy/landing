import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import Done from "@/assets/card-img/math-picture-word/Done.svg";

import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardMatchPictureProps {
  exercise: Exercise;
  isMistake?: boolean;
}

interface MatchedCouples {
  [key: string]: string;
}

const CardMatchPicture: React.FC<CardMatchPictureProps> = ({
  exercise,
  isMistake,
}) => {
  const [checkedWords, setCheckedWords] = useState<string[]>([]);
  const [matchedCouples, setMatchedCouples] = useState<MatchedCouples>({});
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const localization = useSelector(getLocalization);

  useEffect(() => {
    setMatchedCouples({});
  }, [exercise]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active?.data?.current) {
      const targetWord = over.id as string;
      const imageURL = active.id as string;

      const correct = exercise.couples?.find((el) => el.imageURL === imageURL);

      handleCheck(targetWord, correct?.word || "");

      if (targetWord === correct?.word) {
        setMatchedCouples((prev) => ({
          ...prev,
          [targetWord]: imageURL,
        }));
      }
    }
  };

  const handleCheck = (targetWord: string, correctWord: string) => {
    if (targetWord === correctWord) {
      const newWords = [...checkedWords, targetWord];
      setCheckedWords(newWords);
    } else {
      setIsCorrect(false);
    }
  };

  const handleCheckFinish = () => {
    if (checkedWords.length === exercise.couples?.length) {
      setIsCorrect(true);
    }
  };

  const handleImageClick = (imageURL: string) => {
    const wordToReset = Object.keys(matchedCouples).find(
      (key) => matchedCouples[key] === imageURL,
    );

    if (wordToReset) {
      setMatchedCouples((prev) => {
        const newState = { ...prev };
        delete newState[wordToReset];
        return newState;
      });

      setCheckedWords((prev) => prev.filter((word) => word !== wordToReset));
    }
  };

  const renderWords = () => {
    return exercise.shuffledCouples?.map((couple) => (
      <WordDropTarget
        key={couple.word}
        word={couple.word}
        matchedImageURL={matchedCouples[couple.word]}
        onImageClick={handleImageClick}
        isChecked={checkedWords.includes(couple.word)}
        height={100 / (exercise.shuffledCouples?.length || 1)}
      />
    ));
  };

  const renderImages = () => {
    return exercise.shuffledCouples?.map((couple) => {
      const isUsed = Object.values(matchedCouples).includes(couple.imageURL);

      if (!isUsed) {
        return (
          <ImageDragSource
            key={couple.imageURL}
            imageURL={couple.imageURL}
            word={couple.word}
            height={100 / (exercise.shuffledCouples?.length || 1)}
          />
        );
      }

      return null;
    });
  };

  return (
    <CardContentWrapper
      contentSx={{ p: 0, justifyContent: "flex-start", overflow: "auto" }}
    >
      <Typography
        sx={{ textAlign: "center" }}
        className={styles.cardText}
        variant="body2"
      >
        {localization[ELocalization.DRAG_IMAGE]}
      </Typography>
      <DndContext onDragEnd={handleDragEnd}>
        <Box className={styles.container}>
          <Box className={styles.wordsContainer}>{renderWords()}</Box>
          <Box className={styles.imagesContainer}>{renderImages()}</Box>
        </Box>
      </DndContext>
      <NavigationButtons
        exercise={exercise}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        onNext={handleCheckFinish}
        isMistake={isMistake}
      />
    </CardContentWrapper>
  );
};

interface WordDropTargetProps {
  word: string;
  matchedImageURL?: string;
  onImageClick: (imageURL: string) => void;
  isChecked: boolean;
  height: number;
}

const WordDropTarget: React.FC<WordDropTargetProps> = ({
  word,
  matchedImageURL,
  onImageClick,
  isChecked,
  height,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: word,
  });

  return (
    <Box
      ref={setNodeRef}
      className={`${styles.wordBox} ${matchedImageURL ? styles.matched : ""} ${
        isOver ? styles.over : ""
      }`}
      sx={{ height: `${height}%` }}
      position="relative"
    >
      {!matchedImageURL && <Typography>{word}</Typography>}
      {matchedImageURL && (
        <>
          <img
            src={matchedImageURL}
            alt=""
            className={styles.imageSmall}
            onClick={() => onImageClick(matchedImageURL)}
          />
          {isChecked && (
            <Box className={styles.status} display="flex" alignItems="center">
              <Done />
              <Typography sx={{ fontSize: "12px" }}>{word}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

interface ImageDragSourceProps {
  imageURL: string;
  word: string;
  height: number;
}

const ImageDragSource: React.FC<ImageDragSourceProps> = ({
  imageURL,
  word,
  height,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: imageURL,
    data: { correctWord: word },
  });

  const dragOverlayContent = isDragging ? (
    <div className={`${styles.imageBox} ${isDragging ? styles.dragging : ""}`}>
      <img src={imageURL} alt="" className={styles.image} />
    </div>
  ) : null;

  return (
    <>
      <Box
        ref={setNodeRef}
        className={`${styles.imageBox} ${isDragging ? styles.dragging : ""}`}
        sx={{ height: `${height}%` }}
        {...listeners}
        {...attributes}
      >
        <img src={imageURL} alt="" className={styles.image} />
      </Box>
      <DragOverlay dropAnimation={null}>{dragOverlayContent}</DragOverlay>
    </>
  );
};

export default CardMatchPicture;
