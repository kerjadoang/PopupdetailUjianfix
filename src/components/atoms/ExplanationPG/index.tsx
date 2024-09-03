/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {HTMLContentModel, HTMLElementModel} from 'react-native-render-html';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Fonts from '@constants/fonts';
import {parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import RenderImage from '../RenderImage';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

type Props = {
  key: number;
  question: string;
  questionImageId?: string;
  userAnswer: string;
  userAnswerImageId?: string;
  correctAnswer?: string;
  trial?: number;
  explanation: string;
  explanationImageId?: string;
  isCorrect?: boolean;
  queue?: number;
};

const ExplanationPG = ({
  question,
  questionImageId,
  userAnswer,
  correctAnswer,
  trial,
  explanation,
  explanationImageId,
  queue,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {queue ? <Text style={styles.noQueue}>{queue}.</Text> : null}
        <View>
          <RenderHtmlView
            source={{
              html: parseHtml(question),
            }}
            customHTMLElementModels={{
              p: HTMLElementModel.fromCustomModel({
                tagName: 'p',
                mixedUAStyles: {
                  marginLeft: 8,
                  marginRight: 18,
                  fontSize: 14,
                  fontWeight: '600',
                },
                contentModel: HTMLContentModel.block,
              }),
            }}
            contentWidth={Dimensions.get('screen').width - 80}
          />
          {!!questionImageId && (
            <RenderImage
              imageUrl=""
              imageId={questionImageId}
              width={WINDOW_WIDTH - 32}
              height={WINDOW_WIDTH * 0.4}
              placeholder={
                <View
                  style={{
                    width: WINDOW_WIDTH - 32,
                    height: WINDOW_WIDTH * 0.4,
                  }}
                />
              }
            />
          )}
        </View>
      </View>
      <View style={styles.answerRow}>
        <Text style={styles.regular}>Jawaban Kamu : </Text>
        <Text style={[styles.question, {flex: 1}]}>{userAnswer || '-'}</Text>
      </View>
      {correctAnswer ? (
        <View
          style={
            correctAnswer === userAnswer ? {display: 'none'} : styles.answerRow
          }>
          <Text style={styles.regular}>Jawaban yang Benar : </Text>
          <Text style={[styles.question, {flex: 1}]}>
            {correctAnswer || '-'}
          </Text>
        </View>
      ) : null}
      <View
        style={
          trial && userAnswer
            ? [styles.answerRow, {marginBottom: 12}]
            : {display: 'none'}
        }>
        <Text style={styles.regular}>Total Percobaan : </Text>
        <Text style={styles.question}>{trial}</Text>
      </View>
      {explanation ? (
        <View style={styles.explanationContainer}>
          <Text
            style={[
              styles.question,
              {fontSize: 12, color: Colors.dark.neutral100, marginBottom: 4},
            ]}>
            Pembahasan
          </Text>
          <RenderHtmlView
            baseStyle={{color: Colors.black}}
            source={{html: parseHtml(explanation)}}
            contentWidth={Dimensions.get('screen').width - 60}
          />
          {!!explanationImageId && (
            <RenderImage
              imageUrl=""
              imageId={explanationImageId}
              width={WINDOW_WIDTH * 0.4}
              height={WINDOW_WIDTH * 0.4}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    paddingVertical: 16,
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 2,
  },
  question: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  regular: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  answerRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 6,
  },
  explanationContainer: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    padding: 12,
  },
  explanationText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  noQueue: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
    lineHeight: 24,
    letterSpacing: 0.25,
  },
  textStyle: {
    fontWeight: '600',
    paddingLeft: 8,
    color: Colors.black,
  },
});

export {ExplanationPG};
