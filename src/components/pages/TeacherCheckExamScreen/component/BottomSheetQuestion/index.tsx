import React, {FC} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {MainView, MainText} from '@components/atoms';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import Colors from '@constants/colors';

type Props = {
  questionData?: PaperQuestion;
  questionType?: IQuestionType;
  showExplanation?: boolean;
  showAnswer?: boolean;
};

const BottomSheetQuestionExplanation: FC<Props> = ({
  questionData,
  questionType,
  showExplanation = true,
  showAnswer = true,
}) => {
  return (
    <View style={styles.container}>
      <MainView backgroundColor={Colors.white} marginHorizontal={16}>
        <Text style={styles.explanationTitleText}>Pembahasan</Text>
        <ScrollView style={{minHeight: '100%'}}>
          {(questionType?.name === 'MCQ BASE' ||
            questionType?.name === 'MCQ COMPLEX') &&
            !!questionData?.selected_option && (
              <MainView marginBottom={16}>
                {questionData?.point !== 0 ? (
                  <MainText
                    style={{
                      ...styles.explanationAnswerText,
                    }}>
                    Jawaban Benar!
                  </MainText>
                ) : (
                  <MainText
                    style={{
                      ...styles.explanationAnswerText,
                      color: Colors.danger.base,
                    }}>
                    Jawaban Salah!
                  </MainText>
                )}

                {showAnswer && (
                  <MainView>
                    <MainText>
                      Jawaban Murid : {/* Option Key */}
                      <MainText
                        color={
                          questionData?.point !== 0
                            ? Colors.success.base
                            : Colors.danger.base
                        }>
                        {questionType?.name === 'MCQ COMPLEX'
                          ? questionData?.options
                              ?.filter(
                                (opt: Option) => opt?.is_choosed === true,
                              )
                              .map((val: any) => val?.key)
                              .join(', ')
                          : questionData?.selected_option?.key || '-'}
                      </MainText>
                    </MainText>

                    <MainText>
                      Jawaban Guru : {/* Option Key */}
                      <MainText color={Colors.success.base}>
                        {questionType?.name === 'MCQ COMPLEX'
                          ? questionData?.options
                              ?.filter(
                                (opt: Option) => opt?.is_correct === true,
                              )
                              .map((val: any) => val?.key)
                              .join(', ')
                          : questionData?.options?.find(item => item.is_correct)
                              ?.key}
                      </MainText>
                    </MainText>
                  </MainView>
                )}
              </MainView>
            )}

          {showExplanation && (
            <RenderHtmlView
              source={{
                html: questionData?.discussion || '',
              }}
            />
          )}
        </ScrollView>
      </MainView>
    </View>
  );
};

export default BottomSheetQuestionExplanation;
