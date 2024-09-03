import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {CardClassSession, PopUpWithIcon, SwipeUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import BottomSheet from '@gorhom/bottom-sheet';
import useFormSchedule from './useFormSchedule';
import Colors from '@constants/colors';
import Ic_trash from '@assets/svg/ic24_trash.svg';
import Ic_edit from '@assets/svg/ic24_edit_2.svg';
import Logo from '@assets/svg/ic_logo_delete.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import moment from 'moment';
import {
  ScheduleItemProject,
  ScheduleItemSessionClass,
  ScheduleItemVirtualMeeting,
  ScheduleItemPrivateLearning,
  ScheduleItemTeacherSession,
  ScheduleItemUAS,
  ScheduleItemQuestionSession,
  Button,
} from '@components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import SnackbarResult from '@components/atoms/SnackbarResult';
import Fonts from '@constants/fonts';
import dayjs from 'dayjs';
import {
  isStringContains,
  removeDuplicatesByKey,
  showErrorToast,
} from '@constants/functional';
import {CardLiveClassSchedule} from '@components/pages/PTNScreen/component/CardLiveClassSchedule';
import {getDetailRecording} from '@components/pages/PTNLiveClassRecordScreen/utils';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {LMSPRTugasIsScheduled} from '@components/pages/LMSPRTugasScreen/useTaskDetail';

const blackListFilterCategoryByRole: AccountRole[] = ['ADMIN', 'KEPSEK'];

const FormSchedule = () => {
  const {
    navigation,
    schedule,
    type,
    popUp,
    setPopUp,
    modalVisible,
    setModalVisible,
    snapPoints,
    handleSheetChange,
    setDate,
    date,
    listDay,
    prevMonth,
    nextMonth,
    SCHEDULE_TYPE,
    filter,
    tempFilter,
    setTempFilter,
    setDataFilter,
    terapkanFilter,
    selectAllFilter,
    options,
    setOptions,
    deleteSchedule,
    snakbar,
    setSnakbar,
    subLabel,
    calendarIndicator,
    params,
    refetchSchedule,
    accountRole,
  } = useFormSchedule();

  const renderItem = useCallback(
    ({item, index}: {item: ISchedule; index: number}) => {
      const isFromParent = accountRole === 'ORANG-TUA';
      if (item?.type?.toLowerCase() === 'belajar mandiri') {
        return (
          <ScheduleItemPrivateLearning
            data={item}
            params={params}
            button={!isFromParent}
          />
        );
      }

      if (item?.type?.toLowerCase() === 'sesi kelas guru') {
        return (
          <ScheduleItemTeacherSession
            key={index}
            data={item}
            button={!isFromParent}
            // buttonAction={() => console.log('')}
          />
        );
      }

      if (item?.type?.toLowerCase() === 'sesi kelas ptn') {
        return (
          <CardClassSession
            button={!isFromParent}
            title={item?.subject_ptn?.name ?? (item?.subject?.name || '')}
            keys={Number(item?.ID) || 0}
            key={index}
            subtitle={item?.description || ''}
            time={item?.time_start}
            isLive
            onJoin={() => {}}
            mentor={item?.user?.full_name || ''}
          />
        );
      }

      if (item?.type?.toLowerCase() === 'sesi tanya') {
        return (
          <ScheduleItemQuestionSession
            data={item}
            key={index}
            buttonText={'Tanya'}
            button={!isFromParent}
            buttonAction={() => navigation.navigate('AskScreen')}
          />
        );
      }

      if (item?.filter_category?.toLowerCase() === 'ujian') {
        return (
          <ScheduleItemUAS
            data={item}
            key={index}
            startDate={date.toString()}
            accountRole={accountRole}
            button={
              (accountRole === 'GURU' ? true : item?.start_exam_button) &&
              !isFromParent
            }
            buttonText={accountRole === 'GURU' ? 'Monitor' : 'Kerjakan'}
            buttonAction={async (type: ScheduleType) => {
              if (accountRole === 'MURID') {
                return navigation.navigate('LMSUjianTestCameraScreen', {
                  data: item,
                });
              }

              if (type === 'ON_GOING') {
                return navigation.navigate('MonitoringExamGuruScreen', {
                  subTitle: `${item?.rombel_class} • ${item?.title}`,
                  data: item,
                });
              }

              if (type === 'EXPIRED_DONE_SCORING') {
                const detailUjian = await apiGet({
                  url: URL_PATH.get_detail_jadwal_ujian(item?.id_relation),
                  tags: 'getDetaulUjian',
                });

                return navigation.navigate('DetailTaskScreenTeacher', {
                  id: detailUjian?.exam_schedule?.id,
                  data: detailUjian?.exam_schedule,
                  isFromTeacher: true,
                });
              }

              return navigation.navigate('ExamDetailGuruScreen', {
                exam_id: item.id_relation,
              });
            }}
            refetchData={refetchSchedule}
          />
        );
      }

      if (item?.type?.toLowerCase() === 'sesi kelas') {
        return (
          <ScheduleItemSessionClass
            key={index}
            data={item}
            login={params?.murid || ''}
            feature={params?.feature || ''}
            button={!isFromParent}
            buttonText={'Gabung'}
            action={() =>
              navigation.navigate('ClassSessionDetailScreen', {
                id: item?.id_relation,
              })
            }
          />
        );
      }

      if (item?.type?.toLowerCase() === 'rapat virtual') {
        return (
          <ScheduleItemVirtualMeeting
            key={index}
            data={item}
            button={!isFromParent}
            action={() => {
              item.id = item.id_relation;
              item.time_end = item.time_finish;
              return navigation.navigate('RapatVirtualTestCamerascreen', {
                data: item,
              });
            }}
          />
        );
      }

      if (
        item?.type?.toLowerCase() === 'projek' ||
        item?.type?.toLowerCase() === 'pr' ||
        item?.type?.toLowerCase() === 'tugas'
      ) {
        const isShowButton = !isFromParent && LMSPRTugasIsScheduled(item);
        return (
          <ScheduleItemProject
            navigation={navigation}
            key={index}
            data={item}
            button={isShowButton}
            userRole={accountRole}
          />
        );
      }

      if (isStringContains(item?.type || '', 'live class')) {
        return (
          <CardLiveClassSchedule
            data={item}
            button={!isFromParent}
            action={async () => {
              if (!isStringContains(item?.status || '', 'finish')) {
                return navigation.navigate('PTNLiveClassHomeScreen');
              }

              try {
                const rekamanData = await getDetailRecording(
                  item?.id || 0,
                  'ptn',
                );
                navigation.navigate('VideoAnimationScreen', {
                  chapterData: rekamanData,
                  type: 'PTN',
                });
              } catch (error) {
                showErrorToast('Data tidak ditemukan');
              }
            }}
          />
        );
      }
      return <></>;
    },
    [accountRole, date, navigation, params, refetchSchedule],
  );

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{moment(date).format('MMMM YYYY')}</Text>
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

  const filteringData = () => {
    const filteredData = schedule?.filter(item => {
      const itemTypes: any[] = filter.map(type => {
        const foundType = SCHEDULE_TYPE?.find(scheduleType =>
          isStringContains(scheduleType.name, type),
        );
        return foundType?.value;
      });

      const itemsConcat =
        itemTypes?.reduce((prev, next) => prev.concat(next)) || [];
      // return itemsConcat?.includes(item?.type?.toLowerCase());
      return isStringContains(item?.type, '', itemsConcat);
    });

    return filteredData || [];
  };

  const mappedScheduleData =
    filter?.length >= 1 ? filteringData() : schedule || [];

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
              key={dayClone.format('YYYY-MM-DD') + Math.random()}
              onPress={() => {
                const currentDatePick = moment()
                  .set('date', dayClone.date())
                  .format('YYYY-MM-DD HH:mm');
                setDate(currentDatePick);
              }}
              style={[
                styles.date,
                {backgroundColor: isToday ? '#0055B8' : 'transparent'},
              ]}>
              <View>
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
              </View>
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
      return <View key={Math.random()}>{rows}</View>;
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
            <View>
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
            </View>
          </TouchableOpacity>,
        );
        day.add(1, 'day');
      }

      return <View style={styles.row}>{days}</View>;
    }
  }, [date, type, calendarIndicator, setDate]);
  return (
    <View style={styles.container}>
      <Header label="Jadwal" subLabel={subLabel || ''} />
      <ScrollView style={styles.scrollView}>
        {renderHeader()}
        <View>{renderCalendar()}</View>
        <View>{renderDaysOfCalendar}</View>
      </ScrollView>
      <BottomSheet snapPoints={snapPoints} onChange={handleSheetChange}>
        <View style={styles.listHeader}>
          <Text
            style={[
              styles.text,
              {fontWeight: '700', color: Colors.black, fontSize: 14},
            ]}>
            {dayjs(date.toString()).locale('ID').format('dddd, DD MMMM YYYY')}
          </Text>
          {!isStringContains(
            params?.loginAs || 'MURID',
            undefined,
            blackListFilterCategoryByRole,
          ) ? (
            <TouchableOpacity
              onPressIn={() => {
                setModalVisible(true);
                setTempFilter(filter);
              }}
              style={
                filter?.length >= 1
                  ? styles.downPickerActive
                  : styles.downPicker
              }>
              <Text
                style={
                  filter?.length >= 1
                    ? [(styles.text, styles.subTextWhite)]
                    : [(styles.text, styles.subText)]
                }>
                {' '}
                {filter.length > 1 &&
                  filter.length <= 5 &&
                  `${filter.length} Kategori`}
                {filter.length === 1 && filter}
                {filter.length > 5 && 'Semua Kategori'}
                {filter.length === 0 && 'Semua Kategori'}
              </Text>
              <Icons
                name="chevron-down"
                size={20}
                color={filter?.length >= 1 ? Colors.white : Colors.primary.base}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{padding: 16}}>
          <FlatList<ISchedule>
            data={removeDuplicatesByKey(mappedScheduleData, 'id')}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={{paddingBottom: type === 0 ? 250 : 20}}
          />
        </View>
      </BottomSheet>
      <View
        style={{
          backgroundColor: Colors.white,
          padding: 16,
        }}>
        <Button
          icon={require('@assets/images/ic24_plus_round.png')}
          label={'Buat Jadwal'}
          action={() =>
            params?.loginAs === 'ORANG-TUA'
              ? navigation.navigate('FormCreateScheduleOnParentScreen', {
                  filter: params?.filter,
                  screen: params?.screen,
                  loginAs: params?.loginAs,
                  token: params?.token,
                  data: params?.data,
                })
              : navigation.navigate('CreateScheduleScreen')
          }
        />
      </View>

      {modalVisible ? (
        <SwipeUp
          height={300}
          onClose={() => setModalVisible(false)}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.title}>Filter</Text>
              <View style={styles.headerSwipe}>
                <Text style={styles.text}>Kategori</Text>
                <Pressable onPress={selectAllFilter}>
                  <Text style={styles.subText}>Pilih Semua</Text>
                </Pressable>
              </View>
              <View style={styles.contentSwipe}>
                {SCHEDULE_TYPE?.map(item => {
                  let active = tempFilter.includes(item?.name);

                  return (
                    <Pressable
                      onPress={() => setDataFilter(item?.name)}
                      key={item?.id}
                      style={[
                        styles.chipContainer,
                        {
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item?.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.contentSwipe}>
                <Button
                  label="Atur Ulang"
                  outline
                  action={() => setTempFilter([])}
                  style={{width: 120}}
                />
                <Button
                  label="Terapkan"
                  action={() => {
                    terapkanFilter();
                    setModalVisible(false);
                  }}
                  style={{width: 120}}
                />
              </View>
            </View>
          }
          visible
        />
      ) : null}

      {options.status ? (
        <SwipeUp
          height={500}
          onClose={() => setOptions({...options, id: 0, status: false})}
          children={
            <View style={{padding: 20}}>
              <TouchableOpacity
                onPressIn={() => navigation.navigate('CreateScheduleScreen')}
                style={styles.optionItem}>
                <Ic_edit width={24} height={24} />
                <Text style={[styles.text, {marginLeft: 10}]}>Ubah Jadwal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPressIn={async () => {
                  await setOptions({...options, status: false});
                  await setPopUp(true);
                }}>
                <Ic_trash width={24} height={24} />
                <Text style={[styles.text, {marginLeft: 10}]}>
                  Hapus Jadwal
                </Text>
              </TouchableOpacity>
            </View>
          }
          visible
        />
      ) : null}
      {popUp ? (
        <PopUpWithIcon
          twoButton
          title={'Hapus Jadwal'}
          desc={'Apakah kamu yakin untuk menghapus jadwal belajar mandiri ini?'}
          action={() => setPopUp(false)}
          action_2={() => deleteSchedule()}
          textButton={'Kembali'}
          textButton_2={'Hapus'}
          icon
          iconName={<Logo width={100} height={100} />}
        />
      ) : null}

      <View style={{elevation: 1, bottom: -20}}>
        <SnackbarResult
          label={'Jadwal berhasil dihapus.'}
          visible={snakbar}
          onPressClose={() => {
            setSnakbar(false);
          }}
        />
      </View>
    </View>
  );
};

export default FormSchedule;

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
  scrollView: {
    flex: 1,
    padding: 10,
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
  subTextWhite: {
    borderRadius: 30,
    color: Colors.white,
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
  downPickerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.base,
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
  calendarIndicator: {
    height: 4,
    width: 4,
    backgroundColor: Colors.danger.base,
    borderRadius: 2,
    alignSelf: 'center',
  },
});
