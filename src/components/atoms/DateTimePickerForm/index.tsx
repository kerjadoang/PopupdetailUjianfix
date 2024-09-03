import React from 'react';
import {ScrollPicker} from '@components/atoms';
import {Text, View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Colors from '@constants/colors';

type Props = {
  selected: any;
  onChange: any;
  isActualTime?: boolean;
};

const generateDate = () => {
  const currentDate: dayjs.Dayjs = dayjs();

  // set startDate dan endDate berdasarkan tanggal sekarang
  const startDate: dayjs.Dayjs = currentDate.subtract(0, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(1, 'month');
  const fullDate: string[] = [];

  // buat array tanggal
  const dateArray: string[] = [];
  const onlyDateArray: string[] = [];
  let dateCursor: dayjs.Dayjs = startDate;

  while (dateCursor <= endDate) {
    // dateArray.push(dateCursor.format('dd, D MMM'));
    fullDate.push(dateCursor.locale('id').format());
    dateArray.push(dateCursor.format('YYYY-MM-DD'));
    onlyDateArray.push(dateCursor.format('DD'));
    dateCursor = dateCursor.add(1, 'day');
  }
  return {dateArray, fullDate, onlyDateArray};
};

const generateHours = () => {
  let hours = [];
  for (let i = 1; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};

const generateMinute = () => {
  let minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }
  return minutes;
};

const _handlerDate = (dateValue: any) => {
  const initialDate = dayjs(dateValue);
  const day = initialDate?.day();
  const date = initialDate?.date();
  const month = initialDate?.month();
  const year = initialDate?.year();

  return {day, date, month, year};
};

const DateTimePickerForm = ({selected, onChange, isActualTime}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollPicker
        date={true}
        dataSource={generateDate().dateArray}
        selectedIndex={
          generateDate().onlyDateArray.findIndex(
            date => date == selected.date,
          ) || selected.index
        }
        width={200}
        borderRadiusLeft={20}
        borderRadiusRight={0}
        onValueChange={(data, index) => {
          const dateResult = _handlerDate(data);
          onChange({
            ...selected,
            fullDate: generateDate().fullDate[index],
            index: index,
            date: dateResult?.date,
            day: dateResult?.day,
            month: dateResult?.month + 1,
            year: dateResult?.year,
          });
        }}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
      <ScrollPicker
        dataSource={generateHours()}
        selectedIndex={selected.hour - 1}
        width={150}
        borderRadiusLeft={0}
        borderRadiusRight={0}
        onValueChange={data => {
          onChange({...selected, hour: data});
        }}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
      <View style={styles.semiColonContainer}>
        <Text style={styles.semiColon}>{' : '}</Text>
      </View>
      <ScrollPicker
        dataSource={generateMinute()}
        selectedIndex={isActualTime ? selected.minute : selected.minute - 1}
        onValueChange={data => {
          onChange({...selected, minute: data});
        }}
        borderRadiusLeft={0}
        borderRadiusRight={20}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    padding: 4,
  },
  icon: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
  },
  text: {
    fontSize: 16,
    color: '#1D252D',
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#C2185B',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  scrollView: {
    height: 10,
  },
  semiColonContainer: {
    backgroundColor: Colors.primary.light3,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiColon: {
    fontSize: 18,
    color: Colors.primary.base,
    fontWeight: 'bold',
  },
});

export {DateTimePickerForm};
