import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import useScheduleTodayWithList from './useScheduleTodayWithList';
import {Image} from 'react-native';
import {
  ScheduleItemProject,
  ScheduleItemSessionClass,
  ScheduleItemUAS,
  ScheduleItemVirtualMeeting,
} from '@components/atoms';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

interface ScheduleTodayWithListProps {
  accountRole?: AccountRole;
}

const ScheduleTodayWithList = ({accountRole}: ScheduleTodayWithListProps) => {
  const {navigation, fetchSchedule, today, data, token} =
    useScheduleTodayWithList();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Hari Ini</Text>
      <View style={[styles.card, styles.shadowProp]}>
        {(data?.data === undefined || data?.data === null) && (
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

        {data?.data?.slice(0, 5).map((item: any, index: number) => {
          if (item.type.toLowerCase() === 'sesi kelas') {
            return (
              <View key={index}>
                <ScheduleItemSessionClass data={item} button={true} />
              </View>
            );
          }
          if (item?.type.toLowerCase() === 'rapat virtual') {
            return (
              <View key={index}>
                <ScheduleItemVirtualMeeting
                  data={item}
                  button={true}
                  startDate={today}
                  refetchData={fetchSchedule}
                  action={() => {
                    item.id = item.id_relation;
                    item.time_end = item.time_finish;
                    return navigation.navigate('RapatVirtualTestCamerascreen', {
                      data: item,
                    });
                  }}
                />
              </View>
            );
          }
          if (
            item?.type?.toLowerCase() === 'projek' ||
            item?.type?.toLowerCase() === 'pr' ||
            item?.type?.toLowerCase() === 'tugas'
          ) {
            return (
              <View key={index}>
                <ScheduleItemProject
                  data={item}
                  button={true}
                  navigation={navigation}
                  userRole={accountRole}
                />
              </View>
            );
          }

          if (item?.filter_category?.toLowerCase() === 'ujian') {
            return (
              <View key={index}>
                <ScheduleItemUAS
                  data={item}
                  key={index}
                  startDate={today}
                  accountRole={accountRole}
                  button={
                    accountRole === 'GURU' ? true : item?.start_exam_button
                  }
                  buttonText={accountRole === 'GURU' ? 'Monitor' : 'Kerjakan'}
                  buttonAction={async (type: ScheduleType) => {
                    if (accountRole === 'MURID') {
                      return navigation.navigate('LMSUjianTestCameraScreen', {
                        data: item,
                      });
                    }

                    if (type === 'ON_GOING') {
                      return navigation.navigate('MonitoringExamGuruScreen', {
                        subTitle: `${item?.rombel_class} • ${item?.title}`,
                        data: item,
                      });
                    }

                    if (type === 'EXPIRED_DONE_SCORING') {
                      const detailUjian = await apiGet({
                        url: URL_PATH.get_detail_jadwal_ujian(
                          item?.id_relation,
                        ),
                        tags: 'getDetaulUjian',
                      });

                      return navigation.navigate('DetailTaskScreenTeacher', {
                        id: detailUjian?.exam_schedule?.id,
                        data: detailUjian?.exam_schedule,
                        isFromTeacher: true,
                      });
                    }

                    return navigation.navigate('ExamDetailGuruScreen', {
                      exam_id: item.id_relation,
                    });
                  }}
                  refetchData={fetchSchedule}
                />
                <View style={styles.hr} />
              </View>
            );
          }
        })}

        <View style={styles.centering}>
          <Pressable
            onPress={() =>
              navigation.navigate('ScheduleScreen', {
                filter: 'semua',
                screen: 'ScheduleTodayWithList',
                loginAs: accountRole ?? 'MURID',
                token: token,
                data: {},
              })
            }
            style={styles.button}>
            <Text style={styles.textBtn}>Lihat Semua Jadwal {'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export {ScheduleTodayWithList};

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },

  text: {
    color: Colors.dark.neutral80,
  },
  buttonGabung: {
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  textBtnGabung: {
    backgroundColor: Colors.primary.base,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
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
  hr: {
    borderWidth: 0.3,
    opacity: 0.5,
    marginVertical: 16,
    backgroundColor: Colors.primary.light3,
  },
});
