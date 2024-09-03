import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../styles';

const ModalInfo = () => {
  return (
    <View style={{padding: 16}}>
      <Text style={styles.textTitleModal}>Apa itu Kompetensi Dasar?</Text>
      <Text style={styles.textSubModal}>
        <Text style={[styles.textSubModal, {fontFamily: 'Poppins-Bold'}]}>
          KD atau Kompetensi Dasar{' '}
        </Text>
        adalah kumpulan-kumpulan bab dari setiap mata pelajaran. Masing-masing
        bab tersebut memiliki nilai yang harus dimasukkan seperti{' '}
        <Text style={[styles.textSubModal, {fontFamily: 'Poppins-Bold'}]}>
          Penilaian Harian, Penilaian Tengah Semester
        </Text>{' '}
        dan{' '}
        <Text style={[styles.textSubModal, {fontFamily: 'Poppins-Bold'}]}>
          Penilaian Akhir Semester.
        </Text>
      </Text>
    </View>
  );
};

export {ModalInfo};
