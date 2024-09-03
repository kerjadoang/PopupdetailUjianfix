/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';
import dayjs from 'dayjs';

type Props = {
  value: any;
  action: any;
  type: 'MONTH' | 'WEEK';
};

const BigCalendar: FC<Props> = ({value, action, type}) => {
  const [currentDate, setCurrentDate] = useState(dayjs(value));
  const listDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{currentDate.format('MMMM YYYY')}</Text>
        </View>
        <View style={styles.navigation}>
          <View style={styles.today_button}>
            <Text style={styles.today_text}>Hari ini</Text>
          </View>

          <View style={styles.flexRow}>
            <TouchableOpacity onPress={prevMonth}>
              <Icon name="chevron-left" size={16} color={Colors.primary.base} />
            </TouchableOpacity>
            <TouchableOpacity onPress={nextMonth}>
              <Icon
                name="chevron-right"
                size={16}
                color={Colors.primary.base}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDays = () => {
    const monthStart = currentDate.clone().startOf('month');
    const monthEnd = currentDate.clone().endOf('month');
    // render week
    const weekStart = currentDate.clone().startOf('week');
    const weekEnd = weekStart.clone().add(7, 'days');

    const startDate = monthStart.startOf('week');
    const endDate = monthEnd.endOf('week');
    const rows = [];

    let days = [];
    let day = type === 'MONTH' ? startDate : weekStart;

    if (type === 'MONTH') {
      while (day.isSameOrBefore(endDate, 'day')) {
        for (let i = 0; i < 7; i++) {
          const dayClone = day.clone();

          const isToday = isSameDay(dayClone, value);
          days.push(
            <TouchableOpacity
              key={dayClone.format('YYYY-MM-DD')}
              onPress={() => {
                action(dayClone.format('YYYY-MM-DD'));
              }}
              style={[
                styles.date,
                {
                  backgroundColor: isToday ? '#0055B8' : 'transparent',
                },
              ]}>
              <Text
                style={{
                  color: isToday
                    ? '#fff'
                    : isSameMonth(dayClone, currentDate)
                    ? '#1D252D'
                    : '#CED4DA',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                {dayClone.format('D')}
              </Text>
            </TouchableOpacity>,
          );
          day.add(1, 'day');
        }
        rows.push(
          <View key={day.format('YYYY-MM-DD')} style={{flexDirection: 'row'}}>
            {days}
          </View>,
        );
        days = [];
      }
      return <View>{rows}</View>;
    } else {
      while (day.isBefore(weekEnd)) {
        const dayClone = day.clone();
        const isToday = isSameDay(dayClone, value);
        days.push(
          <TouchableOpacity
            key={dayClone.format('YYYY-MM-DD')}
            onPress={() => onDatePress(dayClone)}
            style={[
              styles.date,
              {
                backgroundColor: isToday ? Colors.primary.base : 'transparent',
              },
            ]}>
            <Text
              style={{
                color: isToday ? Colors.white : Colors.dark.neutral100,
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              {dayClone.format('D')}
            </Text>
          </TouchableOpacity>,
        );
        day.add(1, 'day');
      }

      return <View style={styles.row}>{days}</View>;
    }
  };

  const isSameDay = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
    return day1.isSame(day2, 'day');
  };

  const isSameMonth = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
    return day1.isSame(day2, 'month');
  };

  const onDatePress = (day: dayjs.Dayjs) => {
    action(day);
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const render = () => {
    let dayName: any = [];
    listDay.map((e, idx) => {
      dayName.push(
        <Text key={idx} style={styles.dayName}>
          {e}
        </Text>,
      );
    });
    return <View style={styles.ViewDay}>{dayName}</View>;
  };
  return (
    <View>
      {renderHeader()}
      {render()}
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#1D252D',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  today_button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 25,
  },
  today_text: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: Colors.primary.base,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  date: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    fontFamily: 'Poppins-Regular',
  },
  ViewDay: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
});

export {BigCalendar};
