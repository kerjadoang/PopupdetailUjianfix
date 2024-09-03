import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  phaseWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    overflow: 'hidden',
  },
  phaseName: {
    fontSize: 14,
    lineHeight: 18,
  },
  subjectWrapper: {
    height: '100%',
    marginHorizontal: 16,
  },
  subjectContainer: {
    justifyContent: 'space-between',
  },
});
