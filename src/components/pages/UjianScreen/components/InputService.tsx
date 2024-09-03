import {RadioInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IAllServicesResponse} from '@services/global/type';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';

type InputServiceProps = {
  inputs?: IAllServicesResponse;
  selectedVal?: any;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: IBaseService;
} & SwipeUpProps;

const InputService: React.FC<InputServiceProps> = props => {
  return (
    <SwipeUp {...props}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          // paddingBottom: 8,
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Tipe Ujian
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
                  onPress={() =>
                    props.onSelect?.('question_package_service', item)
                  }
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

export default InputService;
