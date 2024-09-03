/* eslint-disable react-hooks/exhaustive-deps */
//* eslint-disable react-hooks/exhaustive-deps */
import {
  useDetailPRProjectDetail,
  useGetDetailProgressPRProjectTugas,
} from '@services/lms';
import {
  IAnswerSingleQuestionPRProjectTugasPayload,
  ICekPRProjectTugasResponse,
} from '@services/lms/type';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {SoalScreenProps} from '.';
import provider from '@services/lms/provider';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Colors from '@constants/colors';
import NextPrevButton from '../MultipleChoiceQuestionScreen/components/NextPrevButton';
import {InputText, PopUp} from '@components/atoms';
import {isImageFile, parseHtml} from '@constants/functional';
import OptionItem from '../MultipleChoiceQuestionScreen/components/OptionItem';
import RobotHappy from '@assets/svg/maskot_2.svg';
import RobotClose from '@assets/svg/Robot_close.svg';
import ModalDone from './components/ModalDone';
import UploadFile from './components/ButtonUpload';
import {useGetFile, useUploadFile} from '@services/media';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {IAnswerSubmitTaskPRProjectTugasPayload} from '@services/lms/type';
import useDebounce from '@hooks/useDebounce';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import IcUploadFile from '@assets/svg/ic_upload_blue.svg';

const SoalPRProjekTugas: React.FC<SoalScreenProps> = props => {
  const {route, navigation} = props;
  const {
    start_data,
    task_id,
    chapter,
    subject,
    media_id,
    question_type,
    prProjekTugasType,
  } = route.params;
  const {data, refetch: getDetailPRProject} = useDetailPRProjectDetail();
  const {data: teacherMedia, refetch} = useGetFile(
    media_id ? [media_id] : null,
  );
  const {data: progressDetail, refetch: getProgressDetail} =
    useGetDetailProgressPRProjectTugas();
  const questionData = data?.data;
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [progressUpload, setProgressUpload] = useState<string>('0%');
  const [showDone, setShowDone] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<{
    path_url?: string;
    type?: string;
    name?: string;
  }>({path_url: '', type: ''});
  const [resultQuestion, setResultQuestion] = useState<{
    correct: number[];
    incorrect: number[];
    filled: number[];
    skipped: number[];
  }>({
    correct: [],
    incorrect: [],
    filled: [],
    skipped: [],
  });
  const [essayAnswer, setEssayAnswer] = useState<string>('');

  const isUnggahFile = question_type === 'Unggah File';
  const answeredKey = data?.data?.choice?.filter(
    choice => choice.key === data.data?.student_answer,
  )?.[0]?.key;
  const answerEssay = useDebounce(essayAnswer, 1000);

  const {mutate: uploadFile, data: dataUploadFile, loading} = useUploadFile();
  const startData = start_data as ICekPRProjectTugasResponse;

  const content = useMemo(() => {
    return {
      titleConfirm: props.showPopUp.type === 'done' ? 'Kumpulkan' : 'Lanjut',
      Icon: props.showPopUp.type === 'done' ? RobotHappy : RobotClose,
      titleCancel: props.showPopUp.type === 'done' ? 'Periksa Ulang' : 'Keluar',
      title:
        props.showPopUp.type === 'done'
          ? `${prProjekTugasType ?? 'PR'} Siap Dikumpulkan!`
          : 'Belum Selesai',
      desc:
        props.showPopUp.type === 'done'
          ? `Keren Kamu sudah mengerjakan ${
              isUnggahFile && uploadFileData
                ? 1
                : progressDetail?.data?.number_finish?.length ?? 0
            } dari ${isUnggahFile ? 1 : startData?.data?.total_question} soal ${
              route.params.title
            }`
          : 'Apakah kamu yakin untuk keluar? Progresmu tidak akan tersimpan.',
    };
  }, [questionData, props.showPopUp]);

  /*useEffect(() => {
    if (data) {
      let answer: IStorePRProjectTugasBody['answer'] = [];
      let answerStudent = [...studentAnswer];
      let filled: number[] = [];
      data.data?.task_teacher_question?.question?.map((question, index) => {
        if (question.student_answer) {
          let indexFind =
            question.choice?.findIndex(
              item => item.description === question.student_answer,
            ) ?? -1;
          if (indexFind >= 0) {
            answerStudent[index] = {
              [`${indexFind}`]: question.choice?.[indexFind] ?? {},
            };
          }
        }
        answer.push({
          uuid: question.uuid,
          image_id: question.image_id,
          type: question.type,
          correct_student: question.student_answer ? true : false,
          answer: question.student_answer ?? '',
        });

        if (question.student_answer) {
          filled.push(index);
        }
      });
      refetch();
      setStudentAnswer(answerStudent);
      setAnswerData(answer);
      setResultQuestion(prevState => ({
        ...prevState,
        filled,
      }));
    }
    setInitialized(true);
  }, [data]);*/

  useEffect(() => {
    if (answerEssay.length > 0) {
      onStudentAnswerEssay();
    }
  }, [answerEssay]);

  const getDetailQuestion = async (number: any) => {
    try {
      if (startData.data?._id) {
        const res = await getDetailPRProject(
          startData?.data?._id ?? null,
          number,
        );
        setEssayAnswer(res.data?.student_answer ?? '');
      }
      refetch();
      getProgress();
    } catch (e) {}
  };

  const getProgress = async () => {
    try {
      const res = await getProgressDetail(startData?.data?._id);
      const filled: number[] = [];
      res.data?.number_finish?.forEach(val => {
        filled.push(val - 1);
      });
      setResultQuestion(prevState => ({
        ...prevState,
        filled,
      }));
    } catch (e) {}
  };

  useEffect(() => {
    getDetailQuestion(currentQuestion);
  }, []);

  const onCloseAlertPopUp = () => {
    props.setShowPopUp(prevState => ({...prevState, status: false}));
    if (props.showPopUp.type === 'back') {
      navigation.pop();
    }
  };

  const onStudentAnswer = async (ans?: IBaseOption) => {
    try {
      const bodyPayload: IAnswerSingleQuestionPRProjectTugasPayload = {
        uuid: data?.data?.uuid ?? '',
        media_id: dataUploadFile?.data?.ID ?? '',
        answer: ans?.key?.toLowerCase() ?? '',
      };
      await provider.answerSingleQuestionPRProjectTugas(task_id, bodyPayload);
      getDetailQuestion(currentQuestion);
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.response?.data?.message ?? 'Terjadi Kesalahan',
      });
    }
  };

  /*const onStudentAnswer = (ans: IBaseOption, indexAnswer: number) => {
    let dataStudentAnswer = [...studentAnswer];
    let dataAnswer = [...answerData];
    dataAnswer[currentQuestion - 1].answer = ans.description;
    dataAnswer[currentQuestion - 1].correct_student = true;
    dataStudentAnswer[currentQuestion - 1] = {
      [`${indexAnswer}`]: ans,
    };
    setResultQuestion(prevState => ({
      ...prevState,
      filled: [...prevState.filled, currentQuestion - 1],
    }));
    setStudentAnswer(dataStudentAnswer);
    setAnswerData(dataAnswer);
  };*/

  const onSubmitTask = async () => {
    if (props.showPopUp.type === 'back') {
      props.setShowPopUp(prevState => ({...prevState, status: false}));
    } else {
      try {
        const bodyPayload: IAnswerSubmitTaskPRProjectTugasPayload = {
          task_id,
          media_id: dataUploadFile?.data?.ID ?? '',
        };
        await provider.answerSubmitTaskPRProjectTugas(bodyPayload);
        setShowDone(true);
      } catch (e: any) {
        Toast.show({
          type: 'error',
          text1: e?.response?.data?.message ?? 'Terjadi Kesalahan',
        });
      } finally {
        onCloseAlertPopUp();
        // if (props.showPopUp.type === 'back') {
        //   navigation.pop();
        // }
      }
    }
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    getDetailQuestion(
      direction === 'next' ? currentQuestion + 1 : currentQuestion - 1,
    );
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  const onStudentAnswerEssay = async () => {
    try {
      const bodyPayload: IAnswerSingleQuestionPRProjectTugasPayload = {
        uuid: data?.data?.uuid ?? '',
        media_id: dataUploadFile?.data?.ID ?? '',
        answer: answerEssay,
      };
      await provider.answerSingleQuestionPRProjectTugas(task_id, bodyPayload);
      getDetailQuestion(currentQuestion);
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.response?.data?.message ?? 'Terjadi Kesalahan',
      });
    }
  };

  const upload = (asset: DocumentPickerResponse) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.name,
      type: asset?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.uri
          : asset?.uri?.replace('file://', ''),
    });
    formData.append('type', 'kp_regular');
    formData.append('sub_type', 'learn');

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setProgressUpload(`${i + 4}%`);
        i++;
      }
    }, 2000);

    uploadFile(formData)
      .then(() => {
        // onStudentAnswer();
      })
      .catch(() => {
        setUploadFileData({
          path_url: '',
          type: '',
        });
      })
      .finally(() => {
        setProgressUpload('0%');
        clearInterval(intervalId);
      });
  };

  const onUploadFile = async () => {
    try {
      const fileResult = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });
      setUploadFileData({
        path_url: fileResult.uri,
        type: fileResult.type ?? '',
      });
      if (fileResult.size && fileResult.size > 104857600) {
        Toast.show({
          type: 'error',
          text1: 'File tidak bisa melebihi 100MB',
        });
        setUploadFileData({
          path_url: '',
          type: '',
        });
        return;
      }
      upload(fileResult);
    } catch (e) {}
  };

  const onRemoveFile = () => {
    setUploadFileData({path_url: '', type: ''});
  };

  const onDone = () => {
    setShowDone(false);
    navigation.pop();
  };

  const checkIfLinkSupported = async () => {
    try {
      await Linking.canOpenURL(teacherMedia?.[0]?.path_url ?? '');
      await Linking.openURL(teacherMedia?.[0]?.path_url!);
    } catch (e) {
      Alert.alert('Pemberitahuan', 'Link tidak support');
    }
  };

  const renderSoalUnggahFile = () => {
    return (
      <Text>
        Klik link dibawah ini untuk mengakses soal:{'\n'}
        <Text
          onPress={checkIfLinkSupported}
          style={{color: Colors.primary.base}}>
          {teacherMedia?.[0]?.path_url}
        </Text>
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {!isUnggahFile ? (
        <StepperQuestion
          onPressQuestion={val => {
            getDetailQuestion(val);
            setCurrentQuestion(val);
          }}
          currentQuestion={currentQuestion}
          totalQuestion={isUnggahFile ? 1 : startData?.data?.total_question}
          question={resultQuestion}
        />
      ) : null}

      <ScrollView contentContainerStyle={styles.svContentContainer}>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          {!isUnggahFile ? (
            <Text style={styles.labelMarks}>
              Bobot: {questionData?.value ?? 0}
            </Text>
          ) : null}
        </View>
        {isUnggahFile ? (
          <Text style={styles.textQuestion}>{renderSoalUnggahFile()}</Text>
        ) : (
          <RenderHtmlView
            baseStyle={{color: Colors.black}}
            contentWidth={Dimensions.get('screen').width - 32}
            source={{
              html: parseHtml(questionData?.question as string),
            }}
          />
        )}

        {questionData?.path_url && (
          <View style={{borderRadius: 10, width: '100%', overflow: 'hidden'}}>
            {/* <Image
              source={hostEndsWith(questionData?.path_url ?? '')}
              style={{width: '100%', height: 150}}
            /> */}
            <RenderImage
              imageUrl={questionData?.path_url}
              width={WINDOW_WIDTH * 0.7}
              style={{minHeight: WINDOW_HEIGHT * 0.25}}
              placeholder={
                <View
                  style={{
                    width: WINDOW_WIDTH * 0.7,
                    minHeight: WINDOW_HEIGHT * 0.25,
                  }}
                />
              }
              showPreviewImage={true}
            />
          </View>
        )}

        {questionData?.type === 'pilihan ganda' ? (
          <View style={styles.optionContainer}>
            {questionData?.choice
              ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
              ?.map((item: IBaseOption) => {
                return (
                  <OptionItem
                    imageId={item.file_id}
                    status={item.key === answeredKey ? 'filled' : null}
                    data={item}
                    responseKey="description"
                    key={item.key}
                    onPress={() => onStudentAnswer(item)}
                  />
                );
              })}
          </View>
        ) : questionData?.type === 'uraian' ? (
          <InputText
            multiline
            bottom={16}
            isNotOutline
            borderRadius={10}
            value={essayAnswer}
            inputTextStyle={{height: 120}}
            placeholder={'Tulis jawabanmu di sini...'}
            onChangeText={text => setEssayAnswer(text)}
          />
        ) : isUnggahFile ? (
          <UploadFile
            buttonProps={{label: 'Unggah Jawaban', iconLeft: <IcUploadFile />}}
            onUpload={onUploadFile}
            onRemoveFile={onRemoveFile}
            isImageFormat={isImageFile(uploadFileData.path_url)}
            fileName={dataUploadFile?.data?.file_name}
            progressUpload={progressUpload}
            isUploading={loading}
            path_url={uploadFileData.path_url}
          />
        ) : null}
      </ScrollView>
      {!isUnggahFile ? (
        <NextPrevButton
          handleNextPrevButton={handleNextPrevButton}
          currentQuestion={currentQuestion}
          disableNext={
            !(currentQuestion < (startData?.data?.total_question ?? 0))
          }
        />
      ) : null}
      <PopUp
        show={props.showPopUp.status}
        // close={onCloseAlertPopUp}
        {...content}
        actionCancel={onCloseAlertPopUp}
        actionConfirm={onSubmitTask}
      />
      <ModalDone
        visible={showDone}
        subject={subject?.name}
        chapter={chapter?.name}
        title={`${prProjekTugasType ?? 'PR'} Berhasil Dikumpulkan!`}
        onDone={onDone}
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
  optionContainer: {gap: 10, marginTop: 16},
});

export default SoalPRProjekTugas;
