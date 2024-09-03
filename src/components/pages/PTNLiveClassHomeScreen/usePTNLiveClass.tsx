import {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {
  IPTNLiveClassRekaman,
  IResponsePTNRecordSession,
} from '../PTNLiveClassRecordScreen/type';
import {TAB_NAMES} from './components';
import {fetchClassSessionDetail, fetchJoinLiveClassSession} from '@redux';
import {useDispatch} from 'react-redux';
import {getToken} from '@hooks/getToken';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {ParamList} from 'type/screen';
import {putRecordSession} from '../PTNLiveClassRecordScreen/utils';

const usePTNLiveClassHome = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PTNLiveClassHomeScreen'>>();
  const dispatch = useDispatch();
  const [classSession, setClassSession] = useState(false);
  const [classSessionRekaman, setClassSessionRekaman] = useState(false);
  const [liveSessionRekaman, setLiveSessionRekaman] =
    useState<IPTNLiveClassRekaman>();
  const [token, setToken] = useState<string>('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getToken();
        setToken(data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    showLoading();
    _getDashboardLiveClassPTNSession();
    _getDashboardRecordLiveClassPTN();
    _getDashboardLiveClassRecord();
  }, [isFocused]);

  useEffect(() => {
    if (!classSession || !classSessionRekaman || !liveSessionRekaman) {
      return;
    }

    dismissLoading();
  }, [classSession, classSessionRekaman, liveSessionRekaman]);

  const _getDashboardLiveClassPTNSession = async () => {
    try {
      const resData = await apiGet({
        url: URL_PATH.get_live_class('ptn'),
      });
      setClassSession(resData);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
    }
  };

  const _getDashboardRecordLiveClassPTN = async () => {
    try {
      const resData = await apiGet({
        url: URL_PATH.get_rekaman_class('ptn', 0, 3),
      });
      setClassSessionRekaman(resData);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
    }
  };

  const _getDashboardLiveClassRecord = async () => {
    try {
      const [saintekData, tpsData, soshumData] = await Promise.all([
        getLiveClassRekamanByModule('tps'),
        getLiveClassRekamanByModule('saintek'),
        getLiveClassRekamanByModule('soshum'),
      ]);

      setLiveSessionRekaman({
        saintek: saintekData,
        tps: tpsData,
        soshum: soshumData,
      });
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
    }
  };

  const getLiveClassRekamanByModule = async (module: PTNModule) => {
    let resData = await apiGet({
      url: URL_PATH.get_ptn_subject_list(module, 'live_class'),
    });
    return resData;
  };

  const onJoinLiveClass = (item: any) => {
    dispatch(fetchClassSessionDetail('ptn', item.ID));
    dispatch(
      fetchJoinLiveClassSession(
        item.ID,
        () => {
          navigation.navigate('MeetingLiveSessionV2Screen', {
            card_id: item.ID,
            type: 'ptn',
          });
        },
        'ptn',
      ),
    );
  };
  const onCardJoinLiveClassPress = (item: any) => {
    navigation.navigate('ClassSessionDetailGURUScreen', {
      id: item.ID,
      service_type: 'ptn',
    });
  };

  const onRecordLiveClass = async (item: IResponsePTNRecordSession) => {
    await putRecordSession(item?.ID || 0, item?.lc_zoom?.media_id || '');
    navigation.navigate('VideoAnimationScreen', {
      chapterData: item,
      type: 'PTN',
    });
  };

  const onSeeAllRecording = (subjectId?: string) => {
    navigation.navigate('PTNLiveClassRecordScreen', {
      subject_id: subjectId || '0',
    });
  };

  const parseTabData = (tabName: String) => {
    if (tabName === TAB_NAMES.TPS) {
      return liveSessionRekaman?.tps;
    }
    if (tabName === TAB_NAMES.SAINTEK) {
      return liveSessionRekaman?.saintek;
    }
    return liveSessionRekaman?.soshum;
  };

  const onSeeSchedule = () => {
    navigation.navigate('ScheduleScreen', {
      filter: 'Live Class',
      screen: 'PTN',
      loginAs: 'MURID',
      token: token,
      data: {},
    });
  };
  return {
    classSession,
    classSessionRekaman,
    liveSessionRekaman,
    onJoinLiveClass,
    onRecordLiveClass,
    onSeeAllRecording,
    onSeeSchedule,
    onCardJoinLiveClassPress,
    parseTabData,
  };
};
export default usePTNLiveClassHome;
