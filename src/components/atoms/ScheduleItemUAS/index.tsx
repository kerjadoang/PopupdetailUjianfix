import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import IconBook from '@assets/svg/ic16_book.svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import IconLive from '@assets/svg/ic16_live.svg';
import IconClock from '@assets/svg/ic16_clock.svg';
import {
  checkDate,
  convertBetweenDateTime,
  convertDate,
  isStringContains,
} from '@constants/functional';
import Fonts from '@constants/fonts';
import ScheduleCountdown from '@components/pages/LMSHomeScreen/components/ScheduleCountdown';

type Props = {
  data: any;
  button?: any;
  buttonText: any;
  buttonAction: CallBackWithParams<void, ScheduleType>;
  refetchData?: VoidCallBack;
  accountRole?: AccountRole;
  startDate?: string;
};

const ScheduleItemUAS: FC<Props> = ({
  data,
  button,
  buttonText,
  buttonAction,
  refetchData,
  accountRole,
  startDate,
}) => {
  const isOnGoing = checkDate(
    convertDate(startDate),
    convertDate(data?.time_start) || '',
    {
      type: 'after',
    },
  );
  const isExpired = checkDate(
    convertDate(),
    convertDate(data?.time_finish) || '',
    {
      type: 'after',
    },
  );

  const isStatusDoneScoring = isStringContains(
    data?.status || '',
    'done_scoring',
  );

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
        {!!data?.rombel_class && (
          <View style={styles.ViewRombel}>
            <Text style={styles.TextRombel}>{data?.rombel_class || '-'}</Text>
          </View>
        )}
      </View>

      <View style={styles.flexRow}>
        <View style={(styles.flexCol, {gap: 2, flex: 1})}>
          <View>
            <Text style={styles.subTitle}>{data?.title}</Text>
            <Text style={styles.title}>{data?.sub_title}</Text>
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
        {accountRole === 'MURID' && isOnGoing && button ? (
          <View>
            <Pressable
              style={styles.button}
              onPress={() => buttonAction('ON_GOING')}>
              <Text style={styles.btnText}>{buttonText || 'Mulai'}</Text>
            </Pressable>
          </View>
        ) : !isExpired ? (
          <ScheduleCountdown
            endTime={data?.time_start}
            actionAfterTimeOver={refetchData}
          />
        ) : isExpired && accountRole === 'GURU' ? (
          <View>
            <Pressable
              style={styles.buttonOutline}
              onPress={() =>
                buttonAction(
                  isStatusDoneScoring ? 'EXPIRED_DONE_SCORING' : 'EXPIRED_DONE',
                )
              }>
              <Text style={styles.btnTextBlue}>
                {isStatusDoneScoring ? 'Detail' : 'Periksa'}
              </Text>
            </Pressable>
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

export {ScheduleItemUAS};

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
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
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
  buttonOutline: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary.base,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
    borderWidth: 1,
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  btnTextBlue: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});
