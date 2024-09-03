import {Button, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IAllRombelClassResponse} from '@services/global/type';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';
import dayjs from 'dayjs';
import DateTimePicker from './DateTimePicker';

type InputDateProps = {
  inputs?: IAllRombelClassResponse;
  selectedVal?: any;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: Date;
} & SwipeUpProps;

interface IDatePicker {
  date: any;
  hour: any;
  minute: any;
  fullDate?: string;
}

const InputDate: React.FC<InputDateProps> = props => {
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });

  useEffect(() => {
    if (props.visible && props.selectedOption) {
      const dateData = {
        fullDate: dayjs(props.selectedOption).format(),
        date: dayjs(props.selectedOption).get('date'),
        hour: dayjs(props.selectedOption).get('hour'),
        minute: dayjs(props.selectedOption).get('minute'),
      };
      setValueDatePicker(dateData);
    }
  }, [props.visible]);

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
          Tanggal & Jam Ujian
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16}}
          style={{maxHeight: 400}}>
          <DateTimePicker
            selected={valueDatePicker}
            onChange={setValueDatePicker}
          />
        </ScrollView>
        <View
          style={{
            paddingTop: 16,
            backgroundColor: Colors.white,
          }}>
          <Button
            label="Simpan"
            action={() => {
              const date = dayjs(valueDatePicker?.fullDate)
                .set('hour', valueDatePicker.hour)
                .set('minute', valueDatePicker.minute);
              props.onSelect?.('start_time', `${date.format()}`);
              // props.onSelect?.(
              //   'start_time',
              //   `${date.format('YYYY-MM-DD HH:mm:ss')}`,
              // );
            }}
            // isDisabled={
          />
        </View>
      </View>
    </SwipeUp>
  );
};

export default InputDate;
