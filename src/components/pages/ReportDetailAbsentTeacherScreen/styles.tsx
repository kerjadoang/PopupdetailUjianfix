import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentHeader: {
    width: '80%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: 12,
    resizeMode: 'cover',
  },
  scrollview: {
    padding: 16,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral60,
  },
  textTitleBlack: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 16,
  },
  textSubTitle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 14,
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
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
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
    fontFamily: 'Poppins-Bold',
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
    borderWidth: 1,
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
  buttonBlue: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonGreen: {
    backgroundColor: Colors.success.light2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonRed: {
    backgroundColor: Colors.danger.light1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  list: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  subContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonChoose: {
    width: '50%',
    padding: 16,
    alignItems: 'center',
  },
  lineActive: {
    width: '50%',
    borderWidth: 2,
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
  textGrey: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral80,
  },
  textGreen: {
    fontFamily: 'Poppins-Regular',
    color: Colors.success.base,
  },
  buttonFile: {
    padding: 16,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: Colors.dark.neutral50,
  },
});
