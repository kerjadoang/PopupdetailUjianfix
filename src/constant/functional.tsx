/* eslint-disable no-bitwise */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {Linking, PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import {IMAGES} from './image';
import dayjs, {Dayjs, duration} from 'dayjs';
import Toast, {ToastShowParams} from 'react-native-toast-message';
import {IDismissLoading, dismissLoadingAction, showLoadingAction} from '@redux';
import {store} from '../../index';
import {actions} from 'react-native-pell-rich-editor';
import {launchImageLibrary} from 'react-native-image-picker';
import {apiGetFile, apiUploadFormData, apiUploadingStatus} from '@api/wrapping';
import {URL_PATH} from './url';
import {ApiDownloadFileResProps, IMediaType} from '@api/types';
import DeviceInfo from 'react-native-device-info';
import queryString from 'query-string';
import jwt from 'jwt-decode';
import {formatCurrency} from 'react-native-format-currency';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

export const kelasPintarWhatsappLink =
  'https://api.whatsapp.com/send/?phone=6281513003999&text=Hi+Kelas+Pintar%21+Saya+butuh+penjelasan+mengenai...&type=phone_number&app_absent=0';
const shortDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];
const months = [
  'Januari',
  'Febuari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Okttober',
  'November',
  'Desember',
];

export const listFileImageExtension = [
  'jpg',
  'JPG',
  'jpeg',
  'JPEG',
  'png',
  'PNG',
  'bmp',
  'BMP',
  'gif',
  'GIF',
];

export const listMoreSymbol = [
  '&#2013266053;',
  '&#2013266053; .',
  '&#2013266053;. ',
  '&#2013266053;.',
];

export const lisFileSvgExtension = ['svg', 'SVG'];

export const size1Kb = 1024 * 1024;
export const limitFileInMb = 200; // max size upload for file
export const limitImageInMb = 20; // max size upload for image
export const maximalLimitFile = size1Kb * limitFileInMb;
export const maximalLimitImage = size1Kb * limitImageInMb;
export const listAllowedFileExtension = [
  'doc',
  'docx',
  'DOC',
  'DOCX',
  'pdf',
  'pdfx',
  'PDF',
  'PDFX',
  'png',
  'PNG',
  'jpeg',
  'JPEG',
  'jpg',
  'JPG',
];
const setMaxLimitInMb = 100;
const maxLimitFile = size1Kb * setMaxLimitInMb;
export const mimeTypes: DynamicObject = {
  // Text
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',

  // Images
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  svg: 'image/svg+xml',

  // Audio
  mp3: 'audio/mp3',
  wav: 'audio/wav',
  ogg: 'audio/ogg',

  // Video
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  webm: 'video/webm',

  // Documents
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  // Archives
  zip: 'application/zip',
  tar: 'application/x-tar',
  gz: 'application/gzip',

  // Executables
  exe: 'application/octet-stream',

  // Fonts
  ttf: 'font/ttf',
  otf: 'font/otf',
  woff: 'font/woff',
  woff2: 'font/woff2',
};
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const fmcToken =
  'eO_2s1AyHLf-PjqqnKxR5p:APA91bH5jRxJv9vGXzLjo0FU9_7M1WhG5ezeK_JG-JsQNQO-oUl-on2_xd4rwo5qqtThlg8Ou_azmShqEx21kAk3wRoO71HZ2PNRm3eao_xgNPX5azahGMqEhGEQiPaVxWo-yIECbtFw';
export const regexOnlyNumber = /[^0-9]/g;
export const regexPhoneNumber = /[+][^0-9]/g;
export const regexFullName = /^(?=.*[^a-zA-Z ]).*$/;
export const regexContainLowerUpperCase = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
export const regexContainNumber = /^(?=.*[0-9]).*$/;
export const regexPrefixPhoneNumber = /^(08|02|62)\d{10,14}$/;
export const regexPhoneStart62 = /^(?=.*(62)\d)(?=.*[0-9]).*$/;
export const regexEmail = /^[\w\-\.]+@([\w-]+\.)+([\w-]{2,})+(:[\w]+)?$/;
export const regexPhoneIndonesia = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
export const regexHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/g;
export const regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
export const dateFormatWithDay = 'ddd';
export const dateFormatWithDate = 'D MMM YYYY';
export const dateFormatWithOnlyTime = 'HH:mm';
export const dateFormatWithDayAndTime = 'ddd, D MMM YYYY • HH:mm';

export const defaultLimitOffset = (
  limit?: number,
  offset?: number,
  page?: number,
) => {
  return removeEmptyProperty({
    limit: limit ?? 10,
    offset,
    page,
  }) as IBasePagination;
};

export const useMergeState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: any) =>
    setState((prevState: any) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
};

export const _handlerGetItem = (params: any) => {
  try {
    return AsyncStorage?.getItem(params);
  } catch (error) {}
};

export const _handlerGetParseItem = async (params: any) => {
  try {
    const data = await AsyncStorage?.getItem(params);
    return JSON.parse(data || '');
  } catch (error) {}
};

export const validateHTMLString = (param?: string): boolean => {
  // check if the regular expression matches the string
  return param ? regexForHTML.test(param) : false;
};

export const _handlerSetItem = async (key: any, value: any, callback?: any) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {}
};

export const _handlerSetStringifyItem = async (
  key: any,
  value: any,
  callback?: any,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value), callback);
  } catch (error) {}
};

export const _handlerRemoveItem = async (params: any) => {
  try {
    await AsyncStorage.removeItem(params);
  } catch (error) {}
};

export const _handlerClearItem = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};

export const EncryptMD5 = (text: string) => {
  try {
    const CryptoJS = require('crypto-js');
    const cipher = CryptoJS.MD5(text);

    return cipher.toString();
  } catch (error) {
    return false;
  }
};

export const _handlerCapitalizeFirstLetter = (text: string) => {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
};

export const capitalizeEachWord = (text: string): string => {
  const words = text?.split(' ');

  if (text?.length > 0) {
    for (let i = 0; i < words.length; i++) {
      words[i] = words?.[i]?.[0]?.toUpperCase() + words?.[i]?.substring?.(1);
    }

    return words.join(' ');
  }
  return '---';
};

export const _handlerSubstringText = (text: string, maxLength = 80) => {
  const result =
    text && text?.length >= maxLength
      ? `${text?.substring(0, maxLength)}...`
      : text;

  return result;
};

export const _handlerGetCurrentDate = () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = days[currentDate.getDay()];
  const month = shortMonths[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const result = `${day}, ${date} ${month} ${year}`;

  return result;
};

export const _handleUserTypeId: CallBackWithParams<
  IHandleUserTypeId,
  number
> = (user_type_id: number) => {
  switch (user_type_id) {
    case 1:
      return {
        id: user_type_id,
        name: 'Murid',
        role: 'MURID',
      };
    case 2:
      return {
        id: user_type_id,
        name: 'Orang tua',
        role: 'ORANG-TUA',
      };
    case 3:
      return {
        id: user_type_id,
        name: 'Mentor',
        role: 'MENTOR',
      };
    case 4:
      return {
        id: user_type_id,
        name: 'Kepala Sekolah',
        role: 'KEPSEK',
      };
    case 5:
      return {
        id: user_type_id,
        name: 'Guru Sekolah',
        role: 'GURU',
      };
    case 6:
      return {
        id: user_type_id,
        name: 'Admin Sekolah',
        role: 'ADMIN',
      };
    case 7:
      return {
        id: user_type_id,
        name: 'Admin Internal',
        role: 'ADMIN-INTERNAL',
      };
    default:
      return {};
  }
};

export const _handlerFormatBytes = (bytes: any, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getDayInMonth = (year: any, month: any, date: any) => {
  const day = dayjs(`${year}-${month}-${date}`).day();
  return day;
};

export const _handlerConvertDatePicker = (
  dateValue: any,
  formatDate: any = 1,
) => {
  const hours =
    `${dateValue?.hour}`.length < 2 ? `0${dateValue?.hour}` : dateValue?.hour;
  const minutes =
    `${dateValue?.minute}`.length < 2
      ? `0${dateValue?.minute}`
      : dateValue?.minute;

  if (dateValue) {
    /* FormatDate */
    // 8.  "date/month/year" >>> "12/07/2022"
    // 9.  "year-month-date" >>> "2022-12-31"
    // 10. "day, date/month/year • hour:minute">>> Sen, 03/06/2023 • 22:10
    // 11. "year-month-date hour:minute:seconds">>> 2023-06-02 22:10:00
    // 12. "day, date month year • hour:minute" >>> "Sen, 19 Jun 2023 • 23:43"
    // 13. "year-month-date hour:minute:seconds" >>> "2023-06-01 15:50:00"

    switch (formatDate) {
      case 1:
        return `${dateValue?.date} ${shortMonths[dateValue?.month - 1]} ${
          dateValue?.year
        }`;
      case 2:
        return `${shortDays[dateValue?.day]}, ${dateValue?.date}/${
          dateValue?.month
        }/${dateValue?.year} • ${hours}:${minutes}`;
      case 3:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${hours}:${minutes}:00`;
      case 4:
        return `${dateValue?.date} ${months[dateValue?.month - 1]} ${
          dateValue?.year
        }`;
      case 5:
        return `${dateValue?.year}-${dateValue?.month - 1}-${dateValue?.date}`;
      case 6:
        return `${dateValue?.date} ${shortMonths[dateValue?.month]} ${
          dateValue?.year
        }`;
      case 7:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)}`;
      case 8:
        return `${_handlerComplete2Digit(
          dateValue?.date,
        )}/${_handlerComplete2Digit(dateValue?.month)}/${dateValue?.year}`;
      case 9:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)}`;
      case 10:
        return `${shortDays[dateValue?.day]}, ${_handlerComplete2Digit(
          dateValue?.date,
        )}/${_handlerComplete2Digit(dateValue?.month + 1)}/${
          dateValue?.year
        } • ${hours}:${minutes}`;
      case 11:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month + 1,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${hours}:${minutes}:00`;
      case 12:
        return `${shortDays[dateValue?.day]}, ${_handlerComplete2Digit(
          dateValue?.date,
        )} ${shortMonths[dateValue?.month - 1]} ${
          dateValue?.year
        } • ${hours}:${minutes}`;
      case 13:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${_handlerComplete2Digit(
          dateValue?.hour,
        )}:${_handlerComplete2Digit(
          dateValue?.minute,
        )}:${_handlerComplete2Digit(dateValue?.seconds || '00')}`;
      case 14:
        return `${shortDays[dateValue?.day]}, ${_handlerComplete2Digit(
          dateValue?.date,
        )}/${_handlerComplete2Digit(dateValue?.month)}/${
          dateValue?.year
        } • ${hours}:${minutes}`;
      case 15:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${hours}:${minutes}:00`;
    }
  }
  return '-';
};

export const _handlerConvertAllDate = (
  dateValue: any, // 2022-02-20T00:00:00.000Z || 20 2 2022 || 20-2-2022 || etc
  formatDate: any = 1, // default
  monthType: any = 2, // default
  dayType: any = 1, // default
) => {
  if (dateValue) {
    const currentTime = new Date(dateValue);
    const day =
      dayType === 1
        ? days[currentTime.getDay()]
        : dayType === 2
        ? shortDays[currentTime.getDay()]
        : _handlerComplete2Digit(currentTime.getDay());
    const date = _handlerComplete2Digit(currentTime.getDate());
    const month =
      monthType === 1
        ? months[currentTime.getMonth()]
        : monthType === 2
        ? shortMonths[currentTime.getMonth()]
        : _handlerComplete2Digit(currentTime.getMonth());
    const year = currentTime.getFullYear();
    const hours = _handlerComplete2Digit(currentTime.getHours());
    const minutes = _handlerComplete2Digit(currentTime.getMinutes());
    const seconds = _handlerComplete2Digit(currentTime.getSeconds());

    /* FormatDate */
    // 1. "date month year" >>> "30 Jan 2022"
    // 2. "day date month year" >>> "Senin 30 Jan 2022"
    // 3. "day, date month year" >>> "Senin, 30 Jan 2022"
    // 4. "date month year hours:minutes" >>> "30 Jan 2022 17:17"
    // 5. "month year" >>> "Jan 2022"
    // 6. "{date month year}" >>> "{date: 31, month: 4, year: 2022}"
    // 7. "day, date/month/year • hour:minute" >>> "Sel, 12/07/2022 • 09:30"
    // 8. "hour:minute" >>> "09:30"
    // 9. "day, date month year hours:minutes" >>> "Kamis, 30 Jan 2022 17:17"
    // 10. "date month year hours:minutes" >>> "30 Jan 2022 • 17:17"
    // 11. "day, date/month/year" >>> "Sel, 12/07/2022"
    // 12. "date-month-year hour:minute:second" >>> "31-07-2022 08:05:10"
    // 13. "date-month-year" >>> "12-07-2022"

    /* MonthType */
    // 1. monthType >>> Desember
    // 2. monthType >>> Dec
    // 3. monthType >>> 12

    /* DayType */
    // 1. dayType >>> Rabu
    // 2. dayType >>> Rab
    // 3. dayType >>> 4

    switch (formatDate) {
      case 1:
        return `${date} ${month} ${year}`;
      case 2:
        return `${day} ${date} ${month} ${year}`;
      case 3:
        return `${day}, ${date} ${month} ${year}`;
      case 4:
        return `${date} ${month} ${year} ${hours}:${minutes}`;
      case 5:
        return `${month} ${year}`;
      case 6:
        return {
          date: date,
          month: month,
          year: year,
        };
      case 7:
        return `${day}, ${date}/${month}/${year} • ${hours}:${minutes}`;
      case 8:
        return `${hours}:${minutes}`;
      case 9:
        return `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;
      case 10:
        return `${date} ${month} ${year} • ${hours}:${minutes}`;
      case 11:
        return `${day}, ${date}/${month}/${year}`;
      case 12:
        return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      case 13:
        return `${date}-${month}-${year}`;
      case 14:
        return `${day}, ${date} ${month} ${year} • ${hours}:${minutes}`;
    }
  }
  return '-';
};

export const _handlerComplete2Digit = (text: any) => {
  const txt = `${text}`;
  return txt?.length === 1 ? `0${txt}` : txt;
};

export const GenerateUUID = () => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );

  return uuid;
};

export const _handlerRoleName = (user_type_id: number) => {
  /*
    USER_TYPE_ID
    1. Murid >> B2C B2B
    2. Orang Tua >> Ngikut anak
    3. Mentor
    4. Kepsek >> B2B B2G
    5. Guru >> B2B
    6. Admin >> B2B
  */

  if (user_type_id) {
    switch (user_type_id) {
      case 1:
        return 'Murid';
      case 2:
        return 'Orang Tua';
      case 3:
        return 'Mentor';
      case 4:
        return 'Kepala Sekolah';
      case 5:
        return 'Guru';
      case 6:
        return 'Admin';
    }
  }

  return false;
};

export const convertToRupiah = (number: any) => {
  let reverse, thousand;
  if (typeof number === 'number') {
    reverse = number?.toString().split('').reverse().join('');
    thousand = reverse?.match(/\d{1,3}/g);
    thousand = thousand?.join('.').split('').reverse().join('');
  } else if (typeof number === 'string') {
    reverse = number?.split('').reverse().join('');
    thousand = reverse?.match(/\d{1,3}/g);
    thousand = thousand?.join('.').split('').reverse().join('');
  }

  return thousand;
};

export const _handlerConvertTimeTrackerPlayer = (seconds: number | string) => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '00:';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

export const convertDateTime = (x: string) => {
  const startDayjs = convertDate(x);
  const formattedStart = startDayjs.format('DD MMM YYYY • HH:mm');
  return formattedStart;
};

export const convertPhoneNumber = (phoneNumber: string): string => {
  let newPhoneNumber = phoneNumber.replace(/-/g, '').replace(' ', '');

  const prefix08 = ['08'];
  const prefix62 = ['628'];
  if (prefix08.includes(newPhoneNumber.slice(0, 2))) {
    newPhoneNumber = '+628' + newPhoneNumber.slice(2, newPhoneNumber.length);
  } else if (prefix62.includes(newPhoneNumber.slice(0, 3))) {
    newPhoneNumber = '+628' + newPhoneNumber.slice(3, newPhoneNumber.length);
  }

  return newPhoneNumber;
};

export const convertBetweenDateTime = (dateRange: string) => {
  const [startStr, endStr] = dateRange.split(' - ');

  const startTime = convertDate(startStr).format('HH:mm');
  const endTime = convertDate(endStr).format('HH:mm');
  const start = convertDate(startStr).format('DD-MM-YYYY');
  const currentDate = convertDate().format('DD-MM-YYYY');

  let dateRangeX;

  if (currentDate === start) {
    dateRangeX = 'Hari ini';
  } else {
    dateRangeX = convertDate(startStr).locale('id').format('ddd, DD MMM');
  }
  const formattedDateRange = `${dateRangeX} • ${startTime} - ${endTime}`;
  return formattedDateRange;
};

export const iosCameraPermission = async (): Promise<boolean> => {
  const permissionType = PERMISSIONS.IOS.CAMERA;
  try {
    const result = await check(permissionType);
    let bool = false;

    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('kamera');
            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable('kamera');
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('kamera');
        break;
      case RESULTS.UNAVAILABLE:
        alertFeatureNotAvailable('kamera');
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

const alertRedirectToSettings = (
  context?: 'kamera' | 'galeri' | string,
  showAlert = false,
) => {
  if (!showAlert) {
    return;
  }
  Alert.alert(
    'Info⚠️',
    `Mohon untuk memberikan izin untuk mengakses ${
      context ?? 'galeri'
    } terlebih dahulu`,
    [
      {
        onPress: () =>
          // eslint-disable-next-line no-console
          openSettings().catch(e => console.log('error when open settings', e)),
        text: 'Buka Pengaturan',
      },
    ],
    {
      cancelable: true,
    },
  );
  // showErrorToast(`Anda menolak perizinan untuk akses ${context}`);
};

const alertFeatureNotAvailable = (context?: 'kamera' | 'galeri' | string) => {
  Alert.alert(
    'Info⚠️',
    `Fitur ${context ?? 'galeri'} tidak tersedia pada perangkat ini`,
    [
      {
        onPress: () => {},
        text: 'Mengerti',
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {},
    },
  );
};

export const androidAskWriteExternalStorage = async (): Promise<boolean> => {
  const permissionType = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  try {
    const result = await check(permissionType);
    let bool = false;
    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('foto dan media');

            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('akses foto dan media');
        break;
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const iosPhotoGalleryPermission = async (
  showAlert?: boolean,
): Promise<boolean> => {
  const permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY;
  try {
    const result = await check(permissionType);

    let bool = false;

    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('galeri', showAlert);
            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('galeri', showAlert);
        break;
      case RESULTS.UNAVAILABLE:
        alertFeatureNotAvailable();
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const recordAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      let bool = false;
      const grants = await PermissionsAndroid.requestMultiple([
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        // grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        // grants['android.permission.READ_EXTERNAL_STORAGE'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        return (bool = true);
      } else {
        // console.log('All required permissions not granted');
        Alert.alert(
          'Info⚠️',
          'Mohon untuk memberikan izin untuk mengakses rekam suara terlebih dahulu',
          [
            {
              onPress: () => openSettings().catch(),
              text: 'Buka Pengaturan',
            },
          ],
          {
            cancelable: true,
          },
        );
        return bool;
      }
    } catch (err) {
      return false;
    }
  } else if (Platform.OS === 'ios') {
    try {
      const permissionType = PERMISSIONS.IOS.MICROPHONE;
      const result = await check(permissionType);

      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings('mikrofon');
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable();
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings('mikrofon');
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const askGetContactPermission = async (): Promise<boolean> => {
  const permissionType =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CONTACTS
      : PERMISSIONS.ANDROID.READ_CONTACTS;
  try {
    const result = await check(permissionType);
    let bool = false;
    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('kontak');
            break;
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('kontak');
        break;
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const _handlerCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      let bool = false;
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
        return (bool = true);
      } else {
        Alert.alert(
          'Info⚠️',
          'Mohon untuk memberikan izin untuk mengakses camera terlebih dahulu',
          [
            {
              onPress: () =>
                openSettings().catch(e =>
                  // eslint-disable-next-line no-console
                  console.log('error when open settings', e),
                ),
              text: 'Buka Pengaturan',
            },
          ],
          {
            cancelable: true,
          },
        );
        return bool;
      }
    } catch (err) {
      return false;
    }
  } else {
    const permissionType = PERMISSIONS.IOS.CAMERA;
    try {
      const result = await check(permissionType);
      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings('kamera');
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable('kamera');
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings('kamera');
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable('kamera');
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const _handlerGalleryPermission = async (showAlert?: boolean) => {
  if (Platform?.OS === 'android') {
    return true;
  } else {
    const permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY;

    try {
      const result = await check(permissionType);

      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings('galeri', showAlert);
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable();
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings('galeri', showAlert);
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const checkPushNotifPermission = async () => {
  try {
    let newStatus;
    const value = await checkNotifications();
    switch (value.status) {
      case 'granted':
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'denied':
        newStatus = await requestNotificationPermission();
        break;
      case 'unavailable':
        break;

      default:
        break;
    }
    return Promise.resolve(
      value.status === 'denied' ? newStatus : value.status,
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

export const requestNotificationPermission = async () => {
  try {
    const val = await requestNotifications(['alert', 'sound', 'badge']);
    switch (val.status) {
      case 'granted':
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'denied':
        break;
      case 'unavailable':
        break;

      default:
        break;
    }
    return Promise.resolve(val.status);
  } catch (e) {
    return Promise.reject(e);
  }
};

const formatImage = [
  '.jpg',
  '.jpeg',
  '.png',
  '.bmp',
  '.gif',
  '.JPG',
  '.JPEG',
  '.PNG',
  '.BMP',
  '.GIF',
  '.heic',
  '.heif',
];

export const whitelistImageUrl = ['googleusercontent.com'];

export const hostEndsWith = (
  host: string,
  ends = formatImage,
  customContain?: string[],
) => {
  let value = false;
  value = ends.some(element => {
    return host.endsWith(element);
  });

  if (customContain && !value) {
    value = customContain.some(element => isStringContains(host, element));
  }

  return value ? {uri: host} : IMAGES.imgPlaceHolder;
};

export const isImageFile = (host?: string, ends = formatImage): boolean => {
  let value = false;
  if (host) {
    value = ends.some(element => {
      return host.toLowerCase().endsWith(element.toLowerCase());
    });
  }
  return value;
};

export const renderStripe = (str?: string) => {
  return str ?? '---';
};

export const formatDate = (start: any, end: any, formatDateArg: number = 1) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const formattedDate = startDate.locale('id').format('dddd, DD MMMM YYYY');
  const formattedStartTime = startDate.format('HH:mm');
  const formattedEndTime = endDate.format('HH:mm');

  const day = shortDays[startDate.get('day')];
  const date = startDate.get('date');
  const month = startDate.get('month');
  const year = startDate.get('year');

  switch (formatDateArg) {
    case 1:
      return `${formattedDate} • ${formattedStartTime} - ${formattedEndTime}`;
    case 2:
      return `${day}, ${date}/${month}/${year} ${formattedStartTime} - ${formattedEndTime}`;
    case 3:
      return `${day}, ${date}/${
        month + 2
      }/${year} ${formattedStartTime} - ${formattedEndTime}`;
  }
};

export const formatDateProductComment = (
  date: any,
  format: string = 'DD-MM-YYYY',
) => {
  const diffHour = convertDate().diff(date, 'hour');
  if (!date) {
    return '-';
  }

  if (diffHour < 24) {
    return `Hari ini, ${convertDate(date).format('HH:mm')}`;
  } else if (diffHour < 48) {
    return `Kemarin, ${convertDate(date).format('HH:mm')}`;
  } else {
    return convertDate(date).locale('id').format(format);
  }
};

export const formatDateLMSUjian = (startTime: any, endTime: any) => {
  const diffHour = convertDate().diff(startTime, 'hour');
  if (!startTime) {
    return '-';
  }

  if (diffHour < 24) {
    return `Hari ini • ${convertDate(startTime)
      .utc()
      .locale('id')
      .format('HH:mm')} - ${convertDate(endTime)
      .utc()
      .locale('id')
      .format('HH:mm')}`;
  } else if (diffHour < 48) {
    return `Besok ${convertDate(startTime)
      .utc()
      .locale('id')
      .format('• HH:mm -')} ${convertDate(endTime)
      .utc()
      .locale('id')
      .format('HH:mm')}`;
  } else {
    return `${convertDate(startTime)
      .utc()
      .locale('id')
      .format('ddd, D MMM YYYY • HH:mm -')} ${convertDate(endTime)
      .utc()
      .locale('id')
      .format('HH:mm')}`;
  }
};

export const formatDurationLMSUjian = (_startTime: any, _endTime: any) => {
  const startTime = dayjs(_startTime);
  const endTime = dayjs(_endTime);
  const _duration = duration(endTime.diff(startTime));

  return _duration.asDays();
};

export const formatScheduleDate = (startDate: any, endDate: any): string => {
  const diffHour = convertDate().diff(startDate, 'hour');
  let convertedStartDate = convertDate(startDate).format('HH:mm');
  let convertedEndDate = convertDate(endDate).format('HH:mm');
  let formattedStartDate = convertDate(startDate).format(
    'ddd, D MMM YYYY • HH:mm',
  );

  let formattedEndDate = convertDate(endDate).format('ddd, D MMM YYYY • HH:mm');

  if (diffHour > 0 && diffHour < 24) {
    return `Hari ini • ${convertedStartDate} - ${convertedEndDate}`;
  }

  if (convertDate(startDate).isSame(endDate, 'day')) {
    return `${convertDate(startDate)
      .locale('id')
      .format(
        'ddd, D MMM YYYY',
      )} • ${convertedStartDate} - ${convertedEndDate}`;
  } else {
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
};

export const formatScheduleDateUTC = (startDate: any, endDate: any): string => {
  const diffHour = convertDate().diff(convertDate(startDate), 'hour');
  if (diffHour > 0 && diffHour < 24) {
    return `Hari ini • ${dayjs
      .tz(startDate, 'Asia/Jakarta')
      .format('HH:mm')} - ${convertDate(endDate).format('HH:mm')}`;
  }
  return `${convertDate(startDate)
    .locale('id')
    .format('ddd, D MMM YYYY')} • ${convertDate(startDate)
    .utc()
    .format('HH:mm')} - ${convertDate(endDate).utc().format('HH:mm')}`;
};

export const formatExamSchedule = (startDate: any, endDate: any): string => {
  const diffHour = convertDate().diff(startDate, 'hour');
  if (diffHour > 0 && diffHour < 24) {
    return `Hari ini • ${convertDate(startDate).format(
      'HH:mm',
    )} - ${convertDate(endDate).format('HH:mm')}`;
  }
  return `${convertDate(startDate).locale('id').format('dddd')} • ${convertDate(
    startDate,
  ).format('HH:mm')} - ${convertDate(endDate).format('HH:mm')}`;
};

export const makePrefixUppercaseRestLowercase = (value: string) =>
  value
    .split(' ')
    .map((word, id) =>
      id === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase(),
    )
    .join(' ');

export const requestMicrophonePermission = async () => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.RECORD_AUDIO
      : PERMISSIONS.IOS.MICROPHONE;

  try {
    let status = await check(permission);
    let statusRequest = status;
    switch (status) {
      case 'granted':
        break;
      case 'denied':
        statusRequest = await request(permission);
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'unavailable':
        break;
      default:
        break;
    }
    return Promise.resolve(status === 'granted' ? status : statusRequest);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const showErrorToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    ...params,
    type: 'error',
    text1: message || 'Terjadi Kesalahan',
  });
};

export const showSuccessToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    ...params,
    type: 'success',
    text1: message,
  });
};

export const showWarningToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    ...params,
    type: 'warning',
    text1: message || 'Terjadi Kesalahan',
  });
};

export const generateDateDefault = () => {
  const currentDate: dayjs.Dayjs = dayjs();

  // set startDate dan endDate berdasarkan tanggal sekarang
  const startDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(1, 'month');

  // buat array tanggal
  const dateArray: string[] = [];
  let dateCursor: dayjs.Dayjs = startDate;

  while (dateCursor <= endDate) {
    // dateArray.push(dateCursor.format('dd, D MMM'));
    dateArray.push(dateCursor.format('YYYY-MM-DD'));
    dateCursor = dateCursor.add(1, 'day');
  }
  return dateArray;
};

export const isStringContains = (
  data: string,
  compareData?: string,
  listCompareData?: string[],
  lowerCase: boolean = true,
): boolean => {
  //default comparison
  if (!listCompareData) {
    if (!lowerCase) {
      return data?.includes?.(compareData || '');
    }
    return data
      ?.toLocaleLowerCase?.()
      .includes?.((compareData || '')?.toLocaleLowerCase?.());
  }

  //compare with listCompareData
  if (!lowerCase) {
    return (
      listCompareData?.findIndex(item => isStringContains(data, item)) !== -1
    );
  }

  const lowCaseListCompareData = listCompareData?.map(item =>
    item?.toLowerCase?.(),
  );

  return (
    lowCaseListCompareData?.findIndex?.(item =>
      isStringContains(data, item),
    ) !== -1
  );
};

export const kebabCase = (string: any) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const cloneArray = (data: any[]) => {
  return data.map(a => ({...a}));
};

export const deepClone = (val: any) => {
  const tempData = JSON.stringify(val || '');
  return JSON.parse(tempData || '');
};

export const rdxDispatch: any = (action: {type: any; payload?: any}) => {
  return store.dispatch(action);
};

export const showLoading = () => {
  rdxDispatch(showLoadingAction());
};

export const dismissLoading = (data?: IDismissLoading) => {
  rdxDispatch(dismissLoadingAction(data));
};

export const richEditorAction: (addActions?: actions[]) => actions[] = (
  addActions?: actions[],
) => {
  return [
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,
    actions.alignCenter,
    actions.alignFull,
    actions.alignLeft,
    actions.alignRight,
    actions.blockquote,
    actions.fontSize,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertImage,
    ...(addActions || []),
  ];
};

export const parseImagePath = (path: string) => {
  if (!isPlatformIOS) {
    return path;
  }
  const incBackslash = path.includes('file:///');
  if (incBackslash) {
    return path.replace('file:/', '');
  }
  return path.replace('file://', '');
};

const uploadImage: (
  props: UploadImageProps,
) => Promise<IMediaType | undefined> = async (props: UploadImageProps) => {
  try {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
    });

    if (result?.assets?.[0]?.fileSize > 104857600) {
      showErrorToast('File tidak bisa melebihi 100MB');
      return;
    }

    if (result?.didCancel) {
      return;
    }

    const formData = new FormData();

    formData.append('attachment', {
      name: result?.assets?.[0]?.fileName,
      type: result?.assets?.[0]?.type,
      uri: parseImagePath(result?.assets?.[0]?.uri),
    });

    formData.append('type', props.type);

    if (props.sub_type) {
      formData.append('sub_type', props.sub_type);
    }
    showLoading();
    const resData = await apiUploadFormData({
      url: URL_PATH.upload_image,
      body: formData,
    });

    const resStatus = await apiUploadingStatus({
      fileId: resData?.ID || resData?.id,
      mediaType: 'image',
      retry: 3,
    });
    dismissLoading();
    resStatus.local_path_url = parseImagePath(result?.assets?.[0]?.uri);
    resStatus.local_name = result?.assets?.[0]?.fileName;
    resStatus.local_type = getExtensionFromFile(result?.assets?.[0]?.fileName);
    return resStatus;
  } catch (error: any) {
    showErrorToast(error || 'Terjadi Kesalahan');
    return;
  }
};

export const handlerOpenGallery = async (props: UploadImageProps) => {
  if (Platform.OS === 'android') {
    return await uploadImage(props);
  }

  return (await uploadImage(props)) as IMediaType;
};

export const isHTML = (data: any) => {
  return regexHTML.test(data);
};

export const _handlerCoachmark = (
  skip: boolean,
  index: number,
  Coachmark: any[],
  callback?: any,
) => {
  let indexCoachmark = 0;
  skip ? (indexCoachmark = Coachmark?.length - 1) : (indexCoachmark = index);
  setTimeout(() => {
    Coachmark[indexCoachmark]?.show();
  }, 300);

  //finish coachmark -> hit put coachmark api
  if (indexCoachmark === Coachmark?.length) {
    callback && callback();
  }
};

export const isPlatformIOS: boolean = Platform.OS === 'ios';

export const handlerImageFileValidation: (
  result: any,
) => ImageFileValidationProps = (result: any) => {
  const fileName = result?.assets[0]?.fileName;
  const fileSize = result?.assets[0]?.fileSize;
  const extensionFile = fileName.split('.')?.pop();
  const isFileHigherThanMaxLimit = fileSize > maximalLimitImage;
  const isFileFormatNotValid = !listFileImageExtension.includes(extensionFile);

  if (isFileFormatNotValid) {
    return 'Format Not Valid';
  }

  if (isFileHigherThanMaxLimit) {
    return 'Higher Than Max Limit';
  }

  return 'Lower Than Max Limit';
};

export const handlerFileValidation: (
  props: IHandlerFileValidation,
) => FileValidationProps = ({resultFile, listFileExtension, maxLimitInMb}) => {
  const fileName = resultFile?.[0]?.name;
  const fileSize = resultFile?.[0]?.size;
  const extensionFile = fileName.split('.')?.pop();
  const isFileHigherThanMaxLimit =
    fileSize > (maxLimitInMb ? maxLimitInMb * size1Kb : maxLimitFile);
  const isFileFormatNotValid = !isStringContains(
    extensionFile,
    undefined,
    listFileExtension || listAllowedFileExtension,
  );

  if (isFileFormatNotValid) {
    return 'Format Not Valid';
  }

  if (isFileHigherThanMaxLimit) {
    return 'Higher Than Max Limit';
  }

  return 'Lower Than Max Limit';
};

export const getExtensionFromFile = (fileName: string) => {
  return isStringContains(fileName, '.') ? fileName.split('.')?.pop() : '';
};

export const isFileFormatMustMP4 = (fileName?: string) => {
  const listMp4Extension = ['mp4', 'MP4', 'mP4', 'Mp4'];
  const extensionFile = fileName?.split('.')?.pop() ?? '';
  const isFileFormatNotValid = !listMp4Extension?.includes(extensionFile);

  return isFileFormatNotValid;
};

export const _htmlWithHTTPS = (url: string) => {
  const tempUrl = url?.replace('http://', 'https://');

  return tempUrl;
};

export const htmlObjectTagWrapping = (url: string, cssStyle?: string) => {
  return `
    <div style="${
      cssStyle || 'display: flex; justify-content: center; height: 980px;'
    }" >
      <object data="${url}" width="100%"/>
    </div>
  `;
};

// Escape special characters in patterns
const generateEscapedPatterns = (patterns: string[]) => {
  return patterns?.map(pattern =>
    pattern?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
};

// Escape special characters in keywords
const generateEscapedKeywords = (keywords: string[]) => {
  return keywords?.map(keyword =>
    keyword?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
};

export const generateRegexForSpecificWords: (
  specificWords: string[],
) => string = (specificWords: string[]) => {
  const escapedKeywords = generateEscapedKeywords(specificWords);
  // Generate a pattern that matches any of the keywords as whole words
  return '\\b(' + escapedKeywords.join('|') + ')\\b';
};

export const generateRegexForSpecificSymbol: (
  specificSymbol: string[],
) => string = (specificSymbol: string[]) => {
  const escapedPatterns = generateEscapedPatterns(specificSymbol);
  // Generate a pattern that matches any of the keywords as whole words
  return '(' + escapedPatterns.join('|') + ')';
};

export const generateRegexForReplaceSpecificTag = (data: string) => {
  return `(<${data})(.*?)(>)`;
};

export const regexForExtractContentInTagHtml = (tag: string) => {
  return RegExp(`(<${tag})(.*?)(>)`, 'g');
};

export const parseHtml = (
  plainHtml: string,
  parentStyleInCss?: string,
  customReplace?: StringReplaceType[],
) => {
  const html = `<div style='${parentStyleInCss || ''};parsehtml:detect;'>${
    plainHtml || ''
  }</div>`;
  let parsedHtml = html?.replace('max-width: 100%;', 'width:auto;');
  parsedHtml = _htmlWithHTTPS(parsedHtml);
  const regexSpecificTag = RegExp(
    generateRegexForReplaceSpecificTag('img src="embedded:'),
  );
  parsedHtml = parsedHtml.replace(regexSpecificTag, '');
  parsedHtml = parsedHtml.replace("<span data-converted='true'></span>", '');
  parsedHtml = parsedHtml.replace(/\u00A0/g, ' ');
  const regexMore = RegExp(generateRegexForSpecificSymbol(listMoreSymbol), 'g');
  parsedHtml = parsedHtml?.replace(regexMore, '...');
  parsedHtml = parsedHtml?.replace('� .', '...');
  const spanBlackRegex = regexForExtractContentInTagHtml(
    "span style='color:#000000;'",
  );
  const spanAutoRegex = regexForExtractContentInTagHtml(
    "span style='color:#auto;'",
  );
  if (parsedHtml.match(spanBlackRegex)) {
    parsedHtml = parsedHtml.replace(spanBlackRegex, '');
  }

  if (parsedHtml.match(spanAutoRegex)) {
    parsedHtml = parsedHtml.replace(spanAutoRegex, '');
  }

  if (customReplace) {
    customReplace?.forEach((item: StringReplaceType) => {
      parsedHtml = parsedHtml?.replace(item.searchValue, item.replaceValue);
    });
  }
  // return beautifyHTML({html: parsedHtml});
  return parsedHtml;
};

export const redirectToBrowser = (
  url: string,
  notSupportedMessage?: string,
) => {
  return Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }

      if (!notSupportedMessage) {
        return;
      }

      showErrorToast(notSupportedMessage!);

      return;
    })
    .catch(() => {
      // return console.log('Error:', error);
    });
};

export function remainingDuration(
  props: RemainingDurationProps,
): RemainingDuration {
  const remainDuration: IRemainDuration = props.remainDuration;
  let timeInSeconds = Number(remainDuration.seconds) || 0;

  if (remainDuration.day) {
    timeInSeconds = Number(remainDuration.day) * (24 * 3600);
  }

  if (remainDuration.hours) {
    timeInSeconds = Number(remainDuration.hours) * 3600;
  }

  if (remainDuration.minutes) {
    timeInSeconds = Number(remainDuration.minutes) * 60;
  }

  if (remainDuration.milliseconds) {
    timeInSeconds = Number(remainDuration.milliseconds) / 1000;
  }

  // calculate days
  let daysInNumber = Math.floor(timeInSeconds / (24 * 3600));
  timeInSeconds -= daysInNumber * 24 * 3600;

  // calculate hours
  let hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds -= hours * 3600;

  // calculate minutes
  let minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds -= minutes * 60;

  let milliseconds = Math.floor(timeInSeconds * 100);

  // parse digit
  const dayLeft =
    daysInNumber <= 9 ? '0' + daysInNumber.toString() : daysInNumber.toString();
  const hourLeft = hours <= 9 ? '0' + hours.toString() : hours.toString();
  const minuteLeft =
    minutes <= 9 ? '0' + minutes.toString() : minutes.toString();
  const secondsLeft =
    timeInSeconds <= 9
      ? '0' + timeInSeconds.toString()
      : timeInSeconds.toString();
  const millisecondsLeft =
    milliseconds <= 9 ? '0' + milliseconds.toString() : milliseconds.toString();

  let result = `${dayLeft}:${hourLeft}:${minuteLeft}:${secondsLeft}`;

  if (dayLeft === '00') {
    result = `${hourLeft}:${minuteLeft}:${secondsLeft}`;
  }

  if (hourLeft === '00') {
    result = `${minuteLeft}:${secondsLeft}`;
  }

  let parsedRemainDuration: IRemainDuration = {
    day: dayLeft,
    hours: hourLeft,
    minutes: minuteLeft,
    seconds: secondsLeft,
    milliseconds: millisecondsLeft,
  };

  if (isStringContains(JSON.stringify(remainDuration), '-1')) {
    result = '00:00:00:00';
    parsedRemainDuration = {
      day: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '00',
    };
  }

  return {
    remainDuration: result,
    parsedRemainDuration: parsedRemainDuration,
  };
}

//Returns true for 1, '1', true, 'true' (case-insensitive) . Otherwise false
export const primitiveToBoolean = (
  value: string | number | boolean | null | undefined,
): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || !!+value; // here we parse to number first
  }

  return !!value;
};

export const isText = (data: unknown): data is string => {
  return typeof data === 'string';
};

export const appVersion = DeviceInfo.getVersion();

export function objForEach<T>(
  obj: T,
  f: (k: keyof T, v: T[keyof T]) => void,
): void {
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k]);
    }
  }
}

// helper function to deep compare 2 objects
export const isDeepEqual = (object1: any, object2: any) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) {
    return false;
  }

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

export const isObject = (object: any) => {
  return object != null && typeof object === 'object';
};

export const convertDate = (
  date?: dayjs.ConfigType,
  props?: ConvertDateProps,
) => {
  const {toUTC = true} = props ?? {};
  let currDate = dayjs(date).utc().locale('id');

  if (!isStringContains(date?.toString() || '', 'Z') || props?.useLocalTime) {
    currDate = dayjs(date).utc(true).locale('id');
  }

  if (isStringContains(date?.toString() || '', 'gmt')) {
    currDate = dayjs(date).locale('id');
  }

  if (!toUTC) {
    currDate = dayjs(date).locale('id');
  }

  return currDate;
};

export const renderCheckTodayDate = (
  date: string,
  todayFormatDate: string,
  formatDateArg: string,
) => {
  return convertDate(date).isToday()
    ? `Hari Ini, ${convertDate(date).format(`${todayFormatDate}`)}`
    : convertDate(date).isYesterday()
    ? `Kemarin, ${convertDate(date).format(`${todayFormatDate}`)}`
    : convertDate(date).format(`${formatDateArg}`);
};

export const gaussianRandom: () => number = () => {
  let u = 0;
  let v = 0;

  while (u === 0) {
    u = Math.random();
  } //Converting [0,1) to (0,1)
  while (v === 0) {
    v = Math.random();
  }

  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = gaussianRandom();
  } // resample between 0 and 1
  return num;
};

export const camelCaseToSnakeCase = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

export const convertCamelToSnakeInQueryString = (queryStringArg: string) => {
  const params = new URLSearchParams(queryStringArg);
  const convertedParams = new URLSearchParams();

  for (const [key, value] of params.entries()) {
    const snakeCaseKey = camelCaseToSnakeCase(key);
    convertedParams.append(snakeCaseKey, value);
  }

  return convertedParams.toString();
};

export const convertToQueryString = (
  params: Record<string, any>,
  options?: ConvertToQueryStringProps,
) => {
  const resQueryString = queryString.stringify(params, options?.queryStringOpt);

  if (options?.toSnakeCase) {
    return convertCamelToSnakeInQueryString(resQueryString);
  }

  return resQueryString;
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const checkDate = (
  start: string | Dayjs,
  end: string | Dayjs,
  options: CheckDate,
) => {
  const checkDateDefaultParam: Partial<CheckDate> = {
    useIsSameDate: true,
  };
  options = {...checkDateDefaultParam, ...options};
  const isDateSame = convertDate(start).isSame(convertDate(end));

  if (isDateSame && options.useIsSameDate) {
    return isDateSame;
  }

  if (options.type === 'before') {
    return convertDate(start).isBefore(convertDate(end));
  }

  return convertDate(start).isAfter(convertDate(end));
};

export const jwtDecode = <T,>(data: string) => {
  return jwt<T>(data);
};

export const currencyFormat = (value: number) => {
  return formatCurrency({
    amount: value ?? 0,
    code: 'IDR',
  })[0];
};

export const downloadFile: CallBackWithParams<
  Promise<ApiDownloadFileResProps | undefined>,
  IDownloadDataOption
> = async ({
  fileExt,
  full_path,
  fileNameWithExt,
  mediaType,
  mime,
  appendCurrentDateInFileName,
  successToastMessage,
  errorToastMessage,
  ...props
}) => {
  try {
    showLoading();
    const fullDate = dayjs().format('YYYYMMDDHHmm');
    const date = `${appendCurrentDateInFileName ? `${fullDate}_` : ''}`;
    const fileName = `${date}${fileNameWithExt}`;
    const resData = await apiGetFile({
      fileNameWithExt: fileName,
      url: full_path,
      appendExt: fileExt,
      mediaType: mediaType,
      mime: mime,
      ...props,
    });

    showSuccessToast(successToastMessage || 'File berhasil diunduh');
    return Promise.resolve(resData);
  } catch (error) {
    const errMessage = errorToastMessage
      ? errorToastMessage
      : isText(error)
      ? error
      : 'Gagal mengunduh file';
    showErrorToast(errMessage);
  } finally {
    dismissLoading();
  }
};

const uploadFile = async ({
  showLoadingIndicator = true,
  ...props
}: IUploadFile) => {
  try {
    showLoadingIndicator && showLoading();
    const formData = new FormData();
    formData.append('attachment', {
      name: props.fileName,
      type: props.fileType,
      uri:
        Platform.OS === 'android'
          ? props.uri
          : props.uri?.replace('file://', ''),
    });
    formData.append('type', props.type);

    if (props.sub_type) {
      formData.append('sub_type', props.sub_type);
    }
    const resData = await apiUploadFormData<IMediaType>({
      url: URL_PATH.upload_file,
      body: formData,
      uploadProgress: props.uploadProgress,
    });
    resData.local_path_url = props.uri;
    resData.local_name = props.fileName;
    resData.local_type = getExtensionFromFile(props.fileName);
    resData.content_extention = getExtensionFromFile(props.fileName);
    return resData;
  } catch (error) {
  } finally {
    showLoadingIndicator && dismissLoading();
  }
};

export const handlerOpenFile = async (props: IHandlerOpenFile) => {
  try {
    const response: DocumentPickerResponse[] = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
    });
    props?.localFileName?.(response?.[0]?.name || '');

    const result = handlerFileValidation({resultFile: response, ...props});

    if (result === 'Higher Than Max Limit') {
      props.onError?.(result);
      throw 'Ukuran File Terlalu Besar';
    }

    if (result === 'Format Not Valid') {
      props.onError?.(result);
      throw 'Format file tidak valid';
    }

    props.onUpload?.();
    const resData = await uploadFile({
      fileName: response?.[0]?.name || '',
      fileType: response?.[0]?.type || '',
      uri: response?.[0]?.uri || '',
      type: props.uploadType || '',
      sub_type: props.uploadSubType || '',
      uploadProgress: props.uploadProgress,
      showLoadingIndicator: props.showLoadingIndicator,
    });
    props.onUploaded?.();
    return resData;
  } catch (error: any) {
    if (isStringContains(error.toString(), 'cancel')) {
      return;
    }
    props.showSnackBar
      ? showErrorToast(isText(error) ? error : 'Terjadi Kesalahan')
      : false;
  }
};

export function removeDuplicatesByKey<T extends DynamicObject>(
  arr: T[],
  key: keyof T & string,
): T[] {
  return arr.filter(
    (obj, index, array) => array.findIndex(o => o[key] === obj[key]) === index,
  );
}

export const removeEmptyProperty = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] === Object(obj[key])) {
      newObj[key] = removeEmptyProperty(obj[key]);
    } else if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const trimStartEnd = (data: string) => data.trimStart().trimEnd();

export const removeAttrFromObject = <O extends object, A extends keyof O>(
  object: O,
  attr: A[],
): Omit<O, A> => {
  const newObject = {...object};

  for (const key of attr) {
    if (key in newObject) {
      delete newObject[key];
    }
  }

  return newObject;
};

export const isSimulator = DeviceInfo.isEmulatorSync();

export const handleUserGrade: CallBackWithParams<IHandleUserGrade, number> = (
  class_id: number,
) => {
  if (class_id <= 6) {
    return {
      id: class_id,
      name: 'SD',
    };
  }

  if (class_id >= 7 || class_id <= 9) {
    return {
      id: class_id,
      name: 'SMP',
    };
  }

  if (class_id >= 10 || class_id <= 12) {
    return {
      id: class_id,
      name: 'SMA',
    };
  }

  return {
    id: class_id,
    name: 'OTHER',
  };
};

export const parseQuestionType: CallBackWithParams<IQuestionType, number> = (
  questionTypeId: number,
) => {
  switch (questionTypeId) {
    case 2:
      return {id: questionTypeId, name: 'ESSAY BASE'};
    case 5:
      return {id: questionTypeId, name: 'MCQ COMPLEX'};

    // case 1:
    //   return {id: questionTypeId, name: 'MCQ BASE'};
    //if questionTypeId = 1
    default:
      return {id: questionTypeId, name: 'MCQ BASE'};
  }
};

export const formatTimezoneArea = (
  offset: string,
  start: string,
  end?: string,
) => {
  let result: string;
  const zone = (timezoneDate as Record<string, string>)[offset || '+07:00'];

  if (end) {
    const startDate = dayjs(start)
      .utcOffset(offset)
      .format('ddd, D MMMM YYYY • HH:mm -');
    const endDate = dayjs(end).utcOffset(offset).format('HH:mm');
    result = `${startDate} ${endDate} ${zone}`;
  } else {
    const startDate = dayjs(start)
      .utcOffset(offset)
      .format('ddd, D MMMM YYYY • HH:mm');
    result = `${startDate} ${zone}`;
  }

  return result;
};

export const getTimezoneOffset = () => dayjs().format('Z');

export const beautifyHTML = ({html}: {html: string}) => {
  try {
    // Match opening and closing tags
    const tagRegex = /(<\/?[^>]+>)/g;

    let indentLevel = 0;
    let beautifiedHTML = '';

    html.split(tagRegex).forEach((token: string) => {
      if (token.match(/<\/?[a-zA-Z][^\s>]*>/)) {
        if (token.startsWith('</')) {
          indentLevel--;
        }
        beautifiedHTML +=
          '\t'.repeat(Math.max(indentLevel, 0)) + token.trim() + '\n';
        if (token.startsWith('<') && !token.startsWith('</')) {
          indentLevel++;
        }
      } else {
        beautifiedHTML += token.trim() + '\n';
      }
    });
    return beautifiedHTML;
  } catch (error) {
    return html;
  }
};
