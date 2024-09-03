import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Ic_arrow from '@assets/svg/ic_arrow_right_grey.svg';

type Props = {
  action?: any;
  action_not_present?: any;
  data_attendance?: any;
};

const Card = ({action, action_not_present, data_attendance}: Props) => {
  return (
    <View>
      <View style={[styles.card, styles.shadowProp]}>
        <Text style={styles.title}>Presensi Sesi Kelas</Text>
        <View style={styles.row}>
          <View style={{marginTop: 10}}>
            <Text style={styles.subTitle}>Hadir</Text>
            <Pressable style={styles.row} onPress={action}>
              <View style={styles.bulletGreen} />
              <Text style={styles.title}>
                {data_attendance?.attend_count} Sesi
              </Text>
              <Ic_arrow width={20} />
            </Pressable>
          </View>

          <View style={{marginTop: 10, left: 30}}>
            <Text style={styles.subTitle}>Tidak Hadir</Text>
            <Pressable style={styles.row} onPress={action_not_present}>
              <View style={styles.bulletRed} />
              <Text style={styles.title}>
                {data_attendance?.absent_count} Sesi
              </Text>
              <Ic_arrow width={20} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
