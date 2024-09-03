import {getToken} from '@hooks/getToken';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import {Platform} from 'react-native';
import database from '@react-native-firebase/database';
import {fbDatabaseLogPrint} from './utils';
import {appVersion} from '@constants/functional';
import DeviceInfo from 'react-native-device-info';

// DO NOT IMPORT THIS FUNCTION
const sendToFirebaseDatabase = async (
  data: IFirebaseDatabaseLog,
  options: ISendToFirebase,
) => {
  let finalData = {};
  let dbRef = '';
  try {
    const [userToken, systemVersion, brand, deviceModel] = await Promise.all([
      getToken(),
      DeviceInfo.getSystemVersion(),
      DeviceInfo.getBrand(),
      DeviceInfo.getModel(),
    ]);
    const user = jwtDecode<IBaseJWTUser>(userToken, {});
    const createdAt = dayjs().format('YYYY-MM-DD HH:mm');
    const platform = Platform.OS;
    const safeEmail =
      convertSafeEmail(user?.email || '') ||
      convertSafePhone(user?.phone_number || '');
    const appLogId = data.appLogId ?? '';

    dbRef = `${
      options.rootPath
    }/${data.serviceName.toLowerCase()}/${data.feature.toLowerCase()}/${platform}/${
      appLogId ?? createdAt
    } - ${safeEmail}`;

    finalData = {
      ...data,
      userId: user?.id,
      userName: user?.fullname,
      email: user?.email,
      phone: user?.phone_number,
      createdAt: createdAt,
      platform: platform,
      appVersion: appVersion,
      systemVersion,
      brand,
      deviceModel,
    };

    data.callback?.(finalData);

    await database().ref(dbRef).set(finalData);
    __DEV__ &&
      fbDatabaseLogPrint({data, options, finalData, dbRef, result: 'Success'});
  } catch (error) {
    __DEV__ &&
      fbDatabaseLogPrint({
        data,
        options,
        finalData,
        dbRef,
        error,
        result: 'Error',
      });
  }
};

export const sendErrorLog = async (data: IFirebaseErrorLog) => {
  sendToFirebaseDatabase(data, {
    rootPath: 'error',
  });
};
export const sendCriticalErrorLog = async (data: IFirebaseCriticalErrorLog) => {
  sendToFirebaseDatabase(data, {
    rootPath: 'critical',
  });
};

export const sendLog = async (data: IFirebaseSendLog) => {
  sendToFirebaseDatabase(data, {
    rootPath: 'info',
  });
};

const convertSafeEmail = (email: string) =>
  email.replace(/@/g, '(at)').replace(/\./g, '(dot)');

const convertSafePhone = (phone: string) => phone.replace(/\+/g, '');
