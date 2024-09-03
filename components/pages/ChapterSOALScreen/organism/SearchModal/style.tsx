import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  // BEGIN HEADER
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  cancelLabelContainter: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary.base,
  },
  // END HEADER //
  // BEGIN SEARCH TIPS OR NOT FOUND
  searchTipsOrNotFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTipsOrNotFoundTitle: {
    marginTop: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  searchTipsOrNotFoundDescription: {
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
  // END SEARCH TIPS OR NOT FOUND /
  body: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  textNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  textBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
});
