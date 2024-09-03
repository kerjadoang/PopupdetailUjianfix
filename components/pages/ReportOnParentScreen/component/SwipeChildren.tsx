import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Ic_union from '@assets/svg/ic_union.svg';
import Ic_school from '@assets/svg/ic56_kelas_offline.svg';

type Props = {
  type?: any;
  data_absent?: any;
  data_attendance?: any;
};

const SwipeChildren = ({type, data_absent, data_attendance}: Props) => {
  return (
    <ScrollView style={{height: type === 1 ? 200 : 400}}>
      <View style={styles.contentContainerSwipe}>
        <Text style={styles.titleSwipe}>
          {type === 1
            ? 'Laporan Kehadiran Kelas'
            : 'Laporan Ketidakhadiran Sesi Kelas'}
        </Text>
        <View
          style={[styles.row, {justifyContent: 'space-around', marginTop: 20}]}>
          <View style={styles.contentSwipe}>
            <Ic_union width={56} />
            <Text style={[styles.subTitle, {color: '#1D252D'}]}>
              Kelas Online
            </Text>
            <Text style={styles.title}>
              Sesi {data_attendance?.online_class}{' '}
            </Text>
          </View>
          <View style={styles.contentSwipe}>
            <Ic_school width={56} />
            <Text style={[styles.subTitle, {color: '#1D252D'}]}>
              Tatap Muka
            </Text>
            <Text style={styles.title}>
              Sesi {data_attendance?.offline_class}
            </Text>
          </View>
        </View>
        <View>
          {type === 1 ? null : (
            <View>
              {data_absent?.map((item, key) => (
                <View key={key} style={styles.list}>
                  <Text style={styles.textBlue}>123</Text>
                  <Text style={styles.date}>123</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SwipeChildren;
