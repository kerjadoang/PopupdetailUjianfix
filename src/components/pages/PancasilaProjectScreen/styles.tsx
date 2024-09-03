import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
    color: Colors.white,
  },
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.white,
    paddingTop: 0,
    flexGrow: 1,
  },
  navigatorTabBarStyle: {
    // height: 45,
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
  BtnContainer: {
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
});
