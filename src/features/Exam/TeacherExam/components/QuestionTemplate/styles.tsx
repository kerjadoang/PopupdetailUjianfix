import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  templateText: {
    fontSize: 16,
    color: Colors.dark.neutral80,
  },
  templateContainer: {
    marginBottom: 16,
  },
  button: {paddingHorizontal: 18, paddingVertical: 8},
  buttonText: {color: Colors.primary.base},
});
