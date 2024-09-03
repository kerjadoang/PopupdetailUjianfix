import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  emptyContentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContentIcon: {
    width: 100,
    height: 100,
    marginBottom: 12,
    alignSelf: 'center',
  },
  emptyContentTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  cardSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    marginRight: 12,
  },
  gap: {
    height: 12,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
});
