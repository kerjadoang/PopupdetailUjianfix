import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {styles} from '../style';
import IconDown from '@assets/svg/ic24_chevron_down.svg';
import Colors from '@constants/colors';

type IProps = {
  onPress?: any;
  title?: string;
  value?: string;
  initValue?: string;
  selected?: boolean;
  disabled?: any;
  navigation?: any;
  error?: boolean;
  showError?: boolean;
  index?: number;
  setIndex?: any;
};

const InputForm = (props: IProps) => {
  return (
    <View style={styles.inputForm}>
      <Text style={styles.titleButton}>{props?.title}</Text>
      <Pressable
        disabled={props?.disabled}
        onPress={() => {
          props.onPress();
          props?.setIndex ? props.setIndex(props?.index) : null;
        }}
        style={[
          styles.button,
          {
            backgroundColor: props?.selected
              ? Colors.dark.neutral10
              : props?.disabled
              ? Colors.dark.neutral20
              : Colors.dark.neutral10,
            borderColor: props?.error
              ? Colors.danger.base
              : Colors.dark.neutral100,
            borderWidth: props?.error ? 2 : 0,
          },
        ]}>
        <Text
          style={[
            styles.textButton,
            {
              color: props?.selected
                ? Colors.dark.neutral100
                : Colors.dark.neutral50,
            },
          ]}>
          {props?.value}
        </Text>
        <IconDown
          width={24}
          height={24}
          color={props?.selected ? Colors.primary.base : Colors.dark.neutral50}
        />
      </Pressable>
      {props?.error ? (
        <Text style={styles.error}>{props?.title} wajib diisi.</Text>
      ) : null}
    </View>
  );
};

export default InputForm;
