import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 16,
  },
  card: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMemoryContainer: {
    paddingHorizontal: 16,
  },
  cardMemory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  titleSwipeUp: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 16,
  },
  descriptionSwipeUpActive: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  descriptionSwipeUpPasive: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  descriptionQualityVideo: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    marginRight: 4,
  },
  greyLine: {
    backgroundColor: Colors.dark.neutral20,
    width: '100%',
    height: 2,
    marginVertical: 16,
  },
  rightContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  swipeUpContainer: {
    padding: 16,
  },
  swipeUpContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  outterDotActive: {
    borderRadius: 25,
    width: 24,
    height: 24,
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outterDotPassive: {
    borderRadius: 25,
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.dark.neutral50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    position: 'absolute',
    borderRadius: 25,
    width: 8,
    height: 8,
    backgroundColor: Colors.white,
  },
});
