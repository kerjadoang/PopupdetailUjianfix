import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  swipeUpContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 8,
  },
  inputTextContainer: {
    marginBottom: 16,
  },
  inputText: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  errorMessage: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.danger.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  inpuTextTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  inpuTextPlaceholder: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral50,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  swipeupContainer: {
    padding: 16,
    maxHeight: 370,
  },
  swipeupContainerDate: {
    padding: 16,
    height: 320,
  },
  swipeupHeaderTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  swipeupHeaderSubtTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 16,
  },

  swipeupRegistrationNumberCard: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipeupRegistrationNumberContentContainerStyle: {
    flexGrow: 1,
  },
  swipeupRegistrationNumberButtonContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  swipeupRegistrationNumberButton: {
    width: '48%',
  },
  swipeupRegistrationNumberCardActiveTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  swipeupRegistrationNumberCardNotActiveTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  swipeupRegistrationNumberHeaderTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 16,
  },
  swipeupRegistrationNumberSearchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  swipeupListContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    maxheight: 500,
  },
  swipeupList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  swipeupListButtonContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  swipeupListApplyButton: {
    width: '100%',
    marginTop: 32,
  },
  swipeupPaymentMethodContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    maxheight: 500,
  },
  swipeupPaymentMethodItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  swipeupPaymentMethodActiveButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
  },
  swipeupPaymentMethodActiveTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.white,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  swipeupPaymentMethodNotActiveButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.primary.light3,
    alignItems: 'center',
  },
  swipeupPaymentMethodNotActiveTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  uploadEvidenceButton: {
    marginBottom: 8,
  },
  uploadEvidenceNote: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  imageBackground: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  attachmentImageContainer: {
    height: 170,
    width: '100%',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  iconClose: {
    backgroundColor: Colors.dark.neutral10,
    padding: 12,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  attachmentResendContainer: {
    backgroundColor: Colors.primary.light3,
    width: 150,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  attachmentResendTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  userCard: {
    gap: 4,
    marginBottom: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0.5,
  },
});

export const styleProps = (backgroundColor: any, errorMessage: any) =>
  StyleSheet.create({
    inputText: {
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: backgroundColor || Colors.dark.neutral10,
      width: '100%',
      flexDirection: 'row',
      borderWidth: errorMessage ? 2 : 0,
      borderColor: errorMessage ? Colors.danger.base : 'transparent',
      justifyContent: 'space-between',
    },
  });
