import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Calendar from '@assets/svg/ic_calendar_blue.svg';
import People from '@assets/svg/ic16_users.svg';
import {Countdown, MainView} from '@components/atoms';
import 'dayjs/locale/id';
import {
  convertDate,
  isDeepEqual,
  isStringContains,
} from '@constants/functional';
import Colors from '@constants/colors';

type Props = {
  item: any;
  index: number;
  onPress: CallBackWithParams<void, any>;
};

const propsAreEqual = (prevProps: Props, nextProps: Props) =>
  isDeepEqual(prevProps.item, nextProps.item);

const ScheduleCard = React.memo(({item, index, onPress}: Props) => {
  const isExpired = convertDate().isAfter(convertDate(item.time_finish));
  const isRegistered = isStringContains(item?.status, 'sudah mendaftar');
  const isIncoming = convertDate(convertDate()).isBefore(
    convertDate(item?.time_start),
  );

  const renderButton = () => {
    return (
      <Pressable
        style={[
          styles.buttonJoin,
          {
            backgroundColor: isExpired
              ? Colors.dark.neutral40
              : Colors.primary.base,
          },
        ]}
        disabled={isExpired}
        onPress={() => {
          item.isRegistered = isRegistered;
          onPress?.(item);
        }}>
        <Text style={isExpired ? styles.textGray : styles.textWhite}>
          {isRegistered ? 'Ikuti' : 'Daftar'}
        </Text>
      </Pressable>
    );
  };

  const renderStatus = (isIncoming: boolean, status?: string) => {
    return (
      <Text
        style={
          isRegistered
            ? styles.textSubTitleGreen
            : isIncoming
            ? styles.textSubTitleBlue
            : styles.textSubTitleGray
        }>
        {status || item?.status}
      </Text>
    );
  };

  return (
    <Pressable key={index} style={[styles.shadowProp, styles.card]}>
      <MainView>
        <View style={styles.row}>
          {!isIncoming ? (
            renderStatus(false)
          ) : (
            <Countdown
              endTime={convertDate(item?.time_start)}
              useLocalTime
              showCountDown={false}
              topComponent={renderStatus(true)}
              renderAfterTimeOver={renderStatus(false, 'Belum mendaftar')}
            />
          )}
          {isExpired ? (
            <Text style={[styles.textSubTitleRed, {marginRight: 4}]}>
              Sudah Ditutup
            </Text>
          ) : null}
        </View>
        <View style={[styles.rowBetween, styles.detailRegister]}>
          <Text style={styles.textTitleBlack} numberOfLines={2}>
            {item?.title}
          </Text>
          {!isIncoming ? (
            renderButton()
          ) : (
            <Countdown
              endTime={convertDate(item?.time_start)}
              useLocalTime
              showCountDown={false}
              renderAfterTimeOver={renderButton()}
            />
          )}
        </View>
        <Text style={styles.textSubTitleGrey}>{item?.sub_title}</Text>
        <MainView marginRight={16}>
          {item?.note_group?.map((item: any, i: number) => {
            const [startDateTime, endDateTime] = item?.description.split(' - ');
            const startDate = convertDate(startDateTime).format(
              'ddd, D MMMM YYYY • HH:mm',
            );
            const endDate = convertDate(endDateTime).format(
              'ddd, D MMMM YYYY • HH:mm',
            );
            const isDateRange =
              convertDate(startDateTime).isValid() &&
              convertDate(endDateTime).isValid();
            const convertedRange = `${startDate} - ${endDate}`;
            return (
              <View key={i} style={[styles.row, styles.flexStart]}>
                {item?.icon === 'calendar' ? (
                  <Calendar width={16} style={{marginRight: 5}} />
                ) : (
                  <People width={16} style={{marginRight: 5}} />
                )}
                <Text style={styles.textSubTitle}>
                  {isDateRange ? convertedRange : item?.description}
                </Text>
              </View>
            );
          })}
        </MainView>
      </MainView>
      {!isIncoming ? null : (
        <Countdown
          endTime={convertDate(item?.time_start)}
          useLocalTime
          topComponent={
            <MainView
              marginVertical={14}
              backgroundColor={Colors.dark.neutral40}
              height={1}
            />
          }
        />
      )}
    </Pressable>
  );
}, propsAreEqual);

export {ScheduleCard};
