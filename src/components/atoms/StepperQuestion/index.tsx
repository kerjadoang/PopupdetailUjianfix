import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconPlus from '@assets/svg/plus-sm.svg';
import IconPlusWhite from '@assets/svg/ic_plus_white.svg';
import IconError from '@assets/svg/ic24_exclamation_red.svg';

export type StepperQuestionProps = {
  totalQuestion?: any;
  currentQuestion?: any;
  onPressQuestion: (index: number) => void;
  onPressLeftPlus?: () => void;
  onPressPlus?: () => void;
  question?: {
    correct?: number[] | [];
    incorrect?: number[] | [];
    filled?: number[] | [];
    skipped?: number[] | [];
    bookmarked?: number[] | [];
  };
  disabled?: boolean;
  errors?: any;
};

const StepperQuestion = ({
  totalQuestion = 2,
  currentQuestion = 1,
  onPressQuestion,
  question,
  disabled,
  onPressPlus,
  onPressLeftPlus,
  errors,
}: StepperQuestionProps) => {
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        horizontal>
        {onPressLeftPlus ? (
          <TouchableOpacity
            style={styles.buttonLeftPlus}
            onPress={() => onPressLeftPlus()}>
            <IconPlusWhite width={14} height={14} />
          </TouchableOpacity>
        ) : null}
        {Array(totalQuestion)
          .fill(0)
          .map((_, index: any) => {
            const isSelected = currentQuestion === index + 1;

            return (
              <View key={`${index}`} style={styles.content}>
                <TouchableOpacity
                  onPress={() => onPressQuestion(index + 1)}
                  disabled={disabled}
                  style={[
                    styles.buttonPassive,
                    question?.correct?.length > 0 &&
                      styles[question?.correct.includes(index) && 'correct'],
                    question?.incorrect?.length > 0 &&
                      styles[
                        question?.incorrect.includes(index) && 'incorrect'
                      ],
                    question?.filled?.length > 0 &&
                      styles[question?.filled.includes(index) && 'filled'],
                    question?.bookmarked?.length > 0 &&
                      styles[
                        question?.bookmarked.includes(index) && 'bookmarked'
                      ],
                    isSelected && styles.buttonActive,
                  ]}>
                  <Text
                    style={[
                      styles.labelPasive,
                      question?.correct?.length > 0 &&
                        styles[
                          question?.correct.includes(index) && 'textCorrect'
                        ],
                      question?.incorrect?.length > 0 &&
                        styles[
                          question?.incorrect.includes(index) && 'textIncorrect'
                        ],
                      question?.filled?.length > 0 &&
                        styles[
                          question?.filled.includes(index) && 'textFilled'
                        ],
                      question?.bookmarked?.length > 0 &&
                        styles[
                          question?.bookmarked.includes(index) &&
                            'textBookmarked'
                        ],
                      isSelected && styles.labelActive,
                    ]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
                {errors && isSelected ? (
                  <IconError width={16} height={16} style={styles.error} />
                ) : null}
                {index != totalQuestion - 1 ? (
                  <View style={{width: 8}} />
                ) : null}
              </View>
            );
          })}
        {onPressPlus ? (
          <TouchableOpacity
            style={styles.buttonPlus}
            onPress={() => onPressPlus()}>
            <IconPlus width={24} height={24} />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

export {StepperQuestion};
