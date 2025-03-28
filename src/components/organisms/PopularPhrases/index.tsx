import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CourseLabel from "@/components/molecules/CourseLabel";
import FilterCarousel, { IFilter } from "@/components/molecules/FilterCarousel";
import { Layout } from "@/components/templates";
import { ReadBook } from "@/components/templates/ReadBook";
import Game from "../Game";

import Timer from "@/assets/timer.svg";

import {
  backgroundColors,
  ELocalization,
  ERoutes,
  ETranslate,
  EUrls
} from "@/constants";
import { selectCurrentExercise, setStartLesson } from "@/store/ActiveLesson";
import { getBook, setBook } from "@/store/book";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";
import axios from "@/utils/AxiosConfig";
import { getFinished, getInProgress } from "@/utils/courseHelpers";
import { useAlert } from "../AlertMessage";

import { Course, CourseType, EDefaultAxiosError, Exercise, IAxiosError, IBook } from "@/types";

import EndTrialPeriodModal from "@/components/organisms/modals/EndTrialPeriodModal";
import { AxiosError } from "axios";
import styles from "./index.module.scss";

interface ICourseData {
  all: Course[];
  category: {
    [x: string]: Course[];
  };
  mostPopularity: Course[];
}

export default function PopularPhrases() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);
  const book = useSelector(getBook);
  const currentExercise = useSelector(selectCurrentExercise);

  const filters: IFilter[] = [
    {
      title: localization[ELocalization.FILTER_DAILY],
      key: "daily_routine",
    },
    {
      title: localization[ELocalization.FILTER_EDUCATION],
      key: "education_and_career",
    },
    {
      title: localization[ELocalization.FILTER_HOME],
      key: "home_living",
    },
    {
      title: localization[ELocalization.FILTER_INTERACTION],
      key: "interaction",
    },
    {
      title: localization[ELocalization.FILTER_TRAVEL],
      key: "travel_transport",
    },
  ];

  const [homeData, setHomeData] = useState<ICourseData>({
    all: [],
    category: {},
    mostPopularity: [],
  });
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState(filters[0].key);
  const [modalEndFreePeriod, setModalEndFreePeriod] = useState(false);

  const handleStartCourse = async (
    lessonId: string,
    courseType: string,
    gameFinished: boolean,
    category: string,
    title: string,
  ) => {
    logEvent(
      `web_${profile?.level}_[{${category}]_lesson_on_press`,
    );

    try {
      setIsLoading(true);

      const { data } = await axios.get(`${EUrls.LESSONS_SHOW}/${lessonId}`);

      const exercises = data.exercises.map((el: Exercise) =>
        el._id ? el : { ...el, _id: "final" },
      );
      logEvent(`web_lesson_exercises_show`);
      // logFBEvent(FB_EVENT.LESSON_START);
      // logFBConventionsEvent(FB_EVENT.LESSON_START, profile?.email || "");

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
      showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
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

    logEvent(`web_${profile?.level}_[{${category}]_book_on_press`);

    try {
      setIsLoading(true);

      const { data }: { data: IBook } = await axios.get(
        `${EUrls.BOOKS}/${lessonId}`,
      );

      dispatch(setBook(data));
    } catch (error) {
      showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataHome = async () => {
    try {
      const { data }: { data: ICourseData } = await axios.get(
        EUrls.HOME_POPULAR,
      );

      setHomeData(data);
      setCourseList(data.category[ELocalization.FILTER_DAILY] || []);
    } catch (error) {
      const err = error as AxiosError;
      const errData = err?.response?.data as IAxiosError;

      if (err?.response?.status === 403 && errData?.message === EDefaultAxiosError.NEED_SUBSCRIPTION) {
        setModalEndFreePeriod(true);
      } else {
        showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
      }
    }
  };

  const handleFilter = (filter: string) => {
    if (!Object.keys(homeData.category).includes(filter)) return;

    setCourseList(homeData.category[filter]);
    setActiveFilter(filter);
  };

  useEffect(() => {
    getDataHome();
  }, [profile?.level]);

  useEffect(() => {
    logEvent(`web_Popular Phrases`);
    // logFBEvent(FB_EVENT.POPULAR_PHRASES);
    // logFBConventionsEvent(FB_EVENT.POPULAR_PHRASES, profile?.email || "");
  }, []);

  if (book) return <ReadBook book={book} />;

  if (currentExercise) {
    return <Game currentExercise={currentExercise} />;
  }

  return (
    <Layout withoutPadding>
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
        </Box>
        <Box className={styles.card}>
          <Box className={styles.courseList}>
            <Box className={styles.titleBox}>
              <Typography variant="body1" className={styles.title}>
                {localization[ELocalization.POPULAR_PHRASES]}
              </Typography>
            </Box>
            {courseList?.map((course: Course, index) => (
              <Box
                key={course._id}
                className={
                  course.imageURL ? styles.courseCard : styles.smallCard
                }
              >
                <CourseLabel
                  imageURL={course.imageURL}
                  backgroundColor={backgroundColors[index % 3]}
                  onClick={() =>
                    handleStart(
                      course?.lesson?._id || course._id,
                      course.type,
                      getFinished(
                        course?.lesson?._id || course._id,
                        profile?.lessons || {},
                      ),
                      course.category,
                      course.name
                        ? course.name
                        : course.title[profile?.locale || ETranslate.ENGLISH],
                    )
                  }
                  isFinished={getFinished(
                    course?.lesson?._id || course._id,
                    profile?.lessons || {},
                  )}
                  isProgress={getInProgress(
                    course?.lesson?._id || course._id,
                    profile?.lessons || {},
                  )}
                  course={course}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <EndTrialPeriodModal
          isOpen={modalEndFreePeriod}
          onClose={() => {
            setModalEndFreePeriod(false)
            navigate(ERoutes.COURSES);
          }}
          title=""
          price={0}
        />
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
    </Layout>
  );
}
