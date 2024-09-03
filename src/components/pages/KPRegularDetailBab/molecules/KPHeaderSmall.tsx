/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import {SCREEN_NAME} from '@constants/screen';
import WhiteArrow from '@assets/svg/ic_arrow_left_white.svg';
import {SvgUri} from 'react-native-svg';
import DocumentWhiteIcon from '@assets/svg/documentWhite.svg';
import {SubjectType} from '@constants/subjectType';

type IRenderHeader = {
  navigation: any;
  subjectName: string;
  subjectIcon: any;
  chapterData: any;
  category: string;
  isSoal?: boolean;
  soalType?: string;
};

export const KPHeaderSmall = ({
  navigation,
  subjectName,
  subjectIcon,
  chapterData,
  category,
  isSoal,
  soalType,
}: IRenderHeader) => {
  const [showNotesList, setShowNotesList] = useState(false);
  const [showAkmTextHeader, setShowAkmTextHeader] = useState(false);
  const [showRegulartextHeader, setShowRegulartextHeader] = useState(false);
  const [headerCategory, setHeaderCategory] = useState<string>('');
  const [showSoalTextHeader, setShowSoalTextHeader] = useState(false);

  useEffect(() => {
    switch (category) {
      case SubjectType.AKM.AKM:
        setShowNotesList(false);
        setShowAkmTextHeader(true);
        break;
      case SubjectType.SOAL.UlanganHarianPractice:
        setShowNotesList(false);
        setShowAkmTextHeader(false);
        setShowSoalTextHeader(true);
        break;
      case SubjectType.SOAL.UlanganHarianTest:
        setShowNotesList(false);
        setShowAkmTextHeader(false);
        setShowSoalTextHeader(true);
        break;
      case SubjectType.KPRegular.Practice:
        setShowNotesList(true);
        setShowAkmTextHeader(false);
        setShowRegulartextHeader(true);
        setHeaderCategory('Practice');
        break;
      case SubjectType.KPRegular.Test:
        setShowNotesList(true);
        setShowAkmTextHeader(false);
        setShowRegulartextHeader(true);
        setHeaderCategory('Test');
        break;
      case SubjectType.KPRegular.Learn:
        setShowNotesList(true);
        setShowAkmTextHeader(false);
        setShowRegulartextHeader(true);
        setHeaderCategory('Learn');
        break;
      case SubjectType.LMS.MateriSekolah:
        setShowNotesList(true);
        setShowAkmTextHeader(false);
        setShowRegulartextHeader(true);
        setHeaderCategory('Materi Sekolah');
        break;
      default:
        break;
    }
  }, []);

  return (
    <ImageBackground
      source={require('@assets/images/header_background.png')}
      resizeMode={'cover'}
      style={
        category === SubjectType.AKM.AKM
          ? styles.topContainerAKM
          : styles.topContainer2
      }>
      <View style={styles.ibHeaderContainer2}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[
            styles.ibHeaderLeftContent,
            category === SubjectType.AKM.AKM && styles.mb3p,
          ]}>
          <WhiteArrow width={25} height={25} />
        </TouchableOpacity>
        {showAkmTextHeader && (
          <View style={styles.headerTitleContainer}>
            <Text allowFontScaling={false} style={styles.headerTitleStyle}>
              {isSoal ? 'AKM SOAL' : 'AKM Kelas Pintar Regular'}
            </Text>
            <Text allowFontScaling={false} style={styles.headerSubTitleStyle}>
              {chapterData?.data?.type === 'AKM Literasi'
                ? 'Literasi'
                : 'Numerasi'}{' '}
              •{' '}
              {chapterData?.data?.packages?.[0]?.question_type_id === 1
                ? 'Pilihan Ganda'
                : 'Uraian'}
            </Text>
          </View>
        )}

        {showNotesList && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN_NAME.NotesScreen, {
                title: `${subjectName} • ${
                  chapterData?.chapter?.name
                    ? chapterData?.chapter?.name
                    : chapterData?.name
                }`,
                chapter_id: chapterData?.chapter?.id,
              })
            }
            style={styles.ibHeaderRightContent}>
            <DocumentWhiteIcon />
          </TouchableOpacity>
        )}
      </View>

      {showRegulartextHeader && (
        <View style={styles.ibHeaderBottomContent}>
          <View style={styles.ibHeaderBottomRightContent2}>
            <Text allowFontScaling={false} style={styles.ibHeaderTitle2}>
              {chapterData?.chapter?.name || chapterData?.name}
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                styles.ibHeaderTitle1,
                styles.mt5,
              ]}>{`${headerCategory} • ${subjectName ?? ''}`}</Text>
          </View>
        </View>
      )}

      {showSoalTextHeader && (
        <View style={styles.ibHeaderBottomContent}>
          <View style={styles.ibHeaderBottomLeftContent}>
            <View style={styles.ibHeaderLessonIcon}>
              {subjectIcon ? (
                <View style={styles.iconContainer}>
                  <SvgUri uri={subjectIcon} width={50} height={50} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.ibHeaderBottomRightContent}>
            <View>
              <Text
                allowFontScaling={false}
                style={styles.ibHeaderTitle1}>{`Ulangan Harian • ${
                soalType ?? ''
              }`}</Text>
              <Text
                allowFontScaling={false}
                style={styles.ibHeaderTitle1WithMargin}>{`${subjectName} • ${
                chapterData?.name ?? ''
              }`}</Text>
              <Text allowFontScaling={false} style={styles.ibHeaderTitle2}>
                {subjectName ?? ''}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};
