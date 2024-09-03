/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Header} from '@components/atoms/Header';
import BottomSheet from '@gorhom/bottom-sheet';
import useFormSchedule from './useFormSchedule';
import Colors from '@constants/colors';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '@constants/fonts';
import {CardSchedule} from '../PTNScreen/component';
import {Button, SwipeUp} from '@components/atoms';
import dayjs from 'dayjs';

const SchedulePTNScreen = () => {
  const {
    schedule,
    snapPoints,
    handleSheetChange,
    setDate,
    date,
    listDay,
    prevMonth,
    nextMonth,
    type,
    types,
    setTypes,
    showBottomSheet,
    fetchSchedule,
    onClickScheduleCard,
    calendarIndicator,
  } = useFormSchedule();

  const [swipe, setSwipe] = React.useState(false);
  const [titleFilter, setTitleFilter] = React.useState({
    text: '',
    isActive: false,
  });

  const renderItem = useCallback(({item}: any) => {
    return (
      <CardSchedule
        data={item}
        key={item.id}
        action={() => onClickScheduleCard(item)}
      />
    );
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {dayjs(date).locale('id').format('MMMM YYYY')}
          </Text>
        </View>
        <View style={styles.navigation}>
          <View style={styles.today_button}>
            <Text style={styles.today_text}>Hari ini</Text>
          </View>

          <View style={styles.flexRow}>
            <TouchableOpacity onPress={() => prevMonth()}>
              <Icon name="chevron-left" size={16} color={Colors.primary.base} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nextMonth()}>
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

  const renderFooter = () => {
    return (
      <View
        style={{
          marginTop: 100,
        }}
      />
    );
  };
  const onAllSelected = () => {
    const updatedTypeList = types?.map(item => {
      if (item.id) {
        return {...item, selected: true};
      }
      return item;
    });
    setTypes(updatedTypeList);
  };
  const onAllCancel = () => {
    const updatedTypeList = types?.map(item => {
      if (item.id) {
        return {...item, selected: false};
      }
      return item;
    });

    setTypes(updatedTypeList);
  };
  const onUserSelected = (id: number) => {
    const updatedTypeList = types.map(item => {
      if (item.id === id) {
        return {...item, selected: !item.selected};
      } else {
        return {...item, selected: item.selected};
      }
    });

    setTypes(updatedTypeList);
  };

  const TextType = () => {
    if (types.every((obj: any) => obj.selected === true)) {
      setTitleFilter({...titleFilter, text: 'Semua Kategori', isActive: true});
    } else if (types.some((obj: any) => obj.selected === true)) {
      types.map((obj: any) => {
        if (obj.selected === true) {
          setTitleFilter({...titleFilter, text: obj.label, isActive: true});
        }
      });
    } else {
      setTitleFilter({...titleFilter, text: 'Semua Kategori', isActive: false});
    }
  };

  React.useEffect(() => {
    TextType();
  }, [types]);

  const ChildrenClassList = () => {
    return (
      <>
        <View style={{padding: 16}}>
          <Text style={styles.titleSwipe}>Filter</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 16,
            }}>
            <Text
              style={[
                styles.titleSwipe,
                {fontSize: 14, color: Colors.dark.neutral60},
              ]}>
              Kategori
            </Text>
            <TouchableOpacity onPress={() => onAllSelected()}>
              <Text
                style={[
                  styles.titleSwipe,
                  {fontSize: 14, color: Colors.primary.base},
                ]}>
                Pilih Semua
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.onlyrow}>
            {types.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onUserSelected(item.id)}>
                  <Text
                    style={
                      item.selected === true
                        ? styles.classItemSelected
                        : styles.classItem
                    }>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.row2}>
          <Button
            label="Atur Ulang"
            outline
            style={styles.btnSwipe}
            action={() => onAllCancel()}
          />
          <Button
            label="Terapkan"
            style={styles.btnSwipe}
            action={() => {
              setSwipe(!swipe);
              fetchSchedule();
            }}
          />
        </View>
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.renderEmpty}>
        <Image
          source={require('@assets/images/ic_empty_schedule.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={styles.titleBelumAdaJadwal}>Belum ada jadwal</Text>
        <Text style={[styles.text, {textAlign: 'center'}]}>
          Buat jadwal belajar sekarang, yuk!
        </Text>
      </View>
    );
  };

  const renderCalendar = () => {
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

  const isSameDay = (day1: moment.Moment, day2: moment.Moment) => {
    return day1.isSame(day2, 'day');
  };

  const isSameMonth = (day1: moment.Moment, day2: moment.Moment) => {
    return day1.isSame(day2, 'month');
  };

  const renderDaysOfCalendar = useMemo(() => {
    let monthStart = moment(date).clone().startOf('month');
    let monthEnd = moment(date).clone().endOf('month');
    // render week
    let weekStart = moment(date).clone().startOf('week');
    let weekEnd = weekStart.clone().add(7, 'days');

    let startDate = monthStart.startOf('week');
    let endDate = monthEnd.endOf('week');
    let rows = [];

    let days = [];
    let day = type === 0 ? startDate : weekStart;

    if (type === 0) {
      while (day.isSameOrBefore(endDate, 'day')) {
        for (let i = 0; i < 7; i++) {
          const dayClone = day.clone();

          const isToday = isSameDay(dayClone, moment(date));
          days.push(
            <TouchableOpacity
              key={dayClone.format('YYYY-MM-DD')}
              onPress={() => {
                setDate(dayClone.format());
              }}
              style={[
                styles.date,
                {backgroundColor: isToday ? '#0055B8' : 'transparent'},
              ]}>
              <Text
                style={{
                  color: isToday
                    ? '#fff'
                    : isSameMonth(dayClone, moment(date))
                    ? '#1D252D'
                    : '#CED4DA',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                {dayClone.format('D')}
              </Text>
              {calendarIndicator?.map((item: any, index: number) => {
                if (item?.date === dayClone.format('YYYY-MM-DD')) {
                  return (
                    item?.active && (
                      <View key={index} style={styles.calendarIndicator} />
                    )
                  );
                }
              })}
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
        const isToday = isSameDay(dayClone, moment(date));
        days.push(
          <TouchableOpacity
            key={dayClone.format('YYYY-MM-DD')}
            style={[
              styles.date,
              {backgroundColor: isToday ? Colors.primary.base : 'transparent'},
            ]}>
            <Text
              style={{
                color: isToday ? Colors.white : Colors.dark.neutral100,
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              {dayClone.format('D')}
            </Text>
            {calendarIndicator?.map((item: any, index: number) => {
              if (item?.date === dayClone.format('YYYY-MM-DD')) {
                return (
                  item?.active && (
                    <View key={index} style={styles.calendarIndicator} />
                  )
                );
              }
            })}
          </TouchableOpacity>,
        );
        day.add(1, 'day');
      }

      return <View style={styles.row}>{days}</View>;
    }
  }, [date, type, calendarIndicator]);

  return (
    <View style={styles.container}>
      <Header label="Jadwal" />
      <ScrollView style={{flex: 1, padding: 10}}>
        {renderHeader()}
        <View>{renderCalendar()}</View>
        <View>{renderDaysOfCalendar}</View>
      </ScrollView>
      {showBottomSheet ? (
        <BottomSheet snapPoints={snapPoints} onChange={handleSheetChange}>
          <View style={styles.listHeader}>
            <Text
              style={[
                styles.text,
                {fontWeight: '700', color: Colors.black, fontSize: 14},
              ]}>
              {dayjs(date).locale('id').format('ddd, DD MMMM YYYY')}
            </Text>
            <TouchableOpacity
              onPress={() => setSwipe(!swipe)}
              style={
                titleFilter.isActive ? styles.btnFilterActive : styles.btnFilter
              }>
              <Text
                style={
                  titleFilter.isActive
                    ? styles.btnFilterTextActive
                    : styles.btnFilterText
                }>
                {titleFilter?.text}
              </Text>
              <Icon
                name="chevron-down"
                size={16}
                style={styles.margin}
                color={
                  titleFilter.isActive ? Colors.white : Colors.primary.base
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 16}}>
            <FlatList
              data={schedule?.removeDuplicate?.()}
              contentContainerStyle={{
                paddingBottom: type == 0 ? 180 : 0,
              }}
              renderItem={renderItem}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty}
            />
          </View>
        </BottomSheet>
      ) : null}
      <SwipeUp
        height={300}
        visible={swipe}
        onClose={() => setSwipe(false)}
        children={ChildrenClassList()}
      />
    </View>
  );
};

export {SchedulePTNScreen};

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  chipText: {
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary.light3,
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
  },
  titleBelumAdaJadwal: {
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  listHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    borderRadius: 30,
    color: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
    padding: 10,
  },
  renderEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  seperator: {
    borderWidth: 1,
    margin: 16,
    borderColor: Colors.dark.neutral40,
  },
  downPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
  },
  headerSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 5,
    gap: 5,
  },
  swipeList: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.primary.light3,
    color: Colors.primary.base,
    padding: 10,
    borderRadius: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  // Kalender Style
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  classItem: {
    backgroundColor: Colors.primary.light3,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    marginVertical: 5,
    marginRight: 5,
    overflow: 'hidden',
  },
  classItemSelected: {
    marginRight: 5,
    backgroundColor: Colors.primary.base,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
    marginVertical: 5,
    overflow: 'hidden',
  },
  row2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  btnSwipe: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    width: '48%',
  },
  btnLabelSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  btnSwipe2: {
    bottom: 0,
    borderRadius: 25,
    width: '48%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  onlyrow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.light2,
  },
  btnFilterActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.base,
  },
  btnFilterText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  btnFilterTextActive: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  margin: {
    marginLeft: 10,
  },
  calendarIndicator: {
    height: 4,
    width: 4,
    backgroundColor: Colors.danger.base,
    borderRadius: 2,
    alignSelf: 'center',
  },
});
