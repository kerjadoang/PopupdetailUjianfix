import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Ic_arrow from '@assets/svg/ic_arrow_right_grey.svg';

type Props = {
  action?: any;
  action_not_present?: any;
  data_attendance?: any;
  data_absent?: any;
};

const Card = (props: Props) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.title}>Presensi Sesi Kelas</Text>
      <View style={[styles.row]}>
        <View style={{marginTop: 10, width: '45%'}}>
          <Text style={styles.subTitle}>Hadir</Text>
          <Pressable
            style={[styles.row, {alignItems: 'center'}]}
            onPress={props?.action}>
            <View style={styles.bulletGreen} />
            <Text style={styles.title}>
              {props?.data_attendance?.attend_count} Sesi
            </Text>
            <Ic_arrow width={16} height={16} />
          </Pressable>
        </View>

        <View style={{marginTop: 10, width: '45%'}}>
          <Text style={styles.subTitle}>Tidak Hadir</Text>
          <Pressable
            style={[styles.row, {alignItems: 'center'}]}
            onPress={props?.action_not_present}>
            <View style={styles.bulletRed} />
            <Text style={styles.title}>{props?.data_absent} Sesi</Text>
            <Ic_arrow width={16} height={16} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Card;
