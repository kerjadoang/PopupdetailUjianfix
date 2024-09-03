import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  separatorPadding: {flex: 6.5},
  separatorContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  separatorLineContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  separatorLine: {
    height: '100%',
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    backgroundColor: 'transparent',
    borderColor: Colors.dark.neutral20,
  },
});
