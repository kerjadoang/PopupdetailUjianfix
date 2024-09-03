import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {MainView} from '@components/atoms';
import {isStringContains} from '@constants/functional';
import {parseUjianType} from './utils';

type Props = {
  examHistoryData?: IExamHistoryData;
};

const UjianScoreCard: FC<Props> = ({examHistoryData}) => {
  return (
    <View style={styles.popUpDoneTopInnerContainerStyle}>
      {isStringContains(
        parseUjianType(examHistoryData?.package_type || ''),
        undefined,
        ['pilihan ganda', 'campuran'],
      ) && (
        <MainView flex={1} alignItems="center">
          <Text style={styles.popUpDoneStripLeftContainerStyle}>
            {examHistoryData?.answered?.length ??
              examHistoryData?.correct_answer?.length ??
              0}
          </Text>
          <Text style={styles.popUpDoneTrueStyle}>Benar</Text>
        </MainView>
      )}
      {isStringContains(
        parseUjianType(examHistoryData?.package_type || ''),
        undefined,
        ['pilihan ganda', 'campuran'],
      ) && (
        <MainView flex={1} alignItems="center">
          <Text style={styles.popUpDoneStripMiddleStyle}>
            {examHistoryData?.wrong_answer?.length ?? 0}
          </Text>
          <Text style={styles.popUpDoneFalseStyle}>Salah</Text>
        </MainView>
      )}
      {isStringContains(
        parseUjianType(examHistoryData?.package_type || ''),
        undefined,
        ['uraian', 'campuran'],
      ) && (
        <MainView flex={1} alignItems="center">
          <Text style={styles.popUpDoneStripLeftContainerStyle}>
            {examHistoryData?.answered?.length ?? 0}
          </Text>
          <Text style={styles.popUpDoneTrueStyle}>Dijawab</Text>
        </MainView>
      )}
      <MainView flex={1} alignItems="center">
        <Text style={styles.popUpDoneStripRightStyle}>
          {examHistoryData?.pass?.length ?? 0}
        </Text>
        <Text style={styles.popUpDoneSkipStyle}>Dilewati</Text>
      </MainView>
    </View>
  );
};

export default UjianScoreCard;
