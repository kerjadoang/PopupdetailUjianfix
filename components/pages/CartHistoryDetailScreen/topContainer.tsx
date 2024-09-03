import Colors from '@constants/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, Text} from 'react-native';

import {MaskotFailed, MaskotSuccess, MaskotWaiting} from '@assets/images';

type Props = {
  status: string;
  orderId?: string;
};

const TopContainer = ({status, orderId}: Props) => {
  return (
    <View style={styles.parent}>
      {status === 'pending' ? (
        <View style={styles.container}>
          <Image source={MaskotWaiting} style={styles.image} />
          <Text style={[styles.title, {color: Colors.secondary.base}]}>
            Selesaikan Pembayaran
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>Status Pembayaran</Text>
            <Text style={[styles.text, styles.wait]}> Menunggu</Text>
          </View>
        </View>
      ) : status === 'succeded' ? (
        <View style={styles.container}>
          <Image source={MaskotSuccess} style={styles.image} />
          <Text style={[styles.title, {color: Colors.success.base}]}>
            Pembelian Paket Berhasil
          </Text>
          <Text style={styles.text}>
            {`Terima kasih. Pembelian paket untuk Order ID ${orderId} berhasil. Kamu bisa langsung menikmati pengalaman belajar yang fleksibel, mudah, lengkap, dan interaktif dari Kelas Pintar.`}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>Status Pembayaran</Text>
            <Text style={[styles.text, styles.sukses]}>Berhasil</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Image source={MaskotFailed} style={styles.image} />
          <Text style={[styles.title, {color: Colors.danger.base}]}>
            Pembelian Paket Gagal
          </Text>
          <Text style={styles.text}>
            {`Maaf, pembelian untuk Order ID ${orderId} gagal karena kesalahan dari sistem. Silakan pesan ulang paket belajar yang kamu inginkan.`}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>Status Pembayaran</Text>
            <Text style={[styles.text, styles.failed]}>Gagal</Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default TopContainer;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginBottom: 150,
  },
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  image: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginTop: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    borderRadius: 18,
    padding: 2,
  },
  wait: {
    color: Colors.secondary.dark1,
    backgroundColor: Colors.secondary.light2,
    paddingHorizontal: 12,
  },
  sukses: {
    color: Colors.success.base,
    backgroundColor: Colors.success.light2,
    paddingHorizontal: 12,
  },
  failed: {
    color: Colors.danger.base,
    backgroundColor: Colors.danger.light2,
    paddingHorizontal: 12,
  },
});
