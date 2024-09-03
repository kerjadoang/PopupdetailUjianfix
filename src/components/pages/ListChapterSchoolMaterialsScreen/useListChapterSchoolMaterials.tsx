import api from '@api/index';
import {useMergeState} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {fetchTeacherChapter} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RobotClose from '@assets/svg/Robot_close.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
interface RootState {
  getTeacherChapter: any;
}

const useListChapterSchoolMaterials = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ListChapterSchoolMaterialsScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'ListChapterSchoolMaterialsScreen'>>();

  const dispatch = useDispatch();
  const {subject_id, class_name, chapter_id, materialsParams} = route?.params;
  const [error, setError] = useState<boolean>(false);

  //get Subject Data
  const {getTeacherChapter} = useSelector((state: RootState) => state);

  const [chapterSelected, setChapterSelected] = useState<any>({
    id: chapter_id,
  });

  const dataList = getTeacherChapter?.data;

  //set show swipeup
  const [isShowAddChapter, setIsShowAddChapter] = useState<boolean>(false);
  const [isShowActionChapter, setIsShowActionChapter] =
    useState<boolean>(false);
  const [isShowEditChapter, setIsShowEditChapter] = useState<boolean>(false);
  const [isShowRemoveChapter, setIsShowRemoveChapter] =
    useState<boolean>(false);

  //handle snackbar
  const [isShowSnackBar, setIsShowSnackbar] = useState<boolean>(false);
  const [snackbarLabel, setSnackbarLabel] = useState<string>('');
  const [snackbarMode, setSnackbarMode] = useState<string>('SUCCESS');

  useEffect(() => {
    dispatch(fetchTeacherChapter(subject_id));
  }, [dispatch, subject_id]);

  const _handlerSaveChapter = async (value: string) => {
    const res = await api.post(URL_PATH.post_teacher_chapter, {
      subject_id: subject_id,
      name: value,
    });
    if (res?.status === 200) {
      dispatch(fetchTeacherChapter(subject_id)).then(() => {
        setIsShowAddChapter(false);
        setSnackbarLabel('Bab berhasil disimpan.');
        setIsShowSnackbar(true);
      });
    } else {
      setError(true);
    }
  };

  const _handlerEditChapter = async (value: string, id: number) => {
    const res = await api.put(URL_PATH.post_teacher_chapter + '/' + id, {
      subject_id: subject_id,
      name: value,
    });
    if (res?.status === 200) {
      dispatch(fetchTeacherChapter(subject_id)).then(() => {
        setIsShowEditChapter(false);
        setIsShowActionChapter(false);
        setSnackbarLabel('Bab berhasil disimpan.');
        setIsShowSnackbar(true);
      });
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
        title: 'Hapus Bab',
        description: `Apakah Anda yakin untuk menghapus bab ${chapterSelected?.name}? Seluruh detail kelas dan materi akan terhapus.`,
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: async () => {
          const res = await api.delete(
            URL_PATH.post_teacher_chapter + '/' + id,
          );
          if (res?.status === 200 || res?.data?.message === 'Success') {
            dispatch(fetchTeacherChapter(subject_id)).then(() => {
              setState({isShowPopup: false});
              setIsShowActionChapter(false);
              setSnackbarLabel('Bab berhasil dihapus.');
              setIsShowSnackbar(true);
            });
          } else {
            setState({isShowPopup: false});
            setIsShowActionChapter(false);
            setSnackbarLabel(res?.data?.message);
            setSnackbarMode('FAILED');
            setIsShowSnackbar(true);
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
    isShowAddChapter,
    setIsShowAddChapter,
    _handlerSaveChapter,
    error,
    setError,
    isShowSnackBar,
    setIsShowSnackbar,
    snackbarLabel,
    isShowActionChapter,
    setIsShowActionChapter,
    isShowEditChapter,
    setIsShowEditChapter,
    isShowRemoveChapter,
    setIsShowRemoveChapter,
    chapterSelected,
    setChapterSelected,
    _handlerEditChapter,
    _handlerDelete,
    isShowPopup,
    popupData,
    snackbarMode,
    materialsParams,
  };
};

export default useListChapterSchoolMaterials;
