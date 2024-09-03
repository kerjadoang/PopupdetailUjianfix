import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {parseHtml} from '@constants/functional';
import {SubjectType} from '@constants/subjectType';

import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import RenderHTML from 'react-native-render-html';

type IKPPracticeInstructionContent = {
  title?: string;
  instruction?: any;
  instructionData?: any;
  navigation?: any;
  category?: string;
  action?: any;
};

const rulesSOALPractice: any = [
  'Perhatikan pertanyaan dengan seksama untuk mengisi jawaban.',
  'Jika jawabanmu salah, kamu memiliki 1x kesempatan tambahan untuk menjawab pertanyaan yang sama.',
  'Jika dirasa sulit, soal dapat dilompati dan dikerjakan belakangan.',
];

export const KPPracticeInstructionContent = ({
  title,
  instructionData = [],
  category,
  action,
}: IKPPracticeInstructionContent) => {
  const handleShowTitle = () => {
    switch (category) {
      case SubjectType.AKM.AKM:
        return instructionData?.name ?? '';
      case SubjectType.SOAL.UlanganHarianPractice ||
        SubjectType.SOAL.UlanganHarianTest:
        return 'Ulangan Harian • Practice ';
      case SubjectType.KPRegular.Practice:
        return title;
      case SubjectType.KPRegular.Test:
        return title;
    }
  };
  const handleSubmitButton = () => {
    switch (category) {
      case SubjectType.AKM.AKM:
        action(instructionData?.question_type_id);
        break;
      case SubjectType.KPRegular.Practice:
        action(instructionData?.question_type?.id, title);
        break;
      case SubjectType.KPRegular.Test:
        action(instructionData?.question_type?.id);
        break;
      case SubjectType.SOAL.UlanganHarianPractice ||
        SubjectType.SOAL.UlanganHarianTest:
        action(instructionData?.question_type_id);
        break;
      default:
        break;
    }
  };

  const htmlStyle = StyleSheet.create({
    p: {
      fontFamily: Fonts.RegularPoppins,
      lineHeight: 22,
      color: '#1D252D',
    },
    strong: {
      fontFamily: Fonts.SemiBoldPoppins,
    },
    li: {
      fontFamily: Fonts.RegularPoppins,
      color: '#1D252D',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          allowFontScaling={false}
          style={styles.titleText}
          numberOfLines={2}>
          {handleShowTitle()}
        </Text>
      </View>
      <View style={styles.totalQuestContainer}>
        {category === SubjectType.AKM.AKM && (
          <View style={styles.detailTimeContainer}>
            <View style={styles.totalQuestText}>
              <Text allowFontScaling={false} style={styles.totalQuestTextStyle}>
                {instructionData?.question_package_service_id === 1
                  ? 'Literasi'
                  : 'Numerasi'}
              </Text>
            </View>
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={styles.totalQuestTextStyle}>{`${
                instructionData?.question_type?.question_type ===
                'pilihan ganda'
                  ? 'PG'
                  : 'Uraian'
              }`}</Text>
            </View>
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={styles.totalQuestTextStyle}>{`${
                instructionData?.total_question ?? 0
              } Soal`}</Text>
            </View>
            {instructionData?.rules?.max_duration && (
              <View style={styles.totalQuestText}>
                <Text
                  allowFontScaling={false}
                  style={
                    styles.totalQuestTextStyle
                  }>{`${instructionData?.rules?.max_duration} Menit`}</Text>
              </View>
            )}
          </View>
        )}
        {category === SubjectType.KPRegular.Practice && (
          <View style={styles.totalQuestText}>
            <Text
              allowFontScaling={false}
              style={styles.totalQuestTextStyle}>{`${
              instructionData?.total_question ?? 0
            } Soal`}</Text>
          </View>
        )}
        {category === SubjectType.KPRegular.Test && (
          <View style={styles.levelContainer}>
            {instructionData?.level && (
              <View style={styles.totalQuestText}>
                <Text
                  allowFontScaling={false}
                  style={styles.totalQuestTextStyle}>
                  {`${
                    instructionData?.level
                      ? instructionData?.level?.[instructionData?.index].name
                      : instructionData?.name || 'Level 1'
                  }`}
                </Text>
              </View>
            )}
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={styles.totalQuestTextStyle}>{`${
                instructionData?.level
                  ? instructionData?.level?.[instructionData?.index]
                      .total_question
                  : instructionData?.total_question || 0
              } Soal`}</Text>
            </View>
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={
                  styles.totalQuestTextStyle
                }>{`${instructionData?.rules?.max_duration} Menit`}</Text>
            </View>
          </View>
        )}
        {(category === SubjectType.SOAL.UlanganHarianPractice ||
          category === SubjectType.SOAL.UlanganHarianTest) && (
          <View style={styles.totalQuestionContainer}>
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={
                  styles.totalQuestTextStyle
                }>{`${instructionData?.name}`}</Text>
            </View>
            <View style={styles.totalQuestText}>
              <Text
                allowFontScaling={false}
                style={styles.totalQuestTextStyle}>{`${
                instructionData?.total_question ?? 0
              } Soal`}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.rulesContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {category === SubjectType.AKM.AKM && (
            <View style={styles.htmlViewContainer}>
              <HTMLView
                value={instructionData?.description ?? ''}
                stylesheet={htmlStyle}
              />
            </View>
          )}
          {category === SubjectType.AKM.AKM && (
            <View style={styles.htmlViewContainerWithoutMarginBottom}>
              <RenderHTML
                baseStyle={{color: Colors.black}}
                contentWidth={Dimensions.get('screen').width - 8}
                source={{html: parseHtml(instructionData?.rules?.rules ?? '')}}
              />
            </View>
          )}
          {category === SubjectType.KPRegular.Practice && (
            <View>
              {instructionData?.name === 'Soal HOTS' ? (
                <View>
                  <Text allowFontScaling={false} style={styles.titleTextSwipe}>
                    Cara Pengerjaan:
                  </Text>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Amati dan pahami contoh kasus, masalah, atau kejadian yang
                      ada pada soal.{' '}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Setelah selesai mengamati, perhatikan instruksi cara
                      menjawab yang terdapat di bagian akhir soal..{' '}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Kemukakan pendapatmu untuk menanggapi masalah tersebut.{' '}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text allowFontScaling={false} style={styles.titleTextSwipe}>
                    Cara Pengerjaan:
                  </Text>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Semua soal wajib dijawab.{' '}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Usahakan untuk menjawab benar pada kesempatan pertama.
                      Setiap jawaban pertama yang benar medapatkan 10 poin,
                      sedangkan jawaban benar pada kesempatan kedua mendapatkan
                      5 poin.
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.subTitleTextSwipe, styles.mr5]}>
                      {'\u2022'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.subTitleTextSwipe}>
                      Tidak ada batas waktu disini. Jadi, kerjakan semua soal
                      dengan sebaik mungkin. Selamat Mengerjakan!{' '}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
          {category === SubjectType.KPRegular.Test && (
            <View style={styles.w90}>
              {/* <HTMLView
                value={instructionData?.rules?.rules ?? ''}
                stylesheet={htmlStyle}
              />
              di comment dahulu karena html nya belum di provide kata mas putra
              */}
              {/* <Text style={styles.subTitleTextSwipe}>
                Dapatkan nilai{' '}
                <Text
                  style={[
                    styles.subTitleTextSwipe,
                    {fontFamily: Fonts.BoldPoppins},
                  ]}>
                  70% atau lebih
                </Text>{' '}
                untuk melanjutkan ke level berikutnya.
              </Text> */}
              <Text allowFontScaling={false} style={styles.subTitleTextSwipe}>
                {instructionData?.description}
              </Text>
              <Text allowFontScaling={false} style={styles.subTitleTextSwipe2}>
                Cara Pengerjaan:
              </Text>
              <Text allowFontScaling={false} style={styles.subTitleTextSwipe}>
                {'\u2022'} Semua soal wajib dijawab
              </Text>
              <Text allowFontScaling={false} style={styles.subTitleTextSwipe}>
                {'\u2022'} Kerjakan dengan jujur
              </Text>
            </View>
          )}
          {(category === SubjectType.SOAL.UlanganHarianPractice ||
            category === SubjectType.SOAL.UlanganHarianTest) && (
            <View>
              <Text
                allowFontScaling={false}
                style={[styles.subTitleTextSwipe, styles.subTitleTextSwipe2]}>
                Cara Pengerjaan:
              </Text>
              {rulesSOALPractice?.map((_rules: string) => {
                return (
                  <View style={styles.SOALContainer}>
                    <View style={styles.flex03}>
                      <Text
                        allowFontScaling={false}
                        style={styles.subTitleTextSwipe}>
                        {'•'}
                      </Text>
                    </View>
                    <View style={styles.flex1}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.subTitleTextSwipe,
                          styles.subTitleTextSwipe3,
                        ]}>
                        {_rules}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.submitButtonContainer}>
        <Button
          // isDisabled={
          //   category === SubjectType.AKM.AKM
          //     ? !instructionData?.total_question ||
          //       instructionData?.total_question === 0
          //     : category === SubjectType.SOAL.UlanganHarianPractice ||
          //       category === SubjectType.SOAL.UlanganHarianTest
          //     ? !instructionData?.total_question ||
          //       instructionData?.total_question === 0
          //     : !instructionData?.rules?.total_question ||
          //       instructionData?.rules?.total_question === 0
          // }
          action={() => handleSubmitButton()}
          label="Mulai"
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailTimeContainer: {flexDirection: 'row', justifyContent: 'center'},
  container: {width: '100%', height: 350},
  submitButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: '5%',
    flex: 1,
  },
  subTitleTextSwipe3: {fontFamily: Fonts.RegularPoppins, lineHeight: 24},
  flex1: {flex: 1},
  flex03: {flex: 0.03},
  SOALContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  w90: {width: '90%'},
  mr5: {
    marginRight: 5,
  },
  htmlViewContainer: {
    paddingHorizontal: '2%',
    width: '100%',
    marginBottom: 10,
  },
  htmlViewContainerWithoutMarginBottom: {
    paddingHorizontal: '2%',
    width: '100%',
  },
  totalQuestionContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {width: '90%'},
  rulesItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  rulesListItem: {
    marginHorizontal: '2%',
    flexDirection: 'row',
    marginTop: '2%',
  },
  rulesDotContainer: {marginRight: 5},
  titleContainer: {
    alignItems: 'center',
    paddingVertical: '2%',
    flex: 0.5,
  },
  totalQuestContainer: {
    justifyContent: 'center',
    flex: 0.5,
    marginTop: '2%',
    flexDirection: 'row',
  },
  rulesContainer: {
    flex: 5,
    marginTop: '5%',
    paddingHorizontal: '5%',
    paddingBottom: '2%',
  },
  totalQuestText: {
    paddingHorizontal: '2%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    marginHorizontal: '1%',
  },
  totalQuestTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 23,
    color: Colors.dark.neutral100,
    marginHorizontal: 24,
  },
  instructionItemText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  titleTextSwipe: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 23,
    color: Colors.dark.neutral100,
  },
  subTitleTextSwipe: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 23,
    color: Colors.dark.neutral100,
  },
  subTitleTextSwipe2: {
    fontFamily: Fonts.SemiBoldPoppins,
    marginTop: 10,
    fontSize: 14,
    lineHeight: 23,
    color: Colors.dark.neutral100,
  },
  row: {
    flexDirection: 'row',
  },
});
