import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Ic_union from '@assets/svg/ic_union.svg';
import Ic_school from '@assets/svg/ic56_kelas_offline.svg';
import Colors from '@constants/colors';

type Props = {
  type?: any;
  data_attendance?: any;
};

const SwipeChildren = ({type, data_attendance}: Props) => {
  return (
    <ScrollView style={{height: type === 1 ? 180 : 400}}>
      <View style={styles.contentContainerSwipe}>
        <Text style={styles.titleSwipe}>Laporan Kehadiran Sesi Kelas</Text>
        <View
          style={[styles.row, {justifyContent: 'space-around', marginTop: 20}]}>
          <View style={styles.contentSwipe}>
            <Ic_union width={56} height={56} />
            <Text style={[styles.subTitle, {color: Colors.dark.neutral100}]}>
              Kelas Online
            </Text>
            <Text style={[styles.title, {marginRight: 0}]}>
              Sesi {data_attendance?.online_class}{' '}
            </Text>
          </View>
          <View style={styles.contentSwipe}>
            <Ic_school width={56} height={56} />
            <Text style={[styles.subTitle, {color: Colors.dark.neutral100}]}>
              Tatap Muka
            </Text>
            <Text style={[styles.title, {marginRight: 0}]}>
              Sesi {data_attendance?.offline_class}
            </Text>
          </View>
        </View>
        <View />
      </View>
    </ScrollView>
  );
};

export default SwipeChildren;
