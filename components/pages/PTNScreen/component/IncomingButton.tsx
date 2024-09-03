import {Countdown} from '@components/atoms';
import Colors from '@constants/colors';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  data: any;
};

export const IncomingButton: FC<Props> = ({data}: Props) => {
  return (
    <View style={styles.tabMendatangTimerInnerContainer}>
      <Text style={styles.tabMendatangScheduleDate1}>Mulai Dalam</Text>
      <Countdown endTime={data?.time_start} isHideSeconds onlyShowTime />
    </View>
  );
};

const styles = StyleSheet.create({
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
