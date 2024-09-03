import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from './styles';
import useUjianExplanation from './useUjianExplanation';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import {Header, MainView} from '@components/atoms';
import IcShuffleQuestionInactive from '@assets/svg/ic24_shuffle_question_inactive.svg';
import IcShuffleQuestionActive from '@assets/svg/ic24_shuffle_question_active.svg';
import CircleIcon from '@components/atoms/CircleIcon';
import RenderQuestionBody from './components/RenderQuestionBody';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Colors from '@constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const UjianExplanationScreen = () => {
  const {
    isShuffleQuestionActive,
    popScreen,
    mappedStepperQuestion,
    setUjianExplanationType,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    ujianData,
    questionType,
    bottomSheetRef,
    handleSheetChanges,
    snapPoints,
    currentQuestionData,
  } = useUjianExplanation();

  return (
    <>
      <View style={{flex: 1}}>
        {/* Header */}
        <View>
          <Header
            label={ujianData.name}
            onPressIconLeft={() => popScreen()}
            onPressIconRight={() => {}}
            iconRight={
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
                      prev.pushOrRemove<IUjianExplanationType>(
                        'shuffle_question',
                      ),
                    );
                  }}
                />
                {/* <CircleIcon
              isActive={isShuffleOptionActive}
              icon={
                isShuffleOptionActive ? (
                  <IcShuffleOptionActive />
                ) : (
                  <IcShuffleOptionInactive />
                )
              }
              onPress={() => {
                setUjianExplanationType(prev =>
                  prev.pushOrRemove<IUjianExplanationType>(
                    'shuffle_option',
                  ),
                );
              }}
            /> */}
              </MainView>
            }
          />
          <StepperQuestion
            onPressQuestion={setCurrentQuestionNumber}
            currentQuestion={currentQuestionNumber}
            totalQuestion={ujianData.total_question}
            question={mappedStepperQuestion}
          />
        </View>
        <View style={styles.cardContainer}>
          <RenderQuestionBody
            mode="PREVIEW"
            currentQuestion={currentQuestionNumber}
            options={
              questionType === 'MCQ' ? currentQuestionData?.options : undefined
            }
            onQuestionChange={() => {}}
            questionType={questionType}
            essayAnswer={
              questionType === 'ESSAY' ? currentQuestionData?.user_input : ''
            }
            singleQuestionAnswer={currentQuestionData?.options?.find(
              item => item.is_choosed,
            )}
            bobot={currentQuestionData?.marks}
            question={currentQuestionData?.questions || ''}
          />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleIndicatorStyle={{backgroundColor: Colors.primary.base}}
        handleStyle={styles.bottomSheetHandle}
        handleComponent={({}) => (
          <MainView
            justifyContent="center"
            alignItems="center"
            marginVertical={8}>
            <MainView
              width={'12%'}
              height={6}
              borderRadius={100}
              backgroundColor={Colors.primary.base}
            />
          </MainView>
        )}
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
        <MainView backgroundColor={Colors.white} marginHorizontal={16}>
          <Text style={styles.explanationTitleText}>Pembahasan</Text>
          <ScrollView style={{minHeight: '100%'}}>
            <Text style={styles.explanationCorrectAnswerText}>
              Jawaban Benar!
            </Text>

            <RenderHtmlView
              source={{
                html: currentQuestionData?.discussion || '',
              }}
            />
          </ScrollView>
        </MainView>
      </BottomSheet>
    </>
  );
};

export {UjianExplanationScreen};
