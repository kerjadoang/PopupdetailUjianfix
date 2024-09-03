import {StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '@constants/colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const androidOrIos = (android: any, ios: any) => {
  if (Platform.OS === 'android') {
    return android;
  }

  return ios;
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  topBar__text: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
  },
  middleContainer: {
    marginTop: 15,
    height: 315,
    paddingTop: 40,
    alignItems: 'center',
  },
  middleContainer__title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  middleContainer__description: {
    marginTop: 8,
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
  },
  giftBoxContainer: {
    zIndex: 1,
    width: WIDTH,
    position: 'absolute',
    top: HEIGHT * 0.29,
    alignItems: 'center',
  },
  robotContainer: {
    zIndex: 1,
    position: 'absolute',
    left: androidOrIos(23, 25),
    bottom: androidOrIos(HEIGHT * 0.214, HEIGHT * 0.304),
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.primary.base,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer__wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomContainer__wrapper__vector1: {
    position: 'absolute',
    bottom: androidOrIos(-20, 14),
  },
  bottomContainer__wrapper__vector2: {
    position: 'absolute',
    paddingLeft: 250,
    bottom: androidOrIos(-40, -10),
  },
  bottomContainer__wrapper__koinImage: {
    width: 129,
    height: 66,
    marginBottom: 24,
    marginRight: 24,
  },
});
