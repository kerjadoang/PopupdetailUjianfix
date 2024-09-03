import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 100,
  },
  scrollview: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral60,
  },
  textTitleBlack: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
  },
  textSubTitle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginRight: 2,
  },
  textSubTitleGrey: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleGreen: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: Colors.success.base,
    marginRight: 5,
  },
  circleRed: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: Colors.danger.base,
    marginRight: 5,
  },
  textTitleBigBlack: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 18,
  },
  textSubTitleBigBlack: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 12,
  },
  textBlue: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  labelBlue: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    marginRight: 10,
  },
  line: {
    borderWidth: 0.5,
    marginVertical: 16,
    borderColor: Colors.dark.neutral20,
  },
  textRed: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
  },
  textWhite: {
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
  },
  buttonJoin: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cardCountDownContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCountDownStartContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCountDownStartTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.dark1,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  cardCountDownStartButton: {
    width: 80,
  },
});
