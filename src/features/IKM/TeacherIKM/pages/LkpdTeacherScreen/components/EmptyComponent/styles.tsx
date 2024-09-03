import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.neutral100,
    textAlign: 'center',
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral60,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
  },
});
