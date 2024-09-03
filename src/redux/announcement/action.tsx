import {
  ANNOUNCEMENT_REQUEST,
  ANNOUNCEMENT_SUCCESS,
  ANNOUNCEMENT_FAILED,
  ANNOUNCEMENT_DESTROY,
  ANNOUNCEMENT_ACTION_TYPES,
} from './type';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import Config from 'react-native-config';

const announcementRequest = () => {
  return {
    type: ANNOUNCEMENT_REQUEST,
  };
};

const announcementSuccess = (data: any) => {
  return {
    type: ANNOUNCEMENT_SUCCESS,
    payload: data,
  };
};

const announcementFailed = (error: any) => {
  return {
    type: ANNOUNCEMENT_FAILED,
    payload: error,
  };
};

export const announcementDestroy = () => {
  return {
    type: ANNOUNCEMENT_DESTROY,
  };
};

export const fetchAnnouncement = (token: any) => {
  return async (
    dispatch: Dispatch<ANNOUNCEMENT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(announcementRequest());
    try {
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');

      const res = await axios.get(
        `${Config.BASEURL}/lms/v1/announcement/user?offset=0&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token || tokenParse}`,
          },
        },
      );

      if (res?.status === 200) {
        const data = res?.data || [];

        dispatch(announcementSuccess(data));
      } else {
        dispatch(announcementFailed(res?.data));
      }
    } catch (err) {
      dispatch(announcementFailed(err));
    }
  };
};
