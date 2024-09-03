import {useDeleteSoal, useGetDetailSoal} from '@services/lms';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import {Button, Header, PopUp} from '@components/atoms';
import {capitalizeEachWord, parseHtml} from '@constants/functional';
import OptionItem from '../MultipleChoiceQuestionScreen/components/OptionItem';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ShockRobotIcon from '@assets/svg/maskot_3.svg';
import {ParamList} from 'type/screen';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const DetailSoalScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailSoalScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailSoalScreen'>>();
  const {
    order,
    chapter_id,
    subject_id,
    title,
    subtitle,
    class_id,
    package_id,
    school_id,
  } = route.params;
  const isFocus = useIsFocused();
  const [currentQuestion, setCurrentQuestion] = useState<number>(order);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const {data, refetch: refetchDetailSoal} = useGetDetailSoal(
    package_id,
    currentQuestion,
  );
  const {mutate: deleteSoal} = useDeleteSoal();
  const [questionData, setQuestionData] = useState<any>();
  const [isPG, setIsPG] = useState<boolean>(false);
  const [isPGKomplek, setIsPGKomplek] = useState<boolean>(false);
  const isPilgan = isPG || isPGKomplek;
  const [correctAnswer, setCorrecAnswer] = useState<any[]>();
  // const questionIsBySchool = !!chapter_id;
  const questionIsBySchool = !!questionData?.question?.school_id;
  const questionId =
    questionData?.question?.question_discuss?.question_id ||
    questionData?.question?.id ||
    '';

  useEffect(() => {
    // if (questionData) {
    //   return;
    // }
    setData();
  }, [data?.data]);

  const setData = () => {
    setQuestionData(data?.data);
    setIsPG(data?.data?.question?.question_type_id === 1);
    setIsPGKomplek(data?.data?.question?.question_type_id === 5);
    setCorrecAnswer(
      data?.data?.question?.options?.filter(option => option?.is_correct),
    );
    return () => {};
  };

  useEffect(() => {
    if (isFocus) {
      refetchDetailSoal();
    }
  }, [isFocus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Detail Paket Soal'} subLabel={subtitle} />,
    });
  }, []);

  const onDeleteSoal = () => {
    deleteSoal(package_id, questionId)
      .then(() => {
        setShowDeleteAlert(false);
        if (currentQuestion == 1) {
          // navigation.pop();
          refetchDetailSoal();
          return;
        }
        setCurrentQuestion(prevState => prevState - 1);
        // navigation.navigate('DetailPaketSoalListScreen', {
        //   subject_id,
        //   package_id,
        //   title,
        //   subtitle,
        //   class_id,
        //   chapter_id,
        //   mode: 'detail',
        // });
      })
      .catch(() => {
        setShowDeleteAlert(false);
      });
  };

  return (
    <View style={styles.container}>
      <StepperQuestion
        onPressQuestion={val => setCurrentQuestion(val)}
        currentQuestion={currentQuestion}
        totalQuestion={data?.data?.total_question}
      />

      <ScrollView
        contentContainerStyle={styles.svContentContainer}
        nestedScrollEnabled={true}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>{`${capitalizeEachWord(
            questionData?.question?.question_type?.question_type ?? '',
          )} \u2022 ID: ${questionId}`}</Text>
          <Text style={styles.labelMarks}>
            Bobot: {questionData?.question?.marks ?? 0}
          </Text>
        </View>

        {questionData?.question?.path_url && (
          <View style={{borderRadius: 10, width: '100%', overflow: 'hidden'}}>
            <RenderImage
              imageId={questionData?.question?.file_id}
              width={WINDOW_WIDTH - 32}
              height={150}
              style={{width: WINDOW_WIDTH - 32, height: 150}}
              placeholder={
                <View style={{width: WINDOW_WIDTH - 32, height: 150}} />
              }
              showPreviewImage={true}
            />
          </View>
        )}
        <View style={{gap: 8}}>
          <Text style={styles.pertanyaanLabel}>Pertanyaan</Text>
          {questionData?.question?.question && (
            <RenderHtmlView
              baseStyle={{color: Colors.black}}
              contentWidth={Dimensions.get('screen').width - 32}
              source={{html: parseHtml(questionData?.question?.question)}}
            />
          )}
        </View>

        {questionData?.question?.options && (
          <View style={styles.optionContainer}>
            {questionData?.question?.options
              ?.sort((a: any, b: any) =>
                a?.key! > b?.key! ? 1 : a?.key! < b?.key! ? -1 : 0,
              )
              ?.map((item: any) => {
                return (
                  <OptionItem
                    data={item}
                    imageUrl={item?.path_url || item?.file_id}
                    responseKey="answer"
                    key={item?.key}
                    isPGKomplek={isPGKomplek}
                  />
                );
              })}
          </View>
        )}

        {isPilgan ? (
          <View style={styles.jawabanContainer}>
            <View style={styles.jawabanBenarContainer}>
              <Text style={styles.jawabanBenarLabel}>Jawaban Benar:</Text>
              <RenderHtmlView
                baseStyle={{color: Colors.black}}
                contentWidth={Dimensions.get('screen').width - 32}
                source={{
                  html: parseHtml(
                    correctAnswer?.map(corr => corr.key).join(', ') || '',
                  ),
                }}
              />
            </View>
          </View>
        ) : null}
        <View style={styles.jawabanContainer}>
          <View style={{gap: 8}}>
            <Text style={styles.pembahasanLabel}>Pembahasan:</Text>
            <RenderHtmlView
              baseStyle={{color: Colors.black}}
              contentWidth={Dimensions.get('screen').width - 32}
              source={{
                html: parseHtml(
                  questionData?.question?.question_discuss?.explanation,
                ),
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        {school_id && (
          <Button
            label="Hapus"
            outline
            style={{flex: 1}}
            action={() => {
              if (!questionData?.question) {
                return;
              }
              setShowDeleteAlert(true);
            }}
            // isDisabled={loadingCreateSoalSendiri}
          />
        )}
        {questionIsBySchool && (
          <Button
            label="Ubah"
            style={{flex: 1}}
            action={() => {
              if (!questionData?.question) {
                return;
              }
              navigation.navigate('CreateSoalSendiriScreen', {
                subtitle,
                title,
                subject_id,
                chapter_id,
                class_id,
                package_id,
                question_id: data?.data?.question?.id,
                order: order,
                mode: 'Edit',
              });
            }}
            // isDisabled={loadingCreateSoalSendiri}
          />
        )}
      </View>
      <PopUp
        show={showDeleteAlert}
        close={() => setShowDeleteAlert(false)}
        title="Hapus Soal"
        desc={`Apakah Anda yakin untuk menghapus soal no. ${order} dari ${subtitle} ?`}
        Icon={ShockRobotIcon}
        titleCancel="Hapus"
        titleConfirm="Batal"
        actionCancel={onDeleteSoal}
        actionConfirm={() => setShowDeleteAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  svContentContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
    gap: 16,
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
    color: Colors.dark.neutral50,
  },
  labelMarks: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral50,
  },
  textQuestion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
  optionContainer: {gap: 10},
  pertanyaanLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 14,
  },
  jawabanBenarLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  jawabanBenarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  jawabanBenarContainer: {gap: 8},
  pembahasanLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  pembahasanText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  jawabanContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.success.light2,
    borderRadius: 10,
  },
  btnContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default DetailSoalScreen;
