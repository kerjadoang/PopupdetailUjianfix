import {ScrollPicker} from '@components/atoms';
import dayjs from 'dayjs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const generateMonths = () => {
  const startDate = dayjs().startOf('year').startOf('month');
  const endDate = startDate.add(1, 'year');
  const monthArray = [];
  const indexMonth = [];

  let monthCursor = startDate;
  while (monthCursor <= endDate) {
    monthArray.push(monthCursor.locale('id').format('MMMM'));
    indexMonth.push(monthCursor.format('M'));
    monthCursor = monthCursor.add(1, 'month');
  }

  return {monthArray, indexMonth};
};
const generateYears = () => {
  const currentYear = dayjs().year();
  const startYear = 2020;
  const years = [];

  for (let i = startYear; i <= currentYear; i++) {
    years.push(i.toString());
  }

  return years;
};

type DatePickerProps = {
  selected?: any;
  onChange?: any;
  generateDate?: any;
  defaultSelected?: any;
};

const DatePicker: React.FC<DatePickerProps> = props => {
  return (
    <View style={styles.row}>
      <ScrollPicker
        dataSource={generateMonths().monthArray}
        selectedIndex={generateMonths().indexMonth.findIndex(
          arr =>
            arr === props.selected?.date || arr === props.defaultSelected?.date,
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
            date: generateMonths().indexMonth[index],
          });
        }}
        wrapperHeight={180}
        wrapperColor="#FFFFFF"
        itemHeight={45}
      />
      <ScrollPicker
        dataSource={generateYears()}
        selectedIndex={props.selected?.years ?? props.defaultSelected?.years}
        renderItem={data => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={data => {
          props.onChange((prevState: any) => ({...prevState, years: data}));
        }}
        width={200}
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

export default DatePicker;
