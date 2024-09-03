/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useScreen} from './useScreen';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {Button, InputText, MainText, MainView} from '@components/atoms';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import {PopUp} from '@components/atoms';

import PrevArrowDisable from '@assets/svg/ic48_arrow_left.svg';
import PrevArrowActive from '@assets/svg/ic48_arrow_left2.svg';
import NextArrowActive from '@assets/svg/ic48_arrow_right.svg';
import Fonts from '@constants/fonts';
import {parseHtml} from '@constants/functional';
import RenderImage from '@components/atoms/RenderImage';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import IcShuffleQuestionInactive from '@assets/svg/ic24_shuffle_question_inactive.svg';
import IcShuffleQuestionActive from '@assets/svg/ic24_shuffle_question_active.svg';
import CircleIcon from '@components/atoms/CircleIcon';
import BottomSheet, {
  BottomSheetBackdrop,
  WINDOW_WIDTH,
} from '@gorhom/bottom-sheet';
import BottomSheetQuestionExplanation from './component/BottomSheetQuestion';
import BottomSheetHandle from './component/BottomSheetHandle';
import OptionItem from './component/OptionItem';

const TeacherCheckExamScreen = () => {
  const {
    isPG,
    isPGKompleks,
    unscored,
    currentNumber,
    setCurrentNumber,
    popup,
    setPopup,
    score,
    _handlerGiveEssayScore,
    _handlerValidateScore,
    student_name,
    exam_name,
    checkScore,
    studentScore,
    endScoring,
    mode,
    isShuffleQuestionActive,
    setUjianExplanationType,
    bottomSheetRef,
    handleSheetChanges,
    snapPoints,
    currentQuestionType,
    currentQuestionData,
    ujianData,
    mappedStepperQuestion,
    currentSnapPoints,
  } = useScreen();

  const ShuffleQuestionButton = useCallback(
    () => (
      <MainView flexDirection="row" gap={6}>
        <CircleIcon
          isActive={isShuffleQuestionActive}
          icon={
            isShuffleQuestionActive ? (
              <IcShuffleQuestionActive />
            ) : (
              <IcShuffleQuestionInactive />
            )
          }
          onPress={() => {
            setUjianExplanationType(prev =>
              prev.pushOrRemove<IUjianExplanationType>('shuffle_question'),
            );
          }}
        />
      </MainView>
    ),
    [isShuffleQuestionActive],
  );

  const renderRightIcon = useCallback(() => {
    if (mode === 'SCORING') {
      return (
        <Button
          label={'Selesai'}
          background={Colors.success.base}
          style={{paddingHorizontal: 12, paddingVertical: 3}}
          action={() => {
            checkScore();
            setTimeout(() => {
              setPopup(true);
            }, 1000);
          }}
        />
      );
    }

    return ShuffleQuestionButton();
  }, [mode, isShuffleQuestionActive]);

  return (
    <MainView flex={1}>
      <Header
        label={student_name || 'Nama Murid'}
        subLabel={exam_name || 'Ulangan'}
        backgroundColor={Colors.white}
        iconRight={renderRightIcon()}
        onPressIconRight={() => {
          // setPopup(true);
        }}
      />
      <MainView
        flexDirection="row"
        alignItems="center"
        backgroundColor={Colors.white}>
        <MainView flex={1} marginRight={10}>
          <StepperQuestion
            onPressQuestion={async currNum => {
              await _handlerGiveEssayScore();
              setCurrentNumber(currNum);
            }}
            currentQuestion={currentNumber}
            totalQuestion={
              unscored?.length || ujianData?.paper?.total_question || 1
            }
            question={mappedStepperQuestion}
          />
        </MainView>
        {mode === 'SCORING' && (
          <MainView paddingRight={12}>{ShuffleQuestionButton()}</MainView>
        )}
      </MainView>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        bounces={false}
        contentContainerStyle={styles.labelQuestionsContainer}
        showsVerticalScrollIndicator={false}
        style={styles.body}>
        <View
          style={[
            styles.contentContainer,
            {paddingBottom: mode == 'HISTORY' ? 50 : 0},
          ]}>
          <View>
            <View style={styles.labelQuestionContainer}>
              <Text style={styles.labelQuestion}>Pertanyaan</Text>
              <Text style={styles.labelQuestion}>
                Bobot: {currentQuestionData?.marks}
              </Text>
            </View>

            {currentQuestionData?.file_id && (
              <View style={styles.imageContainer}>
                <RenderImage
                  // imageUrl={checkOneQuestion?.data?.data?.question?.path_url}
                  imageId={currentQuestionData?.file_id}
                  width={WINDOW_WIDTH - 32}
                  height={200}
                  placeholder={
                    <View
                      style={{
                        width: WINDOW_WIDTH - 32,
                        height: 200,
                        borderRadius: 10,
                      }}
                    />
                  }
                  style={{width: WINDOW_WIDTH - 32, height: 200}}
                />
              </View>
            )}

            {/* Instruction */}
            {!!currentQuestionData?.instructions && (
              <RenderHtmlView
                baseStyle={{color: Colors.black}}
                contentWidth={Dimensions.get('screen').width - 32}
                source={{
                  html: parseHtml(currentQuestionData?.instructions || ''),
                }}
              />
            )}

            {/* QUESTION */}
            <RenderHtmlView
              baseStyle={{color: Colors.black}}
              contentWidth={Dimensions.get('screen').width - 32}
              source={{
                html: parseHtml(currentQuestionData?.questions || ''),
              }}
            />

            <MainView paddingBottom={100}>
              <Text style={[styles.labelQuestion, {marginTop: 20}]}>
                Jawaban
              </Text>
              {currentQuestionData?.options ? (
                currentQuestionData?.options?.map((item: Option) => {
                  return (
                    <OptionItem
                      correctAnswer={item?.is_correct ? item.id : null}
                      userAnswer={item.is_choosed ? item.id : null}
                      data={item}
                      key={item.id}
                      isPGKompleks={isPGKompleks}
                      isChecked={item?.is_choosed}
                    />
                  );
                })
              ) : (
                <>
                  <Text style={styles.essayAnswer}>
                    {currentQuestionData?.user_input ||
                      'User Tdak Mengisi Jawaban'}
                  </Text>
                  {/* INPUT SCORE TEXT */}
                  {mode == 'SCORING' && (
                    <InputText
                      backgroundColor={Colors.dark.neutral20}
                      label="Beri Nilai"
                      placeholder={'Masukkan nilai'}
                      defaultValue={
                        currentQuestionData?.is_scored
                          ? String(currentQuestionData?.point)
                          : ''
                      }
                      value={score}
                      onChangeText={(text: any) =>
                        _handlerValidateScore(
                          text,
                          currentQuestionData?.marks || 0,
                        )
                      }
                      keyboardType="numeric"
                      onSubmitEditing={() => _handlerGiveEssayScore()}
                    />
                  )}
                </>
              )}
              {/* EXPLANATION */}
              {(isPG || isPGKompleks) && mode === 'SCORING' ? (
                <MainView marginTop={14}>
                  {currentQuestionData?.point !== 0 ? (
                    <MainText style={styles.explanationAnswerText}>
                      Jawaban Benar!
                    </MainText>
                  ) : (
                    <MainView>
                      <MainText
                        style={{
                          ...styles.explanationAnswerText,
                          color: Colors.danger.base,
                        }}>
                        Jawaban Salah!
                      </MainText>
                      <MainView>
                        <MainText>
                          Jawaban Murid : {/* Option Key */}
                          <MainText type="Bold" color={Colors.danger.base}>
                            {isPGKompleks
                              ? currentQuestionData?.options
                                  ?.filter(
                                    (opt: Option) => opt?.is_choosed === true,
                                  )
                                  .map((val: any) => val?.key)
                                  .join(', ') || '-'
                              : currentQuestionData?.selected_option?.key ||
                                '-'}
                          </MainText>
                        </MainText>

                        <MainText>
                          Jawaban Benar : {/* Option Key */}
                          <MainText type="Bold" color={Colors.success.base}>
                            {isPGKompleks
                              ? currentQuestionData?.options
                                  ?.filter(
                                    (opt: Option) => opt?.is_correct === true,
                                  )
                                  .map((val: any) => val?.key)
                                  .join(', ')
                              : currentQuestionData?.options?.find(
                                  item => item?.is_correct,
                                )?.key}
                          </MainText>
                        </MainText>
                      </MainView>
                    </MainView>
                  )}
                </MainView>
              ) : null}

              {currentQuestionData?.discussion && mode == 'SCORING' ? (
                <View style={styles.explanationContainer}>
                  <Text
                    style={[
                      styles.question,
                      {
                        fontSize: 12,
                        color: Colors.dark.neutral100,
                        marginBottom: 4,
                      },
                    ]}>
                    Pembahasan
                  </Text>
                  <RenderHtmlView
                    baseStyle={{color: Colors.black}}
                    source={{html: parseHtml(currentQuestionData?.discussion)}}
                    contentWidth={Dimensions.get('screen').width - 60}
                  />
                  {/* {!!explanationImageId && (
                  <RenderImage
                    imageUrl=""
                    imageId={explanationImageId}
                    width={WINDOW_WIDTH * 0.4}
                    height={WINDOW_WIDTH * 0.4}
                  />
                )} */}
                </View>
              ) : null}
            </MainView>
          </View>
        </View>
      </ScrollView>

      {mode === 'SCORING' && (
        <MainView
          width={Dimensions.get('screen').width}
          position="absolute"
          bottom={0}
          backgroundColor={'white'}
          paddingHorizontal={16}>
          <View style={styles.btmBtnContainer}>
            <TouchableOpacity
              onPress={async () => {
                await _handlerGiveEssayScore();
                setCurrentNumber(currentNumber - 1);
              }}
              disabled={currentNumber <= 1 ? true : false}>
              {currentNumber <= 1 ? <PrevArrowDisable /> : <PrevArrowActive />}
            </TouchableOpacity>
            {currentNumber === unscored?.length ??
            ujianData?.paper?.total_question ? null : (
              <TouchableOpacity
                onPress={async () => {
                  await _handlerGiveEssayScore();
                  setCurrentNumber(currentNumber + 1);
                }}>
                <NextArrowActive />
              </TouchableOpacity>
            )}
          </View>
        </MainView>
      )}

      {mode === 'HISTORY' && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          handleIndicatorStyle={{backgroundColor: Colors.primary.base}}
          handleStyle={styles.bottomSheetHandle}
          handleComponent={({}) => <BottomSheetHandle />}
          backgroundStyle={styles.bottomSheetBackground}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              pressBehavior={'collapse'}
              opacity={0.5}
              enableTouchThrough={false}
              appearsOnIndex={1}
              disappearsOnIndex={0}
              style={[
                {backgroundColor: 'rgba(0, 0, 0, 1)', position: 'absolute'},
                StyleSheet.absoluteFillObject,
              ]}
            />
          )}
          onChange={handleSheetChanges}>
          <BottomSheetQuestionExplanation
            questionData={currentQuestionData}
            questionType={currentQuestionType}
            showAnswer={currentSnapPoints !== '12%'}
            // showExplanation={currentSnapPoints !== '12%'}
          />
        </BottomSheet>
      )}

      <PopUp
        show={popup}
        title={'Selesai Diperiksa ?'}
        desc={`Apakah Anda yakin sudah selesai memeriksa? Penilaian akan langsung dibagikan ke Murid \n\n 
          ${student_name || 'Nama Murid'} \n Nilai: ${studentScore || 0}`}
        titleCancel={'Periksa Ulang'}
        titleConfirm={'Selesai Diperiksa'}
        actionCancel={() => setPopup(!popup)}
        actionConfirm={() => endScoring()}
        buttonPosition="vertical"
      />
    </MainView>
  );
};

export {TeacherCheckExamScreen};

const styles = StyleSheet.create({
  explanationTitleText: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  explanationCorrectAnswerText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
    color: Colors.success.base,
  },
  bottomSheetHandle: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'transparent',
    opacity: 0.1,
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: {
      height: -4,
      width: 0,
    },
  },
  bottomSheetBackground: {
    backgroundColor: Colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  question: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  explanationAnswerText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success.base,
  },
  explanationContainer: {
    backgroundColor: Colors.success.light2,
    borderRadius: 15,
    padding: 12,
    marginVertical: 14,
  },
  explanationText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  body: {
    backgroundColor: Colors.white,
    // flex: 1,
    padding: 16,
  },
  contentContainer: {
    // flex: 1,
    // paddingBottom: 100,
  },
  labelQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  labelQuestionsContainer: {
    // flex: 1,
    // marginBottom: 100,
  },
  scrollViewDescriptionContainer: {
    marginBottom: 16,
  },
  scrollViewDescription: {
    flexGrow: 1,
  },
  labelQuestion: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
  btmBtnContainer: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  essayAnswer: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  textQuestion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
  imageContainer: {
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    marginVertical: 16,
  },
});
