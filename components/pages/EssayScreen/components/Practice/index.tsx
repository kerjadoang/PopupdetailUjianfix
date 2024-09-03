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
import IconKeyBlue from '@assets/svg/ic24_key_blue.svg';
import IconArrowDownGrey from '@assets/svg/ic16_arrow_down_grey.svg';
import {styles} from '../../style';
import usePractice from './usePractice';
import RenderHTML from 'react-native-render-html';
import {parseHtml} from '@constants/functional';
import Colors from '@constants/colors';

const Practice = ({}) => {
  const {
    essayDataSort,
    essayState,
    currentQuestion,
    isShowPopup,
    popupData,
    isShowSwipeUp,
    filledArr,
    currentTime,
    _handlerShowSwipeUp,
    _handlerOnCloseSwipeUp,
    _handlerSetAnswer,
    _handlerFinishButton,
    _handlerBackButton,
    _handlerStepper,
  } = usePractice();

  const route = useRoute();
  const navigation = useNavigation();
  const {title, question_service_id}: any = route?.params;
  const isShowWeight = question_service_id == 7 || question_service_id == 10;
  const {question, marks} = essayDataSort?.[currentQuestion - 1] || '-';
  const {explanation} =
    essayDataSort?.[currentQuestion - 1]?.question_discuss || '-';
  const isFirstIndex = currentQuestion === 1;
  const isLastIndex = currentQuestion === essayDataSort.length;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={title || 'Practice'}
          styleLabel={styles.labelHeader}
          iconRight={
            <View style={styles.finishButtonContainer}>
              <Text style={styles.finishButton}>{'Selesai'}</Text>
            </View>
          }
          onPressIconRight={_handlerFinishButton}
          onPressIconLeft={_handlerBackButton}
        />
      ),
    });
  }, [essayState, currentTime]);

  const _renderSwipeUpContentAnswerKey = () => {
    return (
      <View style={styles.swipeUpContainer}>
        <Text style={styles.swipeUpTitle}>{'Kunci Jawaban'}</Text>
        {/* <Text style={styles.swipeUpDescription}>{explanation}</Text> */}

        <View style={styles.scrollViewDescriptionContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewDescription}>
            <RenderHTML
              baseStyle={{color: Colors.black}}
              contentWidth={Dimensions.get('screen').width - 32}
              source={{
                html: parseHtml(explanation as string),
              }}
            />
          </ScrollView>
        </View>
        <Button label={'Tutup'} action={_handlerOnCloseSwipeUp} />
      </View>
    );
  };

  const _renderScreen = () => {
    return (
      <>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          bounces={false}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <StepperQuestion
            question={{
              filled: filledArr,
            }}
            totalQuestion={essayDataSort.length}
            currentQuestion={currentQuestion}
            onPressQuestion={(data: any) => {
              _handlerStepper(data);
            }}
          />

          <View style={styles.contentContainer}>
            <View>
              <View style={styles.contentWrapper}>
                <Text style={styles.contentTitle}>{'PERTANYAAN'}</Text>

                {isShowWeight ? (
                  <Text style={styles.contentTitle}>{`Bobot : ${marks}`}</Text>
                ) : null}
              </View>

              <View style={styles.scrollViewDescriptionContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollViewDescription}>
                  <RenderHTML
                    baseStyle={{color: Colors.black}}
                    contentWidth={Dimensions.get('screen').width - 32}
                    source={{
                      html: parseHtml(question as string),
                    }}
                  />
                  {/* <Text style={styles.contentDescription}>{question}</Text> */}
                </ScrollView>
              </View>

              <InputText
                multiline
                bottom={16}
                isNotOutline
                borderRadius={10}
                value={essayState[currentQuestion - 1]?.answer_user}
                inputTextStyle={{height: 120}}
                placeholder={'Tulis jawabanmu di sini...'}
                onChangeText={text => {
                  _handlerSetAnswer(text);
                }}
              />
            </View>

            <View>
              {essayState[currentQuestion - 1]?.answer_user.length > 0 ? (
                <View style={styles.explanationContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      _handlerShowSwipeUp();
                    }}
                    style={styles.explanationButton}>
                    <IconKeyBlue width={24} height={24} />
                    <Text style={styles.explanationLabel}>
                      {'Lihat Kunci Jawaban'}
                    </Text>
                    <IconArrowDownGrey width={16} height={16} />
                  </TouchableOpacity>
                </View>
              ) : null}

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
          visible={isShowSwipeUp}
          onClose={_handlerOnCloseSwipeUp}
          children={_renderSwipeUpContentAnswerKey()}
        />
      </>
    );
  };

  return _renderScreen();
};

export default Practice;
