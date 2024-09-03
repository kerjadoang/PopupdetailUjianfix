import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    width: '100%',
    height: 200,
  },
  imgOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
  imgTextTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  imgTextSubtitle: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  footerWrapper: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  footerBtnComponent: {width: '100%', height: '100%'},
  footerBtnItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.light3,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shadowItem: {
    shadowColor: Colors.black,
    backgroundColor: Colors.primary.light3,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});
