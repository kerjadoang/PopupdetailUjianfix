import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  requirePasswordTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  checklistGrey: {
    marginRight: 4,
    height: 20,
    width: 20,
  },
  iconMaskot: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#fff5cc',
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
    alignSelf: 'center',
    width: '70%',
  },
  inputNote: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },
  requiredPasswordContainer: {
    marginBottom: 24,
  },
  requiredPassword: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
