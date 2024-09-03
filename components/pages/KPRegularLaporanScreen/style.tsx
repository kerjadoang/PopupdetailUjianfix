import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  // BEGIN UNIVERSAL
  textBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.white,
  },
  textNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
  // END UNIVERSAL //
  header: {
    top: 40,
    paddingHorizontal: 16,
  },
  headerWrapperFirst: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWrapperFirstTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
  headerWrapperFirstSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
  headerWrapperSecond: {
    top: 20,
    gap: 52,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: Colors.primary.light4,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 12,
  },
  cardTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  cardTextSubTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
});
