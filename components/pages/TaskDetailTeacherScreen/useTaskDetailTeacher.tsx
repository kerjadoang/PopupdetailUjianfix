import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDuplicateTask} from '@services/lms';
import provider from '@services/lms/provider';
import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useTaskDetailTeacher = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TaskDetailTeacherScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'TaskDetailTeacherScreen'>>();
  const idTask: number = route?.params?.id;
  const idHistory: number = route?.params?.idHistory;
  const dispatch = useDispatch();
  const TabLabel = {
    collect: 'Mengumpulkan',
    notyet: 'Belum Selesai',
  };
  const {mutate: duplicateTask} = useDuplicateTask();
  const [tabActive, setTabActive] = useState<string>(TabLabel.collect);
  const Tab = createMaterialTopTabNavigator();
  const handleOnPressTab: any = (tabName: string) => {
    setTabActive(tabName);
  };
  const getTaskTeacherDetail: any = useSelector(
    (state: RootState) => state?.getTaskTeacherDetail,
  );

  const [detailHistory, setDetailHistory] = useState<any>(null);
  const [detailShow, setDetailShow] = useState<any>(null);
  const [showFinishAssesment, setShowFinishAssesment] = useState<any>(false);
  const [isShowSwipeUp, setIsShowSwipeUp] = useState<any>(false);

  const dataHeader = {
    text: `${detailShow?.task_teacher?.rombel_class_school?.name ?? ''} • ${
      detailShow?.task_teacher?.type ?? ''
    } • ${detailShow?.task_teacher?.subject?.name ?? ''}`,
    title: detailShow?.task_teacher?.title ?? '',
  };

  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const reminderStudent = async (idNotYet: number) => {
    const res = await api.get(
      URL_PATH.reminder_task_teacher_checked_detail(idNotYet),
    );
    if (res?.status === 200) {
      Toast.show({
        type: 'success',
        text1: res?.data?.data,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: res?.data?.message,
      });
    }
  };

  const getDetailHistory = async () => {
    const res = await api.get(
      URL_PATH.get_teacher_task_history_detail(idHistory),
    );
    if (res?.status === 200) {
      const userFinish = res?.data?.data?.finish ?? [];
      const userNotYet = res?.data?.data?.not_yet ?? [];
      res.data.data.concat = userFinish?.concat(userNotYet);

      setDetailHistory(res?.data?.data);
    }
  };

  const getDetailShow = async () => {
    const resDropdown = await api.get(
      URL_PATH.get_teacher_task_history_show_detail(idTask ?? idHistory),
    );
    if (resDropdown?.status === 200) {
      setDetailShow(resDropdown?.data?.data);
    }
  };

  const completeTheAssesment = async () => {
    try {
      const {status} = await provider.narrateTask(idTask);
      if (status === 200) {
        Toast.show({
          type: 'success',
          text1: 'PR/Projek/Tugas berhasil diselesaikan.',
        });
        navigation.navigate('LMSTeacherTaskScreen');
      }
    } catch (_) {}
  };

  useEffect(() => {
    getDetailHistory();
    getDetailShow();
  }, [idHistory, idTask]);

  return {
    navigation,
    tabActive,
    setTabActive,
    Tab,
    handleOnPressTab,
    isShowDetail,
    setIsShowDetail,
    TabLabel,
    dispatch,
    idTask,
    reminderStudent,
    getTaskTeacherDetail,
    idHistory,
    detailHistory,
    detailShow,
    dataHeader,
    completeTheAssesment,
    setShowFinishAssesment,
    showFinishAssesment,
    isShowSwipeUp,
    setIsShowSwipeUp,
    duplicateTask,
  };
};

export default useTaskDetailTeacher;
