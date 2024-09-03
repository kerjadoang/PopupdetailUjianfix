/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useScreen} from './useScreen';
import {Button, Header, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import Arrow from '@assets/svg/ic_arrow_grey_right.svg';
import IconHistory from '@assets/svg/ic24_history_blue.svg';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';

const MenuRaporScreen = () => {
  const {
    getClassByDegree,
    navigation,
    isHistory,
    setHistory,
    academicYear,
    swipe,
    setSwipe,
    year,
    setYear,
  }: any = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={!isHistory ? 'Rapor Sekolah' : 'Riwayat Rapor'}
          subLabel={!isHistory ? year.name : ''}
          iconRight={!isHistory ? <IconHistory /> : null}
          onPressIconRight={() => setHistory(true)}
          onPressIconLeft={() => {
            isHistory ? setHistory(false) : navigation.goBack();
          }}
        />
      ),
    });
  }, [isHistory, navigation, setHistory, year.name]);
  const EducationYearChild = () => {
    return (
      <>
        <View style={styles.containerSwipe}>
          <Text
            style={[
              styles.title,
              {fontSize: 20, textAlign: 'center', lineHeight: 28},
            ]}>
            Filter
          </Text>
          <Text style={styles.academicYearTitle}>Tahun Ajaran</Text>
          <View style={styles.rowSwipe}>
            {academicYear?.data?.data?.map((item: any) => {
              return (
                <TouchableOpacity
                  style={
                    year.id === item.id
                      ? styles.itemYearSelected
                      : styles.itemYear
                  }
                  key={item.id}
                  onPress={() =>
                    setYear({...year, id: item.id, name: item.years})
                  }>
                  <Text
                    style={
                      year.id === item.id
                        ? styles.itemYearTextSelected
                        : styles.itemYearText
                    }>
                    {item.years}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{padding: 16}}>
          <Button
            label="Terapkan"
            action={() => {
              setSwipe(false);
            }}
          />
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {isHistory ? (
        <TouchableOpacity style={styles.btn} onPress={() => setSwipe(true)}>
          <Text style={styles.labelBtn}>{year.name}</Text>
          <ArrowDown />
        </TouchableOpacity>
      ) : null}

      <Text style={styles.title}>Pilih Kelas</Text>
      <ScrollView>
        {getClassByDegree?.data?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.itemClass}
              onPress={() => {
                navigation.navigate('MenuRaporByClassScreen', {
                  classId: item.id,
                  className: item.name,
                  isHistory: isHistory,
                });
              }}>
              <Text style={styles.titleSwipe}>{item.name}</Text>
              <Arrow />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <SwipeUp
        height={200}
        visible={swipe}
        isSwipeLine={true}
        onClose={() => {
          setSwipe(false);
        }}
        children={<EducationYearChild />}
      />
    </View>
  );
};
export {MenuRaporScreen};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    height: '100%',
  },
  containerSwipe: {
    backgroundColor: Colors.white,
    padding: 16,
    height: 250,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
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
  titleSwipe: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  btn: {
    borderRadius: 15,
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  labelBtn: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  rowSwipe: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  itemYearSelected: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 15,
  },
  itemYear: {
    backgroundColor: Colors.primary.light2,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 15,
  },
  itemYearTextSelected: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
  },
  itemYearText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
  },
  academicYearTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
  },
});
