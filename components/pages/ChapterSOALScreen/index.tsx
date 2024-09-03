/* eslint-disable react-native/no-inline-styles */

import React, {FC} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import Colors from '@constants/colors';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import IconArrowBlue from '@assets/svg/ic_arrow_right_blue.svg';
import CheckIcon from '@assets/svg/ic_checklist_green.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import SearchIcon from '@assets/svg/ic24_search_grey.svg';
import PracticeIcon from '@assets/svg/ic32_practice.svg';
import TestIcon from '@assets/svg/ic32_test.svg';
import {SearchModal} from './organism';
import {KPHeaderImage} from './components/KPHeaderImage';
import {Button, SwipeUp} from '@components/atoms';
import Maskot12Icon from '@assets/svg/maskot_12.svg';
import {
  fetchGetKuisPackages,
  fetchGetUlanganHarianChapterTestPackage,
} from '@redux';
import useChapterSOAL from './useChapterSOAL';
import {SubjectType} from '@constants/subjectType';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import ProviderSOAL from '@services/soal/provider';
import Toast from 'react-native-toast-message';
import Fonts from '@constants/fonts';

type Props = {
  route: any;
};

export const rulesSOALTest: string[] = [
  'Perhatikan waktu pengerjaan soal.Pengerjaan dikumpulkan otomatis jika waktu habis.',
  'Pilih nomor halaman soal untuk lompat ke soal yang ingin dikerjakan.',
  'Gunakan fitur tandai pertanyaan agar lebih mudah mengerjakan soal secara tidak berurutan.',
];

const ChapterSOALScreen: FC<Props> = () => {
  const {
    navigation,
    dispatch,
    subject_type,
    subject_data,
    modalVisible,
    setModalVisible,
    isOpenPopUp,
    setIsOpenPopUp,
    isOpenForbiddenPopup,
    setIsOpenForbiddenPopup,
    soalUTS,
    soalUAS,
    soalUAT,
    soalUS,
    isActiveSoalUTS,
    isActiveSoalUAS,
    isActiveSoalUAT,
    isActiveSoalUS,
    soalData,
    setSoalData,
    soalType,
    setSoalType,
    getAllKuisChapter,
    soalDataDetail,
    setSoalDataDetail,
    getUjianTengahSemesterPackage,
    getUjianAkhirSemesterPackage,
    getUjianAkhirTahunPackage,
    getUjianSekolahPackage,
    handleActionUjianCategory,
  } = useChapterSOAL();

  type _ISoalUjianParams = {
    chapter_id?: number;
    class_id?: number;
    description?: string;
    id?: number;
    instructions?: string;
    name?: string;
    question_package_service_id?: number;
    question_type?: {
      description?: string;
      evaluation_type?: string;
      id?: number;
      question_type?: string;
    };
    question_type_id?: number;
    school_id?: number;
    subject_id?: number;
    total_question?: number;
    user_max_point?: number;
  };

  type _ISoalUlanganHarianParams = {
    id?: any;
    name?: string;
    order?: number;
    unlocked?: boolean;
  };

  type _IFetchGetKuisPackages = {
    code?: number;
    data?: {
      chapter_id?: any;
      class_id?: any;
      description?: string;
      id?: any;
      instructions?: string;
      name?: string;
      question_package_service?: {
        description: string;
        id: any;
        name: string;
        service: string;
      };
      question_package_service_id?: number;
      question_type?: {
        description: string;
        evaluation_type: string;
        id: any;
        question_type: string;
      };
      question_type_id?: number;
      subject_id?: any;
      total_question?: number;
    };
    log_id?: string;
    message?: string;
    time?: Date;
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {backgroundColor: modalVisible ? Colors.white : Colors.primary.base},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{height: 297 * 0.6}}>
          {!modalVisible && (
            <Bg width={'100%'} height={297} style={styles.bgPosition} />
          )}

          <View style={styles.header}>
            <View style={styles.headerWrapperFirst}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconArrowLeftWhite />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <SearchIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.headerWrapperSecond}>
              <KPHeaderImage
                path_url={subject_data?.icon_path_url}
                category={subject_type}
              />

              <View>
                <Text style={styles.headerWrapperSecondSubTitle}>
                  {subject_type ===
                    (SubjectType.SOAL.UjianTengahSemester ||
                      SubjectType.SOAL.UjianAkhirSemester ||
                      SubjectType.SOAL.UjianAkhirTahun ||
                      SubjectType.SOAL.UjianSekolah) && 'Ujian Sekolah'}
                  {subject_type === SubjectType.SOAL.UlanganHarian &&
                    'SOAL Ulangan Harian'}
                  {subject_type === SubjectType.SOAL.Kuis && 'Kuis'}
                </Text>
                <View
                  style={{
                    width: 300,
                    paddingRight: 10,
                  }}>
                  <Text
                    style={styles.headerWrapperSecondTitle}
                    numberOfLines={2}>
                    {subject_data?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {subject_type !== SubjectType.AKM.AKM ? (
          <View style={styles.body}>
            {/* if available top card content :INFO */}
            {(subject_type === SubjectType.SOAL.UjianTengahSemester ||
              subject_type === SubjectType.SOAL.UjianAkhirSemester ||
              subject_type === SubjectType.SOAL.UjianAkhirTahun) && (
              <View style={{width: '100%', marginTop: '2%'}}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginVertical: 20,
                  }}>
                  {soalUTS?.length > 0 && (
                    <Button
                      action={() => handleActionUjianCategory(1)}
                      color={
                        isActiveSoalUTS ? Colors.white : Colors.dark.neutral80
                      }
                      background={
                        isActiveSoalUTS
                          ? Colors.primary.base
                          : Colors.primary.light3
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginHorizontal: '1%',
                      }}
                      label="UTS"
                    />
                  )}
                  {soalUAS?.length > 0 && (
                    <Button
                      action={() => handleActionUjianCategory(2)}
                      color={
                        isActiveSoalUAS ? Colors.white : Colors.dark.neutral80
                      }
                      background={
                        isActiveSoalUAS
                          ? Colors.primary.base
                          : Colors.primary.light3
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginHorizontal: '1%',
                      }}
                      label="UAS"
                    />
                  )}
                  {soalUAT?.length > 0 && (
                    <Button
                      action={() => handleActionUjianCategory(3)}
                      color={
                        isActiveSoalUAT ? Colors.white : Colors.dark.neutral80
                      }
                      background={
                        isActiveSoalUAT
                          ? Colors.primary.base
                          : Colors.primary.light3
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginHorizontal: '1%',
                      }}
                      label="Ujian Akhir Tahun"
                    />
                  )}
                  {soalUS?.length < 0 && (
                    <Button
                      action={() => handleActionUjianCategory(4)}
                      color={
                        isActiveSoalUS ? Colors.white : Colors.dark.neutral80
                      }
                      background={
                        isActiveSoalUS
                          ? Colors.primary.base
                          : Colors.primary.light3
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginHorizontal: '1%',
                      }}
                      label="Ujian Sekolah"
                    />
                  )}
                </View>
                {isActiveSoalUTS && (
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                      lineHeight: 20,
                      color: Colors.dark.neutral100,
                    }}>
                    Ujian Tengah Semester
                  </Text>
                )}
                {isActiveSoalUAS && (
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                      lineHeight: 20,
                      color: Colors.dark.neutral100,
                    }}>
                    Ujian Akhir Semester
                  </Text>
                )}
                {isActiveSoalUAT && (
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                      lineHeight: 20,
                      color: Colors.dark.neutral100,
                    }}>
                    Ujian Akhir Tahun
                  </Text>
                )}
                {isActiveSoalUS && (
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                      lineHeight: 20,
                      color: Colors.dark.neutral100,
                    }}>
                    Ujian Sekolah
                  </Text>
                )}

                <View style={{width: '100%', alignItems: 'center'}}>
                  {isActiveSoalUTS &&
                    soalUTS?.map((ie: _ISoalUjianParams) => {
                      return (
                        <TouchableOpacity
                          key={`SoalButton-${ie?.id}`}
                          onPress={() => {
                            setSoalData(ie),
                              setIsOpenPopUp(true),
                              setSoalType(
                                getUjianTengahSemesterPackage?.data?.type,
                              );
                          }}
                          style={{
                            width: '100%',
                            marginTop: '4%',
                            borderRadius: 10,
                            height: 68,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 8,
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <Text
                              style={{
                                marginBottom: '2%',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 16,
                                lineHeight: 24,
                                color: Colors.dark?.neutral100,
                              }}>
                              {ie?.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                lineHeight: 16,
                                color: Colors.dark.neutral60,
                              }}>
                              {`${ie?.total_question} Soal ${
                                ie?.user_max_point
                                  ? `• Nilai Tertinggi : ${ie?.user_max_point}`
                                  : ''
                              }`}
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            {ie?.user_max_point && (
                              <CheckIcon width={25} height={22} />
                            )}
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <IconArrowBlue />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  {isActiveSoalUAT &&
                    soalUAT?.map((ie: _ISoalUjianParams) => {
                      return (
                        <TouchableOpacity
                          key={`SoalButton-${ie?.id}`}
                          onPress={() => {
                            setSoalData(ie),
                              setIsOpenPopUp(true),
                              setSoalType(
                                getUjianAkhirTahunPackage?.data?.type,
                              );
                          }}
                          style={{
                            width: '100%',
                            marginVertical: '4%',
                            borderRadius: 10,
                            height: 68,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 8,
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <Text
                              style={{
                                marginBottom: '2%',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 16,
                                lineHeight: 24,
                                color: Colors.dark?.neutral100,
                              }}>
                              {ie?.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                lineHeight: 16,
                                color: Colors.dark.neutral60,
                              }}>
                              {`${ie?.total_question} Soal ${
                                ie?.user_max_point
                                  ? `• Nilai Tertinggi : ${ie?.user_max_point}`
                                  : ''
                              }`}
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            {ie?.user_max_point && (
                              <CheckIcon width={25} height={22} />
                            )}
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <IconArrowBlue />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  {isActiveSoalUAS &&
                    soalUAS?.map((ie: _ISoalUjianParams) => {
                      return (
                        <TouchableOpacity
                          key={`SoalButton-${ie?.id}`}
                          onPress={() => {
                            setSoalData(ie),
                              setIsOpenPopUp(true),
                              setSoalType(
                                getUjianAkhirSemesterPackage?.data?.type,
                              );
                          }}
                          style={{
                            width: '100%',
                            marginVertical: '4%',
                            borderRadius: 10,
                            height: 68,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 8,
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <Text
                              style={{
                                marginBottom: '2%',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 16,
                                lineHeight: 24,
                                color: Colors.dark?.neutral100,
                              }}>
                              {ie?.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                lineHeight: 16,
                                color: Colors.dark.neutral60,
                              }}>
                              {`${ie?.total_question} Soal ${
                                ie?.user_max_point
                                  ? `• Nilai Tertinggi : ${ie?.user_max_point}`
                                  : ''
                              }`}
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            {ie?.user_max_point && (
                              <CheckIcon width={25} height={22} />
                            )}
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <IconArrowBlue />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  {isActiveSoalUS &&
                    soalUAS?.map((ie: _ISoalUjianParams) => {
                      return (
                        <TouchableOpacity
                          key={`SoalButton-${ie?.id}`}
                          onPress={() => {
                            setSoalData(ie),
                              setIsOpenPopUp(true),
                              setSoalType(getUjianSekolahPackage?.data?.type);
                          }}
                          style={{
                            width: '100%',
                            marginVertical: '4%',
                            borderRadius: 10,
                            height: 68,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 8,
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <Text
                              style={{
                                marginBottom: '2%',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 16,
                                lineHeight: 24,
                                color: Colors.dark?.neutral100,
                              }}>
                              {ie?.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                lineHeight: 16,
                                color: Colors.dark.neutral60,
                              }}>
                              {`${ie?.total_question} Soal ${
                                ie?.user_max_point
                                  ? `• Nilai Tertinggi : ${ie?.user_max_point}`
                                  : ''
                              }`}
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            {ie?.user_max_point && (
                              <CheckIcon width={25} height={22} />
                            )}
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <IconArrowBlue />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            )}

            {/* Chapter Mapping card section :INFO */}
            {subject_type === SubjectType.SOAL.UlanganHarian &&
              soalData?.map((ie: _ISoalUlanganHarianParams, index: number) => {
                return (
                  <View key={`SOAL-${index}`} style={styles.soalCardContainer}>
                    <View style={styles.soalCardTitleContainer}>
                      <Text style={styles.soalCardTitle}>{ie?.name}</Text>
                    </View>
                    <View style={styles.soalCardButtonContainer}>
                      <View style={styles.soalCardButtonLeftContentContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            ie?.unlocked
                              ? navigation?.navigate('KPRegularDetailBab', {
                                  category:
                                    SubjectType.SOAL.UlanganHarianPractice,
                                  isSoal: true,
                                  chapterData: ie,
                                  subject_id: subject_data?.id,
                                  subject_name: subject_data?.name ?? '',
                                  subject_icon: subject_data?.icon_path_url,
                                  soal_type: 'Practice',
                                  subject_data: subject_data,
                                })
                              : setIsOpenForbiddenPopup(true);
                          }}
                          style={styles.soalCardButtonLeftContentButton}>
                          <View style={styles.soalCardButtonLeftIconContainer}>
                            <PracticeIcon width={20} height={20} />
                          </View>
                          <View style={styles.soalCardButtonLeftTitleContainer}>
                            <Text style={styles.soalCardButtonLeftTitle}>
                              Practice
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.soalCardButtonRightContainer}>
                        <Pressable
                          onPress={async () => {
                            ie?.unlocked
                              ? await dispatch(
                                  fetchGetUlanganHarianChapterTestPackage(
                                    ie?.id,
                                    (res: any) => {
                                      let _dataRes: any =
                                        res?.data?.packages[0];
                                      _dataRes.chapter_name = ie?.name ?? '';
                                      setSoalDataDetail(_dataRes);
                                      setSoalType(
                                        SubjectType.SOAL.UlanganHarianTest,
                                      );
                                      setIsOpenPopUp(true);
                                    },
                                  ),
                                )
                              : setIsOpenForbiddenPopup(true);
                          }}
                          style={styles.soalCardRightInnerContainer}>
                          <View style={styles.soalCardButtonRightIconContainer}>
                            <TestIcon width={20} height={20} />
                          </View>
                          <View style={styles.soalCardButtonRighttextContainer}>
                            <Text style={styles.soalCardButtonRightText}>
                              Test
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}
            {subject_type === SubjectType.SOAL.Kuis &&
              getAllKuisChapter?.data?.chapters?.map(
                (_quizSoalData: {
                  id: number;
                  name: string;
                  order: number;
                  unlocked: boolean;
                }) => {
                  return (
                    <Pressable
                      key={`SOALKUIS-${Math.random()}`}
                      onPress={async () => {
                        _quizSoalData?.unlocked
                          ? await dispatch(
                              fetchGetKuisPackages(
                                _quizSoalData?.id.toString(),
                                (res: _IFetchGetKuisPackages) => {
                                  let _dataRes: any = res?.data;
                                  _dataRes.chapter_name =
                                    _quizSoalData?.name ?? '';
                                  setSoalDataDetail(_dataRes);
                                  setSoalType(SubjectType?.SOAL.Kuis);
                                  setIsOpenPopUp(true);
                                },
                              ),
                            )
                          : setIsOpenForbiddenPopup(true);
                      }}
                      style={styles.soalCardContainerKuis}>
                      <View style={styles.soalCardTitleContainerKuis}>
                        <Text style={styles.soalCardTitle}>
                          {_quizSoalData?.name}
                        </Text>
                      </View>
                      <View style={styles.soalCardTitleContainerKuis2}>
                        {_quizSoalData?.unlocked ? <IconArrowBlue /> : null}
                      </View>
                    </Pressable>
                  );
                },
              )}
          </View>
        ) : null}
      </ScrollView>

      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        subjectData={subject_data}
      />

      <SwipeUp
        height={100}
        onClose={() => setIsOpenForbiddenPopup(false)}
        isSwipeLine={true}
        visible={isOpenForbiddenPopup}
        children={
          <View style={{width: '100%', height: 320}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Maskot12Icon />
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  lineHeight: 24,
                  color: Colors.dark?.neutral100,
                  marginVertical: 20,
                }}>
                Belum Dapat Mengakses Kuis
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  color: Colors.dark.neutral80,
                }}>
                Kuis hanya dapat diakses oleh pengguna{'\n'}paket. Akses Kuis
                dengan berlangganan.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 30,
                paddingHorizontal: '5%',
              }}>
              <Button label="Berlangganan" action={() => {}} />
            </View>
          </View>
        }
      />

      <SwipeUp
        height={100}
        onClose={() => setIsOpenPopUp(false)}
        isSwipeLine={true}
        visible={isOpenPopUp}
        children={
          <View style={styles?.soalTestContainer}>
            <View style={styles?.soalTestHeaderContainer}>
              {soalType === SubjectType?.SOAL?.UlanganHarianTest && (
                <Text style={styles?.soalTestHeaderTextTop}>
                  {soalType === SubjectType?.SOAL.UlanganHarianTest
                    ? soalDataDetail?.chapter_name
                    : soalType}
                </Text>
              )}
              <Text style={styles?.soalTestHeaderTextBottom}>
                {soalType === SubjectType?.SOAL.UlanganHarianTest
                  ? 'Ulangan Harian • Test'
                  : soalType === SubjectType?.SOAL.Kuis
                  ? soalDataDetail?.chapter_name
                  : soalData?.name}
              </Text>
              {/* {soalType === SubjectType?.SOAL.Kuis && (
                <Text style={[styles.soalTestRulesTitleText, {marginTop: 5}]}>
                  {soalDataDetail?.chapter_name}
                </Text>
              )} */}
            </View>
            <View style={styles?.soalTestInfoContainer}>
              <View style={styles?.soalTestInfoButtonContainer}>
                <Text style={styles?.soalTestInfoButtonText}>{`${
                  soalType === SubjectType?.SOAL.UlanganHarianTest ||
                  soalType === SubjectType?.SOAL.Kuis
                    ? soalDataDetail?.total_question
                    : soalData?.total_question
                } Soal`}</Text>
              </View>
              {(soalDataDetail?.rules?.max_duration != 0 ||
                soalType !== SubjectType?.SOAL.Kuis) && (
                <View style={styles?.soalTestInfoButtonContainer}>
                  <Text style={styles?.soalTestInfoButtonText}>
                    {soalDataDetail?.rules?.max_duration || 0} Menit
                  </Text>
                </View>
              )}
            </View>
            <View style={styles?.soalTestRulesContainer}>
              {soalType === SubjectType?.SOAL?.Kuis ? (
                <Text
                  style={[
                    styles.soalTestRulesTitleText,
                    {fontFamily: Fonts.RegularPoppins},
                  ]}>
                  Dapatkan nilai{' '}
                  <Text style={styles.soalTestRulesTitleText}>
                    70% atau lebih
                  </Text>{' '}
                  untuk melanjutkan
                  {'\n'}ke level berikutnya.
                </Text>
              ) : (
                <View>
                  <Text
                    style={[styles.soalTestRulesTitleText, {marginBottom: 5}]}>
                    Cara Pengerjaan:
                  </Text>
                  {rulesSOALTest?.map((_rules: string, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        paddingLeft: 10,
                      }}>
                      <View style={{flex: 0.03}}>
                        <Text style={styles.soalTestRulesTitleText}>{'•'}</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            styles.soalTestRulesTitleText,
                            {fontFamily: Fonts.RegularPoppins},
                          ]}>
                          {_rules}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles?.soalTestSubmitButtonContainer}>
              <Button
                action={async () => {
                  setIsOpenPopUp(false);
                  try {
                    const _res = await ProviderSOAL?.startSoalOrAkm({
                      question_package_id:
                        soalType === SubjectType?.SOAL.UlanganHarianTest ||
                        soalType === SubjectType?.SOAL.Kuis
                          ? soalDataDetail?.id ?? 0
                          : soalData?.id ?? 0,
                      question_package_service_id:
                        soalType === SubjectType?.SOAL.UlanganHarianTest ||
                        soalType === SubjectType?.SOAL.Kuis
                          ? soalDataDetail?.question_package_service_id ?? 0
                          : soalData?.question_package_service_id ?? 0,
                      duration_minutes: 60,
                    });
                    var resDataStartSoal: any = _res?.data || false;
                    if (resDataStartSoal?.status === 500) {
                      Toast?.show({
                        type: 'error',
                        text1: 'Internal server error 500',
                      });
                    } else {
                      navigation.navigate('MultipleChoiceQuestionScreen', {
                        chapter_id:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.chapter_id
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.chapter_id
                            : 0,
                        question_service_id:
                          soalType === SubjectType?.SOAL.Kuis
                            ? QUESTION_SERVICE_TYPE?.KUIS
                            : QUESTION_SERVICE_TYPE?.SOAL_PILIHAN_GANDA,
                        question_package_id:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.question_package_service_id
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.question_package_service_id
                            : 0,
                        title:
                          soalType === SubjectType?.SOAL.UlanganHarianTest
                            ? 'Ulangan Harian'
                            : soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.chapter_name
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.name
                            : '',
                        level_id: 1,
                        subTitle: '',
                        is_done: false,
                        service:
                          soalType === SubjectType?.SOAL.UlanganHarianTest
                            ? 'Ulangan Harian Test'
                            : soalType === SubjectType?.SOAL.Kuis
                            ? 'Kuis'
                            : soalType === 'Ujian Tengah Semester'
                            ? 'Ujian Tengah Semester'
                            : soalType === 'Ujian Akhir Semester'
                            ? 'Ujian Akhir Semester'
                            : soalType === 'Ujian Akhir Tahun'
                            ? 'Ujian Akhir Tahun'
                            : 'Ujian Sekolah',
                        rules:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.rules ??
                              soalDataDetail?.instructions
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.rules ?? soalData?.instructions
                            : {},
                        question_data: resDataStartSoal,
                      });
                      null;
                    }
                  } catch (error: any) {
                    if (
                      error?.response?.data?.code === 906 ||
                      error?.response?.data?.code === 100
                    ) {
                      navigation.navigate('MultipleChoiceQuestionScreen', {
                        chapter_id:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.chapter_id
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.chapter_id
                            : 0,
                        question_service_id:
                          soalType === SubjectType?.SOAL.Kuis
                            ? QUESTION_SERVICE_TYPE?.KUIS
                            : QUESTION_SERVICE_TYPE?.SOAL_BERBASIS_NILAI,
                        question_package_id:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.question_package_service_id
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.question_package_service_id
                            : 0,
                        title:
                          soalType === SubjectType?.SOAL.UlanganHarianTest
                            ? 'Ulangan Harian'
                            : soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.chapter_name
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.name
                            : '',
                        level_id: 1,
                        subTitle: '',
                        is_done: false,
                        service:
                          soalType === SubjectType?.SOAL.UlanganHarianTest
                            ? 'Ulangan Harian Test'
                            : soalType === SubjectType?.SOAL.Kuis
                            ? 'Kuis'
                            : soalType === 'Ujian Tengah Semester'
                            ? 'Ujian Tengah Semester'
                            : soalType === 'Ujian Akhir Semester'
                            ? 'Ujian Akhir Semester'
                            : soalType === 'Ujian Akhir Tahun'
                            ? 'Ujian Akhir Tahun'
                            : 'Ujian Sekolah',
                        rules:
                          soalType === SubjectType?.SOAL.UlanganHarianTest ||
                          soalType === SubjectType?.SOAL.Kuis
                            ? soalDataDetail?.rules ??
                              soalDataDetail?.instructions
                            : soalType === 'Ujian Tengah Semester' ||
                              soalType === 'Ujian Akhir Semester' ||
                              soalType === 'Ujian Akhir Tahun'
                            ? soalData?.rules ?? soalData?.instructions
                            : {},
                        question_data: error?.response?.data,
                      });
                      null;
                    } else {
                      Toast?.show({
                        type: 'error',
                        text1:
                          error?.response?.data?.message ??
                          'Internal server error [500]',
                      });
                    }
                  }
                }}
                label="Mulai"
                style={styles?.soalTestSubmitButton}
              />
            </View>
          </View>
        }
      />
    </>
  );
};

export {ChapterSOALScreen};
