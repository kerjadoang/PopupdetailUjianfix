import React, {useLayoutEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import useLembarKerja from './useLembarKerja';
import {Button, Header, MainText, PopUp} from '@components/atoms';
import InputScoreLkpd from './components/InputScoreLkpd';
import StudentAnswerLkpd from './components/StudentAnswerLkpd';
import FileCard from './components/FileCard';
import ModalDone from '@components/pages/MultipleQuestionTypeScreen/components/ModalDone';

const LembarKerjaScreen = () => {
  const {
    taskData,
    navigation,
    title,
    control,
    teachertaskMedia,
    studentTaskMedia,
    fileData,
    setFileData,
    formErrors,
    isMurid,
    handleSubmit,
    submitTaskTeacher,
    isShowPopupFinish,
    showPopupFinish,
    isShowModalDone,
    finishPopupContent,
    onModalDonePress,
  } = useLembarKerja();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={title}
          iconRight={
            <Button
              action={
                isMurid ? showPopupFinish : handleSubmit(submitTaskTeacher)
              }
              label="Selesai"
              style={styles.selesaiButton}
            />
          }
          onPressIconRight={() => {}}
        />
      ),
    });
  }, [fileData]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <ScrollView style={{flexGrow: 1}}>
          {/* MARK: START Question */}
          {isMurid && <MainText style={styles.titleText}>Pertanyaan</MainText>}
          <FileCard file={teachertaskMedia} />
          {/* MARK: END Question */}

          {/* MARK: START Answer */}
          <View style={styles.answerContainer}>
            <MainText style={styles.titleText}>Jawaban</MainText>
            {isMurid && (
              <StudentAnswerLkpd
                fileData={fileData}
                setFileData={setFileData}
              />
            )}
            {!isMurid && (
              <InputScoreLkpd
                control={control}
                studentTaskMedia={studentTaskMedia}
                formErrors={formErrors}
              />
            )}
          </View>
          {/* MARK: END Answer */}
        </ScrollView>
      </View>
      <PopUp show={isShowPopupFinish} {...finishPopupContent} />
      <ModalDone
        visible={isShowModalDone}
        title="LKPD Berhasil Dikumpulkan"
        subject={taskData.task_teacher?.subject?.name}
        chapter={taskData.task_teacher?.chapter?.name}
        onDone={onModalDonePress}
      />
    </View>
  );
};

export {LembarKerjaScreen};
