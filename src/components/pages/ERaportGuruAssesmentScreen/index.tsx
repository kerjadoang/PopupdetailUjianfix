/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Header} from '@components/atoms/Header';
import {useNavigation} from '@react-navigation/native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import useReport from './useReport';
import {EmptyState, MainView, PopUp} from '@components/atoms';

import Maskot from '@assets/svg/maskot_3.svg';

import {Button} from '@components/atoms';
import JenisPenilaianCard from './Components/JenisPenilaianCard';
import SemesterCard from './Components/SemesterCard';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

const ERaportGuruAssesmentScreen = () => {
  const [popUp, setPopUp] = useState(false);

  const navigation: any = useNavigation();
  const {
    onPressPenilaianSemester,
    formAssesmentSetting,
    tempAssesmentSetting,
    onSimpanAturKD,
    onSimpanPenilaianRaport,
    isLoading,
  } = useReport();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Atur Penilaian Raport'}
          onPressIconLeft={() => {
            formAssesmentSetting?.type_assessment?.length || 0 > 1
              ? setPopUp(true)
              : navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  const renderPenilaianSemester = () => {
    return (
      <>
        <Text style={s.title}>Penilaian Semester</Text>
        {formAssesmentSetting?.validateForm &&
          !formAssesmentSetting?.semester && (
            <Text style={s.errorText}>Penilaian Wajib dipilih</Text>
          )}
        {tempAssesmentSetting?.semester?.map(
          (item: Semester, index: number) => {
            return (
              <SemesterCard
                key={index}
                item={item}
                index={index}
                onPress={() => onPressPenilaianSemester(item)}
                isChecked={
                  formAssesmentSetting?.semester?.id === item?.id || false
                }
              />
            );
          },
        )}
      </>
    );
  };

  const renderJenisPenilaianRaport = () => {
    return (
      <FlatList
        ListHeaderComponent={() => (
          <Text style={[s.title, {marginVertical: 10}]}>
            Jenis Penilaian Raport
          </Text>
        )}
        style={s.containerJenisPenilaianRaport}
        data={tempAssesmentSetting?.type_assessment}
        ListEmptyComponent={
          <MainView height={WINDOW_HEIGHT * 0.55}>
            <EmptyState
              type="empty_sad"
              title="Jenis penilaian rapor tidak ditemukan"
            />
          </MainView>
        }
        renderItem={({item, index}: IFlatListItem<TypeAssessment>) => {
          const isCardValid = formAssesmentSetting?.validateForm
            ? item?.basic_competency_detail?.find(
                (item: BasicCompetencyDetail) => item?.choose,
              )
            : true;
          return (
            <JenisPenilaianCard
              key={index}
              label={item?.name || ''}
              id={(item?.subject_id || index).toString()}
              isError={!isCardValid}
              data={item?.basic_competency_detail || []}
              onSimpan={() => onSimpanAturKD(item)}
            />
          );
        }}
      />
    );
  };

  const renderButtonSimpan = () => {
    return (
      <View style={s.btnContainer}>
        <Button
          isDisabled={(tempAssesmentSetting?.type_assessment || []).length == 0}
          label="Simpan"
          action={onSimpanPenilaianRaport}
        />
      </View>
    );
  };
  return (
    <View style={s.container}>
      <View style={s.contentContainer}>
        {renderPenilaianSemester()}
        {renderJenisPenilaianRaport()}
        {renderButtonSimpan()}
      </View>

      <PopUp
        show={popUp}
        close={() => setPopUp(false)}
        Icon={Maskot}
        title={'Belum Selesai!'}
        desc={
          'Apakah Anda yakin untuk keluar? Pengaturan Rapor belum disimpan.'
        }
        titleCancel={'Keluar'}
        titleConfirm={'Lanjutkan'}
        actionCancel={() => setPopUp(false)}
        actionConfirm={() => navigation.goBack()}
      />
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  errorText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.danger.base,
  },
  kdName: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 14,
    width: '100%',
    backgroundColor: Colors.white,
  },
  containerJenisPenilaianRaport: {marginBottom: 68},
  contentContainer: {flex: 1},
});
export {ERaportGuruAssesmentScreen};
