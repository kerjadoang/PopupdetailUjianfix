import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  // BEGIN UNIVERSAL
  textBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: Colors.white,
  },
  textNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: Colors.white,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    color: Colors.dark.neutral100,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  cardSubTitle: {
    color: Colors.dark.neutral60,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    top: 4,
  },
  lineHorizontal: {
    height: 1,
    backgroundColor: Colors.dark.neutral20,
    marginBottom: 16,
  },
  // END UNIVERSAL //
  header: {
    top: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextTitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  headerTextSubTitle: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: Colors.primary.light4,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bodySectionFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  bodySectionFirstTextTitle: {
    color: Colors.dark.neutral100,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
  },
  bodySectionFirstTextSubTitle: {
    color: Colors.primary.base,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  bodySectionSecond: {
    backgroundColor: Colors.white,
    padding: 16,
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
  bodyTextAverage: {
    color: Colors.dark.neutral60,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    marginBottom: 4,
  },
  bodyTextAverageNumber: {
    color: Colors.dark.neutral100,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary.base,
  },
});
