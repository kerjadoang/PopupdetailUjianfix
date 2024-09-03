import React, {FC} from 'react';
import {Pressable, ViewStyle} from 'react-native';
import styles from './styles';
import CheckboxChecked from '@assets/svg/Checkbox_selected.svg';
import CheckboxUnchecked from '@assets/svg/Checkbox_unselect.svg';
type Props = {
  isChecked: boolean;
  onChange?: CallBackWithParams<void, boolean>;
  onPress?: VoidCallBack;
  containerStyle?: ViewStyle;
  width?: number;
  height?: number;
};

const Checkbox: FC<Props> = ({
  isChecked,
  onPress,
  containerStyle,
  height = 24,
  width = 24,
}) => {
  return (
    <Pressable
      onPress={() => {
        onPress?.();
      }}
      style={({pressed}) => [
        styles.container,
        {opacity: pressed ? 0.5 : 1, ...containerStyle},
      ]}>
      {isChecked ? (
        <CheckboxChecked width={width} height={height} />
      ) : (
        <CheckboxUnchecked width={width} height={height} />
      )}
    </Pressable>
  );
};

export {Checkbox};
