import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {generalStyles} from '@constants/styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
  },
  name: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    fontWeight: '600',
    paddingTop: 4,
  },
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '500',
    paddingTop: 4,
  },
  dateCollected: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.primary.base,
    fontWeight: '500',
    paddingTop: 4,
  },
  score: {
    marginTop: 4,
    marginBottom: 16,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 32,
    color: Colors.primary.base,
  },
  dikumpulkanCard: {
    ...generalStyles.shadowProp,
    shadowOpacity: 0.15,
    paddingVertical: 16,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  belumDinilaiText: {
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    fontSize: 14,
    marginBottom: 16,
  },
});
