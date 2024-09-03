/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {IconCallHelp, BannerHomeCoin} from '@assets/images';
import {useNavigation} from '@react-navigation/native';

const Info = () => {
  const navigation = useNavigation();
  const data = {
    quest1: 'Apa itu KOIN Kelas Pintar ? ',
    answ1:
      'Koin Kelas Pintar adalah alat tukar berupa koin yang digunakan untuk melakukan transaksi di platform Kelas Pintar.',
    quest2: 'KOIN Kelas Pintar bisa dipakai untuk apa saja?',
    answ2:
      'Saat ini Koin Kelas Pintar dapat digunakan untuk mengajukan pertanyaan pada fitur TANYA.',
    help: 'Butuh bantuan atau mengalami kendala dengan KOIN?',
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Image source={BannerHomeCoin} style={styles.img} />
          <Text style={styles.blueTitle}>{data.quest1}</Text>
          <Text style={styles.answer}>{data.answ1}</Text>
          <Text style={styles.blueTitle}>{data.quest2}</Text>
          <Text style={styles.answer}>{data.answ2}</Text>
          <Text style={[styles.answer, {marginTop: '5%'}]}>{data.help}</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('PusatBantuanScreen', {type: 'CONTACT_US'})
            }
            style={styles.btn}>
            <Image source={IconCallHelp} style={styles.iconBtn} />
            <Text style={styles.labelBtn}>Hubungi Kami</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  blueTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.base,
    fontSize: 20,
  },
  answer: {
    fontFamily: 'Poppins-Light',
    marginBottom: '5%',
    fontSize: 17,
  },
  container: {
    paddingHorizontal: '5%',
  },
  img: {
    alignSelf: 'center',
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: '10%',
  },
  btn: {
    width: '50%',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary.light3,
    flexDirection: 'row',
  },
  labelBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  iconBtn: {
    width: 25,
    height: 25,
  },
});
export default Info;
