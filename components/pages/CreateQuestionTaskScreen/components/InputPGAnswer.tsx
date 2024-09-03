import {UploaderProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {View, StyleSheet} from 'react-native';

import RemoveIcon from '@assets/svg/ic24_x_round.svg';

type InputPGAnswerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  label?: string;
  labelPrefix?: string;
  onRemoveInput?: TouchableOpacityProps['onPress'];
} & TextInputProps &
  UploaderProps;

const InputPGAnswer: React.FC<InputPGAnswerProps> = props => {
  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          !!props.errorLabel && styles.error,
        ]}>
        <View style={{flexDirection: 'row', gap: 4, flex: 1}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              marginTop: 4,
              color: Colors.dark.neutral100,
            }}>
            {props.labelPrefix}.
          </Text>
          <TextInput multiline {...props} style={[styles.input, props.style]} />
          <TouchableOpacity onPress={props.onRemoveInput}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
      </View>
      {(props.errorLabel || props.label) && (
        <View>
          {props.errorLabel && (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.danger.base,
                fontSize: 12,
              }}>
              {props.errorLabel}
            </Text>
          )}
          {props.label && (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral100,
                fontSize: 12,
              }}>
              {props.label}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    height: 120,
    borderWidth: 2,
    borderColor: Colors.dark.neutral10,
    backgroundColor: Colors.dark.neutral10,
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    flex: 1,
    color: Colors.dark.neutral100,
  },
  error: {
    borderColor: Colors.danger.base,
  },
});

export {InputPGAnswer};
