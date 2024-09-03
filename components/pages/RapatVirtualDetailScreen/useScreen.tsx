import {apiGet, apiPut} from '@api/wrapping';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {ParamList} from 'type/screen';

const useScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RapatVirtualDetailScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'RapatVirtualDetailScreen'>>();

  const [detail, setDetail] = useState<any>();
  const [attandence, setAttandence] = useState<any>();
  const [tabActive, setTabActive] = useState<string>('Hadir');
  const [showMoreSwipeUp, setShowMoreSwipeUp] = useState<boolean>();
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<any>();

  const data = route.params.data;

  const getDetail = async (id: any) => {
    try {
      showLoading();
      const res = await apiGet({
        url: URL_PATH.get_detail_virtual_meeting(id ?? 0),
      });

      setDetail(res);
    } catch (err: any) {
      showErrorToast('Gagal menampilkan detail rapat virtual.');
    } finally {
      dismissLoading();
    }
  };
  const getListAttandence = async (id: any) => {
    try {
      showLoading();
      const res = await apiGet({
        url: URL_PATH.get_attandence_virtual_meeting(id ?? 0),
      });

      setAttandence(res);
    } catch (err: any) {
      showErrorToast('Gagal menampilkan detail rapat virtual.');
    } finally {
      dismissLoading();
    }
  };

  const cancelVirtualMeeting = async (meetingId: any) => {
    try {
      await apiPut({
        url: URL_PATH.put_cancel_virtual_meeting(meetingId),
      });

      navigation.goBack();
      setShowConfirmCancel(false);
      showSuccessToast('Rapat virtual berhasil dibatalkan.');
    } catch (error) {}
  };

  useEffect(() => {
    getDetail(data?.id);
    getListAttandence(data?.id);
  }, []);

  const startTime = detail?.time_start.substring(11, 16);
  const endTime = detail?.time_end.substring(11, 16);

  return {
    data,
    startTime,
    endTime,
    navigation,
    detail,
    setDetail,
    attandence,
    setAttandence,
    tabActive,
    setTabActive,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
    dataItem,
    setDataItem,
    cancelVirtualMeeting,
  };
};

export {useScreen};
