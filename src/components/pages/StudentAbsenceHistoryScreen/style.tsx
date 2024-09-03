import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  today_button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 25,
  },
  today_text: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: Colors.primary.base,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  tabKoHeaderPrimary: {
    backgroundColor: Colors.white,
    paddingHorizontal: '5%',
    paddingBottom: 10,
  },
  date: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  labelActiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    textTransform: 'capitalize',
  },
  dayName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    fontFamily: 'Poppins-Regular',
  },
  ViewDay: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  labelInactiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    textTransform: 'capitalize',
  },
  tabKOContainer: {
    flex: 1,
    backgroundColor: Colors.dark.neutral10,
  },
  tabKOHeaderTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    marginVertical: 20,
  },
  tabKOPieIndicatorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    marginVertical: 20,
  },
  tabKOFilterContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  tabKOFilterTab: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light2,
    borderRadius: 20,
    paddingVertical: 5,
    marginRight: 10,
  },
  tabKOFilterTabTextLeft: {
    marginLeft: 10,
    marginRight: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  tabKoFilterTabTextRight: {
    marginLeft: 5,
    marginRight: 10,
  },
  tabKOPengajuanButtonContainer: {
    marginTop: 5,
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  tabKOLaporanKehadiranKelasContainer: {
    marginTop: 5,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
  tabKOPengajuanButton: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginHorizontal: '1%',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabKOPengajuanButtonLeftContent: {
    flex: 4,
    paddingLeft: '5%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  tabKOLaporanButtonLeftContent: {
    flex: 8,
    paddingLeft: '5%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  tabKOPengajuanButtonRightContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tabKOPengajuanButtonRightInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabKOPengajuanButtonRightTextContainer: {
    marginRight: 5,
    width: 24,
    height: 24,
    backgroundColor: Colors.primary.base,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabKOPengajuanButtonLeftTextTop: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  tabKOPengajuanButtonLeftTextBottom: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    marginTop: 5,
  },
  tabKOLaporanTotalMurid: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    marginTop: 5,
  },
  tabKONumberText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.white,
  },
  tabKORingkasanEmptyText1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
  tabKORingkasanEmptyText2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    marginTop: 5,
  },
  pieContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  pieSector: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  pieInnerCircle: {
    borderRadius: 100,
  },
  pieLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  pieDescriptionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    marginTop: 16,
  },
  pieDescriptionInnerContainer: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginTop: 10,
  },
  pieDescriptionTitleText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 2,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  pieDescriptionSubTitleTextGreen: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.success.light1,
    marginTop: 5,
  },
  pieDescriptionSubTitleTextYellow: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.orange.base,
  },
  pieDescriptionSubTitleTextGrey: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  pieDescriptionSubTitleTextRed: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 5,
    color: Colors.danger.base,
  },
});
