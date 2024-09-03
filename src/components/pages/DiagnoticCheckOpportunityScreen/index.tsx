import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Button, Header} from '@components/atoms';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Colors from '@constants/colors';
import {bgBlueOrnament} from '@assets/images';
import SearchInput from './components/SearchInput';
import useDiagnoticCheckOpportunity from './useDiagnoticCheckOpportunity';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {UniversityCard} from './components/UniversityCard';
import SubmitCard from './components/SubmitCard';
const DiagnoticCheckOpportunityScreen = () => {
  const {
    _handlerOnPressSearch,
    queryMajor1,
    queryMajor2,
    queryMajor3,
    queryUniversity1,
    queryUniversity2,
    queryUniversity3,
    setQueryMajor1,
    setQueryMajor2,
    setQueryMajor3,
    setQueryUniversity1,
    setQueryUniversity2,
    setQueryUniversity3,
    _resetHandler,
    _renderSeeResults,
    isValid,
    dataResult,
    _handlerSave,
  } = useDiagnoticCheckOpportunity();

  const _renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.emptyTitle}>Belum Ada Rekomendasi </Text>
        <Text style={styles.emptyLabel}>
          Silahkan pilih jurusan/universitas terlebih dahulu
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Cek Peluang Masuk PTN '}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.subContainer}>
        <ScrollView
          style={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Pilih jurusan dan universitas sesuai keinginan kamu
            </Text>
            <View style={styles.searchContainer}>
              <Text style={styles.searchTitle}>Pilihan 1</Text>
              <SearchInput
                query={queryMajor1?.name}
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryMajor1', 'jurusan');
                }}
                onClear={() => {
                  setQueryMajor1(null);
                }}
                placeholder="Jurusan"
              />
              <SearchInput
                query={queryUniversity1?.name}
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryUniversity1', 'universitas');
                }}
                onClear={() => {
                  setQueryUniversity1(null);
                }}
                placeholder="Universitas"
              />
            </View>
            <View style={styles.searchContainer}>
              <Text style={styles.searchTitle}>Pilihan 2</Text>
              <SearchInput
                query={queryMajor2?.name}
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryMajor2', 'jurusan');
                }}
                placeholder="Jurusan"
                onClear={() => {
                  setQueryMajor2(null);
                }}
              />
              <SearchInput
                query={queryUniversity2?.name}
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryUniversity2', 'universitas');
                }}
                placeholder="Universitas"
                onClear={() => {
                  setQueryUniversity2(null);
                }}
              />
            </View>
            <View style={styles.searchContainer}>
              <Text style={styles.searchTitle}>Pilihan 3</Text>
              <SearchInput
                query={queryMajor3?.name}
                placeholder="Jurusan"
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryMajor3', 'jurusan');
                }}
                onClear={() => {
                  setQueryMajor3(null);
                }}
              />
              <SearchInput
                query={queryUniversity3?.name}
                placeholder="Universitas"
                leftOnPressIcon={() => {
                  _handlerOnPressSearch('queryUniversity3', 'universitas');
                }}
                onClear={() => {
                  setQueryUniversity3(null);
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label="Atur Ulang"
                outline
                style={styles.button}
                action={_resetHandler}
              />
              <Button
                label="Lihat Hasil"
                isDisabled={!isValid}
                style={styles.button}
                action={_renderSeeResults}
              />
            </View>
          </View>
          <View style={styles.rectangle} />
          <View style={styles.resultsContainer}>
            {dataResult?.length !== 0
              ? dataResult?.map((obj: any, index: number) => (
                  <View key={index}>
                    <Text style={styles.searchTitle}>Pilihan {index + 1}</Text>
                    <UniversityCard data={obj} />
                  </View>
                ))
              : _renderEmpty()}
            {dataResult?.length !== 0 && <SubmitCard onPress={_handlerSave} />}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export {DiagnoticCheckOpportunityScreen};
