import {Pressable, Text, View} from 'react-native';
import React from 'react';
import IconDown from '@assets/svg/ic24_chevron_down.svg';
import Colors from '@constants/colors';
import styles from './styles';

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
  rightIcon?: any;
};

const InputFormKirimProyek = (props: IProps) => {
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
              ? props?.disabled
                ? Colors.dark.neutral20
                : Colors.dark.neutral10
              : Colors.dark.neutral10,
            borderColor: props?.error
              ? Colors.danger.base
              : Colors.dark.neutral100,
            borderWidth: props?.error ? 2 : 0,
          },
        ]}>
        <Text
          numberOfLines={1}
          style={[
            styles.textButton,
            {
              color: props?.selected
                ? props?.disabled
                  ? Colors.dark.neutral50
                  : Colors.dark.neutral100
                : Colors.dark.neutral50,
            },
          ]}>
          {props?.value}
        </Text>
        {props?.rightIcon || (
          <IconDown
            width={24}
            height={24}
            color={
              props?.selected
                ? props?.disabled
                  ? Colors.dark.neutral50
                  : Colors.primary.base
                : Colors.dark.neutral50
            }
          />
        )}
      </Pressable>
      {props?.error ? (
        <Text style={styles.error}>{props?.title} wajib diisi.</Text>
      ) : null}
    </View>
  );
};

export default InputFormKirimProyek;
