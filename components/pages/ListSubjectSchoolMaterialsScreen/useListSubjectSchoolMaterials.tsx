import api from '@api/index';
import {useMergeState} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {fetchSubjectByCurriculumAndClass} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RobotClose from '@assets/svg/Robot_close.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
interface RootState {
  getSubjectByCurriculumAndClass: any;
}

const useListSubjectSchoolMaterials = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ListSubjectSchoolMaterialsScreen'>
    >();

  const route =
    useRoute<RouteProp<ParamList, 'ListSubjectSchoolMaterialsScreen'>>();

  const {curriculum_id, class_id, class_name, subject_id} = route?.params;
  const dispatch = useDispatch();

  const [error, setError] = useState<boolean>(false);

  //get Subject Data
  const {getSubjectByCurriculumAndClass} = useSelector(
    (state: RootState) => state,
  );

  const [subjectSelected, setSubjectSelected] = useState<any>({id: subject_id});

  const dataList = getSubjectByCurriculumAndClass?.data;
  //set show swipeup
  const [isShowAddSubject, setIsShowAddSubject] = useState<boolean>(false);
  const [isShowActionSubject, setIsShowActionSubject] =
    useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowEditSubject, setIsShowEditSubject] = useState<boolean>(false);
  const [isShowRemove, setIsShowRemove] = useState<boolean>(false);
  const [isShowRemoveSubject, setIsShowRemoveSubject] =
    useState<boolean>(false);

  //handle snackbar
  const [isShowSnackBar, setIsShowSnackbar] = useState<boolean>(false);
  const [snackbarLabel, setSnackbarLabel] = useState<string>('');
  const [snackbarMode, setSnackbarMode] = useState<string>('SUCCESS');

  useEffect(() => {
    dispatch(fetchSubjectByCurriculumAndClass(curriculum_id, class_id));
  }, [dispatch, curriculum_id, class_id]);

  const _handlerSaveSubject = async (value: string) => {
    const res = await api.post(URL_PATH.post_teacher_subject, {
      curriculum_id: curriculum_id,
      class_id: class_id,
      name: value,
    });
    if (res?.status === 200) {
      dispatch(fetchSubjectByCurriculumAndClass(curriculum_id, class_id)).then(
        () => {
          setIsShowAddSubject(false);
          setIsShowActionSubject(false);
          setSnackbarLabel('Mata pelajaran berhasil disimpan.');
          setIsShowSnackbar(true);
        },
      );
    } else {
      setError(true);
    }
  };

  const _handlerEditSubject = async (value: string, id: number) => {
    const res = await api.put(URL_PATH.post_teacher_subject + '/' + id, {
      name: value,
    });
    if (res?.status === 200) {
      dispatch(fetchSubjectByCurriculumAndClass(curriculum_id, class_id)).then(
        () => {
          setIsShowEditSubject(false);
          setIsShowActionSubject(false);
          setSnackbarLabel('Mata pelajaran berhasil disimpan.');
          setIsShowSnackbar(true);
        },
      );
    } else {
      setError(true);
    }
  };

  // handle popup delete
  const [state, setState] = useMergeState({
    isShowPopup: false,
    popupData: false,
  });
  const {isShowPopup, popupData} = state;

  const _handlerDelete = async (id: number) => {
    setState({
      popupData: {
        icon: RobotClose,
        title: 'Hapus Mata Pelajaran',
        description: `Apakah Anda yakin untuk menghapus mata pelajaran ${subjectSelected?.name}? Seluruh detail kelas dan materi akan terhapus.`,
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          setIsShowRemove(false);
        },
        onPressCancel: async () => {
          const res = await api.delete(
            URL_PATH.post_teacher_subject + '/' + id,
          );
          if (res?.status === 200) {
            dispatch(
              fetchSubjectByCurriculumAndClass(curriculum_id, class_id),
            ).then(() => {
              setState({isShowPopup: false});
              setIsShowRemove(false);
              setSnackbarLabel('Mata pelajaran berhasil dihapus.');
              setIsShowSnackbar(true);
              setIsShowActionSubject(false);
            });
          } else {
            setState({isShowPopup: false});
            setIsShowRemove(false);
            setSnackbarLabel(res?.data?.message);
            setSnackbarMode('FAILED');
            setIsShowSnackbar(true);
            setIsShowActionSubject(false);
          }
        },
      },
      isShowPopup: true,
    });
  };

  return {
    navigation,
    dataList,
    class_name,
    isShowAddSubject,
    setIsShowAddSubject,
    _handlerSaveSubject,
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
    isShowEdit,
    setIsShowEdit,
    isShowRemove,
    setIsShowRemove,
  };
};

export default useListSubjectSchoolMaterials;
