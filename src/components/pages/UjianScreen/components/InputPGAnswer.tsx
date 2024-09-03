import {CCheckBox, MainView, Uploader, UploaderProps} from '@components/atoms';
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
  isKompleks?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  label?: string;
  labelPrefix?: string;
  isChecked?: boolean;
  onRemoveInput?: TouchableOpacityProps['onPress'];
  onPressCheck?: () => void | any;
} & TextInputProps &
  UploaderProps;

const InputPGAnswer: React.FC<InputPGAnswerProps> = props => {
  return (
    <View>
      <View
        style={[
          styles.container,
          props.containerStyle,
          !!props.errorLabel && styles.error,
        ]}>
        <MainView flexDirection="row">
          {props.isKompleks ? (
            <CCheckBox
              isChecked={props.isChecked || false}
              customStyle={{marginRight: 10, marginTop: 2}}
              onPressCheck={props.onPressCheck}
            />
          ) : null}
          <MainView flex={1}>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                flex: 1,
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                  color: Colors.dark.neutral100,
                }}>
                {props.labelPrefix}.
              </Text>
              <TextInput
                multiline
                {...props}
                style={[styles.input, props.style]}
              />
              <TouchableOpacity onPress={props.onRemoveInput}>
                <RemoveIcon />
              </TouchableOpacity>
            </View>
            <MainView>
              <Uploader
                containerStyle={{borderColor: 'transparent'}}
                buttonContainerStyle={{alignSelf: 'flex-start'}}
                showFormatLabel={false}
                labelFormat="null"
                {...props}
              />
            </MainView>
          </MainView>
        </MainView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    // height: 120,
    minHeight: 120,
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
