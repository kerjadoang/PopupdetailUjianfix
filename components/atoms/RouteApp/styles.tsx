import Colors from '@constants/colors';
import {STATUSBAR_HEIGHT} from '@constants/functional';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: STATUSBAR_HEIGHT,
  },
  gestureHandlerStyle: {
    flex: 1,
  },
});
