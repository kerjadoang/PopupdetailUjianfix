import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {},
  textButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {position: 'absolute', top: 0, width: '100%', height: 150},
  snackbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  navigatorTabBarStyle: {
    height: 45,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  navigatorTabIndicatorStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  labelStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  labelActiveStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary?.base,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  bodyButtonContainer: {width: '100%', height: '100%', flexDirection: 'row'},
  childrenContainer: {
    width: '100%',
    height: 80,
  },
  checkIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  threeDotButton: {marginRight: 2},
  iconRightContainer: {
    width: 40,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionContainer: {},
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  headerInner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  emptyNotificationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContent: {
    alignItems: 'center',
  },
  maskotIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topDescription: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  emptyNotificationContent: {
    width: '90%',
    marginTop: '80%',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
