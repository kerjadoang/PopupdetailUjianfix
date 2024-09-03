/* eslint-disable react-native/no-inline-styles */

import React, {FC} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import Colors from '@constants/colors';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import SearchIcon from '@assets/svg/ic24_search_grey.svg';
import CardKPProgress from '@components/atoms/CardKPProgress';
import {SearchModalKpReg} from './organism';
import {KPAskQuestionCard} from './components/KPAskQuestionCard';
import {KPHeaderImage} from './components/KPHeaderImage';
import {Button, SwipeUp} from '@components/atoms';
import Maskot12Icon from '@assets/svg/maskot_12.svg';
import {SubjectType} from '@constants/subjectType';
import useChapterKPRegular from './useChapterKPRegularScreen';
import {_IDataChapter} from './type';

type Props = {
  route: any;
};

const ChapterKPRegularScreen: FC<Props> = () => {
  const {
    navigation,
    subject_data,
    subject_type,
    modalVisible,
    setModalVisible,
    isOpenForbiddenPopup,
    setIsOpenForbiddenPopup,
    chapters,
    isIKM,
  } = useChapterKPRegular();
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
                path_url={subject_data?.path_url ?? subject_data?.icon_path_url}
                category={subject_type}
                image_id={subject_data?.icon_mobile}
              />

              <View>
                <Text style={styles.headerWrapperSecondSubTitle}>
                  {subject_type === SubjectType.KPRegular.Practice &&
                    `${isIKM ? 'Asesmen Formatif' : 'Practice'}`}
                  {subject_type === SubjectType.KPRegular.Test &&
                    `${isIKM ? 'Asesmen Sumatif' : 'Test'}`}
                  {subject_type === SubjectType.KPRegular.Learn &&
                    `${isIKM ? 'Media Ajar' : 'Learn'}`}
                </Text>
                <View
                  style={{
                    width: 300,
                    paddingRight: 10,
                  }}>
                  <Text
                    style={styles.headerWrapperSecondTitle}
                    numberOfLines={2}>
                    {subject_data?.subject?.name ?? subject_data?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          {/* if available top card content :INFO */}
          {subject_type === SubjectType.KPRegular.Learn && (
            <KPAskQuestionCard
              navigateToTanya={() => navigation.navigate('AskScreen')}
              navigateToSoal={() =>
                navigation.navigate('QuestionDetailScreen', {
                  category: 'Soal',
                  subjectData: subject_data,
                })
              }
            />
          )}
          {subject_type === SubjectType.KPRegular.Practice && (
            <KPAskQuestionCard
              navigateToTanya={() => navigation.navigate('AskScreen')}
              navigateToSoal={() =>
                navigation.navigate('QuestionDetailScreen', {
                  category: 'Soal',
                  subjectData: subject_data,
                })
              }
            />
          )}
          {subject_type === SubjectType.KPRegular.Test && (
            <KPAskQuestionCard
              navigateToTanya={() => navigation.navigate('AskScreen')}
              navigateToSoal={() =>
                navigation.navigate('QuestionDetailScreen', {
                  category: 'Soal',
                  subjectData: subject_data,
                })
              }
            />
          )}

          {/* Chapter Mapping card section :INFO */}
          {chapters?.map((val: _IDataChapter, id: any) => {
            return (
              <Pressable
                key={id}
                onPress={() => {
                  navigation.navigate('KPRegularDetailBab', {
                    category: subject_type,
                    chapterData: val,
                    subject_name:
                      subject_data?.subject?.name ?? subject_data?.name ?? '',
                    subject_icon:
                      subject_data?.path_url ??
                      subject_data?.icon_path_url ??
                      subject_data?.icon_mobile ??
                      '',
                    subject_id: subject_data?.id ?? 0,
                  });
                }}
                disabled={!val.unlocked}
                style={styles.chapterPressable}>
                <CardKPProgress
                  unlocked={val.unlocked}
                  title={val?.chapter?.name ?? ''}
                  progressbar={`${
                    val?.progress?.progress_percentage ??
                    val?.practice_progress?.progress_percentage ??
                    val?.test_progress?.progress_percentage ??
                    0
                  } %`}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <SearchModalKpReg
        subjectType={subject_type}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        subjectData={subject_data?.subject ?? subject_data}
      />

      <SwipeUp
        height={100}
        onClose={() => setIsOpenForbiddenPopup(false)}
        isSwipeLine={true}
        visible={isOpenForbiddenPopup}
        children={
          <View style={{width: '100%', height: 320}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Maskot12Icon />
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  lineHeight: 24,
                  color: Colors.dark?.neutral100,
                  marginVertical: 20,
                }}>
                Belum Dapat Mengakses Kuis
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  color: Colors.dark.neutral80,
                }}>
                Kuis hanya dapat diakses oleh pengguna{'\n'}paket. Akses Kuis
                dengan berlangganan.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 30,
                paddingHorizontal: '5%',
              }}>
              <Button label="Berlangganan" action={() => {}} />
            </View>
          </View>
        }
      />
    </>
  );
};

export {ChapterKPRegularScreen};
