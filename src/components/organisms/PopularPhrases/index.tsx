import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { ReadBook } from "@/components/templates/ReadBook";
import { Layout } from "@/components/templates";
import CourseLabel from "@/components/molecules/CourseLabel";
import FilterCarousel, { IFilter } from "@/components/molecules/FilterCarousel";
import Game from "../Game";

import Timer from "@/assets/timer.svg";

import {
  backgroundColors,
  ELocalization,
  ETranslate,
  EUrls,
  FB_EVENT,
} from "@/constants";
import { selectCurrentExercise, setStartLesson } from "@/store/ActiveLesson";
import axios from "@/utils/AxiosConfig";
import { getLocalization } from "@/store/localization";
import { getBook, setBook } from "@/store/book";
import { getProfile, setProfile } from "@/store/profile";
import { useAlert } from "../AlertMessage";
import { getFinished } from "@/utils/courseHelpers";
import { logEvent } from "@/utils/amplitude";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";

import { Course, CourseType, Exercise, IBook } from "@/types";

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

    logEvent(`web_${profile?.level}_[{${category}]_book_${lessonId}_on_press`);

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
      console.error(error);
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
    logFBEvent(FB_EVENT.POPULAR_PHRASES);
    logFBConventionsEvent(FB_EVENT.POPULAR_PHRASES, profile?.email || "");
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
          <button
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
          </button>
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
                  course={course}
                />
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
    </Layout>
  );
}
