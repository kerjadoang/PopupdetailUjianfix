import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Arrow from '@assets/svg/ic_arrow_right_blue.svg';
import UserIcon from '@assets/svg/ic_user.svg';

type Props = {
  isHistory?: boolean;
  img?: string;
  name?: string;
  nik?: any;
  desc?: string;
  action?: () => void;
};

const CardStudent = ({
  img,
  name,
  nik,
  action,
  desc,
  isHistory = false,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      {!isHistory ? (
        <View style={styles.imgContainer}>
          <>
            {img ? (
              <Image source={{uri: img}} style={styles.img} />
            ) : (
              <UserIcon width={20} height={20} />
            )}
          </>
        </View>
      ) : null}
      <View style={styles.mid}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nik}>NIS : {nik}</Text>
        {isHistory ? <Text style={styles.desc}>{desc}</Text> : null}
      </View>
      <Arrow />
    </TouchableOpacity>
  );
};
export {CardStudent};
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
  imgContainer: {
    width: '10%',
  },
  nik: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  desc: {
    backgroundColor: Colors.primary.light2,
    color: Colors.primary.base,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    width: 185,
    marginTop: 5,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});
