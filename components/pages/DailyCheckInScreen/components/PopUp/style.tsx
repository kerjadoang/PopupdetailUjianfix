import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginTop: 20,
  },
  coinContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  coinContainer__text: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    marginTop: 32,
  },
});
