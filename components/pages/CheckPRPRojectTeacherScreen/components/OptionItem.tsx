import {Text, View} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import IconCheck from '@assets/svg/ic24_check_green.svg';
import IconXRed from '@assets/svg/ic24_x_red.svg';

interface Iprops {
  MCQkey: string;
  description: string;
  correct: boolean;
  answer: string;
  rightAnswer: string;
  obj: any;
}
const OptionItem = (props: Iprops) => {
  return (
    <View
      style={[
        styles.questionPGRow,
        props?.correct
          ? styles.questionPGRowCorrect
          : props?.answer?.toUpperCase() === props?.obj?.key?.toUpperCase() &&
            !props?.obj?.correct
          ? styles.questionPGRowFalse
          : styles.questionPGRow,
      ]}>
      <View style={styles.questionPGLeft}>
        <Text
          style={[
            styles.textKey,
            props?.correct
              ? styles.textKeyCorrect
              : props?.answer?.toUpperCase() ===
                  props?.obj?.key?.toUpperCase() && !props?.obj?.correct
              ? styles.textKeyFalse
              : styles.textKey,
          ]}>
          {props?.MCQkey?.toUpperCase()}.
        </Text>
        <Text style={styles.textAnswer}>{props?.description}</Text>
      </View>

      {props?.correct && <IconCheck width={24} height={24} />}
      {props?.answer?.toUpperCase() === props?.obj?.key?.toUpperCase() &&
        !props?.obj?.correct && <IconXRed width={24} height={24} />}
    </View>
  );
};

export default OptionItem;
