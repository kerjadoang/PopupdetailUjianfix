import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '@components/atoms';
import LiveClassCardItem from '../LiveClassCardItem';

type Props = {
  data: any;
  onJoin: (item: any) => void;
  onSeeSchedule: () => void;
  onCardJoinLiveClassPress: (item: any) => void;
};

const ScheduleClass: FC<Props> = ({
  data,
  onJoin,
  onSeeSchedule,
  onCardJoinLiveClassPress,
}) => {
  return (
    <View>
      <Text style={styles.rightTitle}>Jadwal Kelas</Text>
      <LiveClassCardItem
        isLive={true}
        emptyText="Belum ada jadwal kelas"
        onJoin={onJoin}
        onCardPress={onCardJoinLiveClassPress}
        data={data}
      />
      <Button
        label="Lihat Jadwal"
        color={Colors.primary.base}
        background={Colors.primary.light3}
        style={styles.btnSeeOther}
        action={onSeeSchedule}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
  },
  btnSeeOther: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 20,
  },
});

export default ScheduleClass;
