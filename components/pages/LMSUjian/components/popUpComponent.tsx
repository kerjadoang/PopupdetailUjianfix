import React, {useCallback, useEffect, useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {URL_PATH} from '@constants/url';
import api from '@api/index';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import HeaderStripIcon from '@assets/svg/headerStrip.svg';
import {Button, MainView, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {Styles} from '../style';
import RobotEmptyIcon from '@assets/svg/robot_link_account.svg';
import {convertDate, formatDateLMSUjian} from '@constants/functional';
import CalendarIcon from '@assets/svg/ic_calendar_blue.svg';
import WarningIcon from '@assets/svg/ic24_info_orange.svg';
import {generalStyles} from '@constants/styles';
import Clock from '@assets/svg/ic16_clock.svg';
import {ParamList} from 'type/screen';
import {goToExplanationUtils} from '@components/pages/StudentHistoryExamScreen/utils';
import UjianScoreCard from '@components/pages/ResultScreen/component/UjianScoreCard';
import ExamInstruction from './ExamInstruction';
import {ILMSUjianStartResponseData} from '@services/lms/type';

const FilterType = {
  Mapel: 'Mapel',
  Nilai: 'Nilai',
  Selesai: 'Selesai',
  Proses: 'Proses',
  Kerjakan: 'Kerjakan',
};

type _IPopUpComponent = {
  isOpenPopUp: boolean;
  handleShowPopUp: any;
  filterType: string;
  listSubject?: any;
  handleUpdateSelectedSubject?: any;
  handleSaveSelectedSubject?: any;
  handleResetSelectedSubject?: any;
  listSavedSubject?: any;
  cardData?: ILMSUjianStartResponseData;
};

const PopUpComponent: any = ({
  isOpenPopUp,
  handleShowPopUp,
  filterType,
  listSubject,
  handleUpdateSelectedSubject,
  handleSaveSelectedSubject,
  handleResetSelectedSubject,
  cardData,
}: _IPopUpComponent) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSUjian'>>();
  const [examHistoryData, setExamHistoryData] = useState<IExamHistoryData>();

  useEffect(() => {
    if (examHistoryData || !cardData || !isOpenPopUp) {
      return;
    }
    getExamDataHistory();
  }, [cardData, isOpenPopUp]);

  const getExamDataHistory = useCallback(async () => {
    try {
      if (JSON.stringify(cardData) === '{}') {
        return;
      }
      const {data, status} = await api.get<IBaseResponseData<IExamHistoryData>>(
        URL_PATH.get_lms_history_exam(
          cardData?.student_exam?.[0]?.school_exam_schedule_id,
          cardData?.student_exam?.[0]?.id,
        ),
      );
      if (status === 200) {
        let {
          // data: {correct_answer, wrong_answer, pass, answered, package_type},
          data: ujianData,
        } = data;
        setExamHistoryData(ujianData);
      }
    } catch (error) {}
  }, [cardData]);

  const __handleLihatPembahasan = useCallback(async () => {
    // if (!examHistoryData) {
    //   return showErrorToast('Data ujian tidak ditemukan');
    // }

    if (JSON.stringify(cardData) !== '{}') {
      try {
        handleShowPopUp(false);

        goToExplanationUtils({
          data: examHistoryData || {},
          navigation: navigation,
          questionServiceId: QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS,
          title: cardData?.title!,
        });
      } catch (_) {}
    }
  }, [cardData, handleShowPopUp, navigation, examHistoryData]);

  switch (filterType) {
    case FilterType.Mapel:
      return (
        <SwipeUp
          isSwipeLine
          visible={isOpenPopUp}
          onClose={() => handleShowPopUp(false)}
          height={500}
          children={
            <View style={Styles.popUpContentContainer}>
              <View style={Styles.popUpContentInnerContainer}>
                <View style={Styles.popUpheaderStripIconContainer}>
                  <HeaderStripIcon />
                </View>
                <View style={Styles.popUpFilterContainer}>
                  <Text style={Styles.popUpFilterText}>Filter</Text>
                </View>
                <View style={Styles.popUpSubHeaderContainer}>
                  <View style={Styles.popUpSubHeaderLeft}>
                    <Text style={Styles.popUpSubHeaderLeftText}>
                      Mata Pelajaran
                    </Text>
                  </View>
                  <View style={Styles.popUpSubHeaderRight}>
                    <Pressable>
                      <Text style={Styles.popUpSubHeaderRightText}>
                        Pilih Semua
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View style={Styles.popUpSubjectListContainer}>
                  {listSubject?.map((ie: any, index: number) => {
                    return (
                      <Pressable
                        key={'listSubject' + index}
                        onPress={() => {
                          handleUpdateSelectedSubject(index);
                        }}
                        style={
                          ie?.isChoosed
                            ? Styles.popUpSubjectCardChoosed
                            : Styles.popUpSubjectCard
                        }>
                        <Text
                          style={
                            ie?.isChoosed
                              ? Styles.popUpSubjectCardTextChoosed
                              : Styles.popUpSubjectCardText
                          }>
                          {ie?.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <View style={Styles.popUpShowAllContainer}>
                  <Text style={Styles.popUpShowAllButton}>Tampilkan semua</Text>
                </View>
                <View style={Styles.popUpSubmitButtonContainer}>
                  <View style={Styles.popUpSubmitButton}>
                    <Button
                      action={async () => {
                        await handleResetSelectedSubject();
                        handleShowPopUp(false);
                      }}
                      background={Colors.white}
                      color={Colors.primary.base}
                      borderColor={Colors.primary.base}
                      borderWidth={1}
                      label="Atur Ulang"
                    />
                  </View>
                  <View style={Styles.popUpSubmitButton}>
                    <Button
                      action={async () => {
                        await handleSaveSelectedSubject(listSubject);
                        handleShowPopUp(false);
                      }}
                      label="Terapkan"
                    />
                  </View>
                </View>
              </View>
            </View>
          }
        />
      );
    case FilterType.Nilai:
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpenPopUp}
          onMagicTap={() => {
            handleShowPopUp(false);
          }}>
          <Pressable
            onPress={() => {
              handleShowPopUp(false);
            }}
            style={Styles.popUpTopContent}
          />
          <View style={Styles.popUpContentContainer}>
            <View style={Styles.popUpContentInnerContainer}>
              <View style={Styles.popUpheaderStripIconContainer}>
                <HeaderStripIcon />
              </View>
              <View style={Styles.popUpFilterContainer}>
                <Text style={Styles.popUpFilterText}>Filter</Text>
              </View>
              <View style={Styles.popUpSubHeaderContainer}>
                <View style={Styles.popUpSubHeaderLeft}>
                  <Text style={Styles.popUpSubHeaderLeftText}>Penilaian</Text>
                </View>
                <View style={Styles.popUpSubHeaderRight} />
              </View>
              <View style={Styles.popUpSubjectListContainer}>
                <Pressable style={Styles.popUpSubjectCard}>
                  <Text style={Styles.popUpSubjectCardText}>Sudah Dinilai</Text>
                </Pressable>
                <Pressable style={Styles.popUpSubjectCard}>
                  <Text style={Styles.popUpSubjectCardText}>Belum Dinilai</Text>
                </Pressable>
              </View>
              <View style={Styles.popUpSubmitButtonContainer}>
                <View style={Styles.popUpSubmitButton}>
                  <Button
                    action={() => {
                      handleShowPopUp(false);
                    }}
                    background={Colors.white}
                    color={Colors.primary.base}
                    borderColor={Colors.primary.base}
                    borderWidth={1}
                    label="Atur Ulang"
                  />
                </View>
                <View style={Styles.popUpSubmitButton}>
                  <Button action={() => {}} label="Terapkan" />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    case FilterType.Selesai:
      return (
        <SwipeUp
          isSwipeLine
          visible={isOpenPopUp}
          onClose={() => {
            setExamHistoryData(undefined);
            return handleShowPopUp(false);
          }}
          height={500}
          children={
            <View style={Styles.popUpContentContainer2}>
              <View style={Styles.popUpContentInnerContainer}>
                <MainView alignItems="center">
                  <Text
                    style={
                      Styles.popUpDoneSubjectNameStyle
                    }>{`${cardData?.service?.name} • ${cardData?.subject?.name}`}</Text>
                </MainView>
                <MainView alignItems="center" marginTop={6}>
                  <Text
                    style={
                      Styles.popUpDoneTitleStyle
                    }>{`${cardData?.title}`}</Text>
                </MainView>
                <MainView alignItems="center" marginTop={20}>
                  <Text style={Styles.popUpDoneTitleStyle}>{'Nilai'}</Text>
                  <Text style={Styles.popUpDoneExamStyle}>
                    {cardData?.student_exam?.[0]?.exam_history?.point
                      ? cardData?.student_exam?.[0]?.exam_history?.point
                      : '-'}
                  </Text>
                </MainView>
                <View style={Styles.popUpDoneBodyContainerStyle}>
                  {(examHistoryData?.student_exam.exam
                    ?.is_display_result_exam ??
                    true) && (
                    <View>
                      <UjianScoreCard examHistoryData={examHistoryData} />
                      <View style={Styles.popUpDoneSeparator1} />
                    </View>
                  )}
                  <View style={Styles.popUpDoneDurationContainerStyle}>
                    <Text style={Styles.popUpDoneDurationStyle}>
                      Durasi Pengerjaan:{' '}
                    </Text>
                    <Text style={Styles.popUpDoneDurationValueStyle}>{`${
                      cardData?.student_exam?.[0]?.exam_history?.duration
                        ? cardData?.student_exam?.[0]?.exam_history?.duration
                        : '-'
                    } Menit`}</Text>
                  </View>
                  <MainView alignItems="center">
                    <Text
                      style={
                        Styles.popUpDoneDateStyle
                      }>{`Tanggal Ujian: ${convertDate(
                      cardData?.start_time,
                    ).format('dddd, D MMM YYYY • HH:mm')}`}</Text>
                  </MainView>
                </View>
                <View style={{marginVertical: 10}}>
                  <Button
                    action={__handleLihatPembahasan}
                    label="Lihat Pembahasan"
                  />
                </View>
              </View>
            </View>
          }
        />
      );
    case FilterType.Proses:
      return (
        <SwipeUp
          isSwipeLine
          visible={isOpenPopUp}
          onClose={() => handleShowPopUp(false)}
          height={500}
          children={
            <View style={Styles.popUpContentContainer2}>
              <View style={Styles.popUpContentInnerContainer}>
                <MainView alignItems="center" marginTop={5}>
                  <Text
                    style={
                      Styles.popUpProcessSubjectStyle
                    }>{`${cardData?.service?.name}  • ${cardData?.subject?.name}`}</Text>
                </MainView>
                <MainView alignItems="center" marginTop={5}>
                  <Text
                    style={
                      Styles.popUpProcessChapterStyle
                    }>{`${cardData?.title}`}</Text>
                </MainView>
                <MainView alignItems="center" marginTop={20}>
                  <RobotEmptyIcon />
                  <Text style={Styles.popUpProcessWarningStyle}>
                    Ujian kamu masih dalam proses{'\n'}pemeriksaan. Tunggu
                    sebentar, ya!
                  </Text>
                </MainView>
                <MainView
                  style={generalStyles.shadowProp}
                  borderRadius={10}
                  marginBottom={16}
                  backgroundColor={Colors.white}>
                  <View style={Styles.popUpDurationCOntainerSTyle}>
                    <Text style={Styles.popUpProcessDurationStyle}>
                      Durasi Pengerjaan:{' '}
                    </Text>
                    <Clock width={16} height={16} />
                    <Text style={Styles.popUpProcessDurationValueStyle}>{` ${
                      cardData?.student_exam?.[0]?.exam_history?.duration
                        ? cardData?.student_exam?.[0]?.exam_history?.duration
                        : '-'
                    } Menit`}</Text>
                  </View>
                  <MainView alignItems="center">
                    <MainView alignItems="center">
                      <Text
                        style={
                          Styles.popUpProcessDateStyle
                        }>{`Tanggal Ujian: ${convertDate(
                        cardData?.start_time,
                      ).format('dddd, D MMM YYYY • HH:mm')}`}</Text>
                    </MainView>
                  </MainView>
                </MainView>
                <View style={{marginVertical: 10}}>
                  <Button action={() => handleShowPopUp(false)} label="Tutup" />
                </View>
              </View>
            </View>
          }
        />
      );
    case FilterType.Kerjakan:
      return (
        <SwipeUp
          isSwipeLine
          visible={isOpenPopUp}
          onClose={() => handleShowPopUp(false)}
          height={500}
          children={
            <View style={Styles.popUpContentContainer2}>
              <View style={Styles.popUpContentInnerContainer}>
                <MainView alignItems="center">
                  <Text style={Styles.popUpOnGoingTitleStyle}>
                    {cardData?.service?.name}
                  </Text>
                </MainView>
                <MainView alignItems="center" marginTop={5}>
                  <Text style={Styles.popUpOnGoingSubjectStyle}>
                    {cardData?.subject?.name}
                  </Text>
                </MainView>
                <View style={Styles.popUpOnGoingDateFormatStyle}>
                  <CalendarIcon width={15} height={15} />
                  <Text style={Styles.popUpProcessLMSDateStyle}>
                    {formatDateLMSUjian(
                      convertDate(cardData?.start_time),
                      convertDate(cardData?.end_time),
                    )}
                  </Text>
                </View>
                <ExamInstruction />
                <View style={Styles.popUpOngoingLeftBodyStyle}>
                  <MainView marginRight={6}>
                    <WarningIcon />
                  </MainView>
                  <View style={generalStyles.contentFlex}>
                    <Text style={Styles.popUpOngoingWarningStyle}>
                      Kamu wajib menyalakan kamera selama ujian berlangsung.
                    </Text>
                  </View>
                </View>
                <View style={{marginVertical: 10}}>
                  <Button
                    action={() => {
                      navigation.navigate('LMSUjianTestCameraScreen', {
                        data: cardData!,
                      });
                      handleShowPopUp(false);
                    }}
                    label="Lanjut"
                  />
                </View>
              </View>
            </View>
          }
        />
      );
    default:
      break;
  }
};

export default PopUpComponent;
