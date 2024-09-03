import {useEffect, useState} from 'react';
// import ZoomUs, {ZoomEmitter} from 'react-native-zoom-us';

export const useZoomVideoViewer = () => {
  const [isShareScreen, setisShareScreen] = useState<boolean>(false);
  const [teacherZoomId] = useState<string>();
  const [participants] = useState<any[]>([]);
  const [teacherIndex, setTeacherIndex] = useState<number>();

  // useEffect(() => {
  //   const _meetingStatusListener = meetingStatusListener();
  //   const _meetingListener = meetingListener();
  //   getListMeeting();
  //   return () => {
  //     _meetingListener.remove();
  //     _meetingStatusListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    setTeacherIndex(findTeacherIndex());
  }, [participants]);

  useEffect(() => {
    // console.log('cekk participant', participants);
    const teacherIndex = findTeacherIndex();
    // console.log('cek getListMeeting teacher index', teacherIndex);
    // console.log('cekk teacherid ',teacherZoomId);
    if (teacherIndex == -1) {
      setisShareScreen(false);
    }
  }, [teacherIndex]);

  const findTeacherIndex = () => {
    // console.log('findteacherindex parti', participants);
    // console.log('findteacherindex teacherzoom', teacherZoomId);
    return participants.findIndex(item => item == teacherZoomId);
  };

  return {
    isShareScreen,
    teacherIndex,
  };
};
