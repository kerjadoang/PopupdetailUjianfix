import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useState} from 'react';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {ILkpdTeacherHistoryDetail} from './types';
import {useDisclosure} from '@hooks/useDisclosure';

const useLkpdTeacherHistoryDetail = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LkpdTeacherHistoryDetailScreen'>
    >();
  const {getRouteParams} = useNavigate();
  const {id} = getRouteParams();

  const [detailHistory, setDetailHistory] =
    useState<ILkpdTeacherHistoryDetail>();
  const [show, setShow] = useState<boolean>(false);

  const {isVisible: showOptionMenu, toggle: toggleOptionMenu} = useDisclosure();

  const getDetailHistory = async () => {
    const res = await api.get(URL_PATH.get_teacher_task_history_detail(id));
    if (res?.status === 200) {
      const userFinish = res?.data?.data?.finish ?? [];
      const userNotYet = res?.data?.data?.not_yet ?? [];
      res.data.data.list_student = userFinish?.concat(userNotYet);

      setDetailHistory(res?.data?.data);
    }
  };

  useEffect(() => {
    getDetailHistory();
  }, []);

  return {
    navigation,
    detailHistory,
    show,
    setShow,
    showOptionMenu,
    toggleOptionMenu,
  };
};
export default useLkpdTeacherHistoryDetail;
