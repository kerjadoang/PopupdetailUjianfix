import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    marginTop: 20,
    lineHeight: 16,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  grayText: {
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    paddingHorizontal: 16,
    width: '100%',
  },
});
