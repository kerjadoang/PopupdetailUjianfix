import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 0,
  },
  contentContainerStyle: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  maskotIcon: {
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
    marginBottom: 24,
  },
  labelTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  labelValue: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 12,
  },
});
