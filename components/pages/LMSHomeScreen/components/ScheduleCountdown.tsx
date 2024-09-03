import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import {Countdown, TCountdownProps} from '@components/atoms';
import {convertDate} from '@constants/functional';
import dayjs from 'dayjs';

type ScheduleCountdownProps = {
  endTime: string | dayjs.Dayjs;
} & TCountdownProps;

const ScheduleCountdown: React.FC<ScheduleCountdownProps> = ({
  endTime,
  actionAfterTimeOver,
  ...props
}) => {
  const [isHideComponent, setIsHideComponent] = useState<boolean>(false);

  if (isHideComponent) {
    return <></>;
  }

  return (
    <View style={styles.tabMendatangTimerContainer}>
      <View style={styles.tabMendatangTimerInnerContainer}>
        <Text style={styles.tabMendatangScheduleDate1}>Mulai Dalam</Text>
        <Countdown
          endTime={convertDate(endTime)}
          onlyShowTime
          useLocalTime
          actionAfterTimeOver={() => {
            actionAfterTimeOver?.();
            setIsHideComponent(true);
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default ScheduleCountdown;

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
});
