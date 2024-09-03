import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchTeacherMaterials} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import RobotClose from '@assets/svg/Robot_close.svg';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {useMergeState} from '@constants/functional';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useGetCurriculumActive} from '@services/lms';

interface RootState {
  getTeacherMaterials: any;
}

const useManageSchoolMaterialsScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ManageSchoolMaterialsScreen'>
    >();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state?.getTeacherMaterials);

  const [isShowActionSubject, setIsShowActionSubject] =
    useState<boolean>(false);
  const [isShowEditSubject, setIsShowEditSubject] = useState<boolean>(false);
  const [isShowRemoveSubject, setIsShowRemoveSubject] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [subjectSelected, setSubjectSelected] = useState<any>({});
  const [subjectSelectedArray, setSubjectSelectedArray] = useState<any>([]);
  const [classSelected, setClassSelected] = useState<any>({});
  //handle snackbar
  const [isShowSnackBar, setIsShowSnackbar] = useState<boolean>(false);
  const [snackbarLabel, setSnackbarLabel] = useState<string>('');
  const [snackbarMode, setSnackbarMode] = useState<string>('SUCCESS');
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const {data: curriculumData, refetch: getActiveCurriculum} =
    useGetCurriculumActive();

  useEffect(() => {
    if (isFocused) {
      getActiveCurriculum();
    }
  }, [isFocused]);

  const curriculum_id = curriculumData?.curricullum_id;
  const _handlerEditSubject = async (value: string, id: number) => {
    const res = await api.put(URL_PATH.post_teacher_subject + '/' + id, {
      name: value,
    });
    if (res?.status === 200) {
      dispatch(fetchTeacherMaterials(curriculum_id)).then(() => {
        setIsShowEditSubject(false);
        setSnackbarLabel('Mata pelajaran berhasil disimpan.');
        setSnackbarMode('SUCCESS');
        setIsShowSnackbar(true);
      });
    } else if (res?.data?.message === 'Data already exist') {
      setError(true);
    } else {
      setIsShowEditSubject(false);
      setSnackbarLabel(res?.data.message);
      setSnackbarMode('FAILED');
      setIsShowSnackbar(true);
    }
  };

  // handle popup delete
  const [state, setState] = useMergeState({
    isShowPopup: false,
    popupData: false,
  });
  const {isShowPopup, popupData} = state;

  const _handlerDelete = async (data: any) => {
    const subjectName = data?.map((obj: any) => obj?.name);
    const subjectId = data?.map((obj: any) => obj?.id);
    const body = {
      subject_id: subjectId,
    };
    setState({
      popupData: {
        icon: RobotClose,
        title: 'Hapus Mata Pelajaran',
        description: `Apakah Anda yakin untuk menghapus mata pelajaran ${subjectName} ? Seluruh detail kelas dan materi akan terhapus.`,
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          setSubjectSelectedArray([]);
        },
        onPressCancel: async () => {
          const res = await api.delete(
            URL_PATH.post_teacher_subject + '/school',
            {data: body},
          );
          if (res?.status === 200) {
            dispatch(fetchTeacherMaterials(curriculum_id)).then(() => {
              setState({isShowPopup: false});
              setSubjectSelectedArray([]);
              Toast.show({
                type: 'success',
                text1: 'Mata pelajaran berhasil dihapus.',
              });
              setIsShowRemoveSubject(false);
              setIsShowActionSubject(false);
            });
          } else {
            setState({isShowPopup: false});
            setSubjectSelectedArray([]);
            Toast.show({
              type: 'error',
              text1: res?.data?.message,
            });
            setIsShowRemoveSubject(false);
            setIsShowActionSubject(false);
          }
        },
      },
      isShowPopup: true,
    });
  };

  const _handlerDeleteClass = async (data: any) => {
    const subjectId = data?.map((obj: any) => obj?.id);

    setState({
      popupData: {
        icon: RobotClose,
        title: 'Hapus Kelas',
        description: `Apakah Anda yakin untuk menghapus ${classSelected?.name}? Seluruh detail kelas dan materi akan terhapus.`,
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          setIsShowActionSubject(false);
        },
        onPressCancel: async () => {
          const body = {
            subject_id: subjectId,
          };
          const res = await api.delete(
            URL_PATH.post_teacher_subject + '/school',
            {data: body},
          );
          if (res?.status === 200) {
            dispatch(fetchTeacherMaterials(curriculum_id)).then(() => {
              setState({isShowPopup: false});
              setSubjectSelectedArray([]);
              Toast.show({
                type: 'success',
                text1: 'Mata pelajaran berhasil dihapus.',
              });
            });
          } else {
            setState({isShowPopup: false});
            setSubjectSelectedArray([]);
            Toast.show({
              type: 'error',
              text1: res?.data?.message,
            });
          }
          setIsShowActionSubject(false);
        },
      },
      isShowPopup: true,
    });
  };

  useEffect(() => {
    if (isFocused && curriculum_id && initialRender) {
      dispatch(fetchTeacherMaterials(curriculum_id));
      setInitialRender(false);
    }
  }, [isFocused, curriculum_id, initialRender]);

  return {
    data,
    navigation,
    error,
    setError,
    isShowSnackBar,
    setIsShowSnackbar,
    snackbarLabel,
    isShowActionSubject,
    setIsShowActionSubject,
    isShowEditSubject,
    setIsShowEditSubject,
    isShowRemoveSubject,
    setIsShowRemoveSubject,
    subjectSelected,
    setSubjectSelected,
    _handlerEditSubject,
    _handlerDelete,
    isShowPopup,
    popupData,
    snackbarMode,
    classSelected,
    setClassSelected,
    _handlerDeleteClass,
    subjectSelectedArray,
    setSubjectSelectedArray,
  };
};

export default useManageSchoolMaterialsScreen;
