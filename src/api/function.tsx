import {Keys} from '@constants/keys';
import {URL_PATH} from '@constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const kickUser = async () => {
  await AsyncStorage.multiRemove([
    Keys.token,
    Keys.objectToken,
    Keys.deviceUser,
    Keys.dataUser,
    Keys.profession,
    Keys.majors,
  ]);
};

const validateRefreshToken = async (api: any) => {
  try {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const body = {
      access_token: tokenParse,
    };
    const res: any = await api.post(URL_PATH.refresh_token, body);
    if (res?.status === 200) {
      await AsyncStorage.removeItem(Keys.token);
      await AsyncStorage.setItem(
        Keys.token,
        JSON.stringify(res?.data?.data?.access_token),
      );
      return Promise.resolve(res?.data?.data?.access_token);
    } else {
      kickUser();
    }
  } catch (_) {
    kickUser();
  }
};

export {kickUser, validateRefreshToken};
