import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

import RobotSedih from '@assets/svg/robot_sedih.svg';

type Props = {
  isBerlangsung: boolean;
};

const StatusProyekEmpty: FC<Props> = ({isBerlangsung}) => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyStateContainer}>
        <RobotSedih width={100} height={100} style={{marginBottom: 12}} />

        <Text style={styles.emptyStateTitle}>
          {isBerlangsung
            ? 'Belum Ada Proyek Berlangsung'
            : 'Belum Ada Riwayat Proyek'}
        </Text>
        <Text style={styles.emptyStateSubTitle}>
          {isBerlangsung
            ? 'daftar proyek yang sedang berlangsung akan tampil disini.'
            : 'daftar proyek yang telah selesai akan tampil di sini.'}
        </Text>
      </View>
    </View>
  );
};

export default StatusProyekEmpty;
