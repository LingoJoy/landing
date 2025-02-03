import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { DEFAULT_GAMES_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const WhatYouGetSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.whatYouGetWrapper}>
      <Box className={`${styles.contentBox} ${styles.webMaxContentBox}`}>
        <Box className={styles.titleWrapper}>
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}gift.png`} alt="" />
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
                  src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}vocabulary-boy.png`}
                  alt=""
                  className={styles.vocabularyBg}
                />
                <Box className={styles.vocabularyContent}>
                  <Box>
                    <Box className={styles.whatYouGetOptionTitleBox}>
                      Vocabulary
                      <img
                        src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}paper.png`}
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
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}paper.png`} alt=""/>
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
                        src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}headphone.png`}
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
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}timer_1.svg`} alt=""/>
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
                        src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}chat-text.png`}
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
                      src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}timer_1.svg`}
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
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}union.svg`} alt=""/>
              <img
                src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}boy-with-laptop.png`}
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
                  src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}boy-sofa.png`}
                  alt=""
                  className={styles.popularPhrasesSofaImage}
                />
                <Box>
                  <Box className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}chat.png`}
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
                    src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}timer_1.svg`}
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
                  src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}boy-with-bag.png`}
                  alt=""
                  className={styles.popularPhrasesBagImage}
                />
                <Box>
                  <Box className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}chat.png`}
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
                    src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}timer_1.svg`}
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
