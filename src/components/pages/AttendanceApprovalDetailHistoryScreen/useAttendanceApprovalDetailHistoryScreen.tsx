import {useMergeState} from '@constants/functional';
import {styles} from './style';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {useSelector} from 'react-redux';
import {Linking} from 'react-native';
interface RootState {
  getUser: any;
}

const useAttendanceApprovalDetailHistoryScreen = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const [state, setState] = useMergeState({
    isLoading: false,
    detailHistoryAttendance: false,
  });
  const {isLoading, detailHistoryAttendance}: any = state;
  const {approval_status} = detailHistoryAttendance;
  const route: any = useRoute();
  const {absentId} = route?.params;
  const classUser =
    getUser?.data?.rombel_class_school_user?.[0]?.rombel_class_school?.name;

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const userTypeId = getUser?.data?.user_type_id;
  const isUserStudent = userTypeId == 1;
  const isUserTeacher = userTypeId == 5;

  const badgeStyle =
    approval_status == 'diterima'
      ? styles.badgeAccepted
      : approval_status == 'ditolak'
      ? styles.badgeRejected
      : styles.badgeWaiting;
  const titleBadgeStyle =
    approval_status == 'diterima'
      ? styles.titleBadgeAccepted
      : approval_status == 'ditolak'
      ? styles.titleBadgeRejected
      : styles.titleBadgeWaiting;
  const approvalTitle =
    approval_status == 'menunggu' && isUserTeacher
      ? 'Menunggu persetujuan Admin'
      : approval_status == 'menunggu' && isUserStudent
      ? 'Menunggu persetujuan Guru'
      : approval_status;
  const createdByTitle = isUserStudent ? 'Guru' : 'Admin';

  useEffect(() => {
    _handlerGetDetailHistory();
  }, []);

  const _handlerGetDetailHistory = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getDetailHistoryAttendance(absentId);

      if (res?.status == 200) {
        var resDataData = res?.data?.data || false;
        const mediaId = resDataData?.media_id;

        if (mediaId) {
          const fileRes = await providerMedia.getFile(mediaId);
          const fileResData = fileRes?.data || false;

          if (fileResData?.code === 100) {
            resDataData = {
              ...resDataData,
              path_url: fileResData?.data?.path_url || false,
              file_type: fileResData?.data?.type || false,
              file_name: fileResData?.data?.file_name || false,
              original_name: fileResData?.data?.original_name || false,
            };
          }
        }

        setTimeout(() => {
          setState({
            isLoading: false,
            detailHistoryAttendance: resDataData,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerSelectFile = async (pathUri: any) => {
    const uri = pathUri;
    // const uri = 'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/attendance/03c50d53-46f4-48db-9640-6d94f548293e.docx';
    // const uri = 'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/attendance/fb2a498c-b529-4e07-8a8e-48b9ad87e0a0.xlsx';
    // const uri = 'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/attendance/66852dd4-60de-462e-99c9-a973df8b3466.pdf';

    // eslint-disable-next-line no-console
    Linking.openURL(uri).catch(err => console.error("Couldn't load page", err));
    // FileViewer.open(uri)
    //   .then(() => {
    //     // Do whatever you want
    //     console.log('Success');
    //   })
    //   .catch(_err => {
    //     // Do whatever you want
    //     console.log('_err >>>', _err);
    //   });
    //   }
  };

  return {
    isLoading,
    badgeStyle,
    titleBadgeStyle,
    detailHistoryAttendance,
    approvalTitle,
    classUser,
    createdByTitle,
    _handlerSelectFile,
  };
};

export default useAttendanceApprovalDetailHistoryScreen;
