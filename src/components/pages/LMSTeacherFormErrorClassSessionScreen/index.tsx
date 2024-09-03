import React, {useLayoutEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {kelasPintarWhatsappLink} from '@constants/functional';
import Fonts from '@constants/fonts';
import {Button} from '@components/atoms';
import IconMaskot19 from '@assets/svg/maskot_19.svg';
import {IconWhatsappWhite} from '@assets/images';
import {StackNavigationProp} from '@react-navigation/stack';

const LMSTeacherFormErrorClassSessionScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherFormErrorClassSessionScreen'>
    >();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Sesi Kelas'} />,
    });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <IconMaskot19 width={100} height={100} style={styles.icon} />
        <Text style={styles.title}>{'Sistem mengalami kesulitan.'}</Text>
        <Text style={styles.description}>
          {
            'Kami mohon maaf atas ketidaknyamanan ini\nHarap tunggu sebentar atau hubungi kami\nuntuk bantuan lebih lanjut.'
          }
        </Text>
        <Button
          icon={IconWhatsappWhite}
          action={() => {
            Linking.openURL(kelasPintarWhatsappLink).catch(err =>
              // eslint-disable-next-line no-console
              console.error("Couldn't load page", err),
            );
          }}
          label={'Hubungi Sobat Pintar'}
          bottom={12}
        />
        <Button
          outline
          action={() => {
            navigation.navigate('BottomTabNavigatorGuru');
          }}
          label={'Kembali ke Beranda'}
        />
      </View>
    </View>
  );
};

export default LMSTeacherFormErrorClassSessionScreen;

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  container: {
    width: '100%',
    padding: 16,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
    marginBottom: 28,
    textAlign: 'center',
  },
});
