/* eslint-disable react-hooks/exhaustive-deps */
import {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPresensi,
  fetchTask,
  fetchExam,
  fetchAKM,
  fetchPresensiAbsent,
  fetchPresensiAttend,
} from '@redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const useReport = () => {
  const {getUser, presensi, task, exam, akm, presensiAbsent, presensiAttend} =
    useSelector((state: any) => state);
  const [mapel, setMapel] = useState<any>([]);
  const dispatch = useDispatch() as any;

  const getSubject = async () => {
    try {
      const classId =
        getUser?.data?.rombel_class_school_user?.[0]?.rombel_class_school
          ?.class_id;
      const res = await api.get(URL_PATH.get_list_subject, {
        params: {classId: classId},
      });
      if (res?.data?.code === 100) {
        const promises = res?.data?.data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const resIcon = await api.get(
              `/media/v1/image/${obj?.icon_mobile}`,
            );
            if (resIcon?.status === 200 && resIcon?.data?.code === 100) {
              obj.path_url = resIcon.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        setMapel(res?.data?.data);
        return;
      } else {
        setMapel([]);
      }
    } catch (err) {
      return;
    }
  };

  useLayoutEffect(() => {
    dispatch(fetchPresensi());
    dispatch(fetchTask());
    dispatch(fetchExam());
    dispatch(fetchAKM());
    dispatch(fetchPresensiAbsent());
    dispatch(fetchPresensiAttend());
    getSubject();
  }, []);

  return {
    getUser,
    presensi,
    task,
    exam,
    akm,
    mapel,
    presensiAbsent,
    presensiAttend,
    dispatch,
  };
};
export default useReport;
