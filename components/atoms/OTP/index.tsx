/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  length: number;
  onCodeChanged: (otp: string) => void;
  errorMessage?: string;
  isAutoFocus?: boolean;
};

const OTP: FC<Props> = ({length, onCodeChanged, errorMessage, isAutoFocus}) => {
  const [code, setCode] = useState(new Array(length).fill(null));
  const inputsRef = useRef<any>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (/^[0-9]+$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      onCodeChanged(newCode.join(''));

      if (index < length - 1 && value !== '') {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <>
      <View style={styles.OTP_wrapper}>
        {[...Array(length)].map((_, i) => (
          <TextInput
            key={i}
            activeOutlineColor={Colors.primary.base}
            outlineStyle={styles.OTP_textInput}
            style={{
              width: 48,
              height: 48,
              textAlign: 'center',
              backgroundColor: Colors.dark.neutral10,
            }}
            onChangeText={(value: string) => handleCodeChange(i, value)}
            onKeyPress={({nativeEvent}) => handleKeyPress(i, nativeEvent.key)}
            value={code[i]}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={isAutoFocus && i === 0 && true}
            ref={(ref: any) => (inputsRef.current[i] = ref)}
            accessibilityLabel={`OTP Input ${i + 1}`}
            error={errorMessage ? true : false}
            mode="outlined"
          />
        ))}
      </View>

      {errorMessage && (
        <HelperText type="error" padding="none" style={{lineHeight: 16}}>
          {errorMessage}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  OTP_wrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  OTP_textInput: {
    borderRadius: 10,
  },
});

export {OTP};
