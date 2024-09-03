import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.primary.background,
    paddingBottom: 32,
    height: '100%',
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
});

export const filterChipsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  containerActive: {backgroundColor: Colors.primary.base},
  label: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  labelActive: {color: Colors.white},
});

export const swipeUpStyle = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
    textAlign: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  kategoriText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  pilihSemuaText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
  },
  listOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chipContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});
