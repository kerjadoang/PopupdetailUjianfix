import {Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {styles} from './styles';
import useCheckPRPRojectTeacher from './useCheckPRPRojectTeacher';
import {Header, InputText, MainText, MainView, PopUp} from '@components/atoms';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import OptionItem from './components/OptionItem';
import NextPrevButton from './components/NextPrevButton';
import Colors from '@constants/colors';
import ShockRobotIcon from '@assets/svg/maskot_3.svg';
import {SwipeUp} from './components/SwipeUp';
import {isImageFile} from '@constants/functional';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import FileCard from '@features/IKM/shared/pages/LembarKerjaScreen/components/FileCard';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmpty} from 'lodash';

const CheckPRPRojectTeacherScreen = () => {
  const {
    navigation,
    filledArr,
    totalQuestion,
    currentQuestion,
    _handlerStepper,
    student,
    task,
    taskData,
    teachertaskMedia,
    studentTaskMedia,
    questionType,
    questionsDataByNumber,
    handleNextPrevButton,
    value,
    valid,
    validValue,
    errorMessage,
    handleValue,
    showGobackAlert,
    showPopupFinish,
    setShowGoBackAlert,
    setShowPopupFinish,
    showPopupNotFinish,
    setShowPopupNotFinish,
    _handlerFinishButton,
    finishData,
    submitCheckedQuestion,
    setShowPopUp,
    isUnggahFile,
    change,
  } = useCheckPRPRojectTeacher();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={student?.full_name ?? '-'}
          subLabel={task?.task_teacher?.title ?? '-'}
          onPressIconLeft={() => setShowGoBackAlert(true)}
          iconRight={<Text style={styles.finishButton}>{'Selesai'}</Text>}
          onPressIconRight={_handlerFinishButton}
        />
      ),
    });
  }, [
    navigation,
    currentQuestion,
    value,
    questionsDataByNumber?.id,
    validValue,
    change,
    isUnggahFile,
  ]);

  return (
    <View style={styles.container}>
      {isEmpty(taskData) ? (
        <StepperQuestion
          question={{
            filled: filledArr,
          }}
          totalQuestion={totalQuestion}
          currentQuestion={currentQuestion}
          onPressQuestion={(data: any) => {
            _handlerStepper(data);
          }}
        />
      ) : null}

      <KeyboardAwareScrollView style={{flexGrow: 1}}>
        <View style={styles.questionContainer}>
          <View style={styles.topQuestion}>
            <Text style={styles.topQuestionText}>PERTANYAAN</Text>
            {questionType === 'Buat Soal' ? (
              <Text style={styles.topQuestionText}>
                Bobot: {questionsDataByNumber?.question?.value ?? 0}
              </Text>
            ) : null}
          </View>

          {teachertaskMedia ? (
            <MainView paddingBottom={16}>
              <FileCard file={teachertaskMedia} />
            </MainView>
          ) : (
            <>
              {questionsDataByNumber?.question_path_url ? (
                // questionsDataByNumber?.question_path_url?.endsWith('svg') ? (
                //   <SvgUri
                //     uri={questionsDataByNumber?.question_path_url}
                //     height={150}
                //     style={styles.questionImage}
                //   />
                // ) :
                !isImageFile(questionsDataByNumber?.question_path_url) ? (
                  <View style={styles.attachmentFileContainer}>
                    <View style={styles.headAttachmentFileContainer}>
                      <Text style={styles.attachmentFileHeadTitle}>
                        {'File'}
                      </Text>
                    </View>

                    <View style={styles.attachmentDescriptionWrapper}>
                      <IconFileBlue width={24} height={24} />
                      <Text style={styles.attachmentFileDescriptionTitle}>
                        {questionsDataByNumber?.question_file_name}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <RenderImage
                    style={styles.questionImage}
                    // source={{
                    //   uri: questionsDataByNumber?.question_path_url,
                    // }}
                    height={150}
                    width={WINDOW_WIDTH * 0.9}
                    placeholder={
                      <View
                        style={{
                          width: WINDOW_WIDTH * 0.9,
                          height: 150,
                          borderRadius: 10,
                        }}
                      />
                    }
                    imageUrl={questionsDataByNumber?.question_path_url}
                  />
                )
              ) : null}
              <Text style={styles.textQuestion}>
                {questionsDataByNumber?.question?.question}
              </Text>
            </>
          )}
        </View>

        {studentTaskMedia ? (
          <View>
            <MainView paddingLeft={16}>
              <Text style={[styles.topQuestionText, {paddingBottom: 8}]}>
                JAWABAN
              </Text>
              <FileCard file={studentTaskMedia} />
            </MainView>
          </View>
        ) : (
          <>
            <View style={styles.mcqQontainer}>
              {questionsDataByNumber?.question?.type === 'pilihan ganda' ? (
                questionsDataByNumber?.question?.choice?.map(
                  (obj: any, index: number) => {
                    return (
                      <OptionItem
                        key={index}
                        MCQkey={obj?.key}
                        correct={
                          !isEmpty(questionsDataByNumber?.answer?.answer)
                            ? obj?.key?.toUpperCase() && obj?.correct
                            : false
                        }
                        answer={questionsDataByNumber?.answer?.answer?.toUpperCase()}
                        rightAnswer={questionsDataByNumber?.question?.answer?.toUpperCase()}
                        description={obj?.description}
                        obj={obj}
                      />
                    );
                  },
                )
              ) : (
                <View>
                  <Text style={styles.topQuestionText}>JAWABAN</Text>
                  {questionsDataByNumber?.answer_path_url ? (
                    // questionsDataByNumber?.answer_path_url?.endsWith(
                    //   'svg',
                    // ) ? (
                    //   <SvgUri
                    //     uri={questionsDataByNumber?.answer_path_url}
                    //     height={150}
                    //     style={styles.questionImage}
                    //   />
                    // ) :
                    !isImageFile(questionsDataByNumber?.answer_path_url) ? (
                      <View style={styles.attachmentFileContainer}>
                        <View style={styles.headAttachmentFileContainer}>
                          <Text style={styles.attachmentFileHeadTitle}>
                            {'File'}
                          </Text>
                        </View>

                        <View style={styles.attachmentDescriptionWrapper}>
                          <IconFileBlue width={24} height={24} />
                          <Text style={styles.attachmentFileDescriptionTitle}>
                            {questionsDataByNumber?.answer_file_name}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <RenderImage
                        style={styles.questionImage}
                        imageUrl={questionsDataByNumber?.answer_path_url}
                        // source={{
                        //   uri: questionsDataByNumber?.answer_path_url,
                        // }}
                      />
                    )
                  ) : null}
                  <Text style={styles.textAnswerUraian}>
                    {questionsDataByNumber?.answer?.answer !== ''
                      ? questionsDataByNumber?.answer?.answer
                      : ''}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        {questionsDataByNumber?.question?.type === 'uraian' ? (
          <MainView paddingHorizontal={16}>
            <Text style={styles.giveNilaiLabel}>Beri Nilai</Text>
            <InputText
              error={!valid && !validValue}
              errorMessage={errorMessage}
              placeholder="Masukkan Nilai"
              placeholderTextColor={Colors.dark.neutral50}
              value={value || ''}
              onChangeText={handleValue}
              maxLength={3}
              backgroundColor={Colors.dark.neutral10}
              keyboardType="number-pad"
              secure={false}
            />
          </MainView>
        ) : null}
      </KeyboardAwareScrollView>

      {isEmpty(taskData) ? (
        <View style={styles.nextPrevContainer}>
          <NextPrevButton
            handleNextPrevButton={handleNextPrevButton}
            currentQuestion={currentQuestion}
            questionLength={totalQuestion}
          />
        </View>
      ) : null}
      <PopUp
        show={showGobackAlert}
        title="Belum Selesai!"
        desc={
          'Apakah Anda yakin untuk keluar? PR/Projek/Tugas yang sedang diperiksa belum disimpan.'
        }
        Icon={ShockRobotIcon}
        titleCancel="Keluar"
        titleConfirm="Lanjutkan"
        actionCancel={() => {
          setShowGoBackAlert(false);
          navigation.goBack();
        }}
        actionConfirm={() => setShowGoBackAlert(false)}
      />
      <PopUp
        show={showPopupNotFinish}
        close={() => {
          setShowPopupNotFinish(false);
          setShowPopUp(false);
        }}
        title="Belum Selesai!"
        desc={'Harap periksa kembali jawaban yang belum diberi nilai.'}
        additionalContent={
          !isUnggahFile ? (
            <MainText type="SemiBold" fontWeight="600" marginBottom={16}>
              Soal nomor: {finishData?.number_not_yet?.toString() ?? ''}
            </MainText>
          ) : null
        }
        Icon={ShockRobotIcon}
        titleConfirm="OK"
        actionConfirm={() => {
          setShowPopupNotFinish(false);
          setShowPopUp(false);
        }}
      />
      <SwipeUp
        show={showPopupFinish}
        title="Selesai Diperiksa ?"
        desc={
          'Apakah Anda yakin sudah selesai memeriksa? Penilaian akan langsung dibagikan ke Murid.'
        }
        additionalContent={
          <View style={styles.popUpFinishContainer}>
            <Text style={styles.textFinish}>{student?.full_name ?? '-'}</Text>
            <Text style={styles.textFinish}>
              Nilai: {isUnggahFile ? value : finishData?.value ?? 0}
            </Text>
          </View>
        }
        buttonPosition={'vertical'}
        titleCancel="Periksa Ulang"
        titleConfirm="Selesai Diperiksa"
        actionCancel={() => {
          setShowPopupFinish(false);
          setShowPopUp(false);
        }}
        actionConfirm={() => {
          submitCheckedQuestion();
        }}
      />
    </View>
  );
};

export {CheckPRPRojectTeacherScreen};
