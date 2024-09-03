import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  infoATPWrapper: {
    marginHorizontal: 16,
    backgroundColor: Colors.primary.light3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
    flexDirection: 'row',
    gap: 8,
  },
  moreTextBtn: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
});
