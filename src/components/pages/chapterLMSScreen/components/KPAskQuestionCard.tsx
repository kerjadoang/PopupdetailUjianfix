import React from 'react';
import {View} from 'react-native';
import CardKPRegular from '@components/atoms/CardKPRegular';
import Colors from '@constants/colors';
import {styles} from '../style';

type IKPAskQuestionCard = {
  navigateToTanya: any;
  navigateToSoal: any;
};

export const KPAskQuestionCard = ({
  navigateToTanya,
  navigateToSoal,
}: IKPAskQuestionCard) => {
  return (
    <View style={styles.kpAskQuestionContainer}>
      <CardKPRegular
        label={'Tanya'}
        action={navigateToTanya}
        description={'Ada soal yang sulit? tanyakan ke Guru Ahli!'}
        background={Colors.secondary.light2}
      />

      <CardKPRegular
        label={'Soal'}
        action={navigateToSoal}
        description={'Akses lebih banyak soal latihan dan ujian'}
        background={Colors.success.light2}
      />
    </View>
  );
};
