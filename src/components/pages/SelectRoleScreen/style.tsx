import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  contentTitle: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginBottom: 52,
  },

  cardContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: 'blue',
    borderWidth: 2,
    marginBottom: 16,
  },
  cardImageSvgContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImageSvg: {
    marginRight: 16,
  },
  cardImagePng: {
    borderRadius: 16,
    marginRight: 16,
    width: 88,
    height: 88,
  },
  cardTitle: {
    fontSize: 24,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
    paddingRight: 12,
  },
  cardTextContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 14,
    flex: 1,
  },
});
