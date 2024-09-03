import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  slideImageContainer: {flex: 0.7, alignItems: 'center'},
  slideButtonBackContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dark.neutral20,
  },
  slideTitleContainer: {flex: 1, justifyContent: 'center'},
  slideImageEmpty: {
    width: 130,
    height: 75,
    borderRadius: 10,
    backgroundColor: Colors.dark.neutral20,
  },
  slideTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
});
