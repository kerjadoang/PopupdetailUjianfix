import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

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
  menuContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 24,
    marginTop: 12,
  },
  shadowItem: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  menuItem: {
    width: (WINDOW_WIDTH - 32) / 2.25,
    alignItems: 'center',
  },
  menuName: {
    paddingTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
});
