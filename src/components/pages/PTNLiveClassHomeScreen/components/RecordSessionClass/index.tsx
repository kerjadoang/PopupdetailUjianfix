import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

import {Button} from '@components/atoms';
import LiveClassCardItem from '../LiveClassCardItem';

type Props = {
  data: any;
  onRecord: (item: any) => void;
  onSeeAllRecording: () => void;
};

const RecordSessionClass: FC<Props> = ({data, onRecord, onSeeAllRecording}) => {
  return (
    <>
      <Text style={[styles.rightTitle]}>Rekaman Sesi Kelas</Text>
      <LiveClassCardItem
        emptyText="Belum ada jadwal kelas"
        onRecord={onRecord}
        onCardPress={onRecord}
        data={data}
      />
      <Button
        label="Lihat Semua Rekaman"
        color={Colors.primary.base}
        background={Colors.primary.light3}
        style={styles.btnSeeOther}
        action={() => {
          onSeeAllRecording();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  rightTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 12,
  },
  btnSeeOther: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 20,
  },
});

export default RecordSessionClass;
