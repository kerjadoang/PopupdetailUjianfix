import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {View, Text} from 'react-native';
import {InputType} from '../CreateSoalSendiriScreen';

type InputQuestionTagProps = {
  inputs?: InputType[];
  selectedVal?: any;
  onSelect?: (val: InputType) => void;
  selectedOption?: InputType;
} & SwipeUpProps;

const InputQuestionTag: React.FC<InputQuestionTagProps> = props => {
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
          Pilih Tipe Pertanyaan
        </Text>
        {props.inputs?.map((item, index) => {
          return (
            <View style={{height: 32, width: '100%'}} key={`${index}`}>
              <RadioInput
                label={item.name}
                radioContainerStyle={{
                  direction: 'rtl',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
                onPress={() => props.onSelect?.(item)}
                selected={item.id === props.selectedOption?.id}
              />
            </View>
          );
        })}
      </View>
    </SwipeUp>
  );
};

export default InputQuestionTag;
