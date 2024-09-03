import Colors from '@constants/colors';
import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {View, StyleSheet} from 'react-native';

type InputTextAreaProps = {
  containerStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  label?: string;
} & TextInputProps;

const InputTextArea: React.FC<InputTextAreaProps> = props => {
  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          !!props.errorLabel && styles.error,
        ]}>
        <TextInput multiline {...props} style={[styles.input, props.style]} />
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
                color: Colors.dark.neutral60,
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

export {InputTextArea};
