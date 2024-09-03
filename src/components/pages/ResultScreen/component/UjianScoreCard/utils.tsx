import {isStringContains} from '@constants/functional';

const parseUjianType = (type: string) => {
  if (isStringContains(type, '', ['multiple', 'pilihan ganda'])) {
    return 'pilihan ganda';
  }

  if (isStringContains(type, '', ['mix', 'campuran'])) {
    return 'campuran';
  }

  return 'uraian';
};

export {parseUjianType};
