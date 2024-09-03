import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  parentContainer: {flex: 1},
  keyboardAvoidingView: {flex: 1},
  cardContainer: {
    padding: 30,
    backgroundColor: Colors.primary.background,
    flex: 1,
    paddingBottom: 140,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.background,
  },
  headerTitle: {
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    paddingLeft: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  titleButton: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    color: Colors.dark.neutral100,
    letterSpacing: 0.1,
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 8,
  },
  inputForm: {
    marginBottom: 24,
  },
});
