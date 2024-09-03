import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {MainText, MainView} from '@components/atoms';
import IconBook from '@assets/svg/ic16_book.svg';
import {_handlerCapitalizeFirstLetter} from '@constants/functional';

type Props = {
  moduleName?: string;
  subjectName?: string;
  onPressPelajari?: VoidCallBack;
};

const BankSoalRecommendationCard: FC<Props> = ({
  moduleName,
  subjectName,
  onPressPelajari,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* CHIP */}
      <View style={styles.containerChip}>
        <MainText color={Colors.primary.base} fontSize={12}>
          Bank Soal
        </MainText>
      </View>
      {/* DETAIL */}
      <MainView flex={1} flexDirection="row" alignItems="center">
        <MainView flex={2}>
          <MainText fontSize={14}>
            {_handlerCapitalizeFirstLetter(moduleName || '')}
          </MainText>
        </MainView>
        <MainView flex={1}>
          <Pressable
            style={[styles.buttonPelajari, styles.borderBlue]}
            onPress={onPressPelajari}>
            <Text style={styles.textBlueBold}>Pelajari</Text>
          </Pressable>
        </MainView>
      </MainView>
      {/* MAPEL */}
      <MainView marginTop={4} flex={1} flexDirection="row" alignItems="center">
        <IconBook width={24} height={24} />
        <MainText marginLeft={4} type="Bold" fontSize={14}>
          {subjectName}
        </MainText>
      </MainView>
    </View>
  );
};

export default BankSoalRecommendationCard;
