/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import api from '@api/index';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Platform} from 'react-native';
import {URL_PATH} from '@constants/url';
const services = (route: any) => {
  const [heightViewLaporanMapel, setHeightViewLaporanMapel] = useState(0);
  const [presensiShow, setPresensiShow] = useState<boolean>(false);
  const [presensiShow2, setPresensiShow2] = useState<boolean>(false);
  const [refForScroll, setRefForScroll] = useState<any>(null);
  const [isShowBtnLaporanMapel, setIsShowBtnLaporanMapel] =
    useState<boolean>(true);
  const [statusDownload, setStatusDownload] = useState<any>([]);
  const [presensi, setPresensi] = useState<any>(null);
  const [absent, setAbsent] = useState<any>(null);
  const [present, setPresent] = useState<any>(null);
  const [exam, setExam] = useState<any>({});
  const [task, setTask] = useState<any>({});
  const [akm, setAkm] = useState<any>({});
  const [subject, setSubject] = useState<any>([]);

  const getSubject = async () => {
    try {
      const res = await api.get(URL_PATH.get_list_subject, {
        params: {classId: route?.params?.data?.id?.class_id},
      });
      if (res?.data?.code === 100) {
        setSubject(res?.data?.data);
        const promises = res.data?.data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const res = await api.get(`/media/v1/image/${obj?.icon_mobile}`);

            if (res.status === 200 && res.data?.code === 100) {
              obj.path_url = res.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        setSubject(res?.data?.data);
        return;
      } else {
        setSubject({});
      }
    } catch (err) {
      return;
    }
  };

  const checkDownload = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const rombel_class_school_id = route?.params?.data?.id?.id;
      const academic_year_id = route?.params?.data?.student?.academic_year_id;
      const academic_phase_id = route?.params?.data?.student?.academic_phase_id;
      const school_id = route?.params?.data?.student?.school_id;
      const res = await api.get(
        `/lms/v1/assessment/erapor/share/cekdownload/${murid_id}/${rombel_class_school_id}/${academic_year_id}/${academic_phase_id}/${school_id}`,
      );
      if (res?.data?.code === 100) {
        return setStatusDownload(res?.data?.data);
      }
      return setStatusDownload([]);
    } catch (err) {
      return;
    }
  };

  const download = async () => {
    try {
      const res = await api.get(
        `lms/v1/assessment/erapor/share/detail/download/${statusDownload?.erapor?.id}`,
      );
      if (res?.status === 200) {
        const downloadDir =
          Platform.OS === 'ios'
            ? RNFS.LibraryDirectoryPath
            : RNFS.ExternalDirectoryPath;

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        const fileName = `laporan-tugas_${year}-${month}-${day}_${hour}-${minute}-${second}.pdf`;
        const filePath = `${downloadDir}/${fileName}`;
        await RNFS.writeFile(filePath, res.data, 'base64');
        Toast.show({
          type: 'success',
          text1: 'e-Rapor berhasil diunduh.',
        });
        return;
      } else {
        return Toast.show({
          type: 'error',
          text1: 'e-Rapor gagal diunduh.',
        });
      }
    } catch (err) {
      return;
    }
  };

  const fetchPresensi = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/presence?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setPresensi(res?.data?.data);
      } else {
        setPresensi({});
      }
    } catch (err) {
      return;
    }
  };

  const fetchKetidakHadiran = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/absence?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setAbsent(res?.data?.data);
      } else {
        setAbsent({});
      }
    } catch (err) {
      return;
    }
  };

  const fetchKehadiran = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/presence-detail?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setPresent(res?.data?.data);
      } else {
        setPresent({});
      }
    } catch (err) {
      return;
    }
  };

  const fetchExam = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/exam?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setExam(res?.data?.data);
      } else {
        setExam({});
      }
    } catch (err) {
      return;
    }
  };

  const fetchTask = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/task?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setTask(res?.data?.data);
      } else {
        setTask({});
      }
    } catch (err) {
      return;
    }
  };

  const fetchAkm = async () => {
    try {
      const murid_id = route?.params?.data?.student?.id;
      const res = await api.get(
        `lms/v1/student-report/akm?studentId=${murid_id}`,
      );
      if (res?.data?.code === 100) {
        setAkm(res?.data?.data);
      } else {
        setAkm({});
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    checkDownload();
    fetchPresensi();
    fetchKetidakHadiran();
    fetchKehadiran();
    fetchExam();
    fetchTask();
    fetchAkm();
    getSubject();
  }, []);

  return {
    heightViewLaporanMapel,
    presensiShow,
    presensiShow2,
    refForScroll,
    isShowBtnLaporanMapel,
    statusDownload,
    presensi,
    absent,
    present,
    task,
    exam,
    akm,
    subject,
    setHeightViewLaporanMapel,
    setPresensiShow,
    setPresensiShow2,
    setRefForScroll,
    setIsShowBtnLaporanMapel,
    download,
  };
};
export {services};
