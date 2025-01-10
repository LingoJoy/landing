import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import reactStringReplace from "react-string-replace";
import { Box, Slider, Tooltip } from "@mui/material";

import AutoHeightWrapper from "@/components/organisms/AutoHeightWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";
import BackButton from "@/components/atoms/BackButton";
import Header from "@/components/organisms/Header";
import AudioSpeechButton from "@/components/molecules/AudioSpeechButton";
import Loader from "@/components/atoms/Loader";

import Smallcaps from "@/assets/icons/smallcaps.svg";
import Sun from "@/assets/icons/sun.svg";
import SunBorder from "@/assets/icons/sun-border.svg";
import Moon from "@/assets/icons/moon.svg";
import MoonBorder from "@/assets/icons/moon-border.svg";
import Text from "@/assets/icons/text.svg";
import Arrow from "@/assets/arrow-full-right.svg";

import { useOutsideClick } from "@/hooks/main/useOutsideClick";
import { setBook } from "@/store/book";

import { IBook, IWord } from "@/types";

import styles from "./index.module.scss";

interface IPage {
  page: number;
  text: string;
}

interface IWordProps {
  word: IWord;
}

interface IReadBookProps {
  book: IBook;
}

const DEFAULT_FONTS = [
  { title: "Inter", fontFamily: "'Inter', sans-serif" },
  { title: "Noto", fontFamily: "'Noto Sans Tamil', sans-serif" },
  { title: "Times New Roman", fontFamily: "'Times New Roman', sans-serif" },
  { title: "Georgia", fontFamily: "'Georgia Pro Cond', sans-serif" },
];

const marks = [
  {
    value: 10,
  },
  {
    value: 12,
  },
  {
    value: 14,
  },
  {
    value: 16,
  },
  {
    value: 18,
  },
];

const DEFAULT_SPACE = 130;

const Word: React.FC<IWordProps> = ({ word }) => {
  const [open, setOpen] = useState(false);

  return (
    <span>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "transparent",
              p: 0,
            },
          },
        }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        disableHoverListener
        title={
          <div className={styles.wordWrapper}>
            <div className={`${styles.wordBox} ${styles.open}`}>
              <div className={styles.wordContent}>
                <div className={styles.wordTitleBox}>
                  <div>
                    <h3>{word.translate || ""}</h3>
                    <p>{word.transcription || ""}</p>
                  </div>
                  <AudioSpeechButton textValue={word.word} />
                </div>
                <p className={styles.description}>{word.explanation}</p>
              </div>
            </div>
          </div>
        }
        sx={{ backgroundColor: "transparent", p: 0 }}
        enterTouchDelay={0}
      >
        <span onClick={() => setOpen(true)} className={styles.word}>
          {word.word}
        </span>
      </Tooltip>
    </span>
  );
};

export const ReadBook: React.FC<IReadBookProps> = ({ book }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [size, setSize] = useState(14);
  const [font, setFont] = useState(DEFAULT_FONTS[3].fontFamily);
  const [activePage, setActivePage] = useState<IPage>({ page: 1, text: "" });
  const [height, setHeight] = useState(0);
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);

  const hiddenTextRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const refFooter = useOutsideClick(() => {
    setIsPanelOpen(false);
  });

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [size, font, activePage]);

  useEffect(() => {
    if (hiddenTextRef.current) {
      const { outerHeight } = window;
      const heightContentBox = outerHeight - DEFAULT_SPACE;
      setHeight(heightContentBox);

      appendToPage(heightContentBox);

      hiddenTextRef.current.textContent = "";
    }
  }, [size, font]);

  const appendToPage = (heightLimit: number) => {
    const ref = hiddenTextRef.current;

    if (ref) {
      const words = book.page.split(" ");

      const newPages: IPage[] = [];

      words?.forEach((word, i) => {
        ref.textContent = ref.textContent + `${word} `;
        const { height } = ref.getBoundingClientRect();

        if (height > heightLimit || i === words.length - 1) {
          const newPage = {
            page: newPages.length + 1,
            text: ref.textContent,
          };

          newPages.push(newPage);
          ref.textContent = "";
        }
      });

      ref.textContent = "";
      setPages(newPages);

      if (newPages[0]) setActivePage(newPages[0]);
    }
  };

  const createText = (text: string) => {
    let newText: string | React.ReactNode[] | undefined;
    const uniqueWords: IWord[] = [];
    const uniqueValues: string[] = [];

    book?.words.forEach((word) => {
      if (!uniqueValues.includes(word.word)) {
        uniqueValues.push(word.word);
        uniqueWords.push(word);
      }
    });

    uniqueWords.forEach((el) => {
      newText = reactStringReplace(newText ? newText : text, el.word, () => (
        <Word
          word={el}
          key={`${el.word}-${Math.floor(Math.random() * 1000000)}`}
        />
      ));
    });

    return newText;
  };

  const handleNext = () => {
    if (activePage.page === pages.length) return;
    const newPage = pages.find((el) => el.page === activePage.page + 1);

    if (newPage) setActivePage(newPage);
  };

  const handlePrev = () => {
    if (activePage.page === 1) return;
    const newPage = pages.find((el) => el.page === activePage.page - 1);

    if (newPage) setActivePage(newPage);
  };

  return (
    <AutoHeightWrapper fullWidth withoutPadding>
      <Box className={styles.webHeaderWrapper}>
        <Header isSimpleType />
      </Box>
      <CardWrapper
        className={`${styles.card} ${darkMode ? styles.darkMode : ""}`}
      >
        <Box>
          <Box className={styles.headerWrapper}>
            <BackButton
              position="right"
              onClick={() => dispatch(setBook(null))}
            />
            <h3 className={styles.title}>{book?.book}</h3>
            <Box
              className={`${styles.iconBtn} ${
                isPanelOpen ? styles.activeIconBtn : ""
              }`}
              onClick={() => setIsPanelOpen(!isPanelOpen)}
            >
              <Smallcaps />
            </Box>
          </Box>
          <Box
            className={styles.textWrapper}
            sx={{ fontFamily: font, fontSize: `${size}px`, height }}
          >
            <Box>
              <Box
                ref={hiddenTextRef}
                className={styles.textWrapper}
                sx={{ position: "absolute", zIndex: -1 }}
              />
              {loading ? <Loader /> : createText(activePage.text)}
            </Box>
          </Box>
          <Box className={`${styles.footer}`}>
            <Box
              className={`${styles.arrow} ${styles.rightArrow} ${
                activePage.page === 1 ? styles.arrowInactive : ""
              }`}
              onClick={handlePrev}
            >
              <Arrow />
            </Box>
            <Box className={`${styles.footerProgressBox}`}>
              <p>
                {activePage.page}/{pages.length}
              </p>
              <Box className={`${styles.footerProgressLine}`}>
                <Box
                  className={`${styles.footerProgress}`}
                  sx={{
                    width: `calc(100% / ${pages.length})`,
                    transform: `translateX(${(activePage.page - 1) * 100}%)`,
                  }}
                />
              </Box>
            </Box>
            <Box
              className={`${styles.arrow} ${
                activePage.page === pages.length ? styles.arrowInactive : ""
              }`}
              onClick={handleNext}
            >
              <Arrow />
            </Box>
          </Box>
          <Box
            className={`${styles.footerPanelWrapper} ${
              isPanelOpen ? styles.open : ""
            }`}
            ref={refFooter}
          >
            <Box className={styles.footerPanelModeWrapper}>
              <Box
                className={styles.footerPanelModeBox}
                onClick={() => setDarkMode(true)}
              >
                {darkMode ? <Moon /> : <MoonBorder />}
              </Box>
              <Box
                className={styles.footerPanelModeBox}
                onClick={() => setDarkMode(false)}
              >
                {darkMode ? <SunBorder /> : <Sun />}
              </Box>
            </Box>
            <Box className={styles.footerPanelFontWrapper}>
              {DEFAULT_FONTS.map((el) => (
                <Box
                  key={el.title}
                  className={styles.footerPanelFontBox}
                  onClick={() => setFont(el.fontFamily)}
                >
                  <p
                    className={`${styles.font} ${
                      font === el.fontFamily ? styles.activeFont : ""
                    }`}
                    style={{ fontFamily: el.fontFamily }}
                  >
                    {el.title}
                  </p>
                </Box>
              ))}
            </Box>
            <Box className={styles.footerPanelSizeWrapper}>
              <Box className={styles.textSmallIcon}>
                <Text />
              </Box>
              <Box className={styles.footerPanelSizeBox}>
                <Slider
                  sx={{
                    color: "#303030",
                    height: "1px",
                    "& .MuiSlider-thumb": {
                      height: 15,
                      width: 15,
                      backgroundColor: "#303030",
                      boxShadow: "none",
                      "&:focus, &:hover, &:before, &.Mui-active": {
                        boxShadow: "none",
                      },
                      "&:after": {
                        height: 15,
                        width: 15,
                      },
                    },
                    "& .MuiSlider-track": {
                      boxSizing: "border-box",
                    },
                    "& .MuiSlider-mark": {
                      height: "4px",
                      width: "1px",
                      opacity: 1,
                      top: "43%",
                      background: "#CDD2D9",
                    },
                    "& .MuiSlider-markActive": {
                      background: "#303030",
                      opacity: 1,
                      top: "43%",
                    },
                  }}
                  aria-label="Size"
                  step={2}
                  min={10}
                  max={18}
                  marks={marks}
                  value={size}
                  onChange={(_, value) => {
                    if (typeof value === "number") setSize(value);
                  }}
                />
              </Box>
              <Box className={styles.textIcon}>
                <Text />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardWrapper>
    </AutoHeightWrapper>
  );
};
