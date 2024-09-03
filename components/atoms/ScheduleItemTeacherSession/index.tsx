import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import IconBook from '@assets/svg/ic16_book.svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import IconLive from '@assets/svg/ic16_live.svg';
import IconClock from '@assets/svg/ic16_clock.svg';
import {convertBetweenDateTime} from '@constants/functional';
import Guru from '@assets/svg/guru_logo.svg';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: any;
  button?: boolean;
};

const ScheduleItemTeacherSession: FC<Props> = ({data, button = true}) => {
  const navigation: any = useNavigation();
  return (
    <View style={[styles.flexCol]}>
      <View
        style={[styles.flexRow, styles.alignCenter, {gap: 8, marginBottom: 8}]}>
        <View style={styles.ViewSesiKelas}>
          <Text style={styles.sesikelas}>
            {data?.type_badge ||
              data?.type
                .split(' ')
                .map(
                  (word: any) => word.charAt(0).toUpperCase() + word.slice(1),
                )
                .join(' ')}
          </Text>
        </View>
      </View>
      <View style={[styles.flexRow, {alignItems: 'center', gap: 4}]}>
        <Guru />
        <Image
          source={{
            uri: data?.creator?.path_url,
          }}
          style={styles.imageProfile}
        />
        <View>
          <Text style={styles.teacher}>
            Ka {data?.creator?.full_name || '-'}
          </Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={(styles.flexCol, {gap: 2, flex: 1})}>
          <View>
            <Text style={styles.title}>{data?.title}</Text>
          </View>
          {data?.note_group?.map((item: any, index: number) => {
            let description;
            if (item?.icon === 'calendar') {
              description = convertBetweenDateTime(item?.description);
            } else {
              description = item?.description;
            }

            return (
              <View key={index} style={styles.alignCenterX}>
                {item.icon === 'book' ? (
                  <IconBook width={16} height={16} />
                ) : item.icon === 'calendar' ? (
                  <IconCalendar width={16} height={16} />
                ) : item.icon === 'clock' ? (
                  <IconClock width={16} height={16} />
                ) : item.icon === 'live' ? (
                  <IconLive width={16} height={16} />
                ) : item.icon === 'elipse' ? (
                  <IconLive width={16} height={16} />
                ) : (
                  <IconBook width={16} height={16} />
                )}

                <Text
                  style={
                    item.icon === 'live'
                      ? styles.live
                      : item.icon === 'elipse'
                      ? styles.live
                      : styles.text
                  }>
                  {description}
                </Text>
              </View>
            );
          })}
        </View>

        {data.status === 'start' && button && (
          <View>
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate('ClassSessionDetailGURUScreen', {
                  id: data?.id_relation,
                  service_type: 'guru',
                });
              }}>
              <Text style={styles.btnText}>{'Gabung'}</Text>
            </Pressable>
          </View>
        )}
        {data.status === 'finish' && button && (
          <View>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('GuruScreen')}>
              <Text style={styles.btnText}>{'Tonton Rekaman'}</Text>
            </Pressable>
          </View>
        )}
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

export {ScheduleItemTeacherSession};

const styles = StyleSheet.create({
  imageProfile: {
    height: 32,
    width: 32,
    borderRadius: 25,
  },
  teacher: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
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
