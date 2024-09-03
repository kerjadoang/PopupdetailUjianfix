import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  optionsContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    gap: 6,
    flexDirection: 'row',
  },
  bottomOptionsContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    gap: 6,
    flexDirection: 'row',
  },
  eyeContainer: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
