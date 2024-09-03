/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Colors from '@constants/colors';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import SearchIcon from '@assets/svg/ic24_search_grey.svg';
import {SearchModal} from './organism';
import {KPHeaderImage} from './components/KPHeaderImage';
import {AKMTypeCard} from './components/AKMTypeCard';
import {Button} from '@components/atoms';
import useChapterAKM from './useChapterAKM';
import {SubjectType} from '@constants/subjectType';
const ChapterAKMScreen = () => {
  const {
    navigation,
    subject_type,
    subject_data,
    modalVisible,
    setModalVisible,
    akmData,
    route,
  } = useChapterAKM();

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {backgroundColor: modalVisible ? Colors.white : Colors.primary.base},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{height: 297 * 0.6}}>
          {!modalVisible && (
            <Bg width={'100%'} height={297} style={styles.bgPosition} />
          )}

          <View style={styles.header}>
            <View style={styles.headerWrapperFirst}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconArrowLeftWhite />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <SearchIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.headerWrapperSecond}>
              <KPHeaderImage
                path_url={
                  route?.params?.subject_data?.icon_path_url ??
                  route?.params?.subject_data?.path_url
                }
                category={subject_type}
              />

              <View>
                {subject_type === SubjectType.KPRegular.AKM && (
                  <Text style={styles.KPRTitle}>
                    {route?.params?.isFromSoal
                      ? 'SOAL'
                      : 'Kelas Pintar Regular'}
                  </Text>
                )}

                <Text style={styles.AKMTitle}>AKM</Text>
                <Text style={styles.asesmenTitle}>
                  Asesmen Kompetensi Minimum
                </Text>
                <View
                  style={{
                    width: 300,
                    paddingRight: 10,
                  }}>
                  <Text
                    style={styles.headerWrapperSecondTitle}
                    numberOfLines={2}>
                    {subject_data?.subject?.name ?? ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.chooseQuestionTypeContainer}>
            <Text style={styles.chooseQueastionType}>Pilih jenis soal AKM</Text>
          </View>
          {akmData?.question_service?.map((ie: any) => {
            return (
              <AKMTypeCard
                key={`AKMTYPECARD-${ie?.id}`}
                navigation={navigation}
                questionTypeData={akmData?.question_type}
                akmTitle={ie?.name}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.akmReportButton}>
        <Button
          action={() => navigation.navigate('AKMLaporanScreen')}
          label="Lihat Laporan AKM"
          style={{paddingHorizontal: 40}}
          rightIcon={true}
        />
      </View>

      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        subjectData={subject_data?.subject}
      />
    </>
  );
};

export {ChapterAKMScreen};
