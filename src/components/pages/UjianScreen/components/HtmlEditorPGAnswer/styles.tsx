import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.dark.neutral10,
    backgroundColor: Colors.dark.neutral10,
  },
  mainContainer: {
    // flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
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
  labelPrefix: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginTop: 4,
    color: Colors.dark.neutral100,
  },
  errorLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    fontSize: 12,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 12,
  },
  editorContainer: {
    backgroundColor: 'transparent',
  },
  htmlContainer: {width: '91%'},
});
