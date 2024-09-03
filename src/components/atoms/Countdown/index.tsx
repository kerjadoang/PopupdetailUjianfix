import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {convertDate} from '@constants/functional';
import dayjs from 'dayjs';
import React, {useState, useEffect, ReactElement, useRef} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

export type TCountdownProps = {
  endTime?: any;
  actionAfterTimeOver?: () => void;
  renderAfterTimeOver?: any;
  onlyShowTime?: boolean;
  isHideSeconds?: boolean;
  useLocalTime?: boolean;
  containerStyle?: StyleProp<TextStyle>;
  topComponent?: ReactElement;
  bottomComponent?: ReactElement;
  showCountDown?: boolean;
};

const Countdown = ({
  endTime,
  actionAfterTimeOver,
  renderAfterTimeOver,
  onlyShowTime,
  isHideSeconds,
  useLocalTime,
  containerStyle,
  topComponent,
  bottomComponent,
  showCountDown = true,
}: TCountdownProps) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const {days, hours, minutes, seconds} = remainingTime;
  const isTimeOver = days < 1 && hours < 1 && minutes < 1 && seconds < 1;
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isTimeOver) {
      return;
    }

    clearInterval(timerRef.current);
    actionAfterTimeOver?.();
  }, [isTimeOver]);

  function getRemainingTime() {
    const localTime = dayjs().utc(true).toString();
    const now = !useLocalTime
      ? convertDate().toDate().getTime()
      : convertDate(localTime).toDate().getTime();
    const end = convertDate(endTime).toDate().getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {days, hours, minutes, seconds};
  }

  const remainingDaysTitle = days != 0 ? `${days} hari : ` : '';
  const remainingHoursTitle = hours != 0 ? `${hours} jam : ` : '';
  const remainingMinutesTitle =
    minutes != 0
      ? isHideSeconds
        ? `${minutes} menit`
        : `${minutes} menit : `
      : '';
  const remainingSecondsTitle = isHideSeconds
    ? ''
    : `${seconds > 0 ? seconds : '0'} detik`;

  return (
    <View style={containerStyle}>
      {!isTimeOver ? topComponent : null}
      {!isTimeOver ? (
        !showCountDown ? null : onlyShowTime ? (
          <Text style={styles.title}>
            {`${remainingDaysTitle}${remainingHoursTitle}${remainingMinutesTitle}${remainingSecondsTitle}`}
          </Text>
        ) : (
          <Text style={styles.title}>
            {`Mulai dalam ${remainingDaysTitle}${remainingHoursTitle}${remainingMinutesTitle}${remainingSecondsTitle}`}
          </Text>
        )
      ) : (
        renderAfterTimeOver || null
      )}
      {!isTimeOver ? bottomComponent : null}
    </View>
  );
};

export {Countdown};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
});
