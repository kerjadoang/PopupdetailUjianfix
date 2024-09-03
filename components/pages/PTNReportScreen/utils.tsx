import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootState} from 'src/redux/rootReducer';
import Colors from '@constants/colors';
import {ParamList} from 'type/screen';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

const TAB_NAMES = {
  TRY_OUT: 'Try Out',
  LIVE_CLASS: 'Live Class',
  BANK_SOAL: 'Bank Soal',
} as const;

const usePTNReportScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PTNReportScreen'>>();

  const route = useRoute<RouteProp<ParamList, 'PTNReportScreen'>>();
  const dispatch = useDispatch();
  const ptnStore = useSelector((store: RootState) => store.ptn);
  return {navigation, route, dispatch, ptnStore};
};

const tryOutSubjectColor = (id: any) => {
  switch (id) {
    case 1:
      return '#FEE6E9'; // Literasi Bahasa Indonesia
    case 2:
      return '#09B95A'; // Literasi Bahasa Inggris
    case 3:
      return '#868E96'; // Penalaran Matematika
    case 5:
      return '#0055B8'; // Pemahaman Bacaan & Menulis
    case 6:
      return '#C25701'; // Fisika
    case 7:
      return '#FFEEA5'; // Kimia
    case 8:
      return '#5EFFBB'; // Biologi
    case 10:
      return '#C28CFF'; // Geografi
    case 11:
      return '#002E6D'; // Sosiologi
    case 12:
      return '#F7B1B9'; // Sejarah
    case 13:
      return '#F89E1C'; // Ekonomi
    case 14:
      return '#FFF7D7'; // Pengetahuan & Pemahaman Umum
    case 15:
      return '#015B35'; // Pengetahuan Kuantitatif
    case 16:
      return '#D92037'; // Matematika Sains
    case 19:
      return '#FE6476'; // Penalaran Induktif
    case 20:
      return '#DDBFFF'; // Penalaran Deduktif
    case 21:
      return '#FFCE00'; // Penalaran Kuantitatif
    default:
      return Colors.primary.base;
  }
};

const liveClassDummyData = [
  {
    id: 2,
    name: 'Literasi Bahasa Inggris',
    total_live_class: 4,
    total_record: 5,
    total: 0,
  },
  {
    id: 5,
    name: 'Pemahaman Bacaan & Menulis',
    total_live_class: 5,
    total_record: 7,
    total: 0,
  },
  {
    id: 4,
    name: 'Penalaran Umum',
    total_live_class: 8,
    total_record: 2,
    total: 0,
  },
  {
    id: 1,
    name: 'Literasi Bahasa Indonesia',
    total_live_class: 4,
    total_record: 4,
    total: 0,
  },
  {
    id: 14,
    name: 'Pengetahuan & Pemahaman Umum',
    total_live_class: 3,
    total_record: 3,
    total: 0,
  },
  {
    id: 15,
    name: 'Pengetahuan Kuantitatif',
    total_live_class: 6,
    total_record: 7,
    total: 0,
  },
  {
    id: 19,
    name: 'Penalaran Induktif',
    total_live_class: 1,
    total_record: 1,
    total: 0,
  },
  {
    id: 20,
    name: 'Penalaran Deduktif',
    total_live_class: 1,
    total_record: 9,
    total: 0,
  },
  {
    id: 21,
    name: 'Penalaran Kuantitatif',
    total_live_class: 9,
    total_record: 1,
    total: 0,
  },
  {
    id: 3,
    name: 'Penalaran Matematika ',
    total_live_class: 1,
    total_record: 4,
    total: 5,
  },
];

export {
  HEIGHT,
  WIDTH,
  TAB_NAMES,
  usePTNReportScreen,
  tryOutSubjectColor,
  liveClassDummyData,
};
