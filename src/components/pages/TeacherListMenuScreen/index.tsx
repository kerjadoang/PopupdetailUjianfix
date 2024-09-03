/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {Header} from '@components/atoms/Header';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Pengajuan, CardTeacher} from './component';
import useScreen from './useScreen';
import {
  Button,
  EmptyDisplay,
  MainView,
  ProgressCircleAttendance,
  SwipeUp,
} from '@components/atoms';
import SearchInput from '@components/atoms/SearchInput';
import EmptyMaskot from '@assets/svg/maskot_1122.svg';
import EmptyMaskot2 from '@assets/svg/robot_empty_search.svg';
import EmptyMaskot3 from '@assets/svg/maskot_1123.svg';
import DownArrow from '@assets/svg/ic_arrow_bottom_blue.svg';
import {useDispatch} from 'react-redux';
import {fetchGetUser} from '@redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';

const TeacherListMenuScreen = () => {
  const {
    navigation,
    getTeacherAttendance,
    rombelUserList,
    keyword,
    setKeyword,
    getRombelClassList,
    DatePicker,
    setValueDatePicker,
    formatedDate,
    getAttendance,
    filterClass,
    setFilterClass,
    getRombelUser,
    selectedClass,
    setSelectedClass,
    summary,
    handlerSelectAll,
    valueDatePickerTemporary,
    setValueDatePickerTemporary,
  }: any = useScreen();
  const [swipe, setSwipe] = useState({
    date: false,
    class: false,
  });

  const _hanlderSelectFilterItem = (state: any, setState: any, value: any) => {
    const removeArrayValue = () => {
      const index = state.indexOf(value);
      if (index > -1) {
        const newArr = state;
        newArr.splice(index, 1);
        return setState(() => newArr);
      }
    };
    if (state.includes(value) === true) {
      removeArrayValue();
    } else {
      setState((data: any) => [...data, value]);
    }
  };

  const dispatch: any = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Daftar Guru'} />,
    });
  }, [navigation]);

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
              Kelas
            </Text>
            <TouchableOpacity onPress={() => handlerSelectAll()}>
              <Text
                style={[
                  styles.titleSwipe,
                  {fontSize: 14, color: Colors.primary.base},
                ]}>
                Pilih Semua
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.row}>
              {getRombelClassList?.data?.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    style={{width: Dimensions.get('screen').width / 3.5}}
                    key={index}
                    onPress={() => {
                      _hanlderSelectFilterItem(
                        filterClass,
                        setFilterClass,
                        item.id,
                      );
                      _hanlderSelectFilterItem(
                        selectedClass,
                        setSelectedClass,
                        item.name,
                      );
                    }}>
                    <Text
                      style={
                        filterClass.includes(item.id)
                          ? styles.classItemSelected
                          : styles.classItem
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.row2}>
          <Button
            label="Atur Ulang"
            outline
            style={styles.btnSwipe}
            action={() => {
              setSelectedClass([]);
              setFilterClass([]);
            }}
          />
          <Button
            label="Terapkan"
            style={styles.btnSwipe}
            action={() => {
              setSwipe({...swipe, class: false});
              getRombelUser();
            }}
          />
        </View>
      </>
    );
  };
  const ChildrenDatePicker = () => {
    return (
      <View style={styles.containerSwipeUp}>
        <Text style={styles.titleSwipe}>{'Pilih Tanggal'}</Text>
        <DatePicker
          selected={valueDatePickerTemporary}
          onChange={setValueDatePickerTemporary}
        />
        <View style={styles.row2}>
          <Button
            label="Atur Ulang"
            style={styles.btnSwipe2}
            outline
            action={() => {
              setValueDatePicker({
                date: dayjs().get('date'),
                month: dayjs().get('month') + 1,
                year: dayjs().get('year'),
              });
              setSwipe({...swipe, date: false});
            }}
          />
          <Button
            label="Terapkan"
            style={styles.btnSwipe2}
            action={() => {
              setSwipe({...swipe, date: false});
              setValueDatePicker(valueDatePickerTemporary);
              getAttendance();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pengajuan
          action={() => {
            dispatch(
              fetchGetUser((res: any) => {
                if (res?.data?.code === 100) {
                  if (res?.data?.data?.user_type_id === 4) {
                    navigation.navigate('TeacherAbsenceHistoryScreen', {
                      role: 'kepsek',
                    });
                  } else {
                    navigation.navigate('TeacherAbsenceApplicationScreen');
                  }
                } else {
                  Toast?.show({
                    type: 'error',
                    text1:
                      res?.data?.message ??
                      'Terjadi kesalahan pada sistem kami',
                  });
                }
              }),
            );
          }}
        />
        <View style={styles.summaryContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleSummary}>Ringkasan Kehadiran</Text>
            <TouchableOpacity
              style={[styles.allClassBtn, {marginVertical: 0}]}
              onPress={() => setSwipe({...swipe, date: true})}>
              <Text style={styles.allClassBtnText}>{formatedDate}</Text>
              <DownArrow width={20} height={15} />
            </TouchableOpacity>
          </View>
          {summary ? (
            <>
              <View>
                <ProgressCircleAttendance
                  progress={getTeacherAttendance?.data?.attend_percentage || 0}
                  color={Colors.primary.base}
                  children={
                    <View>
                      <Text>
                        {getTeacherAttendance?.data?.attend +
                          getTeacherAttendance?.data?.absent || 0}{' '}
                        Guru
                      </Text>
                    </View>
                  }
                />
              </View>
              <MainView flexDirection="row" marginTop={16}>
                <View
                  style={[
                    styles.itemAttendance,
                    {
                      borderRightWidth: 1,
                      borderRightColor: Colors.dark.neutral40,
                    },
                  ]}>
                  <Text style={styles.attendanceData}>
                    {getTeacherAttendance?.data?.attend || 0} Guru (
                    {Math.round(
                      getTeacherAttendance?.data?.attend_percentage,
                    ) || 0}
                    %)
                  </Text>
                  <Text
                    style={[
                      styles.attendanceDesc,
                      {color: Colors.success.base},
                    ]}>
                    Hadir
                  </Text>
                </View>
                <View style={styles.itemAttendance}>
                  <Text style={styles.attendanceData}>
                    {getTeacherAttendance?.data?.absent || 0} Guru (
                    {Math.round(
                      getTeacherAttendance?.data?.absent_percentage,
                    ) || 0}
                    %)
                  </Text>
                  <Text
                    style={[
                      styles.attendanceDesc,
                      {color: Colors.danger.base},
                    ]}>
                    Tidak Hadir
                  </Text>
                </View>
              </MainView>
            </>
          ) : (
            <EmptyDisplay
              imageSvg={<EmptyMaskot width={120} height={100} />}
              desc={'Belum ada ringkasan kehadiran, silakan cari tanggal lain'}
            />
          )}
        </View>
        <View style={styles.daftarGuruContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleSummary}>Daftar Guru</Text>
            <Text style={styles.guruCount}>
              {rombelUserList?.data?.rombel_user?.length !==
              rombelUserList?.data?.rombel_user_amount
                ? rombelUserList?.data?.rombel_user?.length
                : rombelUserList?.data?.rombel_user_amount || 0}{' '}
              Guru
            </Text>
          </View>
          <SearchInput
            query={keyword}
            onChangeText={(text: string) => {
              setKeyword(text);
            }}
            onClear={() => setKeyword('')}
            onSubmit={Keyboard.dismiss}
            placeholder="Cari nama guru/NIK"
          />
          <TouchableOpacity
            style={
              filterClass.length === 0
                ? styles.allClassBtn
                : styles.allClassBtnActive
            }
            onPress={() => setSwipe({...swipe, class: true})}>
            <Text
              style={
                filterClass.length === 0
                  ? styles.allClassBtnText
                  : styles.allClassBtnTextActive
              }>
              {filterClass.length > 1
                ? `${filterClass.length} Kelas`
                : filterClass.length === 1
                ? selectedClass?.[0]
                : 'Semua Kelas'}
            </Text>
            <Icon
              name="chevron-down"
              size={13}
              color={
                filterClass.length === 0 ? Colors.primary.base : Colors.white
              }
            />
          </TouchableOpacity>
          {rombelUserList?.data?.rombel_user?.length > 0 ? (
            <View>
              {rombelUserList?.data?.rombel_user.map(
                (item: any, index: number) => {
                  return (
                    <CardTeacher
                      key={index}
                      img={item.avatar}
                      name={item.full_name}
                      nik={item.registration_number}
                      className={item?.user_rombel?.map(
                        (_item: any, index: number) => {
                          return (
                            <Text key={index}>
                              {_item.rombel_class_school_name},{' '}
                            </Text>
                          );
                        },
                      )}
                      action={() => {
                        navigation.navigate('DetailTeacherScreen', {
                          data: item,
                          id: item?.id,
                        });
                      }}
                    />
                  );
                },
              )}
            </View>
          ) : (
            <EmptyDisplay
              imageSvg={
                keyword ? (
                  <EmptyMaskot2 width={120} height={100} />
                ) : (
                  <EmptyMaskot3 width={120} height={100} />
                )
              }
              title={keyword ? 'Pencarian Tidak Ditemukan' : null}
              desc={
                keyword
                  ? `Hasil Pencarian "${keyword}" nihil \n Coba masukkan kata kunci lainnya`
                  : 'Belum ada guru yang terdaftar'
              }
            />
          )}
        </View>
      </ScrollView>
      <SwipeUp
        height={400}
        onClose={() => setSwipe({...swipe, date: false, class: false})}
        visible={swipe.date}
        children={ChildrenDatePicker()}
      />
      <SwipeUp
        height={400}
        onClose={() => setSwipe({...swipe, date: false, class: false})}
        visible={swipe.class}
        children={ChildrenClassList()}
      />
    </View>
  );
};

export {TeacherListMenuScreen};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    borderTopColor: Colors.dark.neutral10,
    borderBottomColor: Colors.dark.neutral10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    marginVertical: 16,
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  titleSummary: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  guruCount: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  allClassBtn: {
    borderRadius: 15,
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allClassBtnActive: {
    borderRadius: 15,
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allClassBtnText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    marginRight: 10,
  },
  allClassBtnTextActive: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
    marginRight: 10,
  },
  daftarGuruContainer: {},
  itemAttendance: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceDesc: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  attendanceData: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },

  classItem: {
    backgroundColor: Colors.primary.light3,
    padding: 5,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    marginVertical: 5,
    overflow: 'hidden',
  },
  classItemSelected: {
    backgroundColor: Colors.primary.base,
    padding: 5,
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
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  containerSwipeUp: {
    padding: 10,
    width: '100%',
    height: 316,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
});
