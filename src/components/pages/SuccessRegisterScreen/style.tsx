import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskotIcon: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});
