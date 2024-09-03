import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import useScheduleToday from './useScheduleToday';
import {
  ScheduleItemProject,
  ScheduleItemSessionClass,
  ScheduleItemVirtualMeeting,
  ScheduleItemPrivateLearning,
  ScheduleItemTeacherSession,
  ScheduleItemUAS,
  ScheduleItemQuestionSession,
  CenteringButton,
} from '@components/atoms';
import {
  _handleUserTypeId,
  isStringContains,
  showErrorToast,
} from '@constants/functional';
import {CardLiveClassSchedule} from '@components/pages/PTNScreen/component/CardLiveClassSchedule';
import {getDetailRecording} from '@components/pages/PTNLiveClassRecordScreen/utils';
import {LMSPRTugasIsScheduled} from '@components/pages/LMSPRTugasScreen/useTaskDetail';

const ScheduleToday = () => {
  const {
    navigation,
    refetchSchedule,
    data,
    userData,
    onNavigateToScheduleScreen,
    onNavigateToExamScreen,
  } = useScheduleToday();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Hari Ini</Text>
      <View style={[styles.shadowProp, styles.card, {paddingVertical: 8}]}>
        {data?.data?.map((item: any, index: React.Key | null | undefined) => {
          const itemKey = item?._id || item?.id || index;
          const showPRTugasButton = LMSPRTugasIsScheduled(item);
          if (item?.type === 'belajar mandiri') {
            return (
              <View key={itemKey}>
                <ScheduleItemPrivateLearning data={item} button={false} />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'sesi tanya') {
            return (
              <View key={itemKey}>
                <ScheduleItemQuestionSession
                  data={item}
                  button={true}
                  buttonText={'Tanya'}
                  buttonAction={() => navigation.navigate('AskScreen')}
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'sesi kelas guru') {
            return (
              <View key={itemKey}>
                <ScheduleItemTeacherSession data={item} />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.filter_category?.toLowerCase() === 'ujian') {
            return (
              <View key={itemKey}>
                <ScheduleItemUAS
                  accountRole={
                    _handleUserTypeId(userData?.user?.user_type_id || 1).role
                  }
                  data={item}
                  button={item?.start_exam_button}
                  buttonText={'Kerjakan'}
                  buttonAction={() => onNavigateToExamScreen(item)}
                  refetchData={refetchSchedule}
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'sesi kelas') {
            return (
              <View key={itemKey}>
                <ScheduleItemSessionClass
                  data={item}
                  button={true}
                  action={() =>
                    navigation.navigate('ClassSessionDetailScreen', {
                      id: item?.id_relation,
                    })
                  }
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'rapat virtual') {
            return (
              <View key={itemKey}>
                <ScheduleItemVirtualMeeting data={item} button={true} />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'projek') {
            return (
              <View key={itemKey}>
                <ScheduleItemProject
                  navigation={navigation}
                  data={item}
                  button={showPRTugasButton}
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'pr') {
            return (
              <View key={itemKey}>
                <ScheduleItemProject
                  navigation={navigation}
                  data={item}
                  button={showPRTugasButton}
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (item?.type === 'tugas') {
            return (
              <View key={itemKey}>
                <ScheduleItemProject
                  navigation={navigation}
                  data={item}
                  button={showPRTugasButton}
                />
                <View style={styles.hr} />
              </View>
            );
          }
          if (isStringContains(item?.type || '', 'live class')) {
            return (
              <CardLiveClassSchedule
                key={itemKey}
                data={item}
                action={async () => {
                  if (!isStringContains(item?.status || '', 'finish')) {
                    return navigation.navigate('PTNLiveClassHomeScreen');
                  }

                  try {
                    const rekamanData = await getDetailRecording(
                      item?.id || 0,
                      'ptn',
                    );
                    navigation.navigate('VideoAnimationScreen', {
                      chapterData: rekamanData,
                      type: 'PTN',
                    });
                  } catch (error) {
                    showErrorToast('Data tidak ditemukan');
                  }
                }}
              />
            );
          }
          return <View key={itemKey} />;
        })}

        {(!data?.data || data?.data?.length === 0) && (
          <View style={styles.renderEmpty}>
            <Image
              source={require('@assets/images/ic_empty_schedule.png')}
              style={{width: 80, height: 80}}
            />
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Belum ada jadwal hari ini
            </Text>
          </View>
        )}

        <CenteringButton
          onPress={onNavigateToScheduleScreen}
          title={'Lihat Semua Jadwal >'}
        />
      </View>
    </View>
  );
};

export {ScheduleToday};

const styles = StyleSheet.create({
  renderEmpty: {
    // flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // width: 300,
    marginBottom: 16,
  },
  text: {
    color: Colors.dark.neutral80,
  },
  container: {
    flex: 1,
    marginTop: 16,
  },
  hr: {
    borderWidth: 0.17,
    opacity: 0.2,
    marginVertical: 10,
    backgroundColor: Colors.primary.light3,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
});
