import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import IconPhone from '@assets/svg/ic24_phone.svg';
import IconMail from '@assets/svg/mail.svg';
import IconSchool from '@assets/svg/Sekolah.svg';
import {Button} from '../Button';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
const window = Dimensions.get('window');

interface IAboutSchool {
  school: {
    icon_path_url: string;
    name: string;
    phone_number: string;
    email: string;
  };
  action: any;
}
const SwipeUpAboutSchool = ({school, action}: IAboutSchool) => {
  return (
    <View style={styles.swipeUpContainer}>
      <Image
        style={{width: 72, height: 72}}
        source={{
          uri: school?.icon_path_url,
        }}
      />
      <Text style={[styles.schoolTitle, {marginTop: 12, fontSize: 18}]}>
        {school?.name || '-'} hello
      </Text>
      <View style={styles.address}>
        <View style={{flexDirection: 'row', paddingTop: 8}}>
          <IconSchool />
          <Text style={styles.addressTitle}>{school?.name}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 8}}>
          <IconPhone />
          <Text style={styles.addressTitle}>{school?.phone_number}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 8}}>
          <IconMail />
          <Text style={styles.addressTitle}>{school?.email}</Text>
        </View>
      </View>
      <Button
        label={'Tutup'}
        style={styles.closeButton}
        background={Colors.primary.base}
        color={Colors.white}
        action={() => action}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swipeUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  schoolTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginVertical: 8,
  },
  addressTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.25,
    paddingLeft: 5,
    color: Colors.dark.neutral80,
  },
  closeButton: {
    width: window.width * 0.9,
    marginBottom: 16,
  },
});

export {SwipeUpAboutSchool};
