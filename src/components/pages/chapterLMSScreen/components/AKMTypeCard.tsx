import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../style';
import LiterasiIcon from '@assets/svg/ic_literasi_bg.svg';
import NumerasiIcon from '@assets/svg/ic_numerasi_bg.svg';
import RightIconBlue from '@assets/svg/blueArrow.svg';
import PGIconYellow from '@assets/svg/pg_yellow.svg';
import UraianIconYellow from '@assets/svg/uraian_yellow.svg';
import PGIconBlue from '@assets/svg/pg_blue.svg';
import UraianIconBlue from '@assets/svg/uraian_blue.svg';
import {SCREEN_NAME} from '@constants/screen';
import {Pressable} from 'react-native';

type IAKMTypeCard = {
  akmTitle: string;
  questionTypeData: any;
  navigation: any;
};

export const AKMTypeCard = ({
  akmTitle,
  questionTypeData,
  navigation,
}: IAKMTypeCard) => {
  return (
    <View style={styles.literationCardContainer}>
      <View
        style={
          akmTitle === 'AKM Literasi'
            ? styles.literationIconContainer
            : styles.numerationIconContainer
        }>
        <View style={styles.literationIconInnerCOntainer}>
          {akmTitle === 'AKM Literasi' ? <LiterasiIcon /> : <NumerasiIcon />}
        </View>
      </View>

      <View style={styles.literationBodyContainer}>
        {questionTypeData?.map((ie: any, index: any) => {
          return (
            <Pressable
              key={`KPLiteration-${index}`}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.KPRegularDetail, {
                  category: 'AKM',
                  isSoal: true,
                  questionTypeId: ie?.id?.toString(),
                  questionPackageServiceId:
                    akmTitle === 'AKM Literasi' ? '1' : '2',
                });
              }}
              style={styles.literationBodyInnerContainer}>
              <View style={styles.literationTypeIconContainer}>
                {ie?.question_type === 'pilihan ganda' ? (
                  akmTitle === 'AKM Literasi' ? (
                    <PGIconYellow />
                  ) : (
                    <PGIconBlue />
                  )
                ) : akmTitle === 'AKM Literasi' ? (
                  <UraianIconYellow />
                ) : (
                  <UraianIconBlue />
                )}
              </View>
              <View style={styles.literationTypeTitleContainer}>
                <Text style={styles.literationTypeTitle}>
                  {ie?.question_type === 'pilihan ganda'
                    ? 'Pilihan Ganda'
                    : 'Uraian'}
                </Text>
              </View>
              <View style={styles.literationTypeArrowContainer}>
                <RightIconBlue />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
