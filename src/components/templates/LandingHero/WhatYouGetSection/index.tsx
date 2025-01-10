import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import GiftImage from "@/assets/main/gift.png";
import VocabularyBoyImage from "@/assets/vocabulary-boy.png";
import PaperImage from "@/assets/paper.png";
import HeadphoneImage from "@/assets/headphone.png";
import ChatTextImage from "@/assets/chat-text.png";
import BoyWithLaptopImage from "@/assets/boy-with-laptop.png";
import ChatImage from "@/assets/chat.png";
import BoyWithBagImage from "@/assets/boy-with-bag.png";
import SofaImage from "@/assets/boy-sofa.png";
import UnionImage from "@/assets/icons/union.svg";
import CircleImage from "@/assets/icons/tick-circle.svg";
import TimerImage from "@/assets/icons/timer.svg";

import { DEFAULT_GAMES_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const WhatYouGetSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.whatYouGetWrapper}>
      <Box className={`${styles.contentBox} ${styles.webMaxContentBox}`}>
        <Box className={styles.titleWrapper}>
          <img src={GiftImage} alt="" />
          <h2 className={styles.title}>
            {
              localization[
                ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_TITLE
              ]
            }
          </h2>
        </Box>
        <Box className={styles.whatYouGetBox}>
          <Box className={styles.whatYouGetOptionWrapper}>
            <Box className={styles.whatYouGetOptionBox}>
              <Box className={styles.vocabularyBlock}>
                <img
                  src={VocabularyBoyImage}
                  alt=""
                  className={styles.vocabularyBg}
                />
                <Box className={styles.vocabularyContent}>
                  <Box>
                    <Box className={styles.whatYouGetOptionTitleBox}>
                      Vocabulary
                      <img
                        src={PaperImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </Box>
                    <Box className={styles.whatYouGetOptionDescrBox}>
                      <h3>Tell me about yourself</h3>
                      <p>Basic questions about a person</p>
                    </Box>
                  </Box>
                  <button className={styles.whatYouGetOptionButton}>
                    <CircleImage />
                    <span>Finished</span>
                  </button>
                </Box>
              </Box>
              <Box className={styles.whatYouGetOptionLessonBox}>
                <Box
                  className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionRed} ${styles.whatYouGetOptionSmall}`}
                >
                  <Box>
                    <Box className={styles.whatYouGetOptionTitleBox}>
                      Listening and Speaking
                      <img
                        src={HeadphoneImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </Box>
                    <Box className={styles.whatYouGetOptionDescrBox}>
                      <h3>Where we live</h3>
                      <p>Basic questions about a person</p>
                    </Box>
                  </Box>
                  <button className={styles.whatYouGetOptionButton}>
                    <TimerImage />
                    <span>5 minute lesson</span>
                  </button>
                </Box>
                <Box
                  className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionBlue} ${styles.whatYouGetOptionSmall}`}
                >
                  <Box>
                    <Box className={styles.whatYouGetOptionTitleBox}>
                      Interactive Chat
                      <img
                        src={ChatTextImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </Box>
                    <Box className={styles.whatYouGetOptionDescrBox}>
                      <h3>How we rest</h3>
                      <p>Basic questions about a person</p>
                    </Box>
                  </Box>
                  <button className={styles.whatYouGetOptionButton}>
                    <img
                      src={TimerImage}
                      alt=""
                      className={styles.whatYouGetOptionButtonIcon}
                    />
                    <span>5 minute lesson</span>
                  </button>
                </Box>
              </Box>
            </Box>
            <Box className={styles.whatYouGetOptionTextWrapper}>
              <h3 className={styles.whatYouGetOptionTextLimited}>
                {
                  localization[
                    ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_PLAN_TITLE
                  ]
                }
              </h3>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_PLAN_DESCR
                  ]
                }
              </p>
            </Box>
          </Box>
          <Box className={styles.whatYouGetOptionWrapper}>
            <Box className={styles.whatYouGetOptionTextWrapper}>
              <h3>
                {
                  localization[
                    ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_GAME_TITLE
                  ]
                }
              </h3>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_GAME_DESCR
                  ]
                }
              </p>
            </Box>
            <Box className={styles.gamesWrapper}>
              {DEFAULT_GAMES_DATA.map((el) => (
                <Box className={styles.gameWrapper} key={el.id}>
                  <Box
                    className={styles.gameBox}
                    style={!el.icon ? { background: "#EEF3F9" } : {}}
                  >
                    {el.icon && el.icon}

                    <p>{el.title}</p>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className={styles.whatYouGetOptionWrapper}>
            <Box className={styles.knowledgeWrapper}>
              <UnionImage />
              <img
                src={BoyWithLaptopImage}
                alt=""
                className={styles.knowledgeBoy}
              />
              <Box className={styles.knowledgeContent}>
                My sister likes
                <Box className={styles.knowledgeField} /> cocktails
              </Box>
            </Box>
            <Box className={styles.whatYouGetOptionTextWrapper}>
              <h3>
                {
                  localization[
                    ELocalizationQuestionnaire
                      .LANDING_WHAT_YOU_GET_KNOWLEDGE_TITLE
                  ]
                }
              </h3>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire
                      .LANDING_WHAT_YOU_GET_KNOWLEDGE_DESCR
                  ]
                }
              </p>
            </Box>
          </Box>
          <Box className={styles.whatYouGetOptionWrapper}>
            <Box className={styles.whatYouGetOptionTextWrapper}>
              <h3>
                {
                  localization[
                    ELocalizationQuestionnaire
                      .LANDING_WHAT_YOU_GET_PHRASES_TITLE
                  ]
                }
              </h3>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire
                      .LANDING_WHAT_YOU_GET_PHRASES_DESCR
                  ]
                }
              </p>
            </Box>
            <Box className={styles.popularPhrasesWrapper}>
              <Box
                className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionYellow} ${styles.whatYouGetOptionBig}`}
              >
                <img
                  src={SofaImage}
                  alt=""
                  className={styles.popularPhrasesSofaImage}
                />
                <Box>
                  <Box className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={ChatImage}
                      alt=""
                      className={styles.whatYouGetOptionTitleImage}
                    />
                  </Box>
                  <Box className={styles.whatYouGetOptionDescrBox}>
                    <h3>Get up & Lie down</h3>
                    <p>Учим фразы Get up (вставать) и Lie down (ложиться)</p>
                  </Box>
                </Box>
                <button className={styles.whatYouGetOptionButton}>
                  <img
                    src={TimerImage}
                    alt=""
                    className={styles.whatYouGetOptionButtonIcon}
                  />
                  <span>2 minute lesson</span>
                </button>
              </Box>
              <Box
                className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionRed} ${styles.whatYouGetOptionBig}`}
              >
                <img
                  src={BoyWithBagImage}
                  alt=""
                  className={styles.popularPhrasesBagImage}
                />
                <Box>
                  <Box className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={ChatImage}
                      alt=""
                      className={styles.whatYouGetOptionTitleImage}
                    />
                  </Box>
                  <Box className={styles.whatYouGetOptionDescrBox}>
                    <h3>Pick up & Pick down</h3>
                    <p>Учим фразы Pick up (поднимать) и Put down (класть)</p>
                  </Box>
                </Box>
                <button className={styles.whatYouGetOptionButton}>
                  <img
                    src={TimerImage}
                    alt=""
                    className={styles.whatYouGetOptionButtonIcon}
                  />
                  <span>2 minute lesson</span>
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhatYouGetSection;
