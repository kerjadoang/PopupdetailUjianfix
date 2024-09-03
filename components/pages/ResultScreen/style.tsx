import {Dimensions, StyleSheet} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

const WIDTH = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  // BEGIN UNIVERSAL
  textNormal: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  textSemiBoldBaseColor: {
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  rowEvenly: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  // END UNIVERSAL //
  container: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F9FCFF',
  },
  backgroundImage: {
    position: 'absolute',
    left: WIDTH * 0.03,
  },
  cardChart: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  btnShare: {
    backgroundColor: Colors.primary.light2,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 15,
    flexDirection: 'row',
    width: '30%',
    alignSelf: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  marginBottom12: {
    marginBottom: 12,
  },
});
