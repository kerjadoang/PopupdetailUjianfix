import React, {useLayoutEffect} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {Header} from '@components/atoms/Header';
import {Button, ExplanationPG} from '@components/atoms';
import Colors from '@constants/colors';
import {styles} from './styles';
import useExplanationScreen from './useExplanationScreen';

const ExplanationScreen = () => {
  const {
    navigation,
    title,
    filter,
    activeBtn,
    piece,
    renderNoAnswer,
    onPressFilterButton,
  } = useExplanationScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Pembahasan'} subLabel={title} />,
    });
  }, []);

  return (
    <>
      <View style={styles.body}>
        <View style={styles.btnContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filter}
            renderItem={({item, index}) => {
              return (
                <Button
                  key={index}
                  action={() => onPressFilterButton(index)}
                  label={item}
                  background={
                    index === activeBtn
                      ? Colors.primary.base
                      : Colors.dark.neutral10
                  }
                  style={styles.btn}
                  color={
                    index === activeBtn ? Colors.white : Colors.dark.neutral80
                  }
                />
              );
            }}
          />
        </View>
        {piece?.data?.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {piece?.data?.map((item: any, index: any) => {
              return (
                <ExplanationPG
                  key={index}
                  queue={item?.queue || item?.orders || index + 1}
                  question={item?.question}
                  questionImageId={
                    item?.question_image_id || item?.image_id_question
                  }
                  userAnswer={item?.answer_user || item?.userAnswer}
                  userAnswerImageId={item?.user_answer_image_id}
                  correctAnswer={item?.answer_system}
                  trial={item?.number_of_attempts}
                  explanation={item?.explanation || item?.discussion}
                  explanationImageId={item?.explanation_image_id}
                />
              );
            })}
          </ScrollView>
        ) : (
          renderNoAnswer()
        )}
      </View>
    </>
  );
};

export {ExplanationScreen};
