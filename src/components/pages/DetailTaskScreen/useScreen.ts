/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import Config from 'react-native-config';
const useScreen = (route: any) => {
  const [isCollaps, setIsCollaps] = useState(true);
  const [detail, setDetail] = useState({});
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await api.get(
        `/lms/v1/teacher/task/home/histories/${route?.params?.data?.id}`,
      );

      if (res?.data?.code === 100) {
        const finish = res?.data?.data?.finish;
        const not_yet = res?.data?.data?.not_yet;
        if (finish) {
          const promises = finish?.map(async (o: any) => {
            if (o?.user?.avatar) {
              const imgRes = await api.get(
                `/media/v1/image/${o?.user?.avatar}`,
              );
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.user.avatar_path_url = imgRes?.data?.data?.path_url;
                o.user.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }
        if (not_yet) {
          const promises = not_yet?.map(async (o: any) => {
            if (o?.user?.avatar) {
              const imgRes = await api.get(
                `/media/v1/image/${o?.user?.avatar}`,
              );
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.user.avatar_path_url = imgRes?.data?.data?.path_url;
                o.user.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }
        return setDetail(res?.data?.data);
      }
      return setDetail({});
    } catch (err) {
      return;
    }
  };

  const downloadPDF = async () => {
    try {
      const tokenParse = await JSON.parse(
        (await AsyncStorage.getItem(Keys.token)) || '',
      );
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();

      const fileName = `laporan-ujian_${year}-${month}-${day}_${hour}-${minute}-${second}.pdf`;
      const mime = 'application/pdf';

      ReactNativeBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName,
          title: fileName,
          mime,
        },
      })
        .fetch(
          'GET',
          `${Config.BASEURL}/lms/v1/teacher/task/home/report/download/xxxx`,
          {Authorization: `Bearer ${tokenParse}`},
        )
        .then(async res => {
          await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
            {name: fileName, parentFolder: '', mimeType: mime},
            'Download',
            res.path(),
          )
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Berhasil didownload',
              });
            })
            .catch(_ => {
              Toast.show({
                type: 'error',
                text1: _?.message ?? 'Gagal didownload',
              });
            });
          setPopUp(false);
        })
        .catch(_ => {
          setPopUp(false);
          Toast.show({
            type: 'error',
            text1: _?.message ?? 'Gagal didownload',
          });
        });
    } catch (_) {}
  };

  return {
    isCollaps,
    setIsCollaps,
    detail,
    downloadPDF,
    popUp,
    setPopUp,
  };
};
export {useScreen};
