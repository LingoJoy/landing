import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseLabel from "@/components/molecules/CourseLabel";
import { Layout } from "@/components/templates";

import { ReadBook } from "@/components/templates/ReadBook";
import Game from "../Game";

import Dreams from "@/assets/main/dreams.png";
import Timer from "@/assets/timer.svg";

import {
  backgroundColors,
  ELocalization,
  ETranslate,
  EUrls,
} from "@/constants";
import { selectCurrentExercise, setStartLesson } from "@/store/ActiveLesson";
import { getBook, setBook } from "@/store/book";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";
import axios from "@/utils/AxiosConfig";
import { getFinished, getInProgress } from "@/utils/courseHelpers";
import { useAlert } from "../AlertMessage";

import { Course, CourseType, Exercise, IBook } from "@/types";

import styles from "./index.module.scss";

interface ICourseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  all: any[];
  category: {
    [x: string]: Course[][];
  };
  inProgress: object;
  mostPopularity: Course[];
  books: Course[];
}

export default function CourseListDev() {
  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);
  const currentExercise = useSelector(selectCurrentExercise);
  const profile = useSelector(getProfile);
  const book = useSelector(getBook);

  const [homeData, setHomeData] = useState<ICourseData>({
    all: [],
    category: {},
    inProgress: {},
    mostPopularity: [],
    books: [],
  });
  const [courseList, setCourseList] = useState<Course[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState("");

  const { showAlert } = useAlert();

  const handleStartCourse = async (
    lessonId: string,
    courseType: string,
    gameFinished: boolean,
    title: string,
  ) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${EUrls.LESSONS_SHOW}/${lessonId}`);

      const exercises = data.exercises.map((el: Exercise) =>
        el._id ? el : { ...el, _id: "final" },
      );

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
    title: string,
  ) => {
    if (courseType !== CourseType.Reading) {
      return handleStartCourse(lessonId, courseType, gameFinished, title);
    }

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
      setIsLoading(true);
      const { data }: { data: ICourseData } = await axios.get(
        EUrls.HOME_COURSE,
      );
      const filteredData = { ...data, all: data.all.filter((el) => !el.type) };

      setHomeData(filteredData);
      setCourseList(filteredData.all);
    } catch (error) {
      showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterId = () => {
    if (!filter) return setCourseList(homeData.all);

    const result: Course[] = [];

    homeData.all.forEach((el) => {
      const course = el.find((it: Course) => it._id === filter);
      if (course) result.push(course);
    });
    setCourseList([result]);
  };

  useEffect(() => {
    getDataHome();
  }, [profile?.level]);

  if (book) return <ReadBook book={book} />;

  if (currentExercise) {
    return <Game currentExercise={currentExercise} />;
  }

  console.log(courseList);

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
          <Box
            style={{
              position: "absolute",
              top: "100px",
              right: "20px",
              zIndex: "10",
            }}
          >
            <input
              placeholder="Id"
              style={{
                borderRadius: "10px",
                padding: "5px 10px",
              }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button
              style={{
                background: "#3f97ff",
                borderRadius: "30px",
                padding: "5px 10px",
                color: "#fff",
              }}
              onClick={() => {
                handleFilterId();
                setFilter("");
              }}
            >
              Find
            </button>
          </Box>
          {/*  */}
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
    </Layout>
  );
}
