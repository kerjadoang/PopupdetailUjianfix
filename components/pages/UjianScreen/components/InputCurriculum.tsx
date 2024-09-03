import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IAllCurriculumResponse} from '@services/global/type';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';

type InputCurriculumProps = {
  inputs?: IAllCurriculumResponse;
  selectedVal?: any;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: IBaseCurricullum;
} & SwipeUpProps;

const InputCurriculum: React.FC<InputCurriculumProps> = props => {
  return (
    <SwipeUp {...props}>
      <View
        style={{
          paddingHorizontal: 16,
          padding: 16,
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Kurikulum
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16}}
          style={{maxHeight: 400}}>
          {props.inputs?.data?.map(item => {
            return (
              <View style={{height: 32, width: '100%'}} key={`${item.id}`}>
                <RadioInput
                  label={item.name}
                  radioContainerStyle={{
                    width: '100%',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => props.onSelect?.('curriculum', item)}
                  selected={item.id === props.selectedOption?.id}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SwipeUp>
  );
};

export default InputCurriculum;
