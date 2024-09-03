import {StyleSheet} from 'react-native';
import Colors from './colors';
import Fonts from './fonts';
import {PressableStateCallbackType} from 'react-native';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  contentFlex: {flex: 1},
  row: {flexDirection: 'row'},
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {flexDirection: 'column'},
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  RegularFz12_LH22_Fw400_Neutral100: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontWeight: '400',
  },
  RegularFz12_LH22_Fw400_Neutral80: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontWeight: '400',
  },
  RegularFz12_LH22_Fw400_Neutral60: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontWeight: '400',
  },
  absolute: {
    position: 'absolute',
  },
  contentFlexWhite: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backgroundWhite: {
    backgroundColor: Colors.white,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  cardAvatar: {
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 100,
  },
  circle: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: Colors.primary.light3,
  },
});

export const dynamicPadding = (paddingValue: number) => ({
  padding: paddingValue,
});

export const dynamicMargin = (marginValue: number) => ({
  padding: marginValue,
});

export const pressableStyle = (props: PressableStateCallbackType) => ({
  opacity: props.pressed ? 0.5 : 1,
});
