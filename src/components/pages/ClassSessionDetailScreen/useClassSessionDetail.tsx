import api from '@api/index';
import Colors from '@constants/colors';
import {formatDate, showErrorToast} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTeacherJoinMeeting} from '@redux';
// import ZoomUs from 'react-native-zoom-us';
import {Linking} from 'react-native';
import mediaProvider from '@services/media/provider';

interface RootState {
  getUser: any;
}

const useClassSessionDetail = (id: any) => {
  const {getUser} = useSelector((state: RootState) => state);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState<string>('');
  const timeStart: any = data?.time_start;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _renderDetail = async () => {
    const res = await api.get(URL_PATH.get_all_session_class + id);
    if (res?.status === 200) {
      const resIcon = await mediaProvider.getImage(
        res?.data?.data.subject.icon_mobile,
      );
      if (resIcon) {
        res.data.data.path_url = resIcon?.data?.path_url;
        res.data.data.path_id = resIcon.data?.ID;
      }
      const resAvatar = await mediaProvider.getImage(
        res?.data?.data?.user_created_by?.avatar,
      );
      if (resAvatar) {
        res.data.data.avatar_path_url = resAvatar?.data?.path_url;
      }
      setData(res?.data?.data);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const diff: any = new Date(timeStart) - new Date();
      if (diff > 0 && diff <= 86400000) {
        // Countdown is less than 24 hours
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        if (hours >= 1) {
          setTimeLeft(`Mulai dalam ${hours} jam : ${minutes} menit`);
        } else {
          setTimeLeft(`Mulai dalam ${minutes} menit : ${seconds} detik`);
        }
      } else {
        setTimeLeft('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeStart]);

  const classCategory = [
    {
      id: 1,
      type: 'Class Name',
      name: data?.rombel_class?.name,
    },
    {
      id: 2,
      type: 'type',
      name: data?.type,
    },
    {
      id: 3,
      type: 'platform',
      name: data?.platform,
    },
  ];
  const subjectData: {
    name: string;
    id: any;
    class_id: any;
    title: string;
    date: any;
    status: string;
    start_soon: boolean;
    image: string;
    description: string;
    avatar_path_url?: string;
  } = {
    name: data?.subject?.name ? data.subject.name : '-',
    id: data?.subject?.id ? data.subject.id : null,
    class_id: data?.subject?.class_id ? data.subject.class_id : null,
    title: data?.title ? data.title : '-',
    date: formatDate(data?.time_start, data?.time_end),
    status: data?.status ? data.status : '-',
    start_soon: data?.start_soon,
    image: data?.path_url,
    description: data?.description,
    avatar_path_url: data?.avatar_path_url,
  };
  const ratingUser = data?.participant?.join
    ?.filter((x: any) => x?.user_id === getUser?.data?.id)
    ?.map((x: any) => x?.rating);

  const getButtonAction = (sessionData: any) => {
    switch (sessionData?.platform) {
      case 'zoom':
        const joinZoomMeeting = async () => {
          try {
            // await ZoomUs.initialize({
            //   clientKey: '4tCNRczVkrEqLsJI7BFmpD6tSNlwxQffO1Xf',
            //   clientSecret: '28WHxodIObgxLG65LUMuuK8PkrH1civ0BZZj',
            // });
            // await ZoomUs.joinMeeting({
            //   userName: getUser?.fullname ?? '',
            //   meetingNumber: sessionData?.zoom?.id_zoom,
            //   password: sessionData?.zoom?.password,
            //   zoomAccessToken: sessionData?.zoom?.zak_token,
            // });
          } catch (e: any) {
            showErrorToast('Gagal masuk zoom');
            // setZoomErrMessage(`Terjadi Kesalahan: ${e.code}`);
          }
        };
        joinZoomMeeting();
        break;
      case 'google_meet':
        const meetUrl = sessionData?.google_meet?.start_url;
        dispatch(
          fetchTeacherJoinMeeting(sessionData?.id ?? 0, () => {
            Linking.openURL(meetUrl)
              .then(() => {
                navigation.goBack();
              })
              .catch(() => {});
          }),
        );
        break;
      default:
        break;
    }
  };

  const getButtonLabel = () => {
    var title = '';
    if (subjectData?.status === 'on_going') {
      title = subjectData?.start_soon ? 'Belum Dimulai' : 'Gabung Sesi Kelas';
    } else if (subjectData?.status === 'unstarted') {
      title = timeLeft;
      if (timeLeft === '') {
        title = 'Belum dimulai';
      }
    }
    return title;
  };

  const getButtonBgColor = () => {
    var bgColor = subjectData?.start_soon
      ? Colors.dark.neutral40
      : Colors.primary.base;
    if (subjectData?.status === 'unstarted') {
      bgColor = Colors.dark.neutral40;
    }
    return bgColor;
  };

  const getButtonColor = () => {
    var color = subjectData?.start_soon ? Colors.dark.neutral60 : Colors.white;
    if (subjectData?.status === 'unstarted') {
      color = Colors.dark.neutral60;
    }
    return color;
  };
  const getButtonIsDisabled = () => {
    var isDisabled = subjectData?.start_soon ? true : false;
    if (subjectData?.status === 'unstarted') {
      isDisabled = true;
    }
    return isDisabled;
  };
  useEffect(() => {
    setIsLoading(true);
    _renderDetail().then(() => {
      setIsLoading(false);
    });
  }, []);

  return {
    getUser,
    navigation,
    data,
    classCategory,
    subjectData,
    getButtonLabel,
    getButtonBgColor,
    getButtonIsDisabled,
    getButtonColor,
    getButtonAction,
    timeLeft,
    ratingUser,
    isLoading,
  };
};

export default useClassSessionDetail;
