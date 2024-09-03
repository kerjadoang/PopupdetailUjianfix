import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  settingFavTopTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomContentContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  settingFavEmptyIcon: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingFavBottomContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  settingFavBottomTitlecontainer: {width: '100%', paddingHorizontal: '5%'},
  settingFavBottomTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomScrollView: {marginTop: '5%', marginBottom: '10%'},
  settingFavBottomSubjectContainer: {marginHorizontal: 5, marginBottom: 20},
  settingFavSubmitButtonContainer: {marginHorizontal: '5%'},
  settingFavContainer: {width: '100%', height: 600, backgroundColor: 'white'},
  settingFavTopContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingFavTopTitleContainer: {
    width: '100%',
    marginTop: '2%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
  },
  mh10: {marginHorizontal: 10},
  swpMiddleScrollViewInner: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
