import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export default StyleSheet.create({
  container: {},
  pressableVideoView: {gap: 4, width: '48%'},
  containerVideoView: {width: '100%', borderRadius: 10, overflow: 'hidden'},
  textVideoView: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  videoView: {
    width: '100%',
    height: 109,
    borderRadius: 10,
  },
});
