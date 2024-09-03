import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {ICreateSoalSendiriOptionPayload} from '@services/lms/type';
import React from 'react';
import {View, Text} from 'react-native';

type InputCorrectAnswerProps = {
  inputs?: ICreateSoalSendiriOptionPayload[];
  selectedVal?: any;
  onSelect?: (val: ICreateSoalSendiriOptionPayload) => void;
  selectedOption?: ICreateSoalSendiriOptionPayload;
} & SwipeUpProps;

const InputCorrectAnswer: React.FC<InputCorrectAnswerProps> = props => {
  return (
    <SwipeUp {...props}>
      <View style={{padding: 16, gap: 16}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Jawaban Benar
        </Text>
        {props.inputs?.map((item, index) => {
          return (
            <View style={{height: 32, width: '100%'}} key={`${index}`}>
              <RadioInput
                label={item.key}
                radioContainerStyle={{
                  width: '100%',
                  justifyContent: 'space-between',
                  flexDirection: 'row-reverse',
                }}
                onPress={() => {
                  const options = {
                    ...item,
                    key: item?.key?.toUpperCase(),
                    correct: true,
                  };
                  props.onSelect?.(options);
                }}
                selected={item.key === props.selectedOption?.key}
              />
            </View>
          );
        })}
      </View>
    </SwipeUp>
  );
};

export default InputCorrectAnswer;
