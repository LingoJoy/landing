import GiftImage from "../../../../images/main/gift.png";
import VocabularyBoyImage from "../../../../images/vocabulary-boy.png";
import PaperImage from "../../../../images/paper.png";
import CircleImage from "../../../../images/icons/tick-circle.svg";
import TimerImage from "../../../../images/icons/timer.svg";
import HeadphoneImage from "../../../../images/headphone.png";
import ChatTextImage from "../../../../images/chat-text.png";
import UnionImage from "../../../../images/icons/union.svg";
import BoyWithLaptopImage from "../../../../images/boy-with-laptop.png";
import ChatImage from "../../../../images/chat.png";
import BoyWithBagImage from "../../../../images/boy-with-bag.png";
import SofaImage from "../../../../images/boy-sofa.png";

import { DEFAULT_GAMES_DATA } from "../../../../constants";

import styles from "../index.module.css";

const WhatYouGetSection = () => {
  return (
    <div className={styles.whatYouGetWrapper}>
      <div className={styles.contentBox}>
        <div className={styles.titleWrapper}>
          <img src={GiftImage} alt="" />
          <h2 className={styles.title}>What You Get</h2>
        </div>
        <div className={styles.whatYouGetBox}>
          <div className={styles.whatYouGetOptionWrapper}>
            <div>
              <div className={styles.vocabularyBlock}>
                <img
                  src={VocabularyBoyImage}
                  alt=""
                  className={styles.vocabularyBg}
                />
                <div className={styles.vocabularyContent}>
                  <div>
                    <div className={styles.whatYouGetOptionTitleBox}>
                      Vocabulary
                      <img
                        src={PaperImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </div>
                    <div className={styles.whatYouGetOptionDescrBox}>
                      <h3>Tell me about yourself</h3>
                      <p>Basic questions about a person</p>
                    </div>
                  </div>
                  <button className={styles.whatYouGetOptionButton}>
                    <img
                      src={CircleImage}
                      alt=""
                      className={styles.whatYouGetOptionButtonIcon}
                    />
                    <span>Finished</span>
                  </button>
                </div>
              </div>
              <div className={styles.whatYouGetOptionLessonBox}>
                <div
                  className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionRed} ${styles.whatYouGetOptionSmall}`}
                >
                  <div>
                    <div className={styles.whatYouGetOptionTitleBox}>
                      Listening and Speaking
                      <img
                        src={HeadphoneImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </div>
                    <div className={styles.whatYouGetOptionDescrBox}>
                      <h3>Where we live</h3>
                      <p>Basic questions about a person</p>
                    </div>
                  </div>
                  <button className={styles.whatYouGetOptionButton}>
                    <img
                      src={TimerImage}
                      alt=""
                      className={styles.whatYouGetOptionButtonIcon}
                    />
                    <span>5 minute lesson</span>
                  </button>
                </div>
                <div
                  className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionBlue} ${styles.whatYouGetOptionSmall}`}
                >
                  <div>
                    <div className={styles.whatYouGetOptionTitleBox}>
                      Interactive Chat
                      <img
                        src={ChatTextImage}
                        alt=""
                        className={styles.whatYouGetOptionTitleImage}
                      />
                    </div>
                    <div className={styles.whatYouGetOptionDescrBox}>
                      <h3>How we rest</h3>
                      <p>Basic questions about a person</p>
                    </div>
                  </div>
                  <button className={styles.whatYouGetOptionButton}>
                    <img
                      src={TimerImage}
                      alt=""
                      className={styles.whatYouGetOptionButtonIcon}
                    />
                    <span>5 minute lesson</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.whatYouGetOptionTextWrapper}>
              <h3>Your Personalized Learning Plan</h3>
              <p>
                Enjoy a unique set of easy-to-follow lessons based on your
                preferences and goals
              </p>
            </div>
          </div>
          <div className={styles.whatYouGetOptionWrapper}>
            <div className={styles.whatYouGetOptionTextWrapper}>
              <h3>Educational Games</h3>
              <p>
                With a simple, user-friendly design and engaging games, you can
                challenge your friends and gain new language skills at the same
                time
              </p>
            </div>
            <div className={styles.gamesWrapper}>
              {DEFAULT_GAMES_DATA.map((el) => (
                <div className={styles.gameWrapper} key={el.id}>
                  <div
                    className={styles.gameBox}
                    style={!el.icon ? { background: "#EEF3F9" } : {}}
                  >
                    {el.icon && <img src={el.icon} alt="" />}

                    <p>{el.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.whatYouGetOptionWrapper}>
            <div className={styles.knowledgeWrapper}>
              <img src={UnionImage} alt="" className={styles.knowledgeBg} />
              <img
                src={BoyWithLaptopImage}
                alt=""
                className={styles.knowledgeBoy}
              />
              <div className={styles.knowledgeContent}>
                My sister likes
                <div className={styles.knowledgeField} /> cocktails
              </div>
            </div>
            <div className={styles.whatYouGetOptionTextWrapper}>
              <h3>Check Your Knowledge</h3>
              <p>
                Complete the lessons and check how well you understood the topic
              </p>
            </div>
          </div>
          <div className={styles.whatYouGetOptionWrapper}>
            <div className={styles.whatYouGetOptionTextWrapper}>
              <h3>Popular Phrases</h3>
              <p>
                With a simple, user-friendly design and engaging games, you can
                challenge your friends and gain new language skills at the same
                time
              </p>
            </div>
            <div className={styles.popularPhrasesWrapper}>
              <div
                className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionYellow} ${styles.whatYouGetOptionBig}`}
              >
                <img
                  src={SofaImage}
                  alt=""
                  className={styles.popularPhrasesSofaImage}
                />
                <div>
                  <div className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={ChatImage}
                      alt=""
                      className={styles.whatYouGetOptionTitleImage}
                    />
                  </div>
                  <div className={styles.whatYouGetOptionDescrBox}>
                    <h3>Get up & Lie down</h3>
                    <p>Учим фразы Get up (вставать) и Lie down (ложиться)</p>
                  </div>
                </div>
                <button className={styles.whatYouGetOptionButton}>
                  <img
                    src={TimerImage}
                    alt=""
                    className={styles.whatYouGetOptionButtonIcon}
                  />
                  <span>2 minute lesson</span>
                </button>
              </div>
              <div
                className={`${styles.whatYouGetOption} ${styles.whatYouGetOptionRed} ${styles.whatYouGetOptionBig}`}
              >
                <img
                  src={BoyWithBagImage}
                  alt=""
                  className={styles.popularPhrasesBagImage}
                />
                <div>
                  <div className={styles.whatYouGetOptionTitleBox}>
                    Popular Phrases
                    <img
                      src={ChatImage}
                      alt=""
                      className={styles.whatYouGetOptionTitleImage}
                    />
                  </div>
                  <div className={styles.whatYouGetOptionDescrBox}>
                    <h3>Pick up & Pick down</h3>
                    <p>Учим фразы Pick up (поднимать) и Put down (класть)</p>
                  </div>
                </div>
                <button className={styles.whatYouGetOptionButton}>
                  <img
                    src={TimerImage}
                    alt=""
                    className={styles.whatYouGetOptionButtonIcon}
                  />
                  <span>2 minute lesson</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatYouGetSection;
