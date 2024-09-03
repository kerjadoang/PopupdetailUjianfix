import React from 'react';
import {Text, View} from 'react-native';
import {Styles} from '../style';
import {Button, Countdown} from '@components/atoms';
import Colors from '@constants/colors';
import Calendaricon from '@assets/svg/ic_calendar_blue.svg';
import LiveIcon from '@assets/svg/ic_live.svg';
import {
  checkDate,
  convertDate,
  dateFormatWithDayAndTime,
  dateFormatWithOnlyTime,
  isStringContains,
  renderCheckTodayDate,
} from '@constants/functional';
import {ILMSUjianStartResponseData} from '@services/lms/type';
import {useNavigation} from '@react-navigation/native';
import {INavigation} from 'type/screen';

type _ICardExam = {
  filterType: LMSUjianFilterTypeEnum;
  cardData: ILMSUjianStartResponseData;
  handleOpenPopup?: any;
  handleSetPopUpType?: any;
  handleSetCardData?: any;
  refetchData?: VoidCallBack;
  currentFilter?: LMSUjianFilterTypeEnum[];
};
const CardExamComponent = ({
  filterType,
  cardData = {},
  handleSetPopUpType,
  handleSetCardData,
  handleOpenPopup,
  currentFilter,
  refetchData,
}: _ICardExam): any => {
  const navigation = useNavigation<INavigation<'LMSUjianTestCameraScreen'>>();
  const isDoneScoringFilter = currentFilter?.some(item =>
    isStringContains(item, 'scoring'),
  );

  // const isExpiredDate =
  //   convertDate(date2).diff(convertDate(date1), 'hour') < 24;
  const isShowPoint =
    isStringContains(cardData?.status || '', 'scoring') &&
    !!cardData?.student_exam?.[0]?.exam_history;
  const point = cardData?.student_exam?.[0]?.exam_history?.point || 0;
  const isOnGoing = checkDate(convertDate(), cardData?.start_time || '', {
    type: 'after',
  });

  const renderNilai = () => {
    return isShowPoint ? point : 'Belum Dinilai';
  };

  switch (filterType) {
    case 'on_progress':
      return (
        <View style={Styles.cardExamMainContainer}>
          <View style={Styles.tabOnGoingCardContent}>
            <View style={Styles.flexRow}>
              <View style={Styles.tabMendatangCardbadge}>
                <Text style={Styles.tabMendatangCardBadgeText}>
                  {cardData?.service?.name}
                </Text>
              </View>
            </View>
            <View style={Styles.tabMendatangCardBodyContent}>
              <View style={Styles.flex1}>
                <Text style={Styles.tabMendatangSubjectName}>
                  {cardData?.subject?.name}
                </Text>
                <Text style={Styles.tabMendatangChapterName}>
                  {cardData?.title}
                </Text>
              </View>
              <View style={Styles.tabMendatangTimerContainerOnProgress}>
                {cardData?.start_exam_button && isOnGoing && (
                  <Button
                    action={async () => {
                      if (!cardData.is_active_proctoring) {
                        navigation.navigate('LMSUjianTestCameraScreen', {
                          data: cardData!,
                        });
                        return;
                      }
                      handleSetCardData(cardData);
                      handleOpenPopup(true);
                      handleSetPopUpType('Kerjakan');
                    }}
                    label="Kerjakan"
                    background={Colors.white}
                    color={Colors.primary.base}
                    borderColor={Colors.primary.base}
                    borderWidth={1}
                    style={Styles.doButton}
                  />
                )}
              </View>
            </View>
            <View>
              <View style={Styles.tabMendatangScheduleDateContainer}>
                <View
                  style={[
                    Styles.tabMendatangCalendarIconContainerStyle,
                    Styles.tabMendatangCalendarIconContainerStyle2,
                  ]}>
                  <Calendaricon width={15} height={15} />
                </View>
                <Text style={Styles.tabMendatangScheduleDate}>
                  {`${renderCheckTodayDate(
                    cardData?.start_time!,
                    dateFormatWithOnlyTime,
                    dateFormatWithDayAndTime,
                  )} - ${convertDate(cardData?.end_time).format(
                    dateFormatWithOnlyTime,
                  )}`}
                </Text>
              </View>
              <View style={Styles.onGoingContainer}>
                <View
                  style={[
                    Styles.tabMendatangCalendarIconContainerStyle,
                    Styles.tabMendatangCalendarIconContainerStyle3,
                  ]}>
                  <LiveIcon width={15} height={15} />
                </View>
                <View style={Styles.justifyCenter}>
                  <Text style={Styles.tabMendatangScheduleTitleOnProgress}>
                    Sedang berlangsung
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    case 'scheduled':
      return (
        <View style={Styles.doneScroingContainer}>
          <View style={Styles.tabMendatangCardContent}>
            <View style={Styles.flexRow}>
              <View style={Styles.tabMendatangCardbadge}>
                <Text style={Styles.tabMendatangCardBadgeText}>
                  {cardData?.service?.name}
                </Text>
              </View>
            </View>
            <View style={Styles.tabMendatangCardBodyContent}>
              <View style={Styles.flex1}>
                <Text style={Styles.tabMendatangSubjectName}>
                  {cardData?.subject?.name}
                </Text>
                <Text style={Styles.tabMendatangChapterName}>
                  {cardData?.title}
                </Text>
              </View>
              <View style={Styles.tabMendatangTimerContainer}>
                <View style={Styles.tabMendatangTimerInnerContainer}>
                  <Text style={Styles.tabMendatangScheduleDate1}>
                    Mulai Dalam
                  </Text>
                  <Countdown
                    endTime={cardData?.start_time}
                    // isHideSeconds
                    onlyShowTime
                    actionAfterTimeOver={refetchData}
                  />
                </View>
              </View>
            </View>

            <View style={Styles.tabMendatangScheduleContainer}>
              <Text style={Styles.tabMendatangScheduleTitle}>Dijadwalkan</Text>
              <View style={Styles.tabMendatangScheduleDateContainer}>
                <View style={Styles.tabMendatangCalendarIconContainerStyle}>
                  <Calendaricon width={12} height={12} />
                </View>
                <Text style={Styles.tabMendatangScheduleDate}>
                  {`${renderCheckTodayDate(
                    cardData?.start_time!,
                    dateFormatWithOnlyTime,
                    dateFormatWithDayAndTime,
                  )} - ${convertDate(cardData?.end_time).format(
                    dateFormatWithOnlyTime,
                  )}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    case 'done_scoring':
      if (isDoneScoringFilter && !isShowPoint) {
        return <></>;
      }
      return (
        <View style={Styles.doneScroingContainer}>
          <View style={Styles.tabMendatangCardContent}>
            <View style={Styles.flexRow}>
              <View style={Styles.tabMendatangCardbadge}>
                <Text style={Styles.tabMendatangCardBadgeText}>
                  {cardData?.service?.name}
                </Text>
              </View>
            </View>
            <View style={Styles.tabMendatangCardBodyContent}>
              <View style={Styles.flex2}>
                <Text style={Styles.tabMendatangSubjectName}>
                  {cardData?.subject?.name}
                </Text>
                <Text style={Styles.tabMendatangChapterName}>
                  {cardData?.title}
                </Text>
              </View>
              <View style={Styles.tabMendatangTimerContainer}>
                <Button
                  action={() => {
                    isShowPoint
                      ? handleSetPopUpType('Selesai')
                      : handleSetPopUpType('Proses');
                    handleSetCardData();
                    handleOpenPopup(true);
                  }}
                  label="Detail"
                  background={Colors.white}
                  color={Colors.primary.base}
                  borderColor={Colors.primary.base}
                  borderWidth={1}
                  style={Styles.detailButton}
                />
              </View>
            </View>
            <View style={Styles.flexRow}>
              <View style={Styles.tabMendatangScheduleContainer}>
                <Text style={Styles.tabMendatangScheduleTitle}>
                  Dikumpulkan
                </Text>
                <View style={Styles.tabMendatangScheduleDateContainer}>
                  <View
                    style={[
                      Styles.tabMendatangCalendarIconContainerStyle,
                      Styles.tab3,
                    ]}>
                    <Calendaricon width={15} height={15} />
                  </View>
                  <Text style={Styles.tabMendatangScheduleDate}>
                    {renderCheckTodayDate(
                      cardData?.student_exam?.[0]?.finished_at! ||
                        cardData?.end_time!,
                      dateFormatWithOnlyTime,
                      dateFormatWithDayAndTime,
                    )}
                  </Text>
                </View>
              </View>
              <View style={Styles.tabMendatangScheduleContainer2}>
                <Text style={Styles.tabMendatangScheduleTitle}>Nilai</Text>
                <View style={Styles.tabMendatangScheduleDateContainer}>
                  {cardData?.student_exam?.[0]?.score ? (
                    <Text style={Styles.tabMendatangScheduleMark}>
                      {cardData?.student_exam?.[0]?.score}
                    </Text>
                  ) : (
                    <Text style={Styles.tabMendatangScheduleMarkUndone}>
                      {/* {cardData?.student_exam?.[0]?.exam_history?.point ??
                        'Belum Dinilai'} */}
                      {renderNilai()}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    default:
      break;
  }
};

export default CardExamComponent;
