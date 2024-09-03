/* eslint-disable react-hooks/exhaustive-deps */
import {Uploader, Header, Button, InputText, PopUp} from '@components/atoms';
import Colors from '@constants/colors';
import {
  capitalizeEachWord,
  dismissLoading,
  handlerOpenGallery,
  isImageFile,
  parseImagePath,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGetQuestionLevel, useGetQuestionType} from '@services/global';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Platform} from 'react-native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import ChevronDown from '@assets/svg/ic24_chevron_down.svg';
import InputCorrectAnswer from './components/InputCorrectAnswer';
import {
  ICreateSoalSendiriOptionPayload,
  ICreateSoalSendiriPayload,
} from '@services/lms/type';
import ShockRobotIcon from '@assets/svg/maskot_3.svg';
import InputQuestionLevel from './components/InputQuestionLevel';
import InputQuestionTag from './components/InputQuestionTag';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {useUploadFile} from '@services/media';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useCreateSoalSendiri, useGetDetailSoalNew} from '@services/lms';
import {HtmlEditorTextArea} from '@components/organism/HtmlEditorTextArea';
import HtmlEditorPGAnswer from './components/HtmlEditorPGAnswer';
import {AddImageProps} from '@components/organism/HtmlEditor/type';
import {ParamList} from 'type/screen';
import {launchImageLibrary} from 'react-native-image-picker';
import InputQuestionType from './components/InputQuestionType';

const keys = ['A', 'B', 'C', 'D'];

export type InputType = {
  id: string;
  name: string;
};

const questionTypes: InputType[] = [
  {
    id: '1',
    name: 'Mengingat',
  },
  {
    id: '2',
    name: 'Memahami',
  },
  {
    id: '3',
    name: 'Menerapkan',
  },
  {
    id: '4',
    name: 'Menganalisis',
  },
  {
    id: '5',
    name: 'Mengevaluasi',
  },
  {
    id: '6',
    name: 'Menciptakan',
  },
];

const CreateSoalSendiriScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'CreateSoalSendiriScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'CreateSoalSendiriScreen'>>();

  const [inputSwipeUpVisible, setInputSwipeUpVisible] =
    useState<boolean>(false);
  const [
    InputQuestionLevelSwipeUpVisible,
    setInputQuestionLevelSwipeUpVisible,
  ] = useState<boolean>(false);
  const [InputQuestionTypeSwipeUpVisible, setInputQuestionTypeSwipeUpVisible] =
    useState<boolean>(false);
  const [InputQuestionTagSwipeUpVisible, setInputQuestionTagSwipeUpVisible] =
    useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<{
    status: boolean;
    selectedKey: ICreateSoalSendiriOptionPayload;
  }>({status: false, selectedKey: {}});
  const [progressUpload, setProgressUpload] = useState<string>('0%');
  const [uploadFileData, setUploadFileData] = useState<{
    path_url?: string;
    type?: string;
    name?: string;
  }>({path_url: '', type: ''});
  const [selectedOption, setSelectedOption] =
    useState<ICreateSoalSendiriOptionPayload>();

  const {
    subtitle,
    class_id,
    chapter_id,
    subject_id,
    package_id,
    question_id,
    mode,
  } = route.params;
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    // setError,
    // reset,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      file_id: '',
      question: '',
      options: [
        {
          key: 'A',
          answer: '',
          is_correct: false,
          file_id: '',
          file_name: '',
          path_url: '',
        },
      ] as IBaseOption[],
      correct_answer: '' as any,
      marks: '' as any,
      question_level: '' as any,
      tags: '' as any,
      question_type: '' as any,
      discussion: {
        explanation: '',
        file_id: '',
        id: 0,
      },
    },
  });
  const {fields, append, remove} = useFieldArray({
    name: 'options',
    control: control,
  });
  const {data: questionTypeData} = useGetQuestionType();
  const {data: detailSoalData} = useGetDetailSoalNew(question_id);
  const {data: questionLevelData} = useGetQuestionLevel();
  const {mutate: createSoalSendiri, loading: loadingCreateSoalSendiri} =
    useCreateSoalSendiri();
  const {mutate: uploadFile, data: dataUploadFile, loading} = useUploadFile();

  const options = watch('options');
  const questionLevel = watch('question_level');
  const typeQuestion = watch('question_type');
  const tags = watch('tags');
  const isPG = typeQuestion?.id === 1;
  const isPGKomplek = typeQuestion?.id === 5;
  const isPilgan = isPG || isPGKomplek;
  const isEditMode = !!detailSoalData?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={mode == 'Edit' ? 'Ubah Soal' : 'Buat Soal'}
          subLabel={`Paket Soal ${subtitle ?? '-'}`}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (questionTypeData) {
      // setSelectedQuestionType(questionTypeData.data?.[0]);
      setValue('question_type', questionTypeData.data?.[0] ?? {});
    }
  }, [questionTypeData]);

  useEffect(() => {
    if (isEditMode) {
      let qLevel, qType;
      if (questionTypeData) {
        qType = questionTypeData?.data?.filter(
          type => type.id === detailSoalData?.data?.question_type_id,
        )[0];
      }

      if (questionLevelData) {
        qLevel = questionLevelData?.data?.filter(
          level => level.id === detailSoalData?.data?.question_level_id,
        )[0];
      }

      if (detailSoalData?.data?.file_id) {
        setUploadFileData(prevState => ({
          ...prevState,
          path_url: detailSoalData?.data?.path_url,
        }));
      }

      if (qType?.id === 1 || qType?.id === 5) {
        const correctAnswer = detailSoalData?.data?.options?.filter(
          option => option.is_correct,
        )[0]?.key;
        setValue(
          'options',
          detailSoalData?.data?.options ?? getValues('options'),
        );
        setValue('correct_answer', correctAnswer);
      }
      setValue('question_type', qType);
      setValue('question_level', qLevel);
      setValue('question', detailSoalData?.data?.question || '');
      setValue('marks', detailSoalData?.data?.marks?.toString());
      setValue('file_id', detailSoalData?.data?.file_id || '');
      setValue(
        'tags',
        questionTypes.find(
          questionType => questionType.name === detailSoalData?.data?.tag,
        ),
      );
      setValue('discussion', {
        explanation: detailSoalData?.data?.question_discuss?.explanation || '',
        file_id: detailSoalData?.data?.question_discuss?.file_id || '',
        id: detailSoalData?.data?.question_discuss?.id || 0,
      });
    }
  }, [isEditMode, questionLevelData, questionTypeData, detailSoalData]);

  const onSelectCorrectAnswer = (val: ICreateSoalSendiriOptionPayload) => {
    setValue('correct_answer', val?.key!);
    clearErrors('correct_answer');
    const optionIndex = getValues('options').findIndex(
      option => option?.key === val?.key,
    );
    setSelectedOption(val);
    if (optionIndex > -1) {
      const newData = [...getValues('options')];
      newData[optionIndex].is_correct = true;
      setValue('options', newData);
    }
    setInputSwipeUpVisible(false);
  };

  const onSelectQuestionType = (val: IBaseQuestionType) => {
    setValue('question_type', val);
    clearErrors('question_type');
    setInputQuestionTypeSwipeUpVisible(false);
  };

  const onSelectQuestionLevel = (val: IBaseQuestionLevel) => {
    setValue('question_level', val);
    clearErrors('question_level');
    setInputQuestionLevelSwipeUpVisible(false);
  };

  const onSelectQuestionTag = (val: InputType) => {
    setValue('tags', val);
    clearErrors('tags');
    setInputQuestionTagSwipeUpVisible(false);
  };

  const onDeletePress = (val: ICreateSoalSendiriOptionPayload) => {
    if (fields.length > 1) {
      setShowDeleteAlert({status: true, selectedKey: val});
    }
  };

  const onSubmit = (data: any) => {
    const createPayload: ICreateSoalSendiriPayload = {
      instructions: '',
      question: data.question,
      question_type_id: data.question_type?.id ?? '',
      question_level_id: data.question_level?.id ?? 1,
      marks: Number(data.marks),
      file_id: data.file_id,
      tag: data.tags?.name ?? '',
      subject_id,
      chapter_id: chapter_id || null,
      class_id,
      options: isPilgan ? data.options : [],
      discussion: data.discussion,
    };
    if (isPilgan && data.options.length === 1) {
      showErrorToast('Minimal 2 jawaban wajib ditambahkan.');
      return;
    }

    createSoalSendiri(
      isEditMode ? data?.options?.[0]?.question_id || question_id : package_id,
      createPayload,
      isEditMode,
    ).then(() => {
      navigation.pop();
      // navigation.replace('DetailPaketSoalListScreen', {
      //   package_id,
      //   subject_id,
      //   title,
      //   class_id,
      //   chapter_id,
      //   subtitle,
      //   mode: 'detail',
      // });
    });
  };

  const onDeleteAnswer = () => {
    if (fields.length > 1) {
      const optionIndex = getValues('options').findIndex(
        option => option?.key === showDeleteAlert?.selectedKey?.key,
      );
      remove(optionIndex);

      const newData = [...getValues('options')];

      newData.forEach((data, index) => {
        data.key = keys[index];
      });
      setValue('options', newData);
      setShowDeleteAlert({status: false, selectedKey: {}});
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
      .then(res => {
        setValue('file_id', res.data?.ID ?? '');
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

  const onRemoveFile = () => {
    setUploadFileData({path_url: '', type: ''});
    setValue('file_id', '');
  };

  const onUploadFile = async () => {
    try {
      const fileResult = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });

      setUploadFileData({
        type: fileResult?.assets?.[0]?.type,
        path_url: parseImagePath(fileResult?.assets?.[0]?.uri || ''),
      });

      if (
        fileResult?.assets?.[0]?.fileSize &&
        fileResult?.assets?.[0]?.fileSize > 104857600
      ) {
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

      upload({
        fileCopyUri: '',
        name: fileResult?.assets?.[0]?.fileName || '',
        size: fileResult?.assets?.[0]?.fileSize || 0,
        type: fileResult?.assets?.[0]?.type || '',
        uri: fileResult?.assets?.[0]?.uri || '',
      });
    } catch (e) {}
  };

  const htmlUploadImage: () => Promise<AddImageProps> = async () => {
    let result: AddImageProps = {
      id: '',
      imageName: '',
      imageUrl: '',
      width: 150,
      height: 150,
    };
    try {
      showLoading();
      const resData = await handlerOpenGallery({
        type: 'paket_soal',
        sub_type: 'ujian',
      });
      result = {
        id: resData?.ID,
        imageName: resData?.original_name,
        imageUrl: resData?.path_url || '',
        width: 150,
        height: 150,
      };
    } catch (error) {
    } finally {
      dismissLoading();
      return result;
    }
  };

  const updateOptions = useCallback((optionIdx: number, value: IBaseOption) => {
    const newData = [...getValues('options')];
    const option = newData[optionIdx];
    newData[optionIdx].file_id = value.file_id ?? option.file_id;
    newData[optionIdx].file_name = value.file_name ?? option.file_name;
    newData[optionIdx].path_url = value.path_url ?? option.path_url;
    newData[optionIdx].answer = value.answer ?? option.answer;
    newData[optionIdx].is_correct = value.is_correct ?? option.is_correct;
    newData[optionIdx].key = value.key ?? option.key;
    setValue('options', newData);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{padding: 16, gap: 24}}
        nestedScrollEnabled>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipe Soal</Text>
          <Controller
            control={control}
            name="question_type"
            render={({field: {value}}) => (
              <InputText
                onChangeText={() => {}}
                disabled
                value={capitalizeEachWord(value?.question_type)}
                onPress={() => setInputQuestionTypeSwipeUpVisible(true)}
                backgroundColor={Colors.dark.neutral10}
                placeholder="Pilih Tipe Soal"
                rightIcon={ChevronDown}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gambar (Opsional)</Text>
          <Uploader
            onRemoveFile={onRemoveFile}
            fileName={dataUploadFile?.data?.file_name}
            progressUpload={progressUpload}
            isUploading={loading}
            isImageFormat={isImageFile(uploadFileData.path_url)}
            path_url={uploadFileData.path_url}
            onUpload={onUploadFile}
            formatType={'.png/.jpeg.'}
          />
        </View>
        {typeQuestion?.id && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pertanyaan</Text>
            <Controller
              control={control}
              name={'question'}
              rules={{required: 'Pertanyaan wajib diisi.'}}
              render={({field: {onChange, value}}) => {
                return (
                  <HtmlEditorTextArea
                    onChangeText={onChange}
                    placeholder="Tulis Pertanyaan di sini..."
                    value={value}
                    errorLabel={errors?.question?.message}
                    onPressAddImage={htmlUploadImage}
                  />
                );
              }}
            />
          </View>
        )}

        {typeQuestion?.id && (
          <>
            {!isPilgan && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pembahasan</Text>
                <Controller
                  control={control}
                  name={'discussion.explanation'}
                  rules={{required: 'Pembahasan wajib diisi.'}}
                  render={({field: {onChange, value}}) => {
                    return (
                      <HtmlEditorTextArea
                        onChangeText={onChange}
                        value={value}
                        errorLabel={errors?.discussion?.explanation?.message}
                        placeholder="Tulis Pembahasan di sini..."
                        onPressAddImage={htmlUploadImage}
                      />
                    );
                  }}
                />
              </View>
            )}
            {isPilgan && (
              <>
                <View style={styles.inputContainer}>
                  <View>
                    <Text style={styles.label}>Jawaban</Text>
                    {isPGKomplek ? (
                      <Text style={styles.subLabel}>
                        *Centang Jawaban Benar
                      </Text>
                    ) : null}
                  </View>
                  <View style={{gap: 16}}>
                    {fields?.map((field, index) => {
                      return (
                        <Controller
                          key={field.id}
                          control={control}
                          rules={{
                            required: 'Jawaban wajib diisi.',
                            validate: () => {
                              if (isPG) {
                                return;
                              }
                              const validatePGKCorrectCount = fields.filter(
                                val => val.is_correct === true,
                              ).length;
                              if (validatePGKCorrectCount < 2) {
                                return 'Pilih minimal 2 jawaban benar.';
                              }
                            },
                          }}
                          name={`options.${index}.answer`}
                          render={({field: {onChange, value}}) => {
                            return (
                              <HtmlEditorPGAnswer
                                isKompleks={isPGKomplek}
                                isChecked={field.is_correct}
                                onPressCheck={() => {
                                  updateOptions(index, {
                                    ...field,
                                    answer: value,
                                    is_correct: !field.is_correct,
                                  });
                                }}
                                labelPrefix={field?.key}
                                placeholder="Tulis Jawaban di sini..."
                                onChangeText={onChange}
                                value={value}
                                errorLabel={
                                  errors.options?.at?.(index)?.answer?.message
                                }
                                onRemoveInput={() => onDeletePress(field)}
                                onPressAddImage={htmlUploadImage}
                              />
                            );
                          }}
                        />
                      );
                    })}
                    {fields.length < 4 && (
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
                  </View>
                </View>
                {isPG ? (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Jawaban Benar</Text>
                    <Controller
                      control={control}
                      name="correct_answer"
                      rules={{required: 'Jawaban benar wajib dipilih.'}}
                      render={({field: {value}}) => (
                        <InputText
                          onChangeText={() => {}}
                          disabled
                          value={value}
                          errorMessage={errors?.correct_answer?.message as any}
                          onPress={() => setInputSwipeUpVisible(true)}
                          backgroundColor={Colors.dark.neutral10}
                          placeholder="Pilih Jawaban Benar"
                          rightIcon={ChevronDown}
                        />
                      )}
                    />
                  </View>
                ) : null}
              </>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Masukkan Bobot Nilai</Text>
              <Controller
                control={control}
                name="marks"
                rules={{
                  validate: value => {
                    if (!value) {
                      return 'Bobot nilai wajib dipilih.';
                    }
                    if (value > 100) {
                      return 'Bobot nilai tidak boleh lebih dari 100';
                    }
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
                  />
                )}
              />
            </View>
            {isPilgan && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Tingkat Kesulitan</Text>
                  <Controller
                    control={control}
                    name="question_level"
                    rules={{required: 'Tingkat Kesulitan wajib dipilih.'}}
                    render={({field: {value}}) => (
                      <InputText
                        onChangeText={() => {}}
                        disabled
                        value={(value as any).name}
                        onPress={() =>
                          setInputQuestionLevelSwipeUpVisible(true)
                        }
                        errorMessage={errors?.question_level?.message as any}
                        backgroundColor={Colors.dark.neutral10}
                        placeholder="Pilih Tingkat Kesulitan"
                        rightIcon={ChevronDown}
                      />
                    )}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Tipe Pertanyaan</Text>
                  <Controller
                    control={control}
                    name="tags"
                    rules={{required: 'Tipe Pertanyaan wajib dipilih.'}}
                    render={({field: {value}}) => (
                      <InputText
                        onChangeText={() => {}}
                        disabled
                        value={(value as any).name}
                        onPress={() => setInputQuestionTagSwipeUpVisible(true)}
                        errorMessage={errors?.tags?.message as any}
                        backgroundColor={Colors.dark.neutral10}
                        placeholder="Pilih Tipe Pertanyaan"
                        rightIcon={ChevronDown}
                      />
                    )}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Pembahasan</Text>
                  <Controller
                    control={control}
                    name={'discussion.explanation'}
                    rules={{required: 'Pembahasan wajib diisi.'}}
                    render={({field: {onChange, value}}) => {
                      return (
                        <HtmlEditorTextArea
                          onChangeText={onChange}
                          placeholder="Tulis Pembahasan di sini..."
                          value={value}
                          errorLabel={errors?.discussion?.explanation?.message}
                        />
                      );
                    }}
                  />
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
      <InputQuestionType
        height={300}
        visible={InputQuestionTypeSwipeUpVisible}
        inputs={questionTypeData?.data}
        onClose={() => setInputQuestionTypeSwipeUpVisible(false)}
        onSelect={onSelectQuestionType}
        selectedOption={typeQuestion as IBaseQuestionType}
      />
      <InputCorrectAnswer
        height={300}
        visible={inputSwipeUpVisible}
        inputs={options}
        onClose={() => setInputSwipeUpVisible(false)}
        onSelect={onSelectCorrectAnswer}
        selectedOption={selectedOption}
        // setValue={setValue}
      />
      <InputQuestionLevel
        height={300}
        visible={InputQuestionLevelSwipeUpVisible}
        inputs={questionLevelData?.data}
        onClose={() => setInputQuestionLevelSwipeUpVisible(false)}
        onSelect={onSelectQuestionLevel}
        selectedOption={questionLevel as IBaseQuestionLevel}
        // setValue={setValue}
      />
      <InputQuestionTag
        height={300}
        visible={InputQuestionTagSwipeUpVisible}
        inputs={questionTypes}
        onClose={() => setInputQuestionTagSwipeUpVisible(false)}
        onSelect={onSelectQuestionTag}
        selectedOption={tags as InputType}
        // setValue={setValue}
      />
      <PopUp
        show={showDeleteAlert.status}
        close={() => setShowDeleteAlert({status: false, selectedKey: {}})}
        title="Hapus Jawaban"
        desc={`Apakah Anda yakin untuk menghapus jawaban ${showDeleteAlert.selectedKey.key} ?`}
        Icon={ShockRobotIcon}
        titleCancel="Hapus"
        titleConfirm="Batal"
        actionCancel={onDeleteAnswer}
        actionConfirm={() =>
          setShowDeleteAlert({status: false, selectedKey: {}})
        }
      />
      <View style={{padding: 16, backgroundColor: Colors.white}}>
        <Button
          label="Simpan"
          action={handleSubmit(onSubmit)}
          isDisabled={loadingCreateSoalSendiri}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  subLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
    fontSize: 12,
  },
  inputContainer: {gap: 8},
  radioInput: {flexDirection: 'row', alignItems: 'center', gap: 10},
});

export default CreateSoalSendiriScreen;
