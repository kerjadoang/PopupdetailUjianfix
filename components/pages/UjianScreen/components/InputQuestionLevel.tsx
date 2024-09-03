import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {View, Text} from 'react-native';

type InputQuestionLevelProps = {
  inputs?: IBaseQuestionLevel[];
  selectedVal?: any;
  onSelect?: (val: IBaseQuestionLevel) => void;
  selectedOption?: IBaseQuestionLevel;
} & SwipeUpProps;

const InputQuestionLevel: React.FC<InputQuestionLevelProps> = props => {
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
          Pilih Tingkat Kesulitan
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

export default InputQuestionLevel;
