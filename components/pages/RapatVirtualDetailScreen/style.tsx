import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  component: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: Colors.dark.neutral100,
    lineHeight: 24,
  },
  title2: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.dark.neutral100,
    lineHeight: 22,
  },
  statusBadgeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    overflow: 'hidden',
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
});
