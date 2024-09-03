import {
  dismissLoading,
  isText,
  showErrorToast,
  showLoading,
  sleep,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useState} from 'react';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {getDetailLKPD} from '@features/IKM/services/lkpdServices';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTaskTeacherDetail} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import Toast from 'react-native-toast-message';
import provider from '@services/lms/provider';
import {useTeacherLkpdActions} from '../LkpdTeacherScreen/zustand';

const useDetailPeriksaLkpd = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailPeriksaLkpdScreen'>>();
  const {getRouteParams, navigateScreen, popScreen} = useNavigate();
  const {id} = getRouteParams();
  const [show, setShow] = useState<boolean>(false);
  const [isCollected, setIsCollected] = useState<boolean>(true);
  const [taskData, setTaskData] = useState<ILKPDTask>({});
  const [showFinishAssesment, setShowFinishAssesment] = useState<any>(false);
  const {
    resetState: resetLKPDList,
    getDataChecked,
    getDataSchedule,
  } = useTeacherLkpdActions();

  const getTaskTeacherDetail: any = useSelector(
    (state: RootState) => state?.getTaskTeacherDetail,
  );

  useAsyncEffect(async () => {
    dispatch(fetchTaskTeacherDetail(id));
    try {
      showLoading();
      const resData = await getDetailLKPD({
        task_id: id || 0,
        user_role: 'GURU',
      });
      setTaskData(resData!);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Gagal ambil data');
    } finally {
      dismissLoading();
    }
  }, [isFocused]);

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

  const resetLKPD = () => {
    resetLKPDList();
    getDataChecked();
    getDataSchedule();
  };

  const completeTheAssesment = async () => {
    try {
      const {status} = await provider.narrateTask(id);
      if (status === 200) {
        resetLKPD();
        await sleep(500);
        Toast.show({
          type: 'success',
          text1: 'Lembar Kerja berhasil diselesaikan.',
        });
        popScreen();
      }
    } catch (_) {}
  };

  return {
    navigation,
    navigateScreen,
    id,
    taskData,
    getTaskTeacherDetail,
    reminderStudent,
    show,
    setShow,
    isCollected,
    setIsCollected,
    showFinishAssesment,
    setShowFinishAssesment,
    completeTheAssesment,
  };
};
export default useDetailPeriksaLkpd;
