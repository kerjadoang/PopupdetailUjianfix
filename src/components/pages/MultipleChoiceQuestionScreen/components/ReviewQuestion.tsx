import {Button, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import Bookmarked from '@assets/svg/ic_marks_active.svg';
import OptionItem from './OptionItem';
import {IReviewQuestionResponse} from '@services/soal/type';
import RenderHTML from 'react-native-render-html';
import {parseHtml} from '@constants/functional';

type ReviewQuestionProp = {
  data?: IReviewQuestionResponse;
} & SwipeUpProps;

const ReviewQuestion: React.FC<ReviewQuestionProp> = props => {
  return (
    <SwipeUp {...props}>
      <>
        <Text style={styles.title}>Tinjauan Jawaban</Text>
        <ScrollView
          style={{maxHeight: 500}}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
          }}>
          <View style={{gap: 16}}>
            {props.data?.data?.map?.((item, index) => {
              const bookmarked = item.tagged;
              return (
                <View
                  key={item.id ?? `${index}`}
                  style={[
                    styles.cardContainer,
                    styles.shadow,
                    bookmarked && styles.bookmarkedCard,
                  ]}>
                  <View style={styles.labelQuestionContainer}>
                    <Text style={styles.labelQuestion}>PERTANYAAN</Text>
                    {bookmarked && (
                      <View style={styles.textBookmarkContainer}>
                        <Bookmarked />
                        <Text style={styles.labelMarks}>Ditandai</Text>
                      </View>
                    )}
                  </View>
                  {/* <Text style={styles.textQuestion}>{item.question}</Text> */}
                  <RenderHTML
                    baseStyle={{color: Colors.black}}
                    contentWidth={Dimensions.get('screen').width - 32}
                    source={{
                      html: parseHtml(item.question as string),
                    }}
                  />
                  <Text style={[styles.labelQuestion, styles.marginVertical8]}>
                    Jawaban Saya:
                  </Text>
                  <OptionItem data={item.selected_option} disabled />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8}}>
          <Button label="Tutup" action={props.onClose} />
        </View>
      </>
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  labelQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  labelQuestion: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  labelMarks: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.primary.base,
  },
  textQuestion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 8,
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 16,
  },
  textBookmarkContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  marginVertical8: {
    marginVertical: 8,
  },
  bookmarkedCard: {
    backgroundColor: Colors.secondary.light2,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default React.memo(ReviewQuestion);
