import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {},
  rowCurriculum: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  kurikulum: {
    gap: 4,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 8,
    flexFlow: 'column wrap',
    borderRadius: 25,
    marginTop: 16,
  },
  activeCuriculum: {color: Colors.primary.base, fontWeight: '600'},
});
