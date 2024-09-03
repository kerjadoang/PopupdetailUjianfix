/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useScreen} from './useScreen';
import {
  Button,
  EmptyDisplay,
  Header,
  MainView,
  SwipeUp,
} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import SearchInput from '@components/atoms/SearchInput';
import {CardRaport, CardStudent} from './component';
import EmptyMaskot2 from '@assets/svg/maskot_1123.svg';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import useDebounce from '@hooks/useDebounce';
import {fetchStudentInRombel} from '@redux';

const MenuRaporByClassScreen = () => {
  const {
    navigation,
    getRombelClassList,
    selectedClass,
    setSelectedClass,
    getStudentInRombel,
    keyword,
    setKeyword,
    isHistory,
    year,
    phase,
    setPhase,
    classData,
    swipe,
    setSwipe,
    _handlerShowSwipe,
    academicYearOngoing,
    rombel,
    setRombel,
    selectedStudent,
    setSelectedStudent,
    raporHistoryList,
    getRaporHistory,
    getUser,
    getCheckStudentERaport,
    checkStudentERaport,
    setCheckStudentERaport,
    setShowChooseRapor,
    showChooseRapor,
    dispatch,
  }: any = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={!isHistory ? 'Rapor Sekolah' : `Rapor ${classData.name}`}
          subLabel={!isHistory ? year.name : `Tahun Ajaran ${year.name}`}
        />
      ),
    });
  }, [navigation]);

  const query = useDebounce(keyword, 150);

  const ChildrenSwipe = () => {
    return (
      <>
        <View style={{height: 250, padding: 16}}>
          <Text style={[styles.titleSummary, {textAlign: 'center'}]}>
            Filter
          </Text>
          <Text style={styles.greyText}>{swipe.type}</Text>
          <View>
            {swipe.type === 'Semester' ? (
              <View
                style={[styles.classHeader, {justifyContent: 'flex-start'}]}>
                {academicYearOngoing?.data?.data?.academic_phase?.map(
                  (item: any, index: number) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          phase.id === item.id
                            ? styles.btnFilterSelected
                            : styles.btnFilter
                        }
                        onPress={() => {
                          setPhase({...phase, id: item.id, name: item.type});
                        }}>
                        <Text
                          style={
                            phase.id === item.id
                              ? styles.textBtnFilterSelected
                              : [
                                  styles.textBtnFilter,
                                  {fontFamily: Fonts.RegularPoppins},
                                ]
                          }>
                          {item.type}
                        </Text>
                      </TouchableOpacity>
                    );
                  },
                )}
              </View>
            ) : (
              <View
                style={[
                  styles.classHeader,
                  {justifyContent: 'flex-start', flexWrap: 'wrap'},
                ]}>
                {getRombelClassList?.data?.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={
                        rombel.id === item.id
                          ? styles.btnFilterSelected
                          : styles.btnFilter
                      }
                      onPress={() => {
                        setRombel({...rombel, id: item.id, name: item.name});
                      }}>
                      <Text
                        style={
                          rombel.id === item.id
                            ? styles.textBtnFilterSelected
                            : [
                                styles.textBtnFilter,
                                {fontFamily: Fonts.RegularPoppins},
                              ]
                        }>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        <View style={styles.btnSwipeContainer}>
          <Button
            label="Terapkan"
            action={() => {
              getRaporHistory();
              setSwipe({...swipe, show: false, type: ''});
            }}
          />
        </View>
      </>
    );
  };
  const ChildrenChooseRapor = () => {
    const isHasData = checkStudentERaport?.ganjil && checkStudentERaport?.genap;
    return (
      <View style={{height: 300, padding: 16}}>
        <Text style={[styles.titleSummary, {textAlign: 'center'}]}>
          Pilih Rapor
        </Text>
        {isHasData ? (
          <View>
            <CardRaport
              isGanjil={true}
              isAvailable={checkStudentERaport?.ganjil?.choose}
              action={() => {
                setShowChooseRapor(false);
                navigation.navigate('MenuRaporPreviewScreen', {
                  raporId:
                    checkStudentERaport?.ganjil
                      ?.assessment_erapor_share_student_id,
                  studentName: selectedStudent?.name,
                });
              }}
            />
            <CardRaport
              isGanjil={false}
              isAvailable={checkStudentERaport?.genap?.choose}
              action={() => {
                setShowChooseRapor(false);
                navigation.navigate('MenuRaporPreviewScreen', {
                  raporId:
                    checkStudentERaport?.ganjil
                      ?.assessment_erapor_share_student_id,
                  studentName: selectedStudent?.name,
                });
              }}
            />
          </View>
        ) : (
          <MainView flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </MainView>
        )}
      </View>
    );
  };

  const handleTextChange = (text: String) => {
    setKeyword(text);
  };

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchStudentInRombel(selectedClass.rombel, keyword));
    }
  }, [dispatch, selectedClass.rombel, query]);

  return (
    <View style={styles.body}>
      {!isHistory ? (
        <>
          <View style={styles.classHeader}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {getRombelClassList?.data?.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedClass({
                        ...selectedClass,
                        id: index,
                        rombel: item.id,
                      });
                    }}
                    key={index}
                    style={
                      selectedClass.id === index
                        ? styles.itemSelected
                        : styles.item
                    }>
                    <Text
                      style={
                        selectedClass.id === index
                          ? styles.textItemSelected
                          : styles.textItem
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.titleSummary}>Daftar Murid</Text>
            <Text style={styles.guruCount}>
              {getStudentInRombel?.data?.rombel_user_amount || 0} Murid
            </Text>
          </View>
          <SearchInput
            query={keyword}
            onChangeText={handleTextChange}
            onClear={() => setKeyword('')}
            placeholder={'Cari nama murid/NIS'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </>
      ) : (
        <View style={[styles.classHeader, {justifyContent: 'flex-start'}]}>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => setSwipe({...swipe, show: true, type: 'Rombel'})}>
            <Text style={styles.textBtnFilter}>{rombel.name}</Text>
            <ArrowDown />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => setSwipe({...swipe, show: true, type: 'Semester'})}>
            <Text style={styles.textBtnFilter}>Semester {phase.name}</Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>
      )}
      {!isHistory ? (
        <View>
          {getStudentInRombel?.data?.rombel_user?.length > 0 ? (
            <>
              <ScrollView>
                {getStudentInRombel?.data?.rombel_user?.map(
                  (item: any, index: number) => {
                    return (
                      <CardStudent
                        key={index}
                        img={item?.path_url}
                        name={item?.full_name}
                        nik={item?.registration_number}
                        action={() => {
                          setShowChooseRapor(true);
                          getCheckStudentERaport(
                            item?.id,
                            selectedClass?.rombel,
                            year?.id,
                            getUser?.data?.school?.id,
                          );
                          setSelectedStudent({
                            id: item?.id,
                            name: item?.full_name,
                          });
                        }}
                      />
                    );
                  },
                )}
              </ScrollView>
            </>
          ) : (
            <EmptyDisplay
              imageSvg={<EmptyMaskot2 width={120} height={100} />}
              desc={'Belum ada murid yang terdaftar'}
            />
          )}
        </View>
      ) : (
        <View>
          {raporHistoryList?.data?.rapors?.length > 0 ? (
            <View>
              {raporHistoryList?.data?.rapors.map(
                (item: any, index: number) => {
                  return (
                    <>
                      <CardStudent
                        isHistory
                        key={index}
                        name={item.full_name}
                        nik={item?.nis?.slice(5)}
                        desc={item.share_date}
                        action={() => {
                          item.phases?.map((_item: any) => {
                            if (_item.id === phase.id && _item.is_available) {
                              return navigation.navigate(
                                'MenuRaporPreviewScreen',
                                {
                                  raporId: _item.rapor_id,
                                  studentName: item.full_name,
                                },
                              );
                            }
                          });
                        }}
                      />
                    </>
                  );
                },
              )}
            </View>
          ) : (
            <EmptyDisplay
              imageSvg={<EmptyMaskot2 width={120} height={100} />}
              desc={'Belum ada rapor yang di bagikan'}
            />
          )}
        </View>
      )}
      <SwipeUp
        visible={_handlerShowSwipe()}
        height={300}
        onClose={() => {
          setSwipe({...swipe, show: false, type: ''});
        }}
        children={<ChildrenSwipe />}
      />
      <SwipeUp
        visible={showChooseRapor}
        height={500}
        onClose={() => {
          setShowChooseRapor(false);
          setCheckStudentERaport([]);
        }}
        children={<ChildrenChooseRapor />}
      />
    </View>
  );
};
export {MenuRaporByClassScreen};
const styles = StyleSheet.create({
  body: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  itemSelected: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 2,
    paddingHorizontal: 16,
  },
  item: {
    paddingHorizontal: 16,
  },
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
  classHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.light2,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
    marginVertical: 5,
  },
  btnFilterSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
    marginVertical: 5,
  },
  textBtnFilter: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  textBtnFilterSelected: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
  },
  btnSwipeContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    width: '100%',
  },
  greyText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
  },
});
