import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {capitalizeEachWord} from '@constants/functional';
import React from 'react';
import {View, Text} from 'react-native';

type InputQuestionTypeProps = {
  inputs?: IBaseQuestionType[];
  selectedVal?: any;
  onSelect?: (val: IBaseQuestionType) => void;
  selectedOption?: IBaseQuestionType;
} & SwipeUpProps;

const InputQuestionType: React.FC<InputQuestionTypeProps> = props => {
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
          Pilih Tipe Soal
        </Text>
        {props.inputs?.map((item, index) => {
          return (
            <View style={{height: 32, width: '100%'}} key={`${index}`}>
              <RadioInput
                label={capitalizeEachWord(item?.question_type ?? '')}
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

export default InputQuestionType;
