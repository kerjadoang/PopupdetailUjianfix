import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.primary.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary.background,
  },
  contentContainer: {paddingHorizontal: 16},
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
  rectangle: {
    width: window.width * 1,
    height: 8,
    backgroundColor: Colors.dark.neutral20,
    marginTop: 12,
  },
  emptyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    paddingVertical: 3,
  },
  resultsContainer: {
    padding: 16,
  },
});
