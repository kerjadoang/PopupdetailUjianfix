import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
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
    letterSpacing: 1,
    color: Colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingBottom: 12,
  },
  searchContainer: {
    marginTop: 16,
    flexDirection: 'column',
    paddingBottom: 8,
  },
  searchTitle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  emptyUniversityContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  emptyLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
  },
  emptyText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  resultText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
    paddingBottom: 14,
    paddingLeft: 8,
  },
  resultTextSelected: {
    color: Colors.primary.base,
  },
  inputTextStyle: {
    width: window.width * 0.8,
  },
});
