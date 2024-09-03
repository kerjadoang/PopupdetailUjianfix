import api from '@api/index';
import {SubjectType} from '@constants/subjectType';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ParamList} from 'type/screen';
import {useSearchModalActions, useSearchShowModal} from './organism';
import {useActiveCurriculum} from '@features/IKM/zustand';
import {isStringContains} from '@constants/functional';

const useChapterKPRegular = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ChapterKPRegularScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'ChapterKPRegularScreen'>>();
  const dispatch: any = useDispatch();
  const isFocus = useIsFocused();
  const modalVisible = useSearchShowModal();
  const {setShowModal: setModalVisible} = useSearchModalActions();

  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [isOpenForbiddenPopup, setIsOpenForbiddenPopup] =
    useState<boolean>(false);
  const [chapters, setChapters] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const subject_data = route?.params?.subject_data;
  const subject_type = route?.params?.subject_type;
  const currentCuriculum = useActiveCurriculum();
  const isIKM = isStringContains(currentCuriculum.name || '', 'merdeka');

  const fetchChapter = useCallback(async () => {
    try {
      let URL = '';
      if (route?.params?.subject_type === SubjectType.KPRegular.Practice) {
        URL = `lpt/v1/practice?subject_id=${
          route?.params?.subject_data?.subject?.id ?? subject_data?.id
        }`; // Practice
      } else if (route?.params?.subject_type === SubjectType.KPRegular.Test) {
        URL = `lpt/v1/tests/go_test?subject_id=${
          route?.params?.subject_data?.subject?.id ?? subject_data?.id
        }`; // Test
      } else if (route?.params?.subject_type === SubjectType.KPRegular.Learn) {
        URL = `lpt/v1/learn/progress?subject_id=${
          route?.params?.subject_data?.subject?.id ?? subject_data?.id
        }`; // Learn
      }
      const response = await api.get(URL);
      if (response?.status === 200) {
        setChapters(response?.data.data);
      }
    } catch (err) {
      return;
    }
  }, [
    route?.params?.subject_data?.subject?.id,
    route?.params?.subject_type,
    subject_data?.id,
  ]);

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter, isFocus]);

  return {
    navigation,
    dispatch,
    route,
    isFocus,
    modalVisible,
    setModalVisible,
    isOpenPopUp,
    setIsOpenPopUp,
    isOpenForbiddenPopup,
    setIsOpenForbiddenPopup,
    chapters,
    setChapters,
    isLoading,
    setIsLoading,
    subject_data,
    subject_type,
    isIKM,
  };
};

export default useChapterKPRegular;
