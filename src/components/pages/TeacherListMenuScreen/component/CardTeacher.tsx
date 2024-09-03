import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Arrow from '@assets/svg/ic_arrow_right_blue.svg';
import Avatar from '@components/atoms/Avatar';

const CardTeacher = ({img, name, nik, className, action}: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View style={styles.imgContainer}>
        <Avatar id={img} style={styles.profilePic} />
      </View>
      <View style={styles.mid}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nik}>NIK : {nik}</Text>
        <Text style={styles.nik}>Kelas : {className}</Text>
      </View>
      <Arrow />
    </TouchableOpacity>
  );
};
export {CardTeacher};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    marginVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  mid: {
    width: '70%',
  },
  imgContainer: {},
  nik: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  profilePic: {
    borderRadius: 25,
    width: 45,
    height: 45,
  },
});
