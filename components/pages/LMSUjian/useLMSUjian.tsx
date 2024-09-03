import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mapelFilterAction} from './action';
import ProviderLMS from '@services/lms/provider';
import {ParamList} from 'type/screen';

const LMSUjianFilterType = {
  Schedule: 'scheduled',
  DoneScoring: 'done_scoring',
  OnProgress: 'on_progress',
  Done: 'done',
};
const LMSUjianPopUpType = {
  Mapel: 'Mapel',
  Nilai: 'Nilai',
  Selesai: 'Selesai',
  Proses: 'Proses',
  Kerjakan: 'Kerjakan',
};

type LMSUjianTabEnum = 'Mendatang' | 'Riwayat';
type LMSUjianPopUpEnum = 'Mapel' | 'Nilai' | 'Selesai' | 'Proses' | 'Kerjakan';

const useLMSUjian = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSUjian'>>();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const updateMapelFilter: any = useSelector(state => state.updateMapelFilter);
  const getLMSListUjian: any = useSelector(state => state.getLMSListUjian);
  const [tabActive, setTabActive] = useState<LMSUjianTabEnum>('Mendatang');
  const [popUpType, setPopUpType] = useState<LMSUjianPopUpEnum>('Mapel');
  const [examDataOnProgress] = useState<[]>([]);
  const [listSubject, setListSubject]: any = useState<any>([]);
  const [cardData, setCardData]: any = useState<any[]>([]);
  const [listSelectedSubject, setListSelectedSubject] = useState<any[]>([]);
  const [examDataSchedule] = useState<[]>([]);
  const [examDataDoneScoring] = useState<[]>([]);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [examDataOnGoing, setExamDataOnGoing] = useState<any>([]);

  const handleOnPressTab = (tabName: LMSUjianTabEnum) => {
    setListSubject([]);
    setTabActive(tabName);
  };

  const handleUpdateSelectedSubject = async (index: number) => {
    const newArray = [...listSubject];
    newArray[index].isChoosed = !newArray[index].isChoosed;
    setListSubject(newArray);
  };

  const handleSaveSelectedSubject = async (data: any) => {
    dispatch(mapelFilterAction(data));
  };

  const handleResetSelectedSubject = async () => {
    dispatch(mapelFilterAction([]));
  };

  const handleOpenPopUp = (isOpen: boolean) => {
    setModalVisible(isOpen);
  };

  const handleClosePopUp = () => {
    setModalVisible(false);
  };

  const handleSetListSubject = async (
    subjectData: any,
    setListSubjectId: any,
  ) => {
    if (updateMapelFilter?.data?.length <= 0) {
      const resArrId: any[] = [];
      const resArrName: any[] = [];
      const resArr: any[] = [];
      await subjectData?.map((ie: any) => {
        resArrId.indexOf(ie?.subject_id) === -1 &&
          resArrId?.push(ie?.subject_id);
      });
      await subjectData?.map((ie: any) => {
        resArrName.indexOf(ie?.subject?.name) === -1 &&
          resArrName?.push(ie?.subject?.name);
      });
      await resArrId?.map((ie: any, index: number) => {
        resArr.push({id: ie, name: resArrName[index], isChoosed: false});
      });
      setListSubject(resArr);
    } else {
      setListSubject(updateMapelFilter?.data);
      let arrSubjectId: any[] = [];
      updateMapelFilter?.data?.map((ie: any) => {
        arrSubjectId.push(ie?.id);
      });
      setListSubjectId(arrSubjectId);
    }
  };

  const handleGetListExamOnGoing = async () => {
    try {
      // showLoading();
      const _resFetchData: any = await ProviderLMS?.getLMSListUjian({
        limit: 10,
        page: 1,
        search: '',
        status: ['on_progress'],
        status_student: [],
        subject_id: [],
      });
      const ResData = _resFetchData?.data || false;
      setExamDataOnGoing(ResData?.data);
      // dismissLoading();
    } catch (error: any) {
      // Toast?.show({
      //   type: 'error',
      //   text1:
      //     error?.response?.data?.message ||
      //     'Terjadi kesalahan pada sistem kami',
      // });
    }
  };

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    handleGetListExamOnGoing();
  }, [isFocus]);

  return {
    navigation,
    dispatch,
    tabActive,
    handleOnPressTab,
    getLMSListUjian,
    isOpenPopUp,
    setIsOpenPopUp,
    handleOpenPopUp,
    handleClosePopUp,
    modalVisible,
    setModalVisible,
    examDataDoneScoring,
    examDataSchedule,
    examDataOnProgress,
    LMSUjianFilterType,
    popUpType,
    setPopUpType,
    LMSUjianPopUpType,
    listSubject,
    setListSubject,
    listSelectedSubject,
    setListSelectedSubject,
    handleUpdateSelectedSubject,
    handleSaveSelectedSubject,
    handleResetSelectedSubject,
    handleSetListSubject,
    cardData,
    setCardData,
    examDataOnGoing,
    handleGetListExamOnGoing,
  };
};

export default useLMSUjian;
