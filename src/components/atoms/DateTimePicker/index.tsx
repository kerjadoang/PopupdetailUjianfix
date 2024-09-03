import React from 'react';
import {ScrollPicker} from '@components/atoms';
import {Text, View, StyleSheet, Image} from 'react-native';
import dayjs from 'dayjs';

type Props = {
  selected: any;
  onChange: any;
  generateDate?: any;
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
  for (let i = 1; i < 60; i++) {
    minutes.push(i);
  }
  return minutes;
};

const generateDates = () => {
  const currentDate: dayjs.Dayjs = dayjs();

  // set startDate dan endDate berdasarkan tanggal sekarang
  const startDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(1, 'month');

  // buat array tanggal
  const dateArray: string[] = [];
  let dateCursor: dayjs.Dayjs = startDate;

  while (dateCursor <= endDate) {
    dateArray.push(dateCursor.format('dd, D MMM'));
    dateCursor = dateCursor.add(1, 'day');
  }
  return dateArray;
};

const DateTimePicker = ({selected, onChange, generateDate}: Props) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.icon]}>
          <Image source={require('@assets/images/ic_close.png')} />
        </View>
        <View style={[styles.title]}>
          <Text style={[styles.text]}>Pilih Tanggal dan Jam</Text>
        </View>
      </View>
      <View style={styles.row}>
        <ScrollPicker
          date={true}
          dataSource={generateDate || generateDates()}
          selectedIndex={selected.date - 1}
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
            onChange({...selected, date: index});
          }}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
        <ScrollPicker
          dataSource={generateHours()}
          selectedIndex={selected.hours}
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
            onChange({...selected, hour: index + 1});
          }}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
        <ScrollPicker
          dataSource={generateMinute()}
          selectedIndex={0}
          renderItem={data => {
            return (
              <View>
                <Text>{data}</Text>
              </View>
            );
          }}
          onValueChange={data => {
            onChange({...selected, minute: data});
          }}
          width={100}
          borderRadiusLeft={0}
          borderRadiusRight={20}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
      </View>
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
    backgroundColor: 'yellow',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#C2185B',
    // width: 300,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    height: 100,
    backgroundColor: 'pink',
  },
});

export {DateTimePicker};
