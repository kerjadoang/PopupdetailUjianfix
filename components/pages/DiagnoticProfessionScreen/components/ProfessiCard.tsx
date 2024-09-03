import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {MaskGroup} from '@assets/images';

interface Iprops {
  label?: string;
  selected?: boolean;
  action?: TouchableOpacityProps['onPress'];
}
const ProfessionCard = (props: Iprops) => {
  return (
    <TouchableOpacity onPress={props?.action}>
      <ImageBackground
        source={MaskGroup}
        style={[styles.container, props?.selected && styles.selectedContainer]}>
        <Text style={styles.label}>{props?.label ?? '-'}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export {ProfessionCard};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    color: Colors.primary.base,
  },
  container: {
    width: window.width * 0.4,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: Colors.primary.light2,
    borderRadius: 10,
  },
  selectedContainer: {
    backgroundColor: Colors.primary.base,
  },
});
