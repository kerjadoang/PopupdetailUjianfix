import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {generalStyles} from '@constants/styles';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    ...generalStyles.shadowProp,
    paddingVertical: 26,
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    // gap: 12,
  },
  title: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: Colors.dark.neutral20,
    paddingVertical: 12,
    minHeight: 40,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
    borderRadius: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdownChecboxContainer: {marginRight: 16},
  dropdownTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
  },
  participantContainer: {
    marginHorizontal: 14,
  },
});
