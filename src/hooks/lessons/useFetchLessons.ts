import { getLessons, setLessons, useGetLessonsQuery } from '@/store/lessons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchLessons = () => {
  const lessons = useSelector(getLessons);
  const dispatch = useDispatch();
  const { data } = useGetLessonsQuery(
    {},
    {
      skip: lessons.length > 0,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setLessons(data));
    }
  }, [dispatch, data]);
};
