import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseLabel from "@/components/molecules/CourseLabel";
import FilterCarousel, { IFilter } from "@/components/molecules/FilterCarousel";
import { Layout } from "@/components/templates";
import AssignmentBlock from "../AssignmentBlock";

import { ReadBook } from "@/components/templates/ReadBook";
import Game from "../Game";

import Dreams from "@/assets/main/dreams.png";
import Timer from "@/assets/timer.svg";

import {
  backgroundColors,
  ELocalization,
  ETranslate,
  EUrls,
  FB_EVENT,
} from "@/constants";
import {
  selectCurrentExercise,
  setCategory,
  setStartLesson,
} from "@/store/ActiveLesson";
import { getBook, setBook } from "@/store/book";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";
import { getPostProgress } from "@/utils/apiHelpers";
import axios from "@/utils/AxiosConfig";
import { getFinished, getInProgress } from "@/utils/courseHelpers";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";
import { useAlert } from "../AlertMessage";

import { Course, CourseType, EDefaultAxiosError, Exercise, IAxiosError, IBook } from "@/types";

import { AxiosError } from "axios";
import EndTrialPeriodModal from "../modals/EndTrialPeriodModal";
import styles from "./index.module.scss";

interface ICourseData {
  all: Course[];
  category: {
    [x: string]: Course[][];
  };
  inProgress: object;
  mostPopularity: Course[][];
  books: Course[];
}

export default function CourseList() {
  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);
  const currentExercise = useSelector(selectCurrentExercise);
  const profile = useSelector(getProfile);
  const book = useSelector(getBook);

  const filters: IFilter[] = [
    {
      title: localization[ELocalization.MOST_POPULARITY],
      key: ELocalization.MOST_POPULARITY,
    },
    {
      title: localization[ELocalization.FILTER_DAILY],
      key: ELocalization.FILTER_DAILY,
    },
    {
      title: localization[ELocalization.FILTER_EDUCATION],
      key: ELocalization.FILTER_EDUCATION,
    },
    {
      title: localization[ELocalization.FILTER_INTERACTION],
      key: ELocalization.FILTER_INTERACTION,
    },
    {
      title: localization[ELocalization.FILTER_TRAVEL],
      key: ELocalization.FILTER_TRAVEL,
    },
    {
      title: localization[ELocalization.FILTER_NATURE],
      key: ELocalization.FILTER_NATURE,
    },
    {
      title: localization[ELocalization.FILTER_HOBBIE],
      key: ELocalization.FILTER_HOBBIE,
    },
    {
      title: localization[ELocalization.FILTER_WELLNESS],
      key: ELocalization.FILTER_WELLNESS,
    },
    {
      title: localization[ELocalization.FILTER_RELATIONSHIPS],
      key: ELocalization.FILTER_RELATIONSHIPS,
    },
    {
      title: localization[ELocalization.FILTER_FOOD],
      key: ELocalization.FILTER_FOOD,
    },
    {
      title: localization[ELocalization.FILTER_HOME],
      key: ELocalization.FILTER_HOME,
    },
  ];

  const [homeData, setHomeData] = useState<ICourseData>({
    all: [],
    category: {},
    inProgress: {},
    mostPopularity: [],
    books: [],
  });
  const [courseList, setCourseList] = useState<Course[][]>([]);
  const [dailyCourses, setDailyCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState(filters[0].key);
  const [modalEndFreePeriod, setModalEndFreePeriod] = useState(false);

  const { showAlert } = useAlert();

  const handleStartCourse = async (
    lessonId: string,
    courseType: string,
    gameFinished: boolean,
    category: string,
    title: string,
  ) => {
    logEvent(
      `web_${profile?.level}_[{${category}]_lesson_${lessonId}_on_press`,
    );

    try {
      setIsLoading(true);

      const { data } = await axios.get(`${EUrls.LESSONS_SHOW}/${lessonId}`);
      getPostProgress(lessonId);

      const exercises = data.exercises.map((el: Exercise) =>
        el._id ? el : { ...el, _id: "final" },
      );
      logEvent(`web_lesson_${lessonId}_exercises_show`);
      logFBEvent(FB_EVENT.LESSON_START);
      logFBConventionsEvent(FB_EVENT.LESSON_START, profile?.email || "");

      dispatch(
        setStartLesson({
          courseId: data.course,
          courseType: courseType,
          title: title,
          exercises: exercises,
          lessonId: lessonId,
          gameFinished,
        }),
      );
    } catch (error) {
      console.log('log: error', error);
      const err = error as AxiosError;
      const errData = err?.response?.data as IAxiosError;

      console.log('log: setModalEndFreePeriod', err, errData?.message);
      if (err?.response?.status === 403 && errData?.message === EDefaultAxiosError.NEED_SUBSCRIPTION) {
        setModalEndFreePeriod(true);
      } else {
        showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async (
    lessonId: string,
    courseType: string,
    gameFinished: boolean,
    category: string,
    title: string,
  ) => {
    if (courseType !== CourseType.Reading) {
      return handleStartCourse(
        lessonId,
        courseType,
        gameFinished,
        category,
        title,
      );
    }

    logEvent(`web_${profile?.level}_[{${category}]_book_${lessonId}_on_press`);

    try {
      setIsLoading(true);

      const { data }: { data: IBook } = await axios.get(
        `${EUrls.BOOKS}/${lessonId}`,
      );

      dispatch(setBook(data));
    } catch (error) {
      const err = error as AxiosError;
      const errData = err?.response?.data as IAxiosError;

      if (err?.response?.status === 403 && errData?.message === EDefaultAxiosError.NEED_SUBSCRIPTION) {
        setModalEndFreePeriod(true);
      } else {
        showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDataHome = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: ICourseData } = await axios.get(
        EUrls.HOME_COURSE,
      );
      const mostPopularity = data.mostPopularity;

      setHomeData({
        ...data,
        category: {
          ...data.category,
          [ELocalization.MOST_POPULARITY]: mostPopularity,
        }
      });
      setCourseList(mostPopularity || data.category[ELocalization.FILTER_DAILY] || []);

      const daily = data.all
        .flat()
        .filter((el) =>
          profile?.dailyCourses.lessonIds.includes(el?.lesson?._id || ""),
        )
        .filter(
          (it) => !getFinished(it?.lesson?._id || "", profile?.lessons || {}),
        );
        console.log(data.all.flat().length, "daily length:", daily.length);

      setDailyCourses(daily);
    } catch (error) {
      showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (filter: string) => {
    if (!Object.keys(homeData.category).includes(filter)) return;

    dispatch(setCategory(filter));

    logEvent(`web_${profile?.level}_[{${filter}]_category_on_change`);
    setCourseList(homeData.category[filter]);
    setActiveFilter(filter);
  };

  useEffect(() => {
    getDataHome();
  }, [profile?.level]);

  useEffect(() => {
    logEvent(`web_Courses`);
    logFBEvent(FB_EVENT.COURSES);
    logFBConventionsEvent(FB_EVENT.COURSES, profile?.email || "");
  }, []);

  if (book) return <ReadBook book={book} />;

  if (currentExercise) {
    return <Game currentExercise={currentExercise} />;
  }

  return (
    <Layout withoutPadding data-class="CourseList">
      <Box className={styles.wrapper}>
        <Box className={`${styles.hideWrapper} ${styles.show}`}>
          {/* Test button */}
          {/* <button
            onClick={async () => {
              try {
                setIsLoading(true);

                const { data } = await axios.post(
                  `${EUrls.USERS_CLEAR_PROGRESS}`,
                );

                dispatch(setProfile(data));
              } catch (error) {
                showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
              } finally {
                setIsLoading(false);
              }
            }}
            style={{
              position: "absolute",
              top: "150px",
              right: "20px",
              background: "#3f97ff",
              borderRadius: "30px",
              padding: "5px 10px",
              color: "#fff",
              zIndex: "10",
            }}
          >
            Test Clear Progress
          </button> */}
          {/*  */}
          <FilterCarousel
            filters={filters}
            onActive={handleFilter}
            activeFilter={activeFilter}
          />
          <AssignmentBlock data={dailyCourses} onStart={handleStartCourse} />
        </Box>
        <Box className={styles.card}>
          <Box className={styles.titleBox}>
            <Typography variant="body1" className={styles.title}>
              {localization[ELocalization.COURSES_TITLE]}
            </Typography>
            <img src={Dreams} alt="" className={styles.titleIcon} />
          </Box>
          <Box className={styles.courseList}>
            {courseList.map((course: Course[], index) => (
              <Box
                key={index}
                className={
                  course.length === 1 ? styles.courseCard : styles.smallCard
                }
              >
                {course.map((el) => (
                  <Box key={el._id}>
                    <CourseLabel
                      imageURL={el.imageURL}
                      backgroundColor={backgroundColors[index % 3]}
                      onClick={() =>
                        handleStart(
                          el?.lesson?._id || el._id,
                          el.type,
                          getFinished(
                            el?.lesson?._id || el._id,
                            profile?.lessons || {},
                          ),
                          el.category,
                          el.name
                            ? el.name
                            : el.title[profile?.locale || ETranslate.ENGLISH],
                        )
                      }
                      isFinished={getFinished(
                        el?.lesson?._id || el._id,
                        profile?.lessons || {},
                      )}
                      isProgress={getInProgress(
                        el?.lesson?._id || el._id,
                        profile?.lessons || {},
                      )}
                      course={el}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {isLoading && (
        <Box
          className={styles.backgroundTimer}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Box className={styles.loadingBox}>
            <Timer />
            <p className={styles.loadingText}>
              {localization[ELocalization.LESSON_LOADING]}
            </p>
          </Box>
        </Box>
      )}
      <EndTrialPeriodModal
        isOpen={modalEndFreePeriod}
        onClose={() => setModalEndFreePeriod(false)}
        title=""
        price={0}
      />
    </Layout>
  );
}
