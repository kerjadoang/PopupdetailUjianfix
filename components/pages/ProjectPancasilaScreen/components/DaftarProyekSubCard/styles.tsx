import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  soalContentContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  gamesLineContainer: {flex: 1},
  gamesLineInnerContainer: {marginLeft: 7},
  separatorLineContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  separatorLine: {
    height: '100%',
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    backgroundColor: 'transparent',
    borderColor: Colors.dark.neutral20,
  },
  soalSublistItemContainer: {flex: 5, alignItems: 'center'},
  card2: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 265,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box2: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E7EBEE',
  },
  title: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  rekomendasi: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 12,
    color: Colors.green.light3,
  },
  soalTitle2: {fontSize: 14},
  title2: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
});
