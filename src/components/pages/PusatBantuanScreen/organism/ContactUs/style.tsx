import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  cardContent: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  leftContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLeftContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  parentSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  // -------- //
  container: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  containerFirstWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  containerFirstWrapperImage: {
    width: 267.05,
    height: 142.53,
  },
  containerFirstWrapperTextTitle: {
    marginTop: 24,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  containerfirstWrapperTextDescription: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    textAlign: 'center',
  },
  containerSecondWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  containerSecondWrapperButton: {
    backgroundColor: Colors.primary.light3,
    width: 96,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  containersecondWrapperButtonText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    marginTop: 5,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});
