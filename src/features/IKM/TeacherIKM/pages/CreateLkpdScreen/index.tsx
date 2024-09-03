import React, {useLayoutEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import useCreateLkpd from './useCreateLkpd';
import {
  Button,
  Header,
  InputText,
  InputTextArea,
  MainText,
  MainView,
  RadioInput,
  SwipeUp,
} from '@components/atoms';
import Colors from '@constants/colors';
import IconDown from '@assets/svg/ic24_chevron_down_blue.svg';
import IconCalendar from '@assets/svg/ic24_calendar.svg';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import SwipeUpRadioButton from '@components/pages/PancasilaKirimProyekScreen/components/SwipeUpRadioButton';
import {Controller} from 'react-hook-form';
import {isStringContains} from '@constants/functional';
import FileCard from '@features/IKM/shared/pages/LembarKerjaScreen/components/FileCard';
import dayjs from 'dayjs';
import {NewDateTimePickerForm} from '@components/atoms/NewDateTimePickerForm';

const formatDate = (data: any) =>
  dayjs(data).locale('id').format('ddd, DD/MM/YYYY • HH:mm');
const CreateLkpdScreen = () => {
  const {
    defaultSwipeupData,
    navigation,
    showSwipeUp,
    setShowSwipeUp,
    documentType,
    setDocumentType,
    activeCuriculum,
    listPhase,
    setFormValues,
    getFormValues,
    control,
    worksheets,
    chapters,
    subjects,
    formErrors,
    onSimpan,
    listRombelClass,
    onUploadFile,
  } = useCreateLkpd();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Buat Lembar Kerja'} />,
    });
  }, []);

  const renderUnggah = () => {
    return (
      <MainView gap={8}>
        <MainText>File</MainText>
        <Controller
          name="media"
          control={control}
          rules={{required: 'Judul wajib diisi.'}}
          render={({field: {value: data}}) => {
            return (
              <MainView>
                <FileCard
                  file={data}
                  hidePdfView
                  showUploadButton
                  hideReUploadButton={false}
                  showDownloadIcon={false}
                  hidePreviewButton
                  handleReUpload={onUploadFile}
                  onUploadFile={onUploadFile}
                  userRole="GURU"
                  imageViewType="upload"
                  handleRemoveData={() => setFormValues('media', undefined)}
                  uploadTextColor={Colors.primary.base}
                  uploadBorderColor={
                    formErrors.media?.message ? Colors.danger.base : undefined
                  }
                  uploadBackgroundColor={Colors.primary.light3}
                />

                <MainText
                  fontSize={12}
                  color={
                    formErrors.media?.message ? Colors.danger.base : '#868E96'
                  }>
                  Maksimum ukuran file 100 MB.{'\n'}File dapat dalam format
                  .png/ .jpg/ .jpeg/ .svg/ .pdf/
                </MainText>
              </MainView>
            );
          }}
        />
      </MainView>
    );
  };

  const renderPilih = () => {
    return (
      <Controller
        name="kp_ikm_worksheet_master"
        control={control}
        rules={{required: 'Lembar kerja wajib diisi.'}}
        render={({field: {value: data}}) => (
          <InputText
            onChangeText={() => {}}
            label="Pilih Lembar Kerja"
            placeholder="Pilih Contoh Lembar Kerja"
            placeholderTextColor={Colors.dark.neutral50}
            backgroundColor={Colors.dark.neutral10}
            errorMessage={formErrors.kp_ikm_worksheet_master?.message}
            editable={false}
            rightIcon={IconDown}
            value={data?.value}
            onPressIcon={() => {
              setShowSwipeUp({
                status: true,
                type: 'Docs',
                data: worksheets,
                currentData: getFormValues('kp_ikm_worksheet_master'),
                onSelected: data =>
                  setFormValues('kp_ikm_worksheet_master', data),
              });
            }}
          />
        )}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <ScrollView style={{flexGrow: 1}}>
          <MainView gap={16} paddingBottom={80}>
            {/* MARK: START Kurikulum */}
            <InputText
              onChangeText={() => {}}
              label="Kurikulum"
              value={activeCuriculum.name}
              disabled={true}
              backgroundColor={Colors.dark.neutral20}
            />
            {/* MARK: END Kurikulum */}

            {/* MARK: START Fase */}
            <Controller
              name="class"
              control={control}
              rules={{required: 'Judul wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  label="Fase"
                  placeholder="Pilih Fase"
                  placeholderTextColor={Colors.dark.neutral50}
                  backgroundColor={Colors.dark.neutral10}
                  editable={false}
                  maxLength={60}
                  multiline
                  errorMessage={formErrors.class?.message}
                  rightIcon={IconDown}
                  value={data?.value}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Fase',
                      data: listPhase,
                      currentData: getFormValues('class'),
                      onSelected: data => setFormValues('class', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Fase */}

            {/* MARK: START Rombongan Belajar */}
            <Controller
              name="rombel_class_school"
              control={control}
              rules={{required: 'Rombongan belajar wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  label="Rombongan Belajar"
                  placeholder="Pilih Rombongan Belajar"
                  // placeholderTextColor={Colors.dark.neutral50}
                  // backgroundColor={Colors.dark.neutral10}
                  // disabled={!getFormValues('class')}
                  placeholderTextColor={
                    !getFormValues('class') ? undefined : Colors.dark.neutral50
                  }
                  backgroundColor={
                    !getFormValues('class')
                      ? Colors.dark.neutral20
                      : Colors.dark.neutral10
                  }
                  disabled={!getFormValues('class')}
                  editable={false}
                  maxLength={60}
                  multiline
                  errorMessage={formErrors.rombel_class_school?.message}
                  rightIcon={IconDown}
                  value={data?.value}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Rombel',
                      data: listRombelClass,
                      currentData: getFormValues('rombel_class_school'),
                      onSelected: data =>
                        setFormValues('rombel_class_school', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Rombongan Belajar */}

            {/* MARK: START Mata Pelajaran */}
            <Controller
              name="subject"
              control={control}
              rules={{required: 'Mata pelajaran wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  label="Mata Pelajaran"
                  placeholder="Pilih Mata Pelajaran"
                  maxLength={60}
                  multiline
                  placeholderTextColor={
                    !getFormValues('class') ? undefined : Colors.dark.neutral50
                  }
                  backgroundColor={
                    !getFormValues('class')
                      ? Colors.dark.neutral20
                      : Colors.dark.neutral10
                  }
                  disabled={!getFormValues('class')}
                  errorMessage={formErrors.subject?.message}
                  editable={false}
                  rightIcon={IconDown}
                  value={data?.value}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Subject',
                      data: subjects,
                      currentData: getFormValues('subject'),
                      onSelected: data => setFormValues('subject', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Mata Pelajaran */}

            {/* MARK: START Bab */}
            <Controller
              name="chapter"
              control={control}
              rules={{required: 'Bab wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  label="Bab"
                  maxLength={60}
                  multiline
                  placeholder="Pilih Bab"
                  placeholderTextColor={
                    !getFormValues('subject') || !getFormValues('class')
                      ? undefined
                      : Colors.dark.neutral50
                  }
                  backgroundColor={
                    !getFormValues('subject') || !getFormValues('class')
                      ? Colors.dark.neutral20
                      : Colors.dark.neutral10
                  }
                  disabled={
                    !getFormValues('subject') || !getFormValues('class')
                  }
                  errorMessage={formErrors.chapter?.message}
                  editable={false}
                  rightIcon={IconDown}
                  value={data?.value}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Chapter',
                      data: chapters,
                      currentData: getFormValues('chapter'),
                      onSelected: data => setFormValues('chapter', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Bab */}

            {/* MARK: START Attachment */}
            <MainText color={Colors.dark.neutral100}>Sisipkan Dokumen</MainText>
            <MainView flexDirection="row" justifyContent="space-between">
              <RadioInput
                label={'Unggah'}
                onPress={() => {
                  setFormValues('media', undefined);
                  // setFormValues('kp_ikm_worksheet_master', undefined);
                  setDocumentType('Unggah');
                }}
                selected={documentType === 'Unggah'}
              />
              <RadioInput
                label={'Pilih File'}
                onPress={() => {
                  // setFormValues('media', undefined);
                  setFormValues('kp_ikm_worksheet_master', undefined);
                  setDocumentType('Pilih');
                }}
                selected={documentType === 'Pilih'}
              />
            </MainView>

            {documentType === 'Unggah' ? renderUnggah() : renderPilih()}
            {/* MARK: END Attachment */}

            {/* MARK: START Judul */}
            <Controller
              name="title"
              control={control}
              rules={{required: 'Judul wajib diisi.'}}
              render={({field: {onChange, value: data}}) => (
                <InputText
                  onChangeText={onChange}
                  errorMessage={formErrors.title?.message}
                  value={data}
                  maxLength={60}
                  multiline
                  label="Judul Lembar Kerja"
                  placeholder="Masukkan Judul Lembar Kerja"
                  placeholderTextColor={Colors.dark.neutral50}
                  backgroundColor={Colors.dark.neutral10}
                />
              )}
            />
            {/* MARK: END Judul */}

            {/* MARK: START Time Start */}
            <Controller
              name="time_start"
              control={control}
              rules={{required: 'Tanggal mulai wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  errorMessage={formErrors.time_start?.message}
                  label="Mulai Pengerjaan"
                  placeholder="Pilih Tanggal & Jam"
                  placeholderTextColor={Colors.dark.neutral50}
                  backgroundColor={Colors.dark.neutral10}
                  editable={false}
                  rightIcon={IconCalendar}
                  value={data ? formatDate(data) : ''}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Tanggal & Jam Pengerjaan',
                      currentData: getFormValues('time_start'),
                      onSelected: (data: any) =>
                        setFormValues('time_start', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Time Start */}

            {/* MARK: START Time End */}
            <Controller
              name="time_finish"
              control={control}
              rules={{required: 'Batas pengumpulan wajib diisi.'}}
              render={({field: {value: data}}) => (
                <InputText
                  onChangeText={() => {}}
                  errorMessage={formErrors.time_finish?.message}
                  label="Batas Pengumpulan"
                  placeholder="Pilih Tanggal & Jam"
                  placeholderTextColor={Colors.dark.neutral50}
                  backgroundColor={Colors.dark.neutral10}
                  editable={false}
                  value={data ? formatDate(data) : ''}
                  rightIcon={IconCalendar}
                  onPressIcon={() => {
                    setShowSwipeUp({
                      status: true,
                      type: 'Tanggal & Jam Pengumpulan',
                      currentData: getFormValues('time_finish'),
                      onSelected: (data: any) =>
                        setFormValues('time_finish', data),
                    });
                  }}
                />
              )}
            />
            {/* MARK: END Time End */}

            {/* MARK: START Instructions */}
            <MainText color={Colors.dark.neutral100}>
              Instruksi Pengerjaan
            </MainText>
            <Controller
              name="instructions"
              control={control}
              rules={{required: 'Instruksi pengerjaan wajib diisi.'}}
              render={({field: {onChange, value: data}}) => (
                <InputTextArea
                  onChangeText={onChange}
                  value={data}
                  errorLabel={formErrors.instructions?.message}
                  placeholder="Tulis instruksi pengerjaan di sini..."
                  placeholderTextColor={Colors.dark.neutral50}
                />
              )}
            />
            {/* MARK: END Instructions */}
          </MainView>
        </ScrollView>
      </View>
      <MainView
        width={WINDOW_WIDTH}
        backgroundColor={Colors.white}
        padding={16}
        position="absolute"
        bottom={0}>
        <Button action={onSimpan} label="Simpan" />
      </MainView>

      <SwipeUp
        visible={showSwipeUp.status}
        onClose={() => setShowSwipeUp({status: false, type: ''})}
        children={
          <MainView paddingHorizontal={16}>
            {isStringContains(showSwipeUp.type, 'tanggal') ? (
              <NewDateTimePickerForm
                title={showSwipeUp.type}
                onSaveChange={(data: any) => {
                  showSwipeUp.onSelected?.(data);
                  setShowSwipeUp(defaultSwipeupData);
                }}
                currentDate={showSwipeUp.currentData || dayjs().toObject()}
              />
            ) : (
              <SwipeUpRadioButton
                appendCurrentDataWhenSelected
                data={showSwipeUp.data || []}
                selected={showSwipeUp.currentData}
                setSelected={(data: any) => {
                  setShowSwipeUp(defaultSwipeupData);
                  showSwipeUp.onSelected?.(data);
                }}
                title={
                  isStringContains(showSwipeUp.type, 'tanggal')
                    ? `${showSwipeUp.type}`
                    : `Pilih ${showSwipeUp.type}`
                }
              />
            )}
          </MainView>
        }
      />
    </View>
  );
};

export {CreateLkpdScreen};
