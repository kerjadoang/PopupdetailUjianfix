import React, {FC} from 'react';
import {View, Text} from 'react-native';
import LogoPtn from '@assets/svg/ptn_blue.svg';
import {styles} from '../../styles';
import Colors from '@constants/colors';

type Props = {};

const SwipeupPtnReleaseDates: FC<Props> = ({}) => {
  return (
    <View style={styles.forbiddenTestContainerStyle}>
      <LogoPtn
        width={100}
        height={50}
        style={styles.forbiddenTestIconContainerStyle}
      />
      <Text style={styles.forbiddenTestDescriptionTopStyle}>
        Waktunya bersiap-siap! Kami dengan senang hati mengumumkan Kelas
        Pertama.
      </Text>
      <Text style={styles.forbiddenTestDescriptionBottomStyle}>
        <Text>Catat tanggalnya </Text>
        <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
          16 Oktober 2023
        </Text>
        <Text> dan mari sambut kehadirannya bersama-sama!</Text>
      </Text>
    </View>
  );
};

export default SwipeupPtnReleaseDates;
