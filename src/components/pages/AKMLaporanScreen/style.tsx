import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';
import {STATUSBAR_HEIGHT} from '@constants/functional';

export const styles = StyleSheet.create({
  // BEGIN CHIP
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  chipTextTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  chipTextTitleActive: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: Colors.white,
  },
  // END CHIP //
  // BEGIN CARD
  containerCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    bottom: 10,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardTextNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  cardTextBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  cardTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  cardTextNilai: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  cardTextNilaiValue: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    color: Colors.primary.base,
  },
  // END CARD //
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.white,
  },
  summary: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  summaryTextTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  summaryTextValue: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.primary.base,
  },
});
