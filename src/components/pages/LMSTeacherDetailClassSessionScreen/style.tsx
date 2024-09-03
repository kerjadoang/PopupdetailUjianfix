import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  videoStyle: {
    width: '100%',
    height: 235,
  },
  headerContainer: {
    padding: 16,
  },
  markSwipeTitle: {
    marginTop: 10,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  markSwipeStudentName: {
    marginTop: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  markSwipeStarContainer: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 50,
    marginBottom: 35,
    marginTop: 16,
  },
  markSwipeStatInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  badgeCard: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    marginRight: 8,
  },
  badgeTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerSubjectTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 4,
  },
  headerContentTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 4,
  },
  headerDateTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 4,
  },
  headerContentIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  userCreatedByIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
    borderRadius: 50,
  },
  userCreatedByDescription: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.RegularPoppins,
  },
  badgeStatusContainer: {
    flexDirection: 'row',
  },
  badgeStatusTitle: {
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.secondary.light2,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.orange.dark1,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },

  onGoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onGoingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.danger.light2,
    borderRadius: 20,
  },
  onGoingDotOutter: {
    height: 14,
    width: 14,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: Colors.danger.base,
    borderWidth: 2,
    marginRight: 8,
  },
  onGoingDotInner: {
    height: 12,
    width: 12,
    borderRadius: 25,
    backgroundColor: Colors.danger.base,
  },
  onGoingTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.danger.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },

  lineGrey: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.dark.neutral10,
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionContainerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  createdByContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  headTitleWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  descriptionTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  row: {
    flexDirection: 'row',
  },
});
