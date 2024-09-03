import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  ph12: {
    paddingHorizontal: 12,
  },
  shadowItem: {
    backgroundColor: 'black',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 8,
  },
  phaseNameWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
  },
  rombelClassWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary.light2,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.neutral100,
    lineHeight: 18,
  },
});
