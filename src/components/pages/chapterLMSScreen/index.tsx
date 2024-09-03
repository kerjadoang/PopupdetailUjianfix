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
import {SearchModal} from './organism';
import {KPHeaderImage} from './components/KPHeaderImage';
import {LMSKPRegularCard} from './components/LMSKPRegularCard';
import useChapterLMS from './useChapterLMS';
import {SubjectType} from '@constants/subjectType';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

type Props = {
  route: any;
};

const ChapterLMSScreen: FC<Props> = () => {
  const {
    navigation,
    subject_type,
    subject_data,
    modalVisible,
    setModalVisible,
    soalData,
    isLoading,
  } = useChapterLMS();
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
                  (subject_data?.icon_path_url || subject_data?.path_url) ?? ''
                }
                category={subject_type}
              />

              <View>
                <Text style={styles.headerWrapperSecondSubTitle}>
                  Materi Sekolah
                </Text>
                <View style={styles.subjectDataName}>
                  <Text
                    style={styles.headerWrapperSecondTitle}
                    numberOfLines={2}>
                    {subject_data?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {subject_type !== SubjectType.AKM.AKM ? (
          <View style={styles.body}>
            {/* if available top card content :INFO */}
            {subject_type === SubjectType.LMS.MateriSekolah && (
              <LMSKPRegularCard
                path_url={subject_data?.icon_path_url}
                subjectData={subject_data}
              />
            )}

            {/* Chapter Mapping card section :INFO */}
            {soalData?.map((val: any, id: any) => (
              <Pressable
                key={id}
                onPress={() => {
                  navigation.navigate('KPRegularDetailBab', {
                    category: subject_type,
                    chapterData: val,
                    subject_id: subject_data?.id,
                    subject_name: subject_data?.name ?? '',
                    subject_icon: subject_data?.icon_path_url,
                  });
                }}
                style={styles.chapterPressable}>
                <CardKPProgress
                  unlocked={true}
                  title={val?.name}
                  progressbar={`${
                    val?.progress?.progress_percentage
                      ? val?.progress?.progress_percentage
                      : 0
                  } %`}
                />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        subjectData={subject_data}
      />

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export {ChapterLMSScreen};
