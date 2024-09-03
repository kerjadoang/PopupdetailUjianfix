/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import useScreen from './useScreen';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {EmptyDisplay} from '@components/atoms/EmptyDisplay';
import SearchInput from '@components/atoms/SearchInput';
import {
  Button,
  DatePicker,
  MainView,
  ProgressCircleAttendance,
  SwipeUp,
} from '@components/atoms';
import {CardStudent} from './component';

import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import Arrow from '@assets/svg/ic_arrow_grey_right.svg';
import EmptyMaskot from '@assets/svg/maskot_1122.svg';
import EmptyMaskot2 from '@assets/svg/robot_empty_search.svg';
import EmptyMaskot3 from '@assets/svg/maskot_1123.svg';
import CheckBlue from '@assets/svg/check_blue_icon.svg';
import dayjs from 'dayjs';
import {rdxDispatch} from '@constants/functional';
import {getRombelClassListDestroy} from '@redux';
import {FlatList} from 'react-native-gesture-handler';

const StudentListMenuScreen = () => {
  const navigation: any = useNavigation();
  const {
    summary,
    keyword,
    setKeyword,
    setQuery,
    getRombelClassList,
    getStudentAttendance,
    classData,
    setClassData,
    getStudentInRombel,
    showSwipe,
    setShowSwipe,
    classByDegree,
    formatedDate,
    valueDatePicker,
    getAttendance,
    setValueDatePicker,
    currentRombel,
    setCurrentRombel,
    searchFocus,
    setSearchFocus,
  } = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          onPressIconLeft={() => {
            rdxDispatch(getRombelClassListDestroy());
            navigation.goBack();
          }}
          labelContent={
            <View style={styles.headerContent}>
              <Text style={styles.headerLabel}>Daftar Murid</Text>
              <TouchableOpacity
                onPress={() =>
                  setShowSwipe({...showSwipe, class: true, date: false})
                }>
                <ArrowDown />
              </TouchableOpacity>
            </View>
          }
          subLabel={classData?.name}
        />
      ),
    });
  }, [classData]);

  const ChildrenDatePicker = () => {
    return (
      <View style={{padding: 10, width: '100%', height: 400}}>
        <Text style={styles.titleSwipe}>Pilih Tanggal</Text>
        <DatePicker selected={valueDatePicker} onChange={setValueDatePicker} />
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
              setShowSwipe({...showSwipe, class: false, date: false});
            }}
          />
          <Button
            label="Terapkan"
            style={styles.btnSwipe2}
            action={() => {
              setShowSwipe({...showSwipe, class: false, date: false});
              getAttendance();
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.classHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MainView flexDirection="row" gap={16}>
            {getRombelClassList?.data?.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentRombel(item);
                  }}
                  key={index}
                  style={
                    currentRombel?.rombel_id === index + 1
                      ? styles.itemSelected
                      : styles.item
                  }>
                  <Text
                    style={
                      currentRombel?.rombel_id === index + 1
                        ? styles.textItemSelected
                        : styles.textItem
                    }>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </MainView>
        </ScrollView>
      </View>
      {!searchFocus ? (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.titleSummary}>Ringkasan Kehadiran</Text>
            <TouchableOpacity
              style={styles.btnDate}
              onPress={() => setShowSwipe({...showSwipe, date: true})}>
              <Text style={styles.btnDateText}>{formatedDate}</Text>
              <ArrowDown />
            </TouchableOpacity>
          </View>
          {summary ? (
            <>
              <ProgressCircleAttendance
                progress={getStudentAttendance?.data?.attend_percentage || 0}
                color={Colors.primary.base}
                children={
                  <View>
                    <Text>
                      {getStudentInRombel?.data?.rombel_user_amount || 0} Murid
                    </Text>
                  </View>
                }
              />
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.itemAttendance,
                    {
                      borderRightWidth: 1,
                      borderRightColor: Colors.dark.neutral40,
                    },
                  ]}>
                  <Text style={styles.attendanceData}>
                    {getStudentAttendance?.data?.attend_count || 0} Murid (
                    {getStudentAttendance?.data?.attend_percentage || 0}%)
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
                    {getStudentAttendance?.data?.absent_count || 0} Murid (
                    {getStudentAttendance?.data?.absent_percentage || 0}%)
                  </Text>
                  <Text
                    style={[
                      styles.attendanceDesc,
                      {color: Colors.danger.base},
                    ]}>
                    Tidak Hadir
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <EmptyDisplay
              imageSvg={<EmptyMaskot width={120} height={100} />}
              desc={'Belum ada ringkasan kehadiran, silakan cari tanggal lain'}
            />
          )}
        </View>
      ) : null}
      <View style={styles.flex1}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleSummary}>Daftar Murid</Text>
          <Text style={styles.guruCount}>
            {getStudentInRombel?.data?.rombel_user_amount || 0} Murid
          </Text>
        </View>
        <SearchInput
          query={keyword}
          onChangeText={function (text: string): void {
            setKeyword(text);
          }}
          onClear={() => {
            Keyboard.dismiss();
            setKeyword('');
            setQuery('');
            setSearchFocus(false);
          }}
          onSubmit={() => {
            Keyboard.dismiss();
            setQuery(keyword);
            setSearchFocus(false);
          }}
          placeholder="Cari nama murid/NIS"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />

        <FlatList
          contentContainerStyle={styles.flexGrow1}
          data={getStudentInRombel?.data?.rombel_user}
          ListEmptyComponent={
            <EmptyDisplay
              imageSvg={
                keyword ? (
                  <EmptyMaskot2 width={120} height={100} />
                ) : (
                  <EmptyMaskot3 width={120} height={100} />
                )
              }
              title={keyword ? 'Pencarian Tidak Ditemukan' : ''}
              desc={
                keyword
                  ? `Hasil Pencarian "${keyword}" nihil \n Coba masukkan kata kunci lainnya`
                  : 'Belum ada murid yang terdaftar di kelas ini'
              }
            />
          }
          renderItem={({item, index}) => {
            return (
              <CardStudent
                key={index}
                img={item.avatar}
                name={item.full_name}
                nik={item.registration_number}
                action={() =>
                  navigation.navigate('StudentDetailScreen', {
                    id_student: item.id,
                  })
                }
              />
            );
          }}
        />
      </View>
      <SwipeUp
        height={600}
        visible={showSwipe.class}
        isSwipeLine={true}
        onClose={() => setShowSwipe({...showSwipe, date: false, class: false})}
        children={
          <>
            <View style={styles.containerSwipe}>
              <Text style={styles.titleSwipe}>Daftar Kelas</Text>
              <ScrollView>
                {classByDegree?.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.itemClass}
                      onPress={() => {
                        setClassData({
                          ...classData,
                          id: item.id,
                          name: item.name,
                        });
                        setTimeout(() => {
                          setShowSwipe({
                            ...showSwipe,
                            date: false,
                            class: false,
                          });
                        }, 2000);
                      }}>
                      <Text
                        style={[
                          styles.titleSwipe,
                          {fontSize: 14, marginVertical: 0},
                        ]}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {classData.id === item.id ? (
                          <CheckBlue style={{marginRight: 7}} />
                        ) : null}
                        <Arrow />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <TouchableOpacity
                style={styles.btnSwipe}
                onPress={() =>
                  setShowSwipe({...showSwipe, date: false, class: false})
                }>
                <Text style={styles.btnSwipeLabel}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <SwipeUp
        height={600}
        visible={showSwipe.date}
        onClose={() => setShowSwipe({...showSwipe, date: false, class: false})}
        children={ChildrenDatePicker()}
      />
    </View>
  );
};
export {StudentListMenuScreen};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    flex: 1,
    padding: 16,
  },
  classHeader: {
    width: '100%',
    paddingVertical: 12,
  },
  row2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemSelected: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 2,
  },
  item: {},
  textItemSelected: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  textItem: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
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
  itemAttendance: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceData: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  headerContent: {flexDirection: 'row', alignItems: 'center'},
  headerLabel: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  attendanceDesc: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  containerSwipe: {
    height: 600,
    padding: 16,
    backgroundColor: Colors.white,
    paddingBottom: 55,
  },
  btnSwipe: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.primary.base,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnSwipe2: {
    bottom: 0,
    borderRadius: 25,
    width: '48%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    marginVertical: 16,
  },
  itemClass: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 5,
    alignItems: 'center',
  },
  btnSwipeLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
  },
  btnDate: {
    backgroundColor: Colors.primary.light2,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnDateText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
  },
  btnLabelSwipe: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
    textAlign: 'center',
  },
});
