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
    marginBottom: 24,
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  inputNote: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },
  tncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  agreement: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  tnc: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.primary.base,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});
