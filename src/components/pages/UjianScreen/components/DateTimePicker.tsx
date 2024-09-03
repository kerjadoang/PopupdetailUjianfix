import {ScrollPicker} from '@components/atoms';
import dayjs from 'dayjs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const generateDates = () => {
  const currentDate: dayjs.Dayjs = dayjs();

  // set startDate dan endDate berdasarkan tanggal sekarang
  // const startDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(1, 'month');

  // buat array tanggal
  const dateArray: string[] = [];
  const fullDate: string[] = [];
  let dateCursor: dayjs.Dayjs = dayjs();

  let indexDate = [];
  let i = 0;
  while (dateCursor <= endDate) {
    fullDate.push(dateCursor.locale('id').format());
    dateArray.push(dateCursor.locale('id').format('ddd, D MMM'));
    indexDate[i] = dateCursor.get('date');
    dateCursor = dateCursor.add(1, 'day');
    i++;
  }
  dateArray.pop();
  fullDate.pop();
  return {dateArray, indexDate, fullDate};
};

const generateHours = () => {
  let hours: number[] = [];
  for (let i = 1; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};

const generateMinute = () => {
  let minutes: number[] = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }
  return minutes;
};

type DateTimePickerProps = {
  selected?: any;
  onChange?: any;
  generateDate?: any;
};

const DateTimePicker: React.FC<DateTimePickerProps> = props => {
  return (
    <View style={styles.row}>
      <ScrollPicker
        dataSource={generateDates().dateArray}
        selectedIndex={generateDates().indexDate.findIndex(
          arr => arr === props.selected?.date,
        )}
        renderItem={data => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        width={200}
        borderRadiusLeft={20}
        borderRadiusRight={0}
        onValueChange={(data, index) => {
          props.onChange({
            ...props.selected,
            fullDate: generateDates().fullDate[index],
            date: generateDates().indexDate[index],
          });
        }}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
      <ScrollPicker
        dataSource={generateHours()}
        selectedIndex={props.selected.hour - 1}
        renderItem={data => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        width={100}
        borderRadiusLeft={0}
        borderRadiusRight={0}
        onValueChange={(data, index) => {
          props.onChange((prevState: any) => {
            const getIndex =
              prevState.date < dayjs().date()
                ? generateDates().fullDate.length +
                  (prevState.date - dayjs().date() + 1)
                : prevState.date - dayjs().date();

            return {
              ...prevState,
              fullDate:
                prevState?.fullDate ?? generateDates().fullDate[getIndex],
              hour: index + 1,
            };
          });
        }}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
      <ScrollPicker
        dataSource={generateMinute()}
        selectedIndex={props.selected.minute}
        renderItem={data => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={data => {
          props.onChange((prevState: any) => {
            const getIndex =
              prevState.date < dayjs().date()
                ? generateDates().fullDate.length +
                  (prevState.date - dayjs().date() + 1)
                : prevState.date - dayjs().date();
            return {
              ...prevState,
              fullDate:
                prevState?.fullDate ?? generateDates().fullDate[getIndex],
              minute: data,
            };
          });
        }}
        width={100}
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default DateTimePicker;
