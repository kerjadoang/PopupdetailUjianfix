import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {RightArrow} from '@assets/images';
import Colors from '@constants/colors';

const HowToPayment = () => {
  const [isOpen, setIsOpen] = useState(true);

  const title1 = 'Pembayaran BNI Virtual Account dengan SMS Banking';
  const title2 = 'Pembayaran BNI Virtual Account dengan ATM BNI';

  const step1 = [
    'Buka aplikasi SMS Banking BNI',
    'Pilih menu Transfer',
    'Pilih menu Transfer rekening BNI.',
    'Masukkan nomor rekening tujuan dengan 16 digit Nomor Virtual Account (Contoh: 8277087781881441)',
  ];

  const step2 = [
    'Masukkan Kartu Anda',
    'Pilih Bahasa',
    'Masukkan PIN ATM Anda',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{'Tata Cara Pembayaran'}</Text>
        <Pressable
          style={{width: '10%'}}
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <Image
            source={RightArrow}
            style={isOpen === true ? styles.iconup : styles.icondown}
          />
        </Pressable>
      </View>
      <View style={isOpen === true ? {} : styles.none}>
        <Text
          style={[styles.title, {fontSize: 14, color: Colors.dark.neutral60}]}>
          {title1}
        </Text>
        {step1.map((element, index) => {
          return (
            <View style={styles.row}>
              <Text style={styles.number}>{index + 1}</Text>
              <Text>{element}</Text>
            </View>
          );
        })}

        <Text
          style={[styles.title, {fontSize: 14, color: Colors.dark.neutral60}]}>
          {title2}
        </Text>
        {step2.map((element, index) => {
          return (
            <View style={styles.row}>
              <Text style={styles.number}>{index + 1}</Text>
              <Text>{element}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 5,
    elevation: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '90%',
  },
  iconup: {
    transform: [{rotate: '270deg'}],
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  icondown: {
    transform: [{rotate: '90deg'}],
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  none: {display: 'none'},
  number: {
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
    padding: 10,
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    fontFamily: 'Poppins-Bold',
  },
});

export default HowToPayment;
