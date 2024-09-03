import {
  IconButtonArrowRightActive,
  IconButtonArrowRightPassive,
} from '@assets/images';
import React, {useLayoutEffect} from 'react';
import {InputText, PopUp} from '@components/atoms';
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
import {styles} from '../../style';
import useTes from './useTes';
import {Popable} from 'react-native-popable';
import Colors from '@constants/colors';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import RenderHTML from 'react-native-render-html';
import {parseHtml} from '@constants/functional';

const Tes = ({}) => {
  const {
    isLoading,
    essayDataSort,
    essayState,
    currentQuestion,
    isShowPopup,
    popupData,
    filledArr,
    seconds,
    displayTime,
    countDown,
    _handlerSetAnswer,
    _handlerFinishButton,
    _handlerBackButton,
    _handlerStepper,
  } = useTes();

  const route = useRoute();
  const navigation: any = useNavigation();
  const {title, rules}: any = route?.params || 'Soal Uraian';
  const {question, marks} = essayDataSort?.[currentQuestion - 1] || '-';
  const isFirstIndex = currentQuestion === 1;
  const isLastIndex = currentQuestion === essayDataSort?.length;
  const isShowPopAble = countDown < 60 * 1000;

  type ReminderTimePopableProps = {
    label: string;
    visible?: boolean;
  };

  const ReminderTimePopable: React.FC<ReminderTimePopableProps> = props => {
    return (
      <Popable
        animated
        style={styles.popableContainer}
        backgroundColor={Colors.dark.neutral20}
        animationType="timing"
        visible={props.visible}
        position="bottom"
        content={
          <View style={styles.popableContentContainer}>
            <Text style={styles.popableText}>{`Waktu kamu tinggal ${Math.round(
              seconds,
            )} detik!`}</Text>
          </View>
        }>
        <Text style={isShowPopAble ? styles.subLabelWarning : styles.subLabel}>
          {props.label}
        </Text>
      </Popable>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={title || 'Test'}
          styleLabel={styles.labelHeader}
          subLabelContent={
            rules?.max_duration ? (
              <ReminderTimePopable
                label={displayTime}
                visible={isShowPopAble}
              />
            ) : null
          }
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
  }, [seconds]);

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
            totalQuestion={essayDataSort?.length}
            currentQuestion={currentQuestion}
            onPressQuestion={(data: any) => {
              _handlerStepper(data);
            }}
          />

          <View style={styles.contentContainer}>
            <View>
              <View style={styles.contentWrapper}>
                <Text style={styles.contentTitle}>{'PERTANYAAN'}</Text>

                <Text style={styles.contentTitle}>{`Bobot : ${marks}`}</Text>
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
                value={essayState[currentQuestion - 1]?.user_input}
                inputTextStyle={{height: 120}}
                placeholder={'Tulis jawabanmu di sini...'}
                onChangeText={text => {
                  _handlerSetAnswer(text);
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
      </>
    );
  };

  return _renderScreen();
};

export default Tes;
