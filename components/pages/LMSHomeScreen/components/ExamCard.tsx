import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveIcon from '@assets/svg/ic16_live.svg';
import CalendarIcon from '@assets/svg/ic16_calendar.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button, Countdown, MainView} from '@components/atoms';
import {
  capitalizeEachWord,
  checkDate,
  convertDate,
  formatExamSchedule,
} from '@constants/functional';

const ExamCard = ({
  data,
  handleSubmit,
  refetchData,
}: {
  data: {
    id_relation?: number;
    type?: string;
    title?: string;
    creator?: any;
    sub_title?: string;
    time_start?: string;
    time_finish?: string;
    note_group?: any;
    date_time?: string;
    rombel_class?: string;
    duration?: number;
    start_exam_button?: boolean;
  };
  refetchData?: VoidCallBack;
  handleSubmit: any;
}) => {
  const isOnGoing = checkDate(convertDate(), data?.time_start || '', {
    type: 'after',
  });
  const isExpired = checkDate(convertDate(), data?.time_finish || '', {
    type: 'after',
  });

  const time_range = formatExamSchedule(data?.time_start, data?.time_finish);
  return (
    <View style={styles.card}>
      <View style={styles.leftCard}>
        <View style={styles.containerTitle}>
          <View style={styles.containerTitleCard}>
            <Text style={styles.titleCard}>
              {capitalizeEachWord(data?.type || '').toString() ?? ''}
            </Text>
          </View>
        </View>
        <View style={styles.leftCard}>
          <Text style={styles.examName}>{data?.title ?? '-'}</Text>
          <View style={styles.subTitleContainerStyle}>
            <Text style={styles.examTitle}>{data?.sub_title ?? '-'}</Text>
          </View>

          <View style={styles.calendarIconContainerStyle}>
            <CalendarIcon />
            <Text style={styles.examDate}>{time_range}</Text>
          </View>

          {isOnGoing ? (
            <View style={styles.liveIconContainer}>
              <LiveIcon />
              <Text style={styles.examType}>Sedang berlangsung</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.buttonContainerStyle}>
        {isOnGoing && data?.start_exam_button ? (
          <Button
            action={handleSubmit}
            label="Kerjakan"
            style={styles.submitButtonStyle}
            fontSize={14}
          />
        ) : !isExpired && data?.start_exam_button ? (
          <View style={styles.tabMendatangTimerContainer}>
            <View style={styles.tabMendatangTimerInnerContainer}>
              <Text style={styles.tabMendatangScheduleDate1}>Mulai Dalam</Text>
              <Countdown
                endTime={convertDate(data.time_start)}
                // isHideSeconds
                onlyShowTime
                useLocalTime
                actionAfterTimeOver={refetchData}
              />
            </View>
          </View>
        ) : (
          <MainView width={88} />
        )}
      </View>
    </View>
  );
};

export default ExamCard;

const styles = StyleSheet.create({
  tabMendatangTimerContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8,
  },
  tabMendatangTimerInnerContainer: {
    borderRadius: 10,
    backgroundColor: Colors.primary.light3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tabMendatangScheduleDate1: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    fontSize: 11,
    letterSpacing: 0.25,
    marginTop: 5,
    lineHeight: 16,
    color: Colors.dark.neutral100,
  },
  card: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  submitButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  subTitleContainerStyle: {width: '70%'},
  calendarIconContainerStyle: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 8,
  },
  liveIconContainer: {flexDirection: 'row'},
  containerTitleCard: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  titleCard: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    textAlign: 'center',
  },
  leftCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  examName: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    marginVertical: 4,
    color: Colors.dark.neutral100,
  },
  examTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  examDate: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    marginLeft: 5.6,
  },
  examType: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.danger.base,
    paddingLeft: 9,
  },
  containerTitle: {
    flexDirection: 'row',
  },
  doButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  doButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
