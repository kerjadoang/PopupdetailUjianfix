import {
  PROMO_REQUEST,
  PROMO_SUCCESS,
  PROMO_FAILED,
  PROMO_DESTROY,
  PROMO_ACTION_TYPES,
} from './type';
import api from '@api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import {apiGetBulkImage} from '@api/wrapping';
import {Storage} from '@constants/storage';
import {convertDate} from '@constants/functional';
import {getToken} from '@hooks/getToken';

const promoRequest = () => {
  return {
    type: PROMO_REQUEST,
  };
};

const promoSuccess = (data: any) => {
  return {
    type: PROMO_SUCCESS,
    payload: data,
  };
};

const promoFailed = (error: any) => {
  return {
    type: PROMO_FAILED,
    payload: error,
  };
};

export const promoDestroy = () => {
  return {
    type: PROMO_DESTROY,
  };
};

export const fetchPromo = (): any => {
  return async (dispatch: Dispatch<PROMO_ACTION_TYPES>): Promise<void> => {
    dispatch(promoRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      const promoData = await Storage.getFromStorage({
        key: 'promoKeys',
      });

      if (promoData?.isExpired === false) {
        dispatch(promoSuccess(promoData.data));
        return;
      }
      // will be replace if login success implements
      const token = await getToken();
      const res = await api.get('/notification/v1/promo/', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
          'Accept-Language': 'en',
        },
      });
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        // const promises = data?.data.map(async (obj: any) => {
        //   if (obj?.id_image) {
        //     const imgRes = await api.get(`/media/v1/image/${obj?.id_image}`);

        //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
        //       obj.path_url = imgRes?.data?.data?.path_url;
        //     }
        //   }
        // });

        // await Promise.all(promises);
        apiGetBulkImage({
          datas: data?.data,
          dottedString: 'id_image',
          newParams: 'path_url',
        });

        Storage.saveToStorage({
          data: res?.data,
          key: 'promoKeys',
          ttl: convertDate().add(3, 'hours'),
          removeWhenExpired: true,
        });

        dispatch(promoSuccess(data));
      } else {
        dispatch(promoFailed(res?.data));
      }
    } catch (err) {
      dispatch(promoFailed(err));
    }
  };
};
