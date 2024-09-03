import React, {FC, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, Linking, Dimensions} from 'react-native';
import styles from './styles';
import {useNavigate} from '@hooks/useNavigate';
import {LMSTeacherDetailClassSessionScreenParam} from 'type/screen';
import {formatDate, showErrorToast} from '@constants/functional';
import {Button, Countdown} from '@components/atoms';
import {useDispatch} from 'react-redux';
import {fetchStartMeeting} from '@redux';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {useGetClassSession} from '@services/lms';
import {ILMSTeacherClassSessionFilter} from '@services/lms/type';
import {useIsFocused} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import Colors from '@constants/colors';

type Props = {};

const CardSesiKelas: FC<Props> = ({}) => {
  const {navigateScreen, popScreen} = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);

  const params: ILMSTeacherClassSessionFilter = useMemo(() => {
    return {
      status: 'on_going,unstarted',
      page: 1,
      limit: 3,
      rombel_class_school_id: '',
      subject: '',
      type: '',
      platform: '',
      search: '',
      teacherId: '',
    };
  }, []);

  const {data: sessionData, refetch}: any = useGetClassSession(params);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const _renderCardTimesOver = (item: any) => {
    return (
      <View style={styles.cardCountDownStartContainer}>
        <Text style={styles.cardCountDownStartTitle}>
          {'Segera Berlangsung'}
        </Text>

        <Button
          style={styles.cardCountDownStartButton}
          label={'Mulai'}
          action={() => {
            dispatch(
              fetchStartMeeting(
                {
                  class_session_id: item?.id,
                  subject_id: item?.subject?.id,
                  subject: item?.subject?.name,
                  rombel_class_id: item?.rombel_class_id,
                  rombel_class: item?.rombel_class?.name,
                  platform: item?.platform,
                },
                () => {
                  if (item?.platform === 'google_meet') {
                    if (item?.google_meet?.start_url !== '') {
                      const meetUrl = item?.google_meet?.start_url;
                      Linking.openURL(meetUrl)
                        .then(() => {
                          popScreen();
                        })
                        .catch(() => {});
                    } else {
                      showErrorToast('Gagal masuk google meet');
                    }
                  } else if (item?.platform === 'zoom') {
                    // navigation.navigate('LMSTeacherMeetingLiveSessionScreen');
                  }
                },
              ),
            );
          }}
        />
      </View>
    );
  };

  const _renderContent = (item: any) => {
    const {
      id,
      title,
      time_start,
      time_end,
      platform,
      type,
      status,
      rombel_class,
      subject,
    } = item;

    const timeStart = new Date(time_start);
    const timeStartMiliSeconds = timeStart?.getTime();
    const today = new Date();
    const todayMiliSeconds = today.getTime();
    const timeToStartLiveMeetingMiliSeconds =
      timeStartMiliSeconds - todayMiliSeconds;
    const timeToStartLiveMeetingMinutes = Math.round(
      timeToStartLiveMeetingMiliSeconds / 1000 / 60,
    );

    const typeName = type == 'live' ? 'Langsung' : 'Rekaman';
    const isOnGoing = status == 'on_going';
    const isUnstarted = status == 'unstarted';
    const platformTitle =
      platform == 'zoom'
        ? 'Zoom'
        : platform == 'google_meet'
        ? 'Google Meet'
        : '';
    const date = formatDate(time_start, time_end);

    return (
      <TouchableOpacity
        onPress={() => {
          navigateScreen<LMSTeacherDetailClassSessionScreenParam>(
            'LMSTeacherDetailClassSessionScreen',
            {id},
          );
        }}
        style={styles.dataCard}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{rombel_class?.name}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.titleBadge}>{typeName}</Text>
          </View>

          {platformTitle.length == 0 ? null : (
            <View style={styles.badge}>
              <Text style={styles.titleBadge}>{platformTitle}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle}>{subject?.name}</Text>
        <Text style={styles.cardSubtitle}>{title}</Text>
        <Text style={styles.cardDateTitle}>{date}</Text>
        <View style={styles.lineGrey} />

        {isOnGoing ? (
          <View style={styles.cardCountDownContainer}>
            <View style={styles.onGoingContainer}>
              <View style={styles.onGoingDotOutter}>
                <View style={styles.onGoingDotInner} />
              </View>
              <Text style={styles.onGoingTitle}>{'Sedang berlangsung'}</Text>
            </View>

            <Button
              style={styles.cardCountDownButton}
              label={'Masuk'}
              action={() => {
                if (item?.platform === 'google_meet') {
                  if (item?.google_meet?.start_url !== '') {
                    const meetUrl = item?.google_meet?.start_url;
                    Linking.openURL(meetUrl)
                      .then(() => {
                        popScreen();
                      })
                      .catch(() => {});
                  } else {
                    showErrorToast('Gagal masuk google meet');
                  }
                } else if (item?.platform === 'zoom') {
                  // dispatch(
                  //   fetchTeacherJoinMeeting(item?.id, () =>
                  //     navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
                  //   ),
                  // );
                }
              }}
            />
          </View>
        ) : isUnstarted ? (
          <View style={styles.cardCountDownContainer}>
            {timeToStartLiveMeetingMinutes < 1 ? (
              _renderCardTimesOver(item)
            ) : (
              <Countdown
                endTime={time_start}
                renderAfterTimeOver={_renderCardTimesOver(item)}
              />
            )}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <RobotSedih style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>
          {'Belum Ada Sesi Kelas Dijadwalkan'}
        </Text>
        <Text style={styles.noDataDescription}>
          {'Sesi kelas yang dijadwalkan akan\ntampil disini.'}
        </Text>

        <Button
          style={styles.ph16}
          label={'+ Buat Sesi Kelas'}
          action={() => {
            navigateScreen('LMSTeacherFormClassSessionScreen', {
              // teacherId: teacher?.id,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sesi Kelas</Text>

        {sessionData?.data !== undefined ? (
          <TouchableOpacity
            onPress={() => navigateScreen('LMSTeacherClassSessionScreen')}>
            <Text style={styles.headerBtn}>Lihat Semua</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {sessionData?.data !== undefined ? (
        <View>
          <Carousel
            data={sessionData?.data}
            renderItem={({item}) => _renderContent(item)}
            itemWidth={Dimensions.get('screen').width - 32}
            sliderWidth={Dimensions.get('screen').width - 32}
            loop={true}
            vertical={false}
            useScrollView={true}
            onSnapToItem={index => setIndex(index)}
          />

          <Pagination
            containerStyle={{paddingVertical: 16}}
            dotsLength={sessionData?.data?.length}
            activeDotIndex={index}
            dotColor={Colors.primary.base}
            dotStyle={styles.dotStyle}
            inactiveDotColor={Colors.dark.neutral40}
          />
        </View>
      ) : (
        _renderNoData()
      )}
    </View>
  );
};

export default CardSesiKelas;
