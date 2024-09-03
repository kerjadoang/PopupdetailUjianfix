import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import {
  capitalizeEachWord,
  convertDate,
  convertDateTime,
} from '@constants/functional';
import Fonts from '@constants/fonts';

type Props = {
  data: any;
  button?: any;
  navigation?: any;
  userRole?: UserRole;
};

const ScheduleItemProject: FC<Props> = ({
  data,
  button,
  navigation,
  userRole,
}) => {
  // const sudahMengumpulkan = data.note_group.find(
  //   (sudah: any) => sudah.label === 'Sudah Mengumpulkan',
  // );
  // const diberikan = data.note_group.find(
  //   (diberikanx: any) => diberikanx.label === 'Diberikan',
  // );
  // const batasPengumpulan = data.note_group.find(
  //   (batas: any) => batas.label === 'Batas Pengumpulan',
  // );

  // const timeStart = convertDate(data?.time_start);
  // const timeEnd = convertDate(data?.time_finish);

  // capitalizeEachWord

  const projectType =
    data?.type_badge ||
    (data?.type == 'pr' || data?.type == 'PR'
      ? 'PR'
      : capitalizeEachWord(data?.type));

  const isGuru = userRole === 'GURU';
  const showButtonMurid =
    convertDate().isAfter(convertDate(data?.time_start)) &&
    convertDate().isBefore(convertDate(data?.time_finish)) &&
    data?.status === 'schedule';
  button = isGuru ? true : showButtonMurid;

  return (
    <View style={[styles.flexCol]}>
      <View
        style={[styles.flexRow, styles.alignCenter, {gap: 8, marginBottom: 8}]}>
        <View style={styles.ViewSesiKelas}>
          <Text style={styles.sesikelas}>{projectType}</Text>
        </View>
        <View style={styles.ViewRombel}>
          <Text style={styles.TextRombel}>{data?.rombel_class || '-'}</Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={(styles.flexCol, {gap: 2, flex: 1})}>
          <View>
            <Text style={styles.subTitle}>{data?.title}</Text>
          </View>
          <View>
            <Text style={styles.title}>{data?.sub_title}</Text>
          </View>
          <View
            style={[styles.flexRow, {justifyContent: 'space-between', gap: 8}]}>
            <View style={(styles.flexCol, {marginVertical: 4})}>
              <Text style={styles.text}>Diberikan</Text>
              <View style={styles.flexRow}>
                <IconCalendar width={16} height={16} />
                <Text style={styles.text}>
                  {convertDateTime(data?.time_start)}
                </Text>
              </View>
            </View>
            <View style={(styles.flexCol, {marginVertical: 4})}>
              <Text style={styles.text}>Batas Pengumpulan</Text>
              <View style={styles.flexRow}>
                <IconCalendar width={16} height={16} />
                <Text style={styles.text}>
                  {convertDateTime(data?.time_finish)}
                </Text>
              </View>
            </View>
          </View>
          {/* <View>
            <View style={styles.flexRow}>
              <IconBook width={16} height={16} />
              <Text style={styles.text}>{sudahMengumpulkan?.description}</Text>
            </View>
          </View> */}
        </View>
        {button ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                if (!navigation) {
                  return;
                }
                if (isGuru) {
                  navigation.navigate('TaskDetailTeacherScreen', {
                    id: data?.id_relation,
                  });
                  return;
                }

                navigation.navigate('LMSPRTugasScreen', {
                  data: data,
                });

                // navigation.navigate('TaskDetailTeacherScreen', {
                //   id: data?.id_relation,
                // });
              }}
              style={[styles.button, isGuru && styles.buttonTeacher]}>
              <Text style={[styles.btnText, isGuru && styles.btnTeacherText]}>
                {isGuru ? 'Periksa' : 'Kerjakan'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View
        style={{
          borderBottomColor: '#E7EBEE',
          borderBottomWidth: 1,
          marginVertical: 24,
        }}
      />
    </View>
  );
};

export {ScheduleItemProject};

const styles = StyleSheet.create({
  buttonTeacher: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary.base,
    borderWidth: 1,
  },
  btnTeacherText: {
    color: Colors.primary.base,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  sesikelas: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
  },
  ViewSesiKelas: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  ViewRombel: {
    backgroundColor: Colors.secondary.light2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  TextRombel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#995F0D',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  alignCenterX: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  live: {
    color: Colors.danger.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  text: {
    color: Colors.dark.neutral80,
  },
  button: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});
