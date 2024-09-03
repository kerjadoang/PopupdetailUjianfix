import Colors from '@constants/colors';
import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Pressable,
} from 'react-native';
import CheckboxChecked from '@assets/svg/Checkbox_selected.svg';
import CheckboxUnchecked from '@assets/svg/Checkbox_unselect.svg';

export type CheckboxInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  checkboxHeight?: number;
  checkboxWidth?: number;
  onPress?: TouchableOpacityProps['onPress'];
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  disabled = false,
  ...props
}) => {
  return (
    <Pressable
      onPress={disabled ? undefined : props.onPress}
      style={({pressed}) => [
        styles.container,
        props.containerStyle,
        {opacity: pressed && !disabled ? 0.4 : 1},
      ]}>
      <Text
        style={[
          styles.label,
          props.labelStyle,
          props.selected && styles.labelActive,
          disabled && styles.labelDisabled,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {props.label}
      </Text>
      {props.selected ? (
        <CheckboxChecked
          width={props.checkboxWidth || 24}
          height={props.checkboxHeight || 24}
        />
      ) : (
        <CheckboxUnchecked
          width={props.checkboxWidth || 24}
          height={props.checkboxHeight || 24}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  labelActive: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
  },
  labelDisabled: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral50,
  },
});

export {CheckboxInput};
