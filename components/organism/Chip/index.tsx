import React from 'react';
import {Pressable, PressableProps, TextProps, ViewProps} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import ResetIcon from '@assets/svg/close_x.svg';
import Colors from '@constants/colors';

type ChipProps = {
  chipContainerStyle?: ViewProps['style'];
  firstIndex?: boolean;
  chipLabelStyle?: TextProps['style'];
  label: string;
  closable?: PressableProps['onPress'];
  onPress?: PressableProps['onPress'];
};

const Chip: React.FC<ChipProps> = props => {
  return (
    <View
      style={[
        styles.chipsContainer,
        conditionalStyles(props).chipMargin,
        props.chipContainerStyle,
      ]}>
      <Pressable onPress={props.onPress}>
        <Text
          numberOfLines={1}
          style={[styles.chipLabel, props.chipLabelStyle]}>
          {props.label}
        </Text>
      </Pressable>
      {props.closable && (
        <Pressable onPress={props.closable}>
          <ResetIcon style={styles.resetIcon} width={12} height={12} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    alignContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  chipLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginTop: 3,
    color: Colors.dark.neutral80,
    lineHeight: 16,
  },
  resetIcon: {
    marginLeft: 12,
  },
});

const conditionalStyles = (props: any) =>
  StyleSheet.create({
    chipMargin: {
      marginLeft: props.firstIndex ? 0 : 12,
    },
  });

export default Chip;
