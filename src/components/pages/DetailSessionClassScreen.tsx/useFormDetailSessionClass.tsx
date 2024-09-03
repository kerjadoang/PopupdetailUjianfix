import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {fetchImage} from '@redux';
import providerMedia from '@services/media/provider';

interface RootState {
  image: any;
}

const useFormDetailSessionClass = (id: any) => {
  const [dataDetailSession, setDataDetailSession] = useState<any>([]);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const image = useSelector((state: RootState) => state.image);
  const [avatarStudentJoin, setAvatarStudent] = useState([]);
  const [avatarStudentNotJoin, setAvatarStudentNotJoin] = useState([]);

  const getDetailSession = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      const response = await api.get(`/lms/v1/class-session/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data?.data || {};
        setDataDetailSession(response?.data?.data);

        const joinParticipants = data?.participant?.join || [];
        const notJoinParticipants = data?.participant?.not_join || [];
        const mediaRecordByMediaId = data?.media?.media;

        if (mediaRecordByMediaId) {
          const mediaRecordByRes = await providerMedia.getVideoRecording(
            mediaRecordByMediaId,
          );

          if (mediaRecordByRes?.code === 100) {
            data.media.path_url = mediaRecordByRes?.data?.path_url || false;
            data.media.thumbnail = mediaRecordByRes?.data?.thumbnail || false;
            data.media.status = mediaRecordByRes?.data?.status || '';
          }
        }

        const joinPromises = joinParticipants.map(async obj => {
          if (obj?.user?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj.user.avatar}`);
            if (imgRes.status === 200 && imgRes.data?.code === 100) {
              obj.path_url = imgRes.data?.data?.path_url;
            }
          }
        });

        const notJoinPromises = notJoinParticipants.map(async obj => {
          if (obj?.user?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj.user.avatar}`);
            if (imgRes.status === 200 && imgRes.data?.code === 100) {
              obj.path_url = imgRes.data?.data?.path_url;
            }
          }
        });

        await Promise.all(joinPromises);
        await Promise.all(notJoinPromises);
        setAvatarStudent(joinParticipants);
        setAvatarStudentNotJoin(notJoinParticipants);
      } else {
        // eslint-disable-next-line no-console
        console.log('gagal');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  useEffect(() => {
    getDetailSession(id);
  }, [id]);

  useEffect(() => {
    const fetchSubjectIcon = async () => {
      try {
        await dispatch(fetchImage(dataDetailSession?.subject?.icon_mobile));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchSubjectIcon();
  }, [dataDetailSession?.subject?.icon_mobile, dispatch]);

  useEffect(() => {
    const userCreatedByAvatar = dataDetailSession?.user_created_by?.avatar;
    if (userCreatedByAvatar) {
      const fetchUserAvatar = async () => {
        try {
          const res = await api.get(`/media/v1/image/${userCreatedByAvatar}`);
          setAvatar(res?.data?.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      };

      fetchUserAvatar();
    }
  }, [dataDetailSession?.user_created_by?.avatar]);

  useEffect(() => {
    const userCreatedByAvatar = dataDetailSession?.user?.avatar;
    if (userCreatedByAvatar) {
      const fetchUserAvatarStudent = async () => {
        try {
          const res = await api.get(`/media/v1/image/${userCreatedByAvatar}`);
          setAvatarStudent(res?.data?.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      };

      fetchUserAvatarStudent();
    }
  }, [dataDetailSession?.user?.avatar]);
  return {
    dataDetailSession,
    image,
    avatar,
    avatarStudentJoin,
    avatarStudentNotJoin,
    getDetailSession,
  };
};

export default useFormDetailSessionClass;
