/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {Header, SwipeUp} from '@components/atoms';
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useScreen} from './useScreen';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {CardTask} from './component/CardTask';
// routing
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//search empty
import {EmptyDisplay} from '@components/atoms';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import {MataPelajaran} from './component/MataPelajaran';
import {Tipe} from './component/Tipe';

import Icon from 'react-native-vector-icons/FontAwesome';
import {convertDate} from '@constants/functional';

const HistoryTaskScreen = () => {
  // routing setup
  const route = useRoute<RouteProp<ParamList, 'ClassReportScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ClassReportScreen'>>();

  const {
    SearchInput,
    search,
    setSearch,
    list,
    modalMapel,
    setModalMapel,
    selectAllFilter,
    terapkanFilter,
    listMapel,
    selectValidation,
    modalMapelValidation,
    mapelSelectedTemp,
    clearSelected,
    mapelSelected,
    modalTipe,
    setModalTipe,
    selectValidationTipe,
    terapkanFilterTipe,
    clearSelectedTipe,
    modalTipeValidation,
    tipeSelectedTemp,
    tipeSelected,
  } = useScreen(route);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Riwayat PR, Projek & Tugas"
          subLabel={route?.params?.id?.name}
        />
      ),
    });
  }, [navigation]);

  const EmptyState = () => {
    if (
      (list?.length === 0 &&
        search !== null &&
        search !== undefined &&
        search !== '') ||
      (mapelSelected.length > 0 && list?.length === 0) ||
      (tipeSelected.length > 0 && list?.length === 0)
    ) {
      return (
        <EmptyDisplay
          imageSvg={<MaskotEmpty width={100} height={100} />}
          title={'Pencarian Tidak Ditemukan'}
          desc={`Hasil pencarian “${search}” nihil. \nCoba masukkan kata kunci lainnya!`}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput
        query={search}
        onChangeText={function (text: string): void {
          setSearch(text);
        }}
      />
      <View style={styles.filterContainer}>
        <ScrollView horizontal>
          <TouchableOpacity style={styles.btnFilter}>
            <Text style={styles.btnFilterText}>Semua Tanggal</Text>
            <Icon
              name="chevron-down"
              size={14}
              color={Colors.primary.base}
              style={{marginTop: -3}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              mapelSelected?.length > 0
                ? styles.btnFilterActive
                : styles.btnFilter
            }
            onPress={() => modalMapelValidation()}>
            <Text
              style={
                mapelSelected?.length > 0
                  ? styles.btnFilterTextActive
                  : styles.btnFilterText
              }>
              {mapelSelected?.length === 0
                ? 'Semua Mapel'
                : listMapel?.length === mapelSelected?.length
                ? 'Semua Mapel'
                : `${mapelSelected.length} Mapel`}
            </Text>
            <Icon
              style={{marginTop: -3}}
              name="chevron-down"
              size={14}
              color={
                mapelSelected?.length > 0 ? Colors.white : Colors.primary.base
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => modalTipeValidation(true)}>
            <Text style={styles.btnFilterText}>
              {tipeSelected?.length === 0
                ? 'Semua Tipe'
                : tipeSelected?.length === 3
                ? 'Semua tipe'
                : `${tipeSelected?.length} Tipe`}
            </Text>
            <Icon
              style={{marginTop: -3}}
              name="chevron-down"
              size={14}
              color={Colors.primary.base}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {list?.map((items: any, index: number) => {
            return (
              <View key={index}>
                <CardTask
                  type={items?.type || '-'}
                  className={items?.rombel_class_school?.name}
                  chapterNname={items?.title}
                  subjectName={items?.subject?.name}
                  processingTime={` ${convertDate(items?.time_start)
                    .locale('id')
                    .format('dddd, DD MMM YYYY • hh:mm')} - ${convertDate(
                    items?.time_finish,
                  )
                    .locale('id')
                    .format('dddd, DD MMM YYYY • hh:mm')}`}
                  assessingTime={convertDate(items?.time_correction)
                    .locale('id')
                    .format('dddd, DD MMM YYYY • hh:mm')}
                  action={() => {
                    navigation.navigate('DetailTaskScreen', {
                      id: route?.params.id,
                      data: items,
                    });
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
        {/* {list?.length == 0 &&
          search &&
          mapelSelected.length > 0 &&
          tipeSelected.length > 0 && (
            <EmptyDisplay
              imageSvg={<MaskotEmpty width={100} height={100} />}
              title={'Pencarian Tidak Ditemukan'}
              desc={`Hasil pencarian “${search}” nihil. \nCoba masukkan kata kunci lainnya!`}
            />
          )} */}

        {EmptyState()}

        {modalMapel ? (
          <SwipeUp
            height={300}
            onClose={() => setModalMapel(false)}
            children={
              <MataPelajaran
                selectAllFilter={selectAllFilter}
                data={listMapel}
                selected={mapelSelectedTemp}
                setSelected={(x: number) => selectValidation(x)}
                terapkanFilter={() => terapkanFilter()}
                setModalVisible={() => setModalMapel(false)}
                clearSelected={() => clearSelected()}
              />
            }
            visible
          />
        ) : null}

        {modalTipe ? (
          <SwipeUp
            height={300}
            onClose={() => setModalTipe(false)}
            children={
              <Tipe
                selected={tipeSelectedTemp}
                setSelected={(x: string) => selectValidationTipe(x)}
                terapkanFilter={() => terapkanFilterTipe()}
                setModalVisible={() => setModalTipe(false)}
                clearSelected={() => clearSelectedTipe()}
              />
            }
            visible
          />
        ) : null}
      </View>
    </View>
  );
};
export {HistoryTaskScreen};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 5,
    marginRight: 5,
  },
  btnFilterActive: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
    gap: 5,
  },
  btnFilterText: {
    fontWeight: '600',
    fontSize: 14,
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
});
