import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  cardAvatar: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 100,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  cardDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  gap: {
    height: 8,
  },
});
