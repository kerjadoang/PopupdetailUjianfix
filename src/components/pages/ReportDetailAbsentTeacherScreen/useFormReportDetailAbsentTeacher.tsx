import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import providerMedia from '@services/media/provider';

const useFormReportDetailAbsentTeacher = (id: any) => {
  const [data, setData] = useState<any>();
  const [media, setMedia] = useState<any>();
  const getAllData = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.get(
        `/lms/v1/attendance/absent-history-detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getAllData(id);
  }, [id]);
  useEffect(() => {
    const fetchDataMedia = async () => {
      try {
        const path_url = await providerMedia.getFile(data?.media_id);
        setMedia(path_url?.data?.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchDataMedia();
  }, [data?.media_id]);

  const isImageFile = (pathUrl: any) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const fileExtension = pathUrl
      ?.substring(pathUrl?.lastIndexOf('.'))
      ?.toLowerCase();
    return imageExtensions.includes(fileExtension);
  };
  const isImage = isImageFile(media?.path_url);

  return {data, media, isImage};
};

export default useFormReportDetailAbsentTeacher;
