import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    minHeight: 120,
    borderColor: Colors.dark.neutral10,
    backgroundColor: Colors.dark.neutral10,
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    flex: 1,
    color: Colors.dark.neutral100,
  },
  error: {
    borderColor: Colors.danger.base,
  },
  errorLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    fontSize: 12,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
    fontSize: 12,
  },
  editorContainer: {
    backgroundColor: 'transparent',
  },
  containerStyle: {margin: 4, borderRadius: 42},
});
