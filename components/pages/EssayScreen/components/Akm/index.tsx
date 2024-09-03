import {
  IconButtonArrowRightActive,
  IconButtonArrowRightPassive,
} from '@assets/images';
import React, {useLayoutEffect} from 'react';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PauseIcon from '@assets/svg/ic_pause.svg';
import {styles} from '../../style';
import useAkm from './useAkm';
import MarksIcon from '@assets/svg/ic_marks.svg';
import MarksActiveIcon from '@assets/svg/ic_marks_active.svg';
import Colors from '@constants/colors';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import RenderHTML from 'react-native-render-html';
import {parseHtml} from '@constants/functional';
import ReminderTimePopable from '@components/atoms/ReminderTimePopable';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const Akm = ({}) => {
  const {
    isLoading,
    questionData,
    questionCheckUnfinished,
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUpReviewAnswer,
    seconds,
    displayTime,
    countDown,
    reviewAnswered,
    scrollRef,
    _handlerShowSwipeUpReviewAnswer,
    _handlerOnCloseSwipeUpReviewAnswer,
    _handlerOnPressPause,
    _handlerOnChangeAnswer,
    _handlerMarksQuestion,
    _handlerOnPressFinish,
    _handlerBackButton,
    _handlerStepper,
  } = useAkm();

  const route = useRoute();
  const navigation: any = useNavigation();
  const {title, rules}: any = route?.params || 'Soal Uraian';
  const {question, id, user_input} = questionData?.question || '-';
  const isFirstIndex = currentQuestion === 1;
  const isLastIndex = currentQuestion === questionData?.total_question;
  const isShowPopAble = countDown < 60 * 1000;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={title || 'AKM'}
          styleLabel={styles.labelHeader}
          subLabelContent={
            rules?.max_duration ? (
              <ReminderTimePopable
                label={displayTime}
                visible={isShowPopAble}
                countdown={seconds}
              />
            ) : null
          }
          iconRight={
            <View style={styles.finishButtonContainer}>
              <Text style={styles.finishButton}>{'Selesai'}</Text>
            </View>
          }
          onPressIconRight={_handlerOnPressFinish}
          onPressIconLeft={_handlerBackButton}
        />
      ),
    });
  }, [seconds, questionData, questionCheckUnfinished]);

  const _renderSwipeUpReviewAnswers = () => {
    return (
      <View style={styles.swipeUpContainerAkm}>
        <Text style={styles.swipeUpTitle}>{'Tinjauan Jawaban'}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.swipeUpContainerStyle}>
          {reviewAnswered &&
            reviewAnswered?.map((value: any, index: any) => {
              const {tagged, question, user_input, order} = value;

              return (
                <View
                  key={index}
                  style={{
                    ...styles.swipeUpCardReviewAnswer,
                    backgroundColor: tagged
                      ? Colors.secondary.light2
                      : Colors.white,
                  }}>
                  <View style={styles.contentMarksContainer}>
                    <Text
                      style={
                        styles.swipeUpCardTitleCurrentQuestion
                      }>{`PERTANYAAN ${order}`}</Text>

                    <View style={styles.contentMarksContainer}>
                      {tagged ? (
                        <>
                          <MarksActiveIcon
                            width={16}
                            height={16}
                            style={styles.buttonIconMarks}
                          />

                          <Text style={styles.contentTitleReview}>
                            {'Tandai'}
                          </Text>
                        </>
                      ) : null}
                    </View>
                  </View>
                  <RenderHTML
                    baseStyle={{color: Colors.black}}
                    contentWidth={Dimensions.get('screen').width - 50}
                    source={{
                      html: parseHtml(question as string),
                    }}
                  />
                  <Text style={styles.swipeUpCardMyAnswerTitle}>
                    {'Jawaban saya:'}
                  </Text>
                  <View
                    style={
                      styles.swipeUpCardDescriptionCardReviewCurrentQuestion
                    }>
                    <Text style={styles.swipeUpCardAnswerCurrentQuestion}>
                      {user_input || '-'}
                    </Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>

        <View style={styles.swipeUpButtonContainer}>
          <Button label={'Tutup'} action={_handlerOnCloseSwipeUpReviewAnswer} />
        </View>
      </View>
    );
  };

  const _renderScreen = () => {
    const isCurrentQuestionMarked =
      questionCheckUnfinished &&
      questionCheckUnfinished?.answers[currentQuestion - 1]?.tagged;

    const filterArrAnswered =
      questionCheckUnfinished &&
      questionCheckUnfinished?.answers.filter(
        (item: any, _: number) => item?.answered,
      );

    const filterArrBookmarked =
      questionCheckUnfinished &&
      questionCheckUnfinished?.answers.filter(
        (item: any, _: number) => item.tagged,
      );

    const arrAnswered =
      filterArrAnswered &&
      filterArrAnswered?.map((item: any) => item?.order - 1);

    const arrBookmarked =
      filterArrBookmarked &&
      filterArrBookmarked?.map((item: any) => item?.order - 1);

    return (
      <>
        <ScrollView
          ref={scrollRef}
          automaticallyAdjustKeyboardInsets={true}
          bounces={false}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <StepperQuestion
            question={{
              filled: arrAnswered,
              bookmarked: arrBookmarked,
            }}
            totalQuestion={questionData?.total_question}
            currentQuestion={currentQuestion}
            onPressQuestion={(data: any) => {
              _handlerStepper(data);
            }}
          />

          <View style={styles.contentContainer}>
            <View>
              <View style={styles.contentWrapper}>
                <Text style={styles.contentTitle}>{'PERTANYAAN'}</Text>

                <TouchableOpacity
                  onPress={() => {
                    _handlerMarksQuestion(id, isCurrentQuestionMarked);
                  }}
                  style={styles.contentMarksContainer}>
                  {questionCheckUnfinished && isCurrentQuestionMarked ? (
                    <MarksActiveIcon
                      width={16}
                      height={16}
                      style={styles.buttonIconMarks}
                    />
                  ) : (
                    <MarksIcon
                      width={16}
                      height={16}
                      style={styles.buttonIconMarks}
                    />
                  )}

                  <Text style={styles.contentTitle}>{'Tandai'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.scrollViewDescriptionContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollViewDescription}>
                  <RenderHtmlView
                    baseStyle={{color: Colors.black}}
                    contentWidth={Dimensions.get('screen').width - 32}
                    source={{
                      html: parseHtml(question as string),
                    }}
                  />
                </ScrollView>
              </View>

              <InputText
                multiline={true}
                bottom={16}
                isNotOutline
                borderRadius={10}
                value={user_input}
                inputTextStyle={{height: 120}}
                placeholder={'Tulis jawabanmu di sini...'}
                onChangeText={text => {
                  _handlerOnChangeAnswer(text);
                }}
              />
            </View>

            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    _handlerStepper('previous');
                  }}
                  disabled={isFirstIndex}>
                  <Image
                    style={styles.buttonLeft}
                    source={
                      isFirstIndex
                        ? IconButtonArrowRightPassive
                        : IconButtonArrowRightActive
                    }
                  />
                </TouchableOpacity>

                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      _handlerShowSwipeUpReviewAnswer();
                    }}
                    style={styles.buttonWrapperLeft}>
                    <Text style={styles.buttonTitle}>{'Tinjau'}</Text>
                  </TouchableOpacity>

                  {rules?.max_duration ? (
                    <TouchableOpacity
                      onPress={() => {
                        _handlerOnPressPause();
                      }}
                      style={styles.buttonWrapper}>
                      <PauseIcon
                        width={24}
                        height={24}
                        style={styles.buttonIcon}
                      />
                      <Text style={styles.buttonTitle}>{'Jeda'}</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    _handlerStepper('next');
                  }}
                  disabled={isLastIndex}>
                  <Image
                    style={styles.buttonRight}
                    source={
                      isLastIndex
                        ? IconButtonArrowRightPassive
                        : IconButtonArrowRightActive
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {isLoading ? <LoadingIndicator /> : null}

        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />

        <SwipeUp
          height={100}
          visible={isShowSwipeUpReviewAnswer}
          onClose={_handlerOnCloseSwipeUpReviewAnswer}
          children={_renderSwipeUpReviewAnswers()}
        />
      </>
    );
  };

  return _renderScreen();
};

export default Akm;
