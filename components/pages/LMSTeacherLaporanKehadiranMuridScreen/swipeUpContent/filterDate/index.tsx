/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import XIcon from '@assets/svg/close_x.svg';
import {Button, DatePicker} from '@components/atoms';

type IDatePicker = {
  date: any;
  month: any;
  year: any;
};

type _FilterDate = {
  handleClose: any;
  handleSubmit: any;
  date: IDatePicker;
};

const FilterDate = ({handleClose, date, handleSubmit}: _FilterDate) => {
  const [dateRes, setDateRes] = useState<IDatePicker>({
    date: date?.date,
    month: date?.month,
    year: date?.year,
  });
  return (
    <View style={{marginTop: '5%', paddingHorizontal: '5%'}}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            lineHeight: 28,
            color: Colors.dark.neutral100,
          }}>
          Pilih Tanggal
        </Text>
        <Pressable
          onPress={handleClose}
          style={{position: 'absolute', left: 0, top: 3}}>
          <XIcon width={20} height={20} />
        </Pressable>
      </View>
      <View style={{marginVertical: 15}}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: '8%',
          }}>
          <DatePicker
            selected={dateRes}
            onChange={(res: IDatePicker) => {
              setDateRes({
                date: res?.date,
                month: res?.month,
                year: parseInt(res?.year, 10),
              });
            }}
            onClose={handleClose}
          />
        </View>
      </View>
      <Button label="Pilih" action={() => handleSubmit(dateRes)} />
    </View>
  );
};

export default FilterDate;
