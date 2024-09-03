import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  image_2: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginRight: 10,
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
    marginVertical: 10,
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
    borderWidth: 2,
    marginVertical: 5,
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
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  textNotLive: {
    backgroundColor: '#FFF7D7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    color: '#995F0D',
    marginRight: 10,
    width: '70%',
  },
  textLive: {
    backgroundColor: Colors.danger.light1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    marginRight: 10,
    width: '70%',
  },
  buttonChoose: {
    width: '50%',
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textGrey: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral80,
  },
  lineActive: {
    width: '50%',
    borderWidth: 3,
    borderColor: Colors.primary.base,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lineDeactivate: {
    width: '50%',
    borderWidth: 1,
    borderColor: Colors.dark.neutral40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 1,
  },
  textBlueBold: {
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.base,
  },
  textNumberBlue: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  textNumberGrey: {
    backgroundColor: Colors.dark.neutral10,
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
