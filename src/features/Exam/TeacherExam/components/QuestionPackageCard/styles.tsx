import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  cardWrapperContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.neutral40,
  },
  container: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.primary.base,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerUseButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
