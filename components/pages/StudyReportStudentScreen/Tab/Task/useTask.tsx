import {fetchTask} from '@redux';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useTask = (subject?: any, student?: any) => {
  const {task, getUser}: any = useSelector((state: RootState) => state);
  const isLoading = task?.loading;
  const taskData = task?.data?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTask(subject?.id, student?.id ?? getUser?.data?.id));
  }, []);

  return {
    taskData,
    isLoading,
  };
};

export {useTask};
