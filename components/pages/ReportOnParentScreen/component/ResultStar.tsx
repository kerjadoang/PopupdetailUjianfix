import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Star from '@assets/svg/fullStar.svg';

type Props = {
  rating?: any;
};
const resultStar = ({rating}: Props) => {
  let levelAktivitas;

  if (rating >= 0 && rating <= 1) {
    levelAktivitas = 'Sangat Tidak Aktif';
  } else if (rating >= 1.1 && rating <= 2) {
    levelAktivitas = 'Tidak Aktif';
  } else if (rating >= 2.1 && rating <= 3) {
    levelAktivitas = 'Kurang Aktif';
  } else if (rating >= 3.1 && rating <= 4) {
    levelAktivitas = 'Cukup Aktif';
  } else if (rating >= 4.1 && rating <= 5) {
    levelAktivitas = 'Sangat Aktif';
  } else {
    levelAktivitas = 'Nilai tidak valid';
  }
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.title}>Keaktifan Di Sesi Kelas</Text>
      <View style={styles.row}>
        <View style={{marginTop: 10}}>
          <Pressable style={styles.row}>
            <Star width={20} />
            <Text style={styles.title}>{rating}</Text>
            <Text style={[styles.subTitle, {color: '#4D545C'}]}>
              {levelAktivitas}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default resultStar;
