/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Linking, Platform} from 'react-native';
import {styles} from './style';
import Logo from '@assets/svg/splash.svg';
import {Button} from '@components/atoms';
import {appVersion} from '@constants/functional';

const About: FC = () => {
  return (
    <View style={styles.container}>
      <Logo width={177.75} height={80} />
      <Text style={styles.title}>Kelas Pintar</Text>

      <Text style={[styles.grayText, {marginTop: 4, lineHeight: 22}]}>
        V.{appVersion}
      </Text>

      <Text style={[styles.grayText, styles.description]}>
        Aplikasi Kelas Pintar menyediakan solusi belajar online dengan metode
        Pintar, Personal, dan Terintegrasi
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          label="Beri Rating"
          action={() => {
            if (Platform.OS !== 'ios') {
              Linking.openURL(
                'market://details?id=id.extramarks.learningapp.dev',
              );
            } else {
              Linking.openURL(
                'itms-apps://apps.apple.com/id/app/kelas-pintar/id1469195409',
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export {About};
