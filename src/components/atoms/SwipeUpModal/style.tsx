import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  contentContainer: {flex: 1},
  labelActiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    textTransform: 'capitalize',
  },
  labelInactiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    textTransform: 'capitalize',
  },
  tabContentContainerStyle: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: Colors.white,
  },
  tabMapelFilterButtonStyle: {
    paddingVertical: 10,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    maxWidth: 140,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '7%',
  },
  tabMapelFilterButtonStyle2: {
    paddingVertical: 10,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    maxWidth: 140,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '7%',
    marginLeft: 5,
  },
  tabMapelTitleStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
  tabMapelIconStyle: {transform: [{rotate: '90deg'}], marginLeft: 5},
  popUpContentContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    marginTop: -0.5,
    backgroundColor: 'rgba(155,159,164,0.6)',
  },
  popUpContentContainer2: {
    flex: 1.5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(155,159,164,0.6)',
  },
  popUpTopContent: {flex: 1, backgroundColor: 'rgba(155,159,164,0.6)'},
  popUpContentInnerContainer: {
    width: '100%',
    maxHeight: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
  },
  popUpheaderStripIconContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  popUpFilterContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  popUpFilterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
  },
  popUpSubHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  popUpSubHeaderLeft: {flex: 1},
  popUpSubHeaderLeftText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  popUpSubHeaderRight: {flex: 1, alignItems: 'flex-end'},
  popUpSubHeaderRightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
  },
  popUpSubjectListContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popUpSubjectCard: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 32,
    justifyContent: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
  },
  popUpSubjectCardChoosed: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 32,
    justifyContent: 'center',
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
  },
  popUpSubjectCardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  popUpSubjectCardTextChoosed: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.white,
  },
  popUpShowAllContainer: {width: '100%', marginVertical: 10},
  popUpShowAllButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  popUpSubmitButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  popUpSubmitButton: {flex: 1, paddingHorizontal: 5},
  tabMendatangScrollContainer: {marginTop: 5, paddingBottom: 50},
  tabMendatangCardContainer: {
    width: '100%',
    backgroundColor: 'red',
    marginVertical: 10,
  },
  tabMendatangContainer: {flex: 1},
  tabMendatangCardContent: {
    width: 340,
    marginHorizontal: 7,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 15,
  },
  tabMendatangCardbadge: {
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 100,
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
  },
  tabMendatangCardBadgeText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginVertical: 2,
    fontSize: 12,
    color: Colors.primary.base,
  },
  tabMendatangCardBodyContent: {flexDirection: 'row'},
  tabMendatangSubjectName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
  },
  tabMendatangChapterName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.dark.neutral100,
  },
  tabMendatangTimerContainer: {flex: 1, alignItems: 'flex-end'},
  tabMendatangTimerContainerOnProgress: {flex: 1, alignItems: 'flex-end'},
  tabMendatangTimerInnerContainer: {
    borderRadius: 10,
    backgroundColor: Colors.primary.light3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  tabMendatangTimerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: Colors.dark.neutral100,
  },
  tabMendatangTimerTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: Colors.dark.neutral100,
  },
  tabMendatangScheduleContainer: {marginTop: 8, marginBottom: 20},
  tabMendatangScheduleContainer2: {
    marginTop: 8,
    marginBottom: 20,
    marginLeft: 50,
  },
  tabMendatangScheduleTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  tabMendatangScheduleTitleOnProgress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: 'red',
    marginTop: 5,
  },
  tabMendatangScheduleDateContainer: {flexDirection: 'row'},
  tabMendatangScheduleDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  tabMendatangScheduleMark: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    letterSpacing: 0.25,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.primary.base,
  },
  tabMendatangScheduleMarkUndone: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  topContentContainer: {flex: 1.05, paddingHorizontal: '2%'},
  topContentTitleContainer: {paddingHorizontal: 10, marginTop: 12},
  topContentTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
  },
  topEmptyText: {
    marginTop: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  topEmptyContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  topEmptyImage: {width: 120, height: 100},
  topContentCardContainer: {paddingVertical: 10},
});
