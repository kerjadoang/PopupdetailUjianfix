import {
  Button,
  Checkbox,
  InputText,
  PopUp,
  PoppinsText,
} from '@components/atoms';
import Colors from '@constants/colors';
import React, {ReactNode} from 'react';
import {Controller} from 'react-hook-form';
import {View, StyleSheet, ScrollView, SectionList} from 'react-native';
import ChevronDown from '@assets/svg/ic24_chevron_down.svg';
import RobotConfirmIcon from '@assets/svg/maskot_2.svg';
import InputCurriculum from '../components/InputCurriculum';
import InputClass from '../components/InputClass';
import {IListSubjectByCurriculumAndClassResponseData} from '@services/lms/type';
import InputRombelUser from '../components/InputRombelUser';
import InputMapel from '../components/InputMapel';
import InputChapter from '../components/InputChapter';
import InputService from '../components/InputService';
import {useCreateJadwalUjianScreen} from './useCreateJadwalUjianScreen';
import {AdditonalPopupContent} from './AdditionalPopupContent';
import IcInfoBlue from '@assets/svg/ic24_blue_info.svg';
import IcTimeBlue from '@assets/svg/ic16_clock.svg';
import IcNotesBlue from '@assets/svg/ic_notes_checklist.svg';
import InputDateKP from '../components/InputDateKP';

const tempSectionList: {
  title: string;
  data: {label: string; isChecked: boolean; id: number}[];
}[] = [
  {
    title: 'Desktop',
    data: [
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: false,
        id: 1,
      },
      {
        label: 'Tidak boleh membuka jendela',
        isChecked: false,
        id: 2,
      },
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: true,
        id: 3,
      },
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: true,
        id: 4,
      },
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: false,
        id: 5,
      },
    ],
  },
  {
    title: 'Mobile',
    data: [
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: false,
        id: 1,
      },
      {
        label: 'Tidak boleh membuka jendela',
        isChecked: false,
        id: 2,
      },
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: true,
        id: 3,
      },
      {
        label: 'Tidak boleh membuka tab baruuuuuuuuasjdasjkasdasdasdsss',
        isChecked: true,
        id: 4,
      },
      {
        label: 'Tidak boleh membuka tab baru',
        isChecked: false,
        id: 5,
      },
    ],
  },
];

export interface IJadwalkanUjianFormValues {
  curriculum?: IBaseCurricullum;
  question_package_service?: IBaseService;
  question_package?: IBasePackage;
  rombel_class_school?: IBaseRombelClass;
  list_rombel_class_school?: IBaseRombelClass[];
  subject?: IListSubjectByCurriculumAndClassResponseData;
  title?: string;
  chapters?: IBaseChapter[] | undefined;
  start_time?: Date | string;
  duration?: number;
  instructions?: string;
  users?: IBaseRombelUser[] | undefined;
  options?: IPaketSoalMore;
}

const CreateInfoDetail = ({
  nextStep,
  HeaderComponent,
}: {
  nextStep: () => void;
  HeaderComponent?: ReactNode;
}) => {
  const {
    getValues,
    // onSubmit,
    onCreateJadwalUjain,
    onSelectInputSwipeUp,
    setInputSubjectVisible,
    // handleSubmit,
    setInputCurriculumVisible,
    setInputServiceVisible,
    setInputClassVisible,
    setInputRombelUserVisible,
    setInputChapterVisible,
    setSearchRombelUserQuery,
    setInputDatePickerVisible,
    setShowConfirm,
    control,
    errors,
    curriculum,
    loadingCreateJadwalUjian,
    schedule_id,
    loadingGetJadwalUjian,
    curriculumData,
    inputCurriculumVisible,
    classData,
    inputClassVisible,
    subjectData,
    inputSubjectVisible,
    chapterData,
    inputChapterVisible,
    serviceData,
    inputServiceVisible,
    showConfirm,
    loadingUpdateJadwalUjian,
    inputRombelUserVisible,
    searchRombelUserQuery,
    joinRombelClass,
    listRombelClass,
    listUsersByRombel,
    validateRombelClass,
    trigger,
    inputDatePickerVisible,
  } = useCreateJadwalUjianScreen();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{gap: 16, padding: 16}}>
        {HeaderComponent}
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}>
            <IcInfoBlue />
            <PoppinsText
              type="BoldPoppins"
              style={{color: Colors.primary.base, fontSize: 16}}>
              Info Detail
            </PoppinsText>
          </View>
          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Nama Ujian</PoppinsText>
            <Controller
              control={control}
              name={'title'}
              rules={{required: 'Nama ujian wajib diisi.'}}
              render={({field: {onChange, value}}) => (
                <InputText
                  onChangeText={onChange}
                  value={value}
                  backgroundColor={Colors.dark.neutral10}
                  errorMessage={errors?.title?.message}
                  placeholder="Masukkan Nama Ujian"
                  disabledRightIcon
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Tipe Ujian</PoppinsText>
            <Controller
              control={control}
              name="question_package_service"
              rules={{required: 'Tipe ujian wajib dipilih.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value?.name}
                  errorMessage={
                    errors?.question_package_service?.message as any
                  }
                  onPress={() => setInputServiceVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="Pilih Tipe Ujian"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Kelas</PoppinsText>
            <Controller
              control={control}
              name="list_rombel_class_school"
              rules={{
                required: 'Kelas wajib dipilih.',
                validate: validateRombelClass,
              }}
              render={({}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={joinRombelClass('name')}
                  errorMessage={
                    errors?.list_rombel_class_school?.message as any
                  }
                  onPress={() => setInputClassVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  disabledRightIcon
                  placeholder="Pilih Kelas"
                  rightIcon={ChevronDown}
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Mata Pelajaran</PoppinsText>
            <Controller
              control={control}
              name="subject"
              rules={
                listRombelClass &&
                curriculum && {required: 'Mata pelajaran wajib dipilih.'}
              }
              render={({field: {value}}) => {
                const isRombelClassValid =
                  !validateRombelClass(listRombelClass);
                return (
                  <InputText
                    onChangeText={() => {}}
                    editable={false}
                    value={value?.name}
                    errorMessage={errors?.subject?.message as any}
                    onPress={
                      isRombelClassValid && curriculum
                        ? () => setInputSubjectVisible(true)
                        : () => {}
                    }
                    backgroundColor={
                      isRombelClassValid && curriculum
                        ? Colors.dark.neutral10
                        : Colors.dark.neutral20
                    }
                    placeholder="Pilih Mata Pelajaran"
                    rightIcon={ChevronDown}
                    disabledRightIcon
                  />
                );
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Kurikulum</PoppinsText>
            <Controller
              control={control}
              name="curriculum"
              rules={{required: 'Kurikulum wajib dipilih.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value?.name}
                  errorMessage={errors?.curriculum?.message as any}
                  onPress={() => setInputCurriculumVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="Pilih Kurikulum"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}>
            <IcTimeBlue />
            <PoppinsText
              type="BoldPoppins"
              style={{color: Colors.primary.base, fontSize: 16}}>
              Jadwal & Waktu
            </PoppinsText>
          </View>

          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Ujian Dimulai</PoppinsText>
            <Controller
              control={control}
              name="start_time"
              rules={{required: 'Tanggal mulai ujian wajib diisi.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value}
                  errorMessage={errors?.start_time?.message as any}
                  onPress={() => setInputDatePickerVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="Pilih hari & tanggal"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
            <Controller
              control={control}
              name="start_time"
              rules={{required: 'Jam mulai ujian wajib diisi.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value}
                  errorMessage={errors?.start_time?.message as any}
                  onPress={() => setInputDatePickerVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="09:00"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <PoppinsText style={styles.label}>Ujian Selesai</PoppinsText>
            <Controller
              control={control}
              name="start_time"
              rules={{required: 'Tanggal selesai ujian wajib diisi.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value}
                  errorMessage={errors?.start_time?.message as any}
                  onPress={() => setInputDatePickerVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="Pilih hari & tanggal"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
            <Controller
              control={control}
              name="start_time"
              rules={{required: 'Jam selesai ujian wajib diisi.'}}
              render={({field: {value}}) => (
                <InputText
                  onChangeText={() => {}}
                  editable={false}
                  value={value}
                  errorMessage={errors?.start_time?.message as any}
                  onPress={() => setInputDatePickerVisible(true)}
                  backgroundColor={Colors.dark.neutral10}
                  placeholder="09:00"
                  rightIcon={ChevronDown}
                  disabledRightIcon
                />
              )}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.rulesContainer}>
            <IcNotesBlue />
            <PoppinsText
              type="BoldPoppins"
              style={{color: Colors.primary.base, fontSize: 16}}>
              Peraturan Ujian
            </PoppinsText>
          </View>
          <View style={styles.rulesInformation}>
            <View style={styles.rulesItemContainer}>
              <Checkbox
                height={20}
                width={20}
                isChecked
                containerStyle={{marginTop: 1}}
              />
              <View style={styles.rulesItem}>
                <PoppinsText style={{marginBottom: 4}} type="BoldPoppins">
                  Aktifkan lock screen
                </PoppinsText>
                <PoppinsText>
                  Murid akan menerima blocker apabila mencoba melanggar
                  peraturan ujian.
                </PoppinsText>
              </View>
            </View>
            <SectionList
              scrollEnabled={false}
              sections={tempSectionList}
              keyExtractor={val => val.id.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.rulesSectionContainer}>
                    <Checkbox
                      height={20}
                      width={20}
                      isChecked={item.isChecked}
                      containerStyle={{marginTop: 1}}
                    />
                    <View style={{flex: 1}}>
                      <PoppinsText>{item.label}</PoppinsText>
                    </View>
                  </View>
                );
              }}
              renderSectionHeader={({section: {title}}) => {
                return (
                  <PoppinsText
                    style={{marginTop: 24, marginBottom: 12}}
                    type="BoldPoppins">
                    {title}
                  </PoppinsText>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.swipeupContainer}>
          <Button
            label="Berikutnya"
            action={async () => {
              // handleSubmit(onSubmit);
              nextStep();
            }}
            isDisabled={
              loadingCreateJadwalUjian || (schedule_id && loadingGetJadwalUjian)
            }
            style={{width: '50%'}}
          />
        </View>
      </ScrollView>

      <InputCurriculum
        inputs={curriculumData}
        visible={inputCurriculumVisible}
        selectedOption={getValues('curriculum')}
        onClose={() => setInputCurriculumVisible(false)}
        onSelect={onSelectInputSwipeUp}
        height={100}
      />
      <InputClass
        inputs={classData}
        visible={inputClassVisible}
        onSelect={onSelectInputSwipeUp}
        selectedOption={getValues('list_rombel_class_school')}
        onClose={() => {
          trigger('list_rombel_class_school');
          return setInputClassVisible(false);
        }}
        height={100}
      />
      <InputRombelUser
        inputs={listUsersByRombel}
        visible={inputRombelUserVisible}
        onSelect={onSelectInputSwipeUp}
        selectedOption={getValues('users')}
        onClose={() => setInputRombelUserVisible(false)}
        setSearchRombelUserQuery={setSearchRombelUserQuery}
        searchRombelUserQuery={searchRombelUserQuery}
        height={100}
      />
      <InputMapel
        inputs={subjectData}
        visible={inputSubjectVisible}
        onSelect={onSelectInputSwipeUp}
        selectedOption={getValues('subject')}
        onClose={() => setInputSubjectVisible(false)}
        height={100}
      />
      <InputChapter
        inputs={chapterData}
        visible={inputChapterVisible}
        onSelect={onSelectInputSwipeUp}
        selectedOption={getValues('chapters')}
        onClose={() => setInputChapterVisible(false)}
        height={100}
      />
      <InputService
        inputs={serviceData}
        visible={inputServiceVisible}
        onSelect={onSelectInputSwipeUp}
        selectedOption={getValues('question_package_service')}
        onClose={() => setInputServiceVisible(false)}
        height={100}
      />

      <InputDateKP
        visible={inputDatePickerVisible}
        onSelect={() => setInputDatePickerVisible(false)}
        onClose={() => setInputDatePickerVisible(false)}
        height={100}
      />

      <PopUp
        show={showConfirm}
        close={() => setShowConfirm(false)}
        titleCancel={'Kembali'}
        titleConfirm="Simpan"
        title="Simpan Ujian"
        Icon={RobotConfirmIcon}
        desc="Apakah Anda yakin untuk menyimpan ujian yang telah dibuat?"
        actionCancel={() => setShowConfirm(false)}
        actionConfirm={onCreateJadwalUjain}
        disabledActionCancel={loadingCreateJadwalUjian}
        disabledActionConfirm={loadingUpdateJadwalUjian}
        additionalContent={<AdditonalPopupContent data={getValues()} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swipeupContainer: {
    padding: 16,
    alignItems: 'flex-end',
  },
  rulesSectionContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: 20,
  },
  rulesItem: {flex: 1, marginBottom: 12},
  rulesItemContainer: {
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: Colors.dark.neutral40,
  },
  rulesInformation: {
    backgroundColor: Colors.dark.neutral10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rulesContainer: {flexDirection: 'row', gap: 12},
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    gap: 22,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  label: {
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  sublabel: {
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
  inputContainer: {gap: 8},
  radioInput: {flexDirection: 'row', alignItems: 'center', gap: 10},
  helperText: {
    color: Colors.danger.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});

export default CreateInfoDetail;
