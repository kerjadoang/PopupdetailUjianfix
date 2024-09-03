import React, {useState} from 'react';
import {Button, ScrollPicker} from '@components/atoms';
import {Text, View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

export interface INewCurrentDatePickerDate {
  index?: number;
  hours: number;
  minutes: number;
  day?: number | string;
  date?: number | string;
  month?: number | string;
}

type NewDatePickerProps = {
  onChange?: CallBackWithParams<void, INewCurrentDatePickerDate>;
  isActualTime?: boolean;
  monthBefore?: number;
  monthAfter?: number;
  currentDate: INewCurrentDatePickerDate;
  onSaveChange: CallBackWithParams<void, INewCurrentDatePickerDate>;
  title: string;
};

type IGenerateDateProps = {} & Partial<NewDatePickerProps>;

const generateDate = ({
  currentDate: _currentDate,
  monthAfter,
  monthBefore,
}: IGenerateDateProps) => {
  const currentDate: dayjs.Dayjs = dayjs(_currentDate);

  // set startDate dan endDate berdasarkan tanggal sekarang
  const startDate: dayjs.Dayjs = monthBefore
    ? currentDate.set('date', 1).subtract(monthBefore, 'month')
    : currentDate.subtract(0, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(monthAfter || 1, 'month');

  // buat array tanggal
  const dateArray: string[] = [];
  const onlyDateArray: string[] = [];
  const fullDate: string[] = [];
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
  const hour = initialDate?.hour();
  const year = initialDate?.year();

  return {day, date, month, hour, year};
};

const NewDateTimePickerForm = ({
  currentDate,
  onSaveChange,
  title,
  ...props
}: NewDatePickerProps) => {
  const [tempDate, setTempDate] =
    useState<INewCurrentDatePickerDate>(currentDate);
  const plainDate = dayjs();

  const getSelectedIndexDate = () => {
    if (!props.monthBefore && !props.monthAfter) {
      return (
        generateDate(props).onlyDateArray.findIndex(
          date => date == tempDate.date,
        ) || tempDate.index
      );
    }

    if (tempDate?.index) {
      return tempDate.index;
    }

    const indexDate = generateDate(props).dateArray.findIndex(
      date => date == plainDate.format('YYYY-MM-DD'),
    );

    return indexDate;
  };

  return (
    <View style={styles.swipeUpContainer}>
      <Text style={styles.swipeUpTitle}>{title}</Text>
      <View style={styles.container}>
        <ScrollPicker
          date={true}
          dataSource={generateDate(props).dateArray}
          selectedIndex={getSelectedIndexDate()}
          width={200}
          borderRadiusLeft={20}
          borderRadiusRight={0}
          onValueChange={(data, index) => {
            const dateResult = _handlerDate(data);
            const parseDate = {
              ...currentDate,
              index: index,
              date: dateResult?.date,
              // day: dateResult?.day,
              months: dateResult?.month,
              years: dateResult?.year,
            };
            setTempDate(parseDate);
            // onChange(parseDate);
          }}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
        <ScrollPicker
          dataSource={generateHours()}
          selectedIndex={currentDate.hours - 1}
          width={150}
          borderRadiusLeft={0}
          borderRadiusRight={0}
          onValueChange={data => {
            setTempDate((prevDate: any) => ({...prevDate, hours: data}));
            // onChange({...tempDate, hours: data});
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
          selectedIndex={currentDate.minutes}
          onValueChange={data => {
            setTempDate((prevDate: any) => ({...prevDate, minutes: data}));
            // onChange({...tempDate, minutes: data});
          }}
          borderRadiusLeft={0}
          borderRadiusRight={20}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
      </View>
      <Button
        label={'Simpan'}
        action={() => {
          onSaveChange(tempDate);
        }}
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
  swipeUpContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 600,
  },
  swipeUpTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
});

export {NewDateTimePickerForm};
