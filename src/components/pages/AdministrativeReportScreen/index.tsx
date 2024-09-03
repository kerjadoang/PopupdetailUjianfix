import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {styles} from './style';
import Colors from '@constants/colors';
import useAdministrativeReport from './useAdministrativeReport';
import {ButtonFilter} from './components/ButtonFIlter';
import {Header} from '@components/atoms/Header';
import {SwipeUp, PieChart, ProgressCircle} from '@components/atoms';
import {ChildrenSwipeUpFilter} from './components/ChildrenSwipeUpFilter';
import {convertToRupiah} from '@constants/functional';

const AdministrativeReportScreen = () => {
  const {
    navigation,
    buttonCategory,
    data,
    isShowClassFilter,
    setIsShowClassFilter,
    isShowMonthFilter,
    setIsShowMonthFilter,
    isShowSchoolYearFilter,
    setIsShowSchoolYearFilter,
    classes,
    selected,
    setSelected,
    setPage,
    filterClass,
    setFilterClass,
    filterSchoolYear,
    setFilterSchoolYear,
    filterMonth,
    setFilterMonth,
    monthYear,
    year,
  } = useAdministrativeReport();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label={'Laporan Administrasi'} backgroundColor={Colors.white} />
      ),
    });
  }, []);

  const renderChildrenSwipeUpClassFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        title={'Filter Kelas'}
        type={'class'}
        classes={filterClass}
        setClasses={setFilterClass}
        dualButton
        subTitle={'Pilih Kelas'}
        data={classes}
        setIsShow={setIsShowClassFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setPage}
      />
    );
  };

  const renderChildrenSwipeUpYearFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        title={'Filter Tahun Ajaran'}
        type={'year'}
        year={filterSchoolYear}
        setYear={setFilterSchoolYear}
        dualButton
        subTitle={'Pilih Tahun  Ajaran'}
        data={year}
        setIsShow={setIsShowSchoolYearFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setPage}
      />
    );
  };

  const renderChildrenSwipeUpMonthFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        title={'Filter Bulan'}
        type={'month'}
        month={filterMonth}
        setMonth={setFilterMonth}
        dualButton
        subTitle={'Pilih Bulan'}
        data={monthYear}
        setIsShow={setIsShowMonthFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setPage}
      />
    );
  };

  const colors = [
    Colors.primary.light1,
    Colors.success.light1,
    Colors.secondary.light1,
    Colors.green.light1,
    Colors.purple.light1,
    Colors.black,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.BtnContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {buttonCategory.map((item: any, index: number) => {
            return (
              <ButtonFilter
                title={item.name}
                key={index}
                onPress={item.onPress}
                isSelected={item.isSelected}
                value={item.value}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.card}>
        {data?.total_income > 0 ? (
          <PieChart
            widthAndHeight={300}
            series={data?.total_per_category?.map((obj: any) => obj.precentage)}
            sliceColor={colors.slice(0, 5)}
            coverRadius={0.85}
            coverFill={Colors.white}
            style={styles.pieChart}
            children={
              <View>
                <Text style={styles.categoryName}>Total Pemasukan</Text>
                <Text style={styles.totalPrice}>{`Rp.${convertToRupiah(
                  data?.total_income ?? 0,
                )}`}</Text>
              </View>
            }
          />
        ) : (
          <ProgressCircle
            size={300}
            color={Colors.dark.neutral10}
            strokeWidth={25}
            progress={101}
            children={
              <View>
                <Text style={styles.categoryName}>Total Pemasukan</Text>
                <Text style={styles.totalPrice}>{`Rp.${convertToRupiah(
                  data?.total_income ?? 0,
                )}`}</Text>
              </View>
            }
          />
        )}
        <View style={styles.categoryContainer}>
          {data?.total_per_category?.map((item: any, index: number) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryItemLeft}>
                <View style={[styles.dot, {backgroundColor: colors[index]}]} />
                <Text
                  style={
                    styles.categoryName
                  }>{`${item?.category_name} (${item?.precentage}%)`}</Text>
              </View>
              <Text style={styles.totalIncomeCategory}>{`Rp.${convertToRupiah(
                item?.total_income_category,
              )}`}</Text>
            </View>
          ))}
        </View>
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowClassFilter}
        onClose={() => {
          setIsShowClassFilter(false);
        }}
        height={200}
        children={renderChildrenSwipeUpClassFilter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowMonthFilter}
        onClose={() => {
          setIsShowMonthFilter(false);
        }}
        height={200}
        children={renderChildrenSwipeUpMonthFilter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSchoolYearFilter}
        onClose={() => {
          setIsShowSchoolYearFilter(false);
        }}
        height={200}
        children={renderChildrenSwipeUpYearFilter()}
      />
    </SafeAreaView>
  );
};

export {AdministrativeReportScreen};
