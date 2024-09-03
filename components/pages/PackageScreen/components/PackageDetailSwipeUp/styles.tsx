import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {},
  promoCodeContainer: {
    paddingVertical: 4,
    // paddingHorizontal: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
  },
  buttonBuyPackage: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
