import {Dimensions} from 'react-native';

const {height: HEIGHT} = Dimensions.get('window');

const TAB_NAMES = {
  PERLU_DIPERIKSA: 'Perlu Diperiksa',
  DIJADWALKAN: 'Dijadwalkan',
} as const;

const LIMIT_OFFSET = {
  limit: 10,
  offset: 0,
};

export {HEIGHT, TAB_NAMES, LIMIT_OFFSET};
