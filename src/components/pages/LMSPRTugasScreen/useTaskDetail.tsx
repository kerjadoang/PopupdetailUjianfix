import {convertDate, isStringContains} from '@constants/functional';
import 'dayjs/locale/id';
import {useSelector} from 'react-redux';

interface RootState {
  getRecordTaskDetail: any;
}

interface Detail extends IDetailTaskData {
  type?: string;
  subject_name?: string;
  correction_type?: string;
  title?: string;
  time_start?: string;
  time_finish?: string;
  value?: number;
  correct?: number;
  wrong?: number;
  skip?: number;
  time_correction?: string;
  duration: string;
  time_working_task?: string;
  isUnggahFile?: boolean;
}

export const LMSPRTugasIsScheduled = (item: any) => {
  return (
    item?.status === 'schedule' &&
    convertDate().isAfter(convertDate(item?.time_start)) &&
    convertDate().isBefore(convertDate(item?.time_finish))
  );
};

const useTaskDetail = () => {
  const getRecordTaskDetail = useSelector(
    (state: RootState) => state.getRecordTaskDetail,
  );
  const detail = getRecordTaskDetail?.data;

  const dataDetail: Detail = {
    ...detail,
    type: detail?.task_teacher?.type,
    subject_name: detail?.task_teacher?.subject?.name,
    correction_type: detail?.task_student?.correction_type,
    title: detail?.task_teacher?.title,
    time_start: convertDate(
      detail?.task_student?.task_teacher?.time_start,
    ).format('dddd, D MMMM YYYY • HH:mm'),
    time_finish: convertDate(
      detail?.task_student?.task_teacher?.time_finish,
    ).format('dddd, D MMMM YYYY • HH:mm'),
    value: detail?.task_student?.value,
    correct: detail?.task_student?.correct,
    wrong: detail?.task_student?.wrong,
    skip: detail?.task_student?.skip,
    time_correction: convertDate(
      detail?.task_student?.task_teacher?.time_correction,
    ).format('dddd, D MMMM YYYY • HH:mm'),
    duration: detail?.duration,
    isUnggahFile: isStringContains(
      detail.task_teacher?.question_type || '',
      'unggah',
    ),
  };

  return {
    detail,
    dataDetail,
  };
};

export default useTaskDetail;
