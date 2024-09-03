import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  cardContainer: {
    padding: 16,
    backgroundColor: Colors.primary.base,
    paddingBottom: 32,
  },
  webViewContainer: {width: '100%', height: '100%', overflow: 'visible'},
});
