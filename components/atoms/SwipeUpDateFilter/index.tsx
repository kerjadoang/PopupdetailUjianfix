/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button, SwipeUp} from '@components/atoms';
import CalendarIcon from '@assets/svg/ic_calendar_blue.svg';
import dayjs from 'dayjs';
import DateFilter from './components/DateFilter';
import {styles} from './style';

type _SwipeUpDateFilter = {
  handleSubmitAction: CallBackWithParams<void, FilterDateType>;
  onDateFromChoose: CallBackWithParams<void, IDatePicker>;
  onDateToChoose: CallBackWithParams<void, IDatePicker>;
  onResetFilter: VoidCallBack;
  filterDateType?: FilterDateType;
  defaultDateFrom?: IDatePicker;
  defaultDateTo?: IDatePicker;
};

const SwipeUpDateFilter = ({
  handleSubmitAction,
  onDateFromChoose,
  onDateToChoose,
  onResetFilter,
  filterDateType,
  defaultDateFrom,
  defaultDateTo,
}: _SwipeUpDateFilter) => {
  const [filterType, setFilterType] = useState<FilterDateType>(
    filterDateType || 'Semua Tanggal',
  );

  const defaultDate = {
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  };

  const [dateFrom, setDateFrom] = useState<IDatePicker>(
    defaultDateFrom || defaultDate,
  );
  const [dateTo, setDateTo] = useState<IDatePicker>(
    defaultDateTo || defaultDate,
  );

  const [swipeUpDateFromVisible, setSwipeUpDateFromVisible] =
    useState<boolean>(false);
  const [swipeUpDateToVisible, setSwipeUpDateToVisible] =
    useState<boolean>(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.filterTitle}>Filter</Text>
        </View>
        <View style={styles.mv15}>
          <View style={styles.filterRow}>
            <Pressable
              onPress={() => setFilterType('Semua Tanggal')}
              style={
                filterType === 'Semua Tanggal'
                  ? styles.filterActive
                  : styles.filterDeactive
              }>
              <Text
                style={
                  filterType === 'Semua Tanggal'
                    ? styles.filterTextActive
                    : styles.filterTextDeactive
                }>
                Semua Tanggal
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setFilterType('Pilih Tanggal')}
              style={
                filterType === 'Pilih Tanggal'
                  ? styles.filterActive
                  : styles.filterDeactive
              }>
              <Text
                style={
                  filterType === 'Pilih Tanggal'
                    ? styles.filterTextActive
                    : styles.filterTextDeactive
                }>
                Pilih Tanggal
              </Text>
            </Pressable>
          </View>
          {filterType === 'Pilih Tanggal' ? (
            <View style={styles.datePickerContainer}>
              <View style={styles.flex1}>
                <Text style={styles.chooseDateTitle}>Dari</Text>
                <Pressable onPress={() => setSwipeUpDateFromVisible(true)}>
                  <View style={styles.chooseDateContainer}>
                    <Text style={styles.chooseDateText}>
                      {/* 29 Jun 1998 */}
                      {`${dayjs(
                        `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
                      )
                        .locale('id')
                        .format('DD MMM YYYY')}`}
                    </Text>
                    <View style={styles.iconCalendar}>
                      <CalendarIcon />
                    </View>
                  </View>
                </Pressable>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.chooseDateTitle}>Sampai</Text>
                <Pressable onPress={() => setSwipeUpDateToVisible(true)}>
                  <View style={styles.chooseDateContainer}>
                    <Text style={styles.chooseDateText}>
                      {`${dayjs(
                        `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
                      )
                        .locale('id')
                        .format('DD MMM YYYY')}`}
                    </Text>
                    <View style={styles.iconCalendar}>
                      <CalendarIcon />
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.rowButton}>
          <View style={styles.buttonContainer}>
            <Button
              action={() => {
                setFilterType('Semua Tanggal');
                setDateFrom({
                  date: dayjs().get('date'),
                  month: dayjs().get('month') + 1,
                  year: dayjs().get('year'),
                });
                setDateTo({
                  date: dayjs().get('date'),
                  month: dayjs().get('month') + 1,
                  year: dayjs().get('year'),
                });
                onResetFilter();
              }}
              label="Atur Ulang"
              background={Colors.white}
              color={Colors.primary.base}
              borderWidth={1}
              borderColor={Colors.primary.base}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              action={() => {
                handleSubmitAction(filterType);
              }}
              label="Terapkan"
            />
          </View>
        </View>
      </View>

      <SwipeUp
        isSwipeLine={true}
        height={500}
        visible={swipeUpDateFromVisible}
        children={
          <DateFilter
            handleClose={() => {
              setSwipeUpDateFromVisible(false);
            }}
            date={dateFrom}
            handleSubmit={(dateRes: IDatePicker) => {
              const date = {
                date: dateRes.date,
                month: dateRes.month,
                year: dateRes.year,
              };
              setDateFrom(date);
              onDateFromChoose(date);
              setSwipeUpDateFromVisible(false);
            }}
          />
        }
        onClose={() => {
          setSwipeUpDateFromVisible(false);
        }}
      />

      <SwipeUp
        isSwipeLine={true}
        height={500}
        visible={swipeUpDateToVisible}
        children={
          <DateFilter
            handleClose={() => {
              setSwipeUpDateToVisible(false);
            }}
            date={dateTo}
            handleSubmit={(dateRes: IDatePicker) => {
              const date = {
                date: dateRes.date,
                month: dateRes.month,
                year: dateRes.year,
              };
              setDateTo(date);
              onDateToChoose(date);
              setSwipeUpDateToVisible(false);
            }}
          />
        }
        onClose={() => {
          setSwipeUpDateToVisible(false);
        }}
      />
    </>
  );
};

export default SwipeUpDateFilter;
