import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import useCreateQuestionTask from './useCreateQuestionTask';
import {
  Button,
  Header,
  InputText,
  InputTextArea,
  PopUp,
  RadioInput,
  SwipeUp,
  Uploader,
} from '@components/atoms';
import {styles} from './styles';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import {capitalizeEachWord, isImageFile} from '@constants/functional';
import {Controller} from 'react-hook-form';
import {InputPGAnswer} from './components/InputPGAnswer';
import Colors from '@constants/colors';
import ChevronDown from '@assets/svg/ic24_chevron_down.svg';
import InputCorrectAnswer from './components/InputCorrectAnswer';
import ShockRobotIcon from '@assets/svg/maskot_3.svg';
import Ic_Empty_PR from '@assets/svg/ic_empty_PR.svg';

const extractPercentStringToNumber = (percentString: string) => {
  const res = percentString?.replace('%', '');
  return Number(res);
};

const CreateQuestionTaskScreen = () => {
  const {
    navigation,
    totalQuestion,
    currentQuestion,
    _handlerStepper,
    filledArr,
    _handlerAddStepper,
    questionTypeData,
    //hook form
    control,
    handleSubmit,
    setValue,
    errors,
    keys,

    //form
    typeQuestion,
    options,
    onSubmit,

    //upload
    uploadFileData,
    onRemoveFile,
    dataUploadFile,
    progressUpload,
    loading,

    isPG,
    fields,
    append,
    onDeleteAnswer,
    onDeletePress,
    watch,

    inputSwipeUpVisible,
    setInputSwipeUpVisible,
    onSelectCorrectAnswer,
    selectedOption,
    onDeleteQuestion,
    showDeleteAlert,
    setShowDeleteAlert,
    showDeleteQuestionAlert,
    setShowDeleteQuestionAlert,
    showGobackAlert,
    setShowGoBackAlert,
    setTotalQuestion,
    setCurrentQuestion,
    uploadList,
    showUpload,
    setShowUpload,
    taskParams,
  } = useCreateQuestionTask();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Buat Soal"
          //// HOLD -> validate question is saved
          // onPressIconLeft={() => {
          //   setShowGoBackAlert(true);
          // }}
          onPressIconLeft={() =>
            navigation.navigate('LMSTeacherTaskCreateScreen', {
              taskParams: taskParams,
            })
          }
        />
      ),
    });
  }, [navigation]);

  const _renderSwipeUpUpload = () => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>
        {uploadList?.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={value.onPress}
              style={styles.swipeUpUploadContent}>
              {value?.icon}
              <Text style={styles.swipeUpUploadLabel}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {totalQuestion === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.notFoundContainer}>
            <Ic_Empty_PR width={100} height={100} />
            <Text style={styles.notFoundText}>Belum Ada Soal Dibuat</Text>
            <Text style={styles.notFoundLabel}>
              Buat soal untuk PR/Projek/Tugas yuk!
            </Text>
            <Button
              label="+ Buat Soal"
              action={() => {
                setTotalQuestion(1);
                setCurrentQuestion(1);
              }}
              style={{paddingVertical: 8, paddingHorizontal: 16}}
            />
          </View>
        </View>
      ) : (
        <View>
          <StepperQuestion
            question={{
              filled: filledArr,
            }}
            totalQuestion={totalQuestion}
            currentQuestion={currentQuestion}
            onPressQuestion={(data: any) => {
              _handlerStepper(data);
            }}
            onPressPlus={() => {
              _handlerAddStepper();
            }}
            errors={Object.keys(errors).length !== 0}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>Tipe Soal</Text>
              <View style={styles.radioInput}>
                {questionTypeData?.data?.map(questionType => {
                  return (
                    <RadioInput
                      label={capitalizeEachWord(questionType.question_type!)}
                      key={questionType.id}
                      onPress={() => {
                        setValue('type', questionType);
                      }}
                      selected={questionType.id === (typeQuestion as any)?.id}
                    />
                  );
                })}
              </View>
              <Text style={styles.label}>Gambar (Opsional)</Text>
              <Uploader
                onRemoveFile={onRemoveFile}
                isImageFormat={isImageFile(uploadFileData.path_url)}
                fileName={dataUploadFile?.data?.file_name}
                progressUpload={progressUpload}
                isUploading={loading}
                path_url={uploadFileData.path_url}
                // onUpload={onUploadFile}
                onUpload={() => {
                  setShowUpload(true);
                }}
                containerStyle={styles.uploader}
              />
              <Text style={styles.label}>Pertanyaan</Text>
              <Controller
                control={control}
                name={'question'}
                rules={{required: 'Pertanyaan wajib diisi.'}}
                render={({field: {onChange, value}}) => (
                  <InputTextArea
                    autoFocus={true}
                    onChangeText={onChange}
                    value={value}
                    errorLabel={errors?.question?.message as string}
                    placeholder="Tulis Pertanyaan di sini..."
                  />
                )}
              />
              {isPG && (
                <>
                  <View>
                    <Text style={styles.label}>Jawaban</Text>
                    <View style={{gap: 16}}>
                      {fields?.map((field: any, index: number) => {
                        return (
                          <Controller
                            key={field.id}
                            control={control}
                            rules={{required: 'Jawaban wajib diisi.'}}
                            name={`choice.${index}.description`}
                            render={({field: {onChange, value}}) => (
                              <InputPGAnswer
                                labelPrefix={field.key}
                                placeholder="Tulis Jawaban di sini..."
                                onChangeText={onChange}
                                value={value}
                                errorLabel={
                                  errors.choice?.at?.(index)?.description
                                    ?.message
                                }
                                onRemoveInput={() => {
                                  onDeletePress(field);
                                }}
                              />
                            )}
                          />
                        );
                      })}
                      {fields.length < 4 && ( //a-z
                        <Button
                          label={'Tambah Jawaban'}
                          action={() =>
                            append({
                              key: keys[fields.length],
                              answer: '',
                              file_id: '',
                              is_correct: false,
                            })
                          }
                          background={Colors.primary.light3}
                          style={{
                            alignSelf: 'flex-start',
                            paddingHorizontal: 16,
                          }}
                          textStyle={{color: Colors.primary.base}}
                        />
                      )}
                      {fields?.length < 2 &&
                      Object.keys(errors).length !== 0 ? (
                        <Text
                          style={[
                            styles.label,
                            {
                              color: Colors.danger.base,
                              paddingTop: 0,
                            },
                          ]}>
                          Minimal 2 jawaban wajib ditambahkan.
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.label, {paddingBottom: 0}]}>
                      Jawaban Benar
                    </Text>
                    <TouchableOpacity
                      disabled={fields.length < 2}
                      onPress={() => setInputSwipeUpVisible(true)}>
                      <Controller
                        control={control}
                        name="answer"
                        rules={{required: 'Jawaban benar wajib dipilih.'}}
                        render={({field: {value}}) => (
                          <InputText
                            onChangeText={() => {}}
                            // disabled={fields.length < 2}
                            disabled
                            value={value}
                            errorMessage={errors?.answer?.message as any}
                            backgroundColor={Colors.dark.neutral10}
                            placeholder="Pilih Jawaban Benar"
                            rightIcon={ChevronDown}
                            onPress={() => setInputSwipeUpVisible(true)}
                          />
                        )}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
              <View style={{marginBottom: 120}}>
                <Text style={[styles.label, {paddingBottom: 0}]}>
                  Bobot Nilai
                </Text>
                <Controller
                  control={control}
                  name="marks"
                  rules={{
                    required: 'Bobot nilai wajib diisi.',
                    validate: {
                      positiveNumber: value => parseFloat(value) > 0,
                      lessThanHundred: value => parseFloat(value) <= 100, //set max value 100 bobot nilai
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <InputText
                      onChangeText={onChange}
                      value={value}
                      maxLength={3}
                      inputMode="numeric"
                      errorMessage={errors?.marks?.message as any}
                      subLabel="Bobot nilai berkisar dari 0-100"
                      keyboardType="number-pad"
                      backgroundColor={Colors.dark.neutral10}
                      placeholder="Masukkan Bobot Nilai"
                      placeholderTextColor={Colors.dark.neutral50}
                      subLabelStyle={{
                        color:
                          errors?.marks?.type === 'lessThanHundred'
                            ? Colors.danger.base
                            : Colors.dark.neutral60,
                      }}
                    />
                  )}
                />
              </View>
            </View>
          </ScrollView>
          <InputCorrectAnswer
            height={300}
            visible={inputSwipeUpVisible}
            inputs={options}
            onClose={() => setInputSwipeUpVisible(false)}
            onSelect={onSelectCorrectAnswer}
            selectedOption={selectedOption}
          />
          <View
            style={[
              styles.bottomContainer,
              {
                bottom:
                  watch('type')?.question_type === 'pilihan ganda' ? 28 : 28,
              },
            ]}>
            <Button
              label="Hapus Soal"
              outline
              style={styles.button}
              action={() => {
                setShowDeleteQuestionAlert({status: true, selectedKey: 0});
              }}
            />
            <Button
              label="Simpan"
              style={styles.button}
              isDisabled={
                extractPercentStringToNumber(progressUpload) > 0 &&
                extractPercentStringToNumber(progressUpload) < 100
              }
              action={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      )}

      <PopUp
        show={showDeleteAlert.status}
        close={() => setShowDeleteAlert({status: false, selectedKey: {}})}
        title="Hapus Jawaban"
        desc={`Apakah Anda yakin untuk menghapus jawaban ${showDeleteAlert.selectedKey.key} ?`}
        Icon={ShockRobotIcon}
        titleCancel="Hapus"
        titleConfirm="Batal"
        actionCancel={onDeleteAnswer}
        actionConfirm={() => {
          setShowDeleteAlert({status: false, selectedKey: {}});
        }}
      />
      <PopUp
        show={showDeleteQuestionAlert.status}
        close={() =>
          setShowDeleteQuestionAlert({status: false, selectedKey: {}})
        }
        title="Hapus Soal"
        desc={`Apakah Anda yakin untuk menghapus soal no. ${currentQuestion} ?`}
        Icon={ShockRobotIcon}
        titleCancel="Hapus"
        titleConfirm="Batal"
        actionCancel={onDeleteQuestion}
        actionConfirm={() =>
          setShowDeleteQuestionAlert({status: false, selectedKey: {}})
        }
      />
      <PopUp
        show={showGobackAlert}
        close={() => setShowGoBackAlert(false)}
        title="Belum Selesai!"
        desc={`Apakah Anda yakin untuk keluar? 
        Soal yang sedang dibuat belum disimpan.`}
        Icon={ShockRobotIcon}
        titleCancel="Keluar"
        titleConfirm="Lanjutkan"
        actionCancel={() => {
          setShowGoBackAlert(false);
          navigation.navigate('LMSTeacherTaskCreateScreen', {
            taskParams: taskParams,
          });
        }}
        actionConfirm={() => setShowGoBackAlert(false)}
      />
      <SwipeUp
        height={100}
        visible={showUpload}
        onClose={() => {
          return setShowUpload(false);
        }}
        children={_renderSwipeUpUpload()}
      />
    </SafeAreaView>
  );
};

export {CreateQuestionTaskScreen};
