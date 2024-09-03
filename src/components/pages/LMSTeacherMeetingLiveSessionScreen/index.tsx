import React, {useEffect} from 'react';
// import ZoomUs from 'react-native-zoom-us';

const LMSTeacherMeetingLiveSessionScreen = () => {
  useEffect(() => {
    const joinZoomMeeting = async () => {
      try {
        // await ZoomUs.initialize({
        //   clientKey: '4tCNRczVkrEqLsJI7BFmpD6tSNlwxQffO1Xf',
        //   clientSecret: '28WHxodIObgxLG65LUMuuK8PkrH1civ0BZZj',
        // });
        // await ZoomUs.joinMeeting({
        //   userName: dataUsed?.data?.userName ?? '',
        //   meetingNumber: dataUsed?.data?.id_zoom as string,
        //   password: dataUsed?.data?.passWord ?? '',
        //   zoomAccessToken: dataUsed?.data?.zak_token ?? '',
        //   // noAudio: true,
        //   // noVideo: true,
        // });
      } catch (e: any) {}
    };
    joinZoomMeeting();
  }, []);

  // useEffect(() => {
  //   const listener = ZoomUs.onMeetingStatusChange(({event}) => {
  //     console.log(event);
  //     switch (event) {
  //       case 'MEETING_STATUS_LEAVE_BO':
  //       case 'MEETING_STATUS_FAILED':
  //         leaveLiveClassSession();
  //         break;

  //       case 'MEETING_STATUS_DISCONNECTING':
  //       case 'MEETING_STATUS_ENDED':
  //         onFinishLiveClassSession();
  //         break;

  //       default:
  //         break;
  //     }
  //   });

  //   return () => listener.remove();
  // }, []);

  return <></>;
};

export default LMSTeacherMeetingLiveSessionScreen;
