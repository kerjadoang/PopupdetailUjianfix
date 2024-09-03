import Colors from '@constants/colors';
import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {GreyArrow} from '@assets/images';
import Fonts from '@constants/fonts';
import dayjs from 'dayjs';

type Props = {
  count: number;
  orderId?: number;

  name: string;
  role: string;
  email: string;
  phone: number;

  packageName: string;
  pricePackage: any;

  discount?: number;
  priceDiscount: number;
  priceTotal: number;

  paymentMethod: string;
  payment: string;

  icon: any;
  transactionDate: string;
  paymentDate: string;
  status: string;
};

const Details = ({
  count,
  orderId,
  name,
  role,
  email,
  phone,
  packageName,
  pricePackage,
  discount,
  priceDiscount,
  priceTotal,
  paymentMethod,
  payment,
  icon,
  transactionDate,
  paymentDate,
  status,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const waktuTransaksi: any = dayjs(transactionDate)
    .utc()
    .format('DD MMM YYYY HH:mm');
  const waktuPembayaran: any = dayjs(paymentDate)
    .utc()
    .format('DD MMM YYYY HH:mm');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{`Detail Pembelian (${count} Paket)`}</Text>
        <Pressable
          style={{width: '10%'}}
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <Image
            source={GreyArrow}
            style={isOpen === true ? styles.iconup : styles.icondown}
          />
        </Pressable>
      </View>
      <View style={isOpen === true ? styles.detailContainer : styles.none}>
        <Text style={styles.orderId}>{`Order ID : ${orderId}`}</Text>
        <View style={styles.greyContainer}>
          <Text style={[styles.title, {fontSize: 14}]}>Informasi Pembeli</Text>
          <View style={styles.row}>
            <Text style={styles.leftCard}>Nama Lengkap : </Text>
            <Text style={styles.rightCard}>{`${name} (${role})`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftCard}>Email : </Text>
            <Text style={styles.rightCard}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftCard}>No Telepon : </Text>
            <Text style={styles.rightCard}>{phone}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftCard}>{packageName}</Text>
          <Text style={styles.rightCard}>Rp{pricePackage}</Text>
        </View>
        <View style={[styles.row, styles.bottomBorder]}>
          <Text style={styles.leftCard}>{`Diskon ${
            discount ? discount : ''
          }`}</Text>
          <Text style={styles.rightCard}>
            -Rp{priceDiscount ? priceDiscount : 0}
          </Text>
        </View>
        <View style={[styles.row, styles.bottomBorder]}>
          <Text style={[styles.leftCard, {fontFamily: 'Poppins-Bold'}]}>
            Harga Total
          </Text>
          <Text style={[styles.rightCard, {fontFamily: 'Poppins-Bold'}]}>
            Rp{priceTotal ? priceTotal : pricePackage - priceDiscount}
          </Text>
        </View>
        <Text style={styles.leftCard}>Metode Pembayaran</Text>
        <View style={styles.row}>
          <Image source={icon ? icon : null} style={styles.iconPayment} />
          <View>
            <Text>{paymentMethod}</Text>
            <Text>{payment}</Text>
          </View>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.dateText}>Waktu Transaksi</Text>
          <Text style={styles.dateText}>{waktuTransaksi}</Text>
        </View>
        {status !== 'pending' ? (
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.dateText}>Waktu Pembayaran Berhasil</Text>
            <Text style={styles.dateText}>{waktuPembayaran}</Text>
          </View>
        ) : null}
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
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 5,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '90%',
  },
  iconup: {
    transform: [{rotate: '360deg'}],
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  icondown: {
    transform: [{rotate: '180deg'}],
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  none: {display: 'none'},
  orderId: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },
  greyContainer: {
    backgroundColor: Colors.dark.neutral10,
    padding: 10,
    borderRadius: 15,
    marginVertical: 15,
  },
  dateText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  rightCard: {
    textAlign: 'right',
    width: '50%',
  },
  leftCard: {
    textAlign: 'left',
    width: '50%',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  iconPayment: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
export default Details;
