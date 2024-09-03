/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './style';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import RobotSuccess from '@assets/svg/robot_success.svg';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import IconClose from '@assets/svg/x.svg';
import Colors from '@constants/colors';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import {FormRadioButton, FormSelect, SwipeUpContent} from './components';
import ProgressBar from '@components/atoms/ProgressBar';
import {
  makePrefixUppercaseRestLowercase,
  _handlerConvertDatePicker,
} from '@constants/functional';
import {
  QUESTION_TYPES,
  TASK_TYPES,
  useLMSTeacherTaskCreateScreen,
} from './utils';

const LMSTeacherTaskCreateScreen: FC = () => {
  const {
    navigation,
    isSubmit,
    isShowPopUp,
    setIsShowPopUp,
    isShowPopUpSave,
    setIsShowPopUpSave,
    selectedTask,
    setSelectedTask,
    selectedQuestion,
    setSelectedQuestion,
    curriculums,
    selectedCurriculum,
    setSelectedCurriculum,
    isShowCurriculum,
    setIsShowCurriculum,
    classes,
    selectedClass,
    setSelectedClass,
    isShowClass,
    setIsShowClass,
    subjects,
    selectedSubject,
    setSelectedSubject,
    isShowSubject,
    setIsShowSubject,
    chapters,
    selectedChapter,
    setSelectedChapter,
    isShowChapter,
    setIsShowChapter,
    title,
    setTitle,
    isShowDatePickerFrom,
    setIsShowDatePickerFrom,
    valueDatePickerFrom,
    setValueDatePickerFrom,
    datePickerFrom,
    datePickerFromError,
    __handlerOnPressSwipeUpSelectDateFromButton,
    isShowDatePickerTo,
    setIsShowDatePickerTo,
    valueDatePickerTo,
    setValueDatePickerTo,
    datePickerTo,
    datePickerToError,
    __handlerOnPressSwipeUpSelectDateToButton,
    instruction,
    setInstruction,
    isShowUpload,
    setIsShowUpload,
    __renderContentSwipeupUpload,
    attachmentTemporary,
    progressUpload,
    __resetAttachment,
    __onUploadImage,
    __handleSave,
    __postTeacherTask,
    questions,
    taskParams,
  } = useLMSTeacherTaskCreateScreen();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.MT_8} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <FormRadioButton
            label="Tipe Tugas"
            options={TASK_TYPES}
            isSubmit={isSubmit && !selectedTask ? true : false}
            selectedItem={selectedTask}
            setSelectedItem={setSelectedTask}
          />

          <FormRadioButton
            label="Tipe Soal"
            options={QUESTION_TYPES}
            isSubmit={isSubmit && !selectedQuestion ? true : false}
            selectedItem={selectedQuestion}
            setSelectedItem={setSelectedQuestion}
          />

          {selectedQuestion ? (
            selectedQuestion !== 'Unggah File' ? (
              <>
                {questions && questions?.total_question !== 0 ? (
                  <View style={styles.buatSoalContainer}>
                    <View style={styles.questionRow}>
                      <Text style={styles.countQuestionText}>
                        {questions?.total_question} Soal
                      </Text>
                      <Text style={styles.countQuestionlabel}>
                        {questions?.total_pilihan_ganda} Pilihan Ganda{' '}
                        {questions?.total_uraian} Uraian
                      </Text>
                    </View>
                    <Button
                      label="Ubah Soal"
                      action={() => {
                        navigation.navigate('CreateQuestionTaskScreen', {
                          totalQuestion: questions,
                          fromParent: true,
                          taskParams,
                        });
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.buatSoalContainer}>
                    <View style={styles.questionRow}>
                      <Text style={styles.noQuestionText}>
                        Belum ada soal yang dibuat.
                      </Text>
                    </View>
                    <Button
                      label="+ Buat Soal"
                      action={() => {
                        navigation.navigate('CreateQuestionTaskScreen', {
                          totalQuestion: 1,
                          fromParent: true,
                          taskParams,
                        });
                      }}
                    />
                    {isSubmit && !questions?.total_question ? (
                      <Text style={styles.textError}>
                        Minimal 1 soal wajib dibuat.
                      </Text>
                    ) : null}
                  </View>
                )}
              </>
            ) : (
              <View style={styles.MB_24}>
                <View style={styles.row}>
                  <Text style={styles.titleInputForm}>File</Text>
                </View>

                {!attachmentTemporary?.uri ? (
                  <View style={[styles.row, styles.MT_8]}>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => setIsShowUpload(true)}>
                      <IconUploadBlue width={24} height={24} />
                      <Text style={styles.uploadTitle}>Unggah File</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.MT_8}>
                    <ImageBackground
                      source={{uri: attachmentTemporary?.uri}}
                      imageStyle={styles.imageBackground}>
                      <View style={styles.attachmentImageContainer}>
                        {progressUpload === '100%' ? (
                          <TouchableOpacity onPress={__resetAttachment}>
                            <IconClose
                              width={8}
                              height={8}
                              style={styles.iconClose}
                            />
                          </TouchableOpacity>
                        ) : null}
                        <View />

                        {progressUpload === '100%' ? (
                          <TouchableOpacity
                            onPress={__onUploadImage}
                            style={styles.attachmentResendContainer}>
                            <Text style={styles.attachmentResendTitle}>
                              {'Unggah ulang'}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <ProgressBar progress={progressUpload} />
                        )}
                      </View>
                    </ImageBackground>
                  </View>
                )}

                <Text
                  style={[styles.textError, {color: Colors.dark.neutral60}]}>
                  {
                    'Maksimum ukuran file 100 MB.\nFile dapat dalam format .doc/.pdf/.png/.jpeg.'
                  }
                  {isSubmit && !attachmentTemporary ? (
                    <Text style={styles.textError}>
                      {'\nFile wajib diunggah.'}
                    </Text>
                  ) : null}
                </Text>
              </View>
            )
          ) : null}

          <FormSelect
            label="Kurikulum"
            selectedItem={selectedCurriculum || 'Pilih Kurikulum'}
            isValueExist={selectedCurriculum!}
            onPress={() => setIsShowCurriculum(true)}
            // isDisabled
          />

          <FormSelect
            label="Kelas"
            selectedItem={selectedClass || 'Pilih Kelas'}
            isValueExist={selectedClass}
            isSubmit={isSubmit && !selectedClass ? true : false}
            onPress={() => setIsShowClass(true)}
          />

          <FormSelect
            label="Mata Pelajaran"
            selectedItem={selectedSubject || 'Pilih Mata Pelajaran'}
            isDisabled={!selectedClass}
            isValueExist={selectedSubject}
            onPress={() => setIsShowSubject(true)}
          />

          <FormSelect
            label="Bab"
            selectedItem={selectedChapter || 'Pilih Bab'}
            isDisabled={!selectedSubject}
            isValueExist={selectedChapter!}
            onPress={() => setIsShowChapter(true)}
          />

          <View style={styles.MB_24}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Judul Tugas</Text>
            </View>

            <View style={[styles.row, styles.MT_8]}>
              <InputText
                value={title}
                placeholder="Masukkan Judul Tugas"
                placeholderTextColor={Colors.dark.neutral50}
                onChangeText={value => setTitle(value)}
                inputTextStyle={styles.inputText}
              />
            </View>

            {isSubmit && !title ? (
              <Text
                style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
                'Judul Tugas',
              )} wajib diisi.`}</Text>
            ) : null}
          </View>

          <FormSelect
            label="Tanggal & Jam Pengerjaan"
            selectedItem={datePickerFrom || 'Pilih tanggal & jam'}
            rightIcon={<IconCalendarBlue width={24} height={24} />}
            isValueExist={datePickerFrom}
            isSubmit={isSubmit && !datePickerFrom ? true : false}
            onPress={() => setIsShowDatePickerFrom(true)}
            error={datePickerFromError}
            errorMessage="Tanggal & jam pengerjaan harus sebelum tanggal & jam pengumpulan"
          />

          <FormSelect
            label="Tanggal & Jam Pengumpulan"
            selectedItem={datePickerTo || 'Pilih tanggal & jam'}
            rightIcon={<IconCalendarBlue width={24} height={24} />}
            isValueExist={datePickerTo}
            isSubmit={isSubmit && !datePickerTo ? true : false}
            onPress={() => setIsShowDatePickerTo(true)}
            error={datePickerToError}
            errorMessage="Tanggal & jam pengumpulan harus sebelum tanggal & jam pengerjaan"
          />

          <View style={styles.MB_24}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Instruksi Pengerjaan</Text>
            </View>

            <View style={[styles.row, styles.MT_8]}>
              <InputText
                multiline={true}
                value={instruction}
                placeholder="Tulis instruksi pengerjaan di sini..."
                placeholderTextColor={Colors.dark.neutral50}
                onChangeText={value => setInstruction(value)}
                inputTextStyle={{...styles.inputText, height: 120}}
              />
            </View>

            {isSubmit && !instruction ? (
              <Text
                style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
                'Instruksi Pengerjaan',
              )} wajib diisi.`}</Text>
            ) : null}
          </View>
        </ScrollView>

        <Button
          action={__handleSave}
          label={'Simpan'}
          customDisabled={datePickerFromError || datePickerToError}
        />
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowCurriculum}
        onClose={() => setIsShowCurriculum(false)}
        styleInnerContainer={{height: '33%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Kurikulum"
            options={curriculums}
            type="CURRICULUM"
            selectedItem={selectedCurriculum}
            setSelectedItem={setSelectedCurriculum}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowClass}
        onClose={() => setIsShowClass(false)}
        styleInnerContainer={{height: '66%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Kelas"
            options={classes}
            type="CLASS"
            selectedItem={selectedClass}
            setSelectedItem={setSelectedClass}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSubject}
        onClose={() => setIsShowSubject(false)}
        styleInnerContainer={{height: '36%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Mata Pelajaran"
            options={subjects}
            type="SUBJECTS"
            selectedItem={selectedSubject}
            setSelectedItem={setSelectedSubject}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowChapter}
        onClose={() => setIsShowChapter(false)}
        styleInnerContainer={{height: '39%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Bab"
            options={chapters}
            type="CHAPTER"
            selectedItem={selectedChapter}
            setSelectedItem={setSelectedChapter}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowDatePickerFrom}
        onClose={() => setIsShowDatePickerFrom(false)}
        styleInnerContainer={{height: '46%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Tanggal & Jam Pengerjaan"
            type="DATE"
            selectedItem={valueDatePickerFrom}
            onPress={__handlerOnPressSwipeUpSelectDateFromButton}
            setSelectedItem={setValueDatePickerFrom}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowDatePickerTo}
        onClose={() => setIsShowDatePickerTo(false)}
        styleInnerContainer={{height: '50%'}}
        height={500}
        children={
          <SwipeUpContent
            title="Tanggal & Jam Pengumpulan"
            type="DATE"
            selectedItem={valueDatePickerTo}
            onPress={__handlerOnPressSwipeUpSelectDateToButton}
            setSelectedItem={setValueDatePickerTo}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowUpload}
        onClose={() => setIsShowUpload(false)}
        height={500}
        children={__renderContentSwipeupUpload()}
      />

      <PopUp
        show={isShowPopUp}
        Icon={RobotSedih}
        title={'Belum Selesai!'}
        desc={
          'Apakah Anda yakin untuk keluar?\nPR/Projek/Tugas yang sedang dibuat\nbelum disimpan.'
        }
        titleConfirm={'Lanjutkan'}
        actionConfirm={() => setIsShowPopUp(false)}
        titleCancel={'Keluar'}
        actionCancel={() => {
          setIsShowPopUp(false);
          navigation.goBack();
        }}
      />

      <PopUp
        show={isShowPopUpSave}
        Icon={RobotSuccess}
        title={'Simpan PR/ Projek /Tugas'}
        desc={
          'Apakah Anda yakin untuk menyimpan\nPR/Projek/Tugas yang telah dibuat?'
        }
        titleConfirm={'Simpan'}
        actionConfirm={__postTeacherTask}
        titleCancel={'Kembali'}
        actionCancel={() => setIsShowPopUpSave(false)}
        additionalContent={
          <>
            <Text style={styles.additionalContentText}>
              {`${title}\n${selectedClass?.name}\n${selectedSubject?.name} - ${selectedChapter?.name}`}
            </Text>

            <View style={{height: 24}} />

            <Text style={styles.additionalContentText}>
              {`Pengerjaan: ${_handlerConvertDatePicker(
                valueDatePickerFrom,
                2,
              )}\nPengumpulan: ${_handlerConvertDatePicker(
                valueDatePickerTo,
                2,
              )}`}
            </Text>

            <View style={{height: 24}} />
          </>
        }
      />
    </>
  );
};

export {LMSTeacherTaskCreateScreen};
