/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveIcon from '@assets/svg/ic16_live.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button, Countdown} from '@components/atoms';
import {convertDate, formatScheduleDate} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';

const SessionClassCard = ({data, onPress}: any) => {
  const date = formatScheduleDate(data?.time_start, data?.time_finish, true);
  const indonesiaTimeOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  const timeStarts = new Date(data?.time_start);
  const initialTimeStart = new Date(
    timeStarts?.getTime() + indonesiaTimeOffset,
  );
  const timeStart = initialTimeStart
    ?.toISOString()
    ?.slice(0, 19)
    ?.replace('T', ' '); //format timestart value
  const timeStartMiliSeconds = convertDate(timeStart).valueOf(); //get timestart milliseconds
  const dateTime = new Date(timeStart);
  const todayMiliSeconds = dateTime.getTime();
  const timeToStartLiveMeetingMiliSeconds =
    timeStartMiliSeconds - todayMiliSeconds; //get value range from current time to timetostart in seconds
  const timeToStartLiveMeetingMinutes = Math.round(
    timeToStartLiveMeetingMiliSeconds / 1000 / 60,
  ); //get value range from current time to timetostart in minutes
  const currentTime = new Date();
  const timeFinish = new Date(data?.time_finish);
  const isOngoing =
    currentTime >= initialTimeStart && currentTime <= timeFinish;

  const renderOnGoing = () => {
    return (
      <View style={styles.cardBottom}>
        <View style={styles.rowBottomLeftCard}>
          <LiveIcon style={styles.iconLive} />
          <Text style={styles.examType}>Sedang berlangsung</Text>
        </View>
        <Button
          label="Gabung"
          style={styles.button}
          fontSize={14}
          action={onPress}
        />
      </View>
    );
  };

  const renderNotStarted = () => {
    return (
      <View style={styles.cardBottom}>
        <View style={styles.rowBottomLeftCard}>
          <Text style={styles.examDate}>Belum Dimulai</Text>
        </View>
      </View>
    );
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.containerTitle}>
        <View style={styles.containerTitleCard}>
          <Text style={styles.titleCard}>
            {data?.class_session_type
              ?.replace('live', 'Langsung')
              ?.replace('record', 'Rekaman')}
          </Text>
        </View>
        <View style={styles.containerTitleCard}>
          <Text style={styles.titleCard}>
            {data?.class_session_platform
              ?.replace('_', ' ')
              ?.replace('record', 'Rekaman')}
          </Text>
        </View>
      </View>
      <Text style={styles.examName}>{data?.title ?? '-'}</Text>
      <Text style={styles.examTitle}>{data?.sub_title ?? '-'}</Text>

      <View style={{marginTop: 4, marginBottom: 8}}>
        <Text style={styles.examDate}>{date ? date : '-'}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* {data?.avatar_icon_url?.endsWith('svg') ? (
          <SvgUri
            uri={data?.avatar_icon_url}
            height={32}
            width={32}
            style={{borderRadius: 20}}
          />
        ) : (
          <Image
            style={styles.personImage}
            source={{
              uri: data?.avatar_icon_url,
            }}
          />
        )} */}
        <Avatar id={data?.avatar_path_id} style={styles.personImage} />
        <Text style={styles.personName}>{data?.creator?.full_name}</Text>
      </View>
      {data?.status === 'on_going' || data?.status === 'unstarted' ? (
        <View style={styles.rectangle} />
      ) : null}
      <View
        style={{
          justifyContent: 'flex-start',
        }}>
        {isOngoing ? (
          renderOnGoing()
        ) : timeToStartLiveMeetingMinutes < 1 ? (
          <Countdown
            // endTime={timeStart}
            useLocalTime={true}
            endTime={convertDate(timeStarts)}
            renderAfterTimeOver={
              data?.status === 'on_going'
                ? renderOnGoing()
                : data?.status === 'unstarted'
                ? renderNotStarted()
                : null
            }
          />
        ) : null}
      </View>
    </Pressable>
  );
};

export default SessionClassCard;
const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection: 'column',
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
    minWidth: 300,
  },
  containerTitleCard: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  titleCard: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  leftCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  examName: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
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
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  examType: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.danger.base,
  },
  containerTitle: {
    flexDirection: 'row',
  },
  personName: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBottom2: {
    marginRight: 12,
  },
  rectangle: {
    borderTopWidth: 1,
    borderColor: Colors.dark.neutral20,
    marginHorizontal: -16,
    marginTop: 16,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 12,
  },
  rowBottomLeftCard: {
    flexDirection: 'row',
    marginRight: 12,
  },
  iconLive: {
    marginRight: 9,
  },
});
