import React, {FC, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Header} from '@components/atoms';
import {
  useCountdownV2,
  useCountdownV2Actions,
  useCountdownV2IsFinish,
  useCountdownV2RemainDuration,
} from '@zustand/index';
import {convertDate, showWarningToast} from '@constants/functional';
import ReminderTimePopable from '../ReminderTimePopable';
import styles from './styles';
import {calculateTimerLeft} from './utils';
import {useQuery} from '@tanstack/react-query';
import {apiGet} from '@api/wrapping';

type Props = {
  onPressIconRight: VoidCallBack;
  onPressIconLeft: VoidCallBack;
  showCountdown: boolean;
  endTime?: string;
  startTime?: string;
  label: string;
  subLabel?: string;
  validateTime?: IValidateTime;
};

const HeaderQuestion: FC<Props> = ({
  onPressIconLeft,
  onPressIconRight,
  showCountdown,
  endTime,
  startTime,
  label,
  subLabel,
  validateTime = {validate: false},
}: Props) => {
  const {
    startTimer,
    resetState: resetCountdown,
    updateTimer,
    setEndTime,
    setIsFinish,
  } = useCountdownV2Actions();
  const countDown = useCountdownV2();
  const isFinish = useCountdownV2IsFinish();
  const {remainDuration} = useCountdownV2RemainDuration();

  const {} = useQuery({
    queryKey: ['check_time', validateTime.validate],
    queryFn: async () => {
      if (isFinish) {
        return;
      }
      if (!validateTime.url) {
        return;
      }

      const resData = await apiGet<IResValidateTime>({
        url: validateTime.url,
        onTimeout: () => {
          showWarningToast('Koneksi anda melambat');
        },
        retry: 1,
      });

      if ((resData.remaining_time ?? 0) <= 0) {
        setIsFinish(true);
        return resData;
      }

      updateTimer(resData.remaining_time);
      return resData;
    },
    enabled: !isFinish,
    refetchInterval: validateTime.interval || 5000,
  });

  useEffect(() => {
    if (endTime || countDown) {
      const startTimes = convertDate(startTime) || convertDate();
      const endTimes = convertDate(endTime).toISOString();
      setEndTime(endTimes);
      const currentTimeLeft = calculateTimerLeft(
        convertDate(endTime),
        startTimes,
      );
      startTimer(currentTimeLeft);
    }
    return () => {
      resetCountdown();
    };
  }, []);

  // 5884

  return (
    <Header
      subLabel={subLabel}
      onPressIconRight={onPressIconRight}
      onPressIconLeft={onPressIconLeft}
      label={label}
      subLabelContent={
        showCountdown && (
          <ReminderTimePopable
            label={remainDuration}
            visible={countDown >= 0 && countDown < 61}
            countdown={countDown}
          />
        )
      }
      iconRight={
        <View style={styles.labelContainerSelesai}>
          <Text style={styles.labelSelesai}>Selesai</Text>
        </View>
      }
    />
  );
};

export default HeaderQuestion;
