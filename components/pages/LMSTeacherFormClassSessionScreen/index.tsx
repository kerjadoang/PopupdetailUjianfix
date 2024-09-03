import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {
  PopUp,
  Button,
  SwipeUp,
  InputText,
  DateTimePickerForm,
} from '@components/atoms';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import IconInformationGrey from '@assets/svg/ic16_info.svg';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import IconArrowBottomGrey from '@assets/svg/ic_arrow_bottom_grey.svg';
import useLMSTeacherFormClassSessionScreen from './useLMSTeacherFormClassSessionScreen';
import ProgressBar from '@components/atoms/ProgressBar';
import IconClose from '@assets/svg/x.svg';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import Colors from '@constants/colors';
import Video from 'react-native-video';

const posterVideo = Image.resolveAssetSource(
  require('@assets/images/default_video.png'),
).uri;

const LMSTeacherFormClassSessionScreen = () => {
  const {
    isLoading,
    valueDatePicker,
    isShowSwipeUpChooseDate,
    isShowSwipeUpInfromation,
    isShowSwipeUpUpload,
    isShowSwipeUpCurriculum,
    isShowSwipeUpClass,
    isShowSwipeUpSubjectMatter,
    type,
    platform,
    isShowPopup,
    popupData,
    attachmentTemporary,
    isShowSnackBar,
    snackBarLabel,
    snackBarType,
    progressUpload,
    uploadList,
    curriculumId,
    curriculumName,
    curriculumData,
    curriculumErrorMessage,
    classId,
    classData,
    className,
    classErrorMessage,
    subjectMatterName,
    subjectMatterData,
    subjectMatterErrorMessage,
    title,
    duration,
    description,
    datePickerFrom,
    datePickerFromErrorMessage,
    isFromDetailLMS,
    attachmentDataId,
    setValueDatePicker,
    _handlerOnCloseSwipeUpChooseDate,
    _handlerOnCloseSwipeUpUpload,
    _handlerShowSwipeUpDate,
    _handlerShowSwipeUpUpload,
    _handlerShowSwipeUpInformation,
    _handlerSelectedSessionClassType,
    _handlerSelectedSessionClassPlatform,
    _handlerOnPressSwipeUpSelectDateButton,
    _handlerOnChangeTitle,
    _handlerOnChangeDuration,
    _handlerOnChangeDescription,
    _handlerOnPressCloseSnackBar,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
    _handlerOnCloseSwipeUpInformation,
    _handlerOnCloseSwipeUpCurriculum,
    _handlerOnCloseSwipeUpClass,
    _handlerOnCloseSwipeUpSubjectMatter,
    _handlerShowSwipeUpCurriculum,
    _handlerShowSwipeUpClass,
    _handlerShowSwipeUpSubjectMatter,
    _handlerOnSelectCurriculum,
    _handlerOnSelectClass,
    _handlerOnSelectSubjectMatter,
    _handlerPopupNotSaved,
    _handlerValidateAllField,
  } = useLMSTeacherFormClassSessionScreen();

  const isAttachmentAvailable = attachmentTemporary?.uri;
  const isDoneProgress = progressUpload == '100%';
  const navigation = useNavigation();
  const sessionTypeList = ['Langsung', 'Rekaman'];
  const sessionPlatformList = ['Google Meet'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={isFromDetailLMS ? 'Ubah Sesi Kelas' : 'Buat Sesi Kelas'}
          onPressIconLeft={() => {
            _handlerPopupNotSaved();
          }}
        />
      ),
    });
  }, []);

  const _renderSwipeUpInformation = () => {
    return (
      <View style={styles.swipeUpInformationContainer}>
        <Text style={styles.swipeUpInformationHeadTitle}>
          {'Tipe Sesi Kelas'}
        </Text>
        <Text style={styles.swipeUpInformationDescription}>
          <Text style={styles.swipeUpInformationTitle}>
            {'Sesi Kelas Langsung: '}
          </Text>
          {
            'Sesi mengajar jarak jauh dengan metode live menggunakan media Google Meet.'
          }
        </Text>

        <Text style={styles.swipeUpInformationDescription}>
          <Text style={styles.swipeUpInformationTitle}>
            {'Sesi Kelas Rekaman: '}
          </Text>
          {
            'Sesi mengajar dengan metode rekaman menggunakan media berupa video yang dapat diunduh Murid.'
          }
        </Text>

        <Button
          action={() => {
            _handlerOnCloseSwipeUpInformation();
          }}
          label={'Tutup'}
        />
      </View>
    );
  };

  const _renderSwipeUpUpload = () => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>
        {uploadList?.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={value?.onPress}
              style={styles.swipeUpUploadContent}>
              {value?.icon}
              <Text style={styles.swipeUpUploadLabel}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderSwipeUpCurriculum = () => {
    return (
      <View style={styles.swipeUpRootContainer}>
        <Text style={styles.swipeUpChooseDateHeaderTitle}>
          {'Pilih Kurikulum'}
        </Text>

        <ScrollView contentContainerStyle={styles.swipeUpDateWrapper}>
          {curriculumData?.map((value: any, index: any) => {
            const isSelectedItem = curriculumName === value?.name;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  _handlerOnSelectCurriculum(value?.id, value?.name);
                }}
                style={styles.swipeUpUploadContent}>
                <View
                  style={
                    isSelectedItem
                      ? styles.outterDotActive
                      : styles.outterDotPassive
                  }>
                  <View style={styles.innerDot} />
                </View>

                <Text
                  style={
                    isSelectedItem
                      ? styles.descriptionSwipeUpActive
                      : styles.descriptionSwipeUpPasive
                  }>
                  {value?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const _renderSwipeUpClass = () => {
    return (
      <View style={styles.swipeUpRootContainer}>
        <Text style={styles.swipeUpChooseDateHeaderTitle}>{'Pilih Kelas'}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.swipeUpDateWrapper}>
          {classData &&
            classData?.map((value: any, index: any) => {
              const isSelectedItem =
                className === value?.rombel_class_school_name;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    _handlerOnSelectClass(
                      value?.class_id,
                      value?.rombel_class_school_id,
                      value?.rombel_class_school_name,
                    );
                  }}
                  style={styles.swipeUpUploadContent}>
                  <View
                    style={
                      isSelectedItem
                        ? styles.outterDotActive
                        : styles.outterDotPassive
                    }>
                    <View style={styles.innerDot} />
                  </View>

                  <Text
                    style={
                      isSelectedItem
                        ? styles.descriptionSwipeUpActive
                        : styles.descriptionSwipeUpPasive
                    }>
                    {value?.rombel_class_school_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  const _renderSwipeSubjectMatter = () => {
    return (
      <View style={styles.swipeUpRootContainer}>
        <Text style={styles.swipeUpChooseDateHeaderTitle}>
          {'Pilih Mata Pelajaran'}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.swipeUpDateWrapper}>
          {subjectMatterData?.map((value: any, index: any) => {
            const isSelectedItem = subjectMatterName === value?.name;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  _handlerOnSelectSubjectMatter(value?.id, value?.name);
                }}
                style={styles.swipeUpUploadContent}>
                <View
                  style={
                    isSelectedItem
                      ? styles.outterDotActive
                      : styles.outterDotPassive
                  }>
                  <View style={styles.innerDot} />
                </View>

                <Text
                  style={
                    isSelectedItem
                      ? styles.descriptionSwipeUpActive
                      : styles.descriptionSwipeUpPasive
                  }>
                  {value?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const _renderSwipeUpChooseDate = () => {
    return (
      <View style={styles.swipeUpChooseDateWrapper}>
        <Text style={styles.swipeUpChooseDateHeaderTitle}>
          {'Pilih Tanggal & Jam Mulai'}
        </Text>

        <View style={styles.swipeUpDateContainer}>
          <DateTimePickerForm
            selected={valueDatePicker}
            onChange={setValueDatePicker}
          />
        </View>

        <View style={styles.swipeUpDateButtonWrapper}>
          <Button
            style={styles.swipeUpButtonConfirm}
            label={'Simpan'}
            action={() => {
              _handlerOnPressSwipeUpSelectDateButton();
            }}
          />
        </View>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={styles.reasonAttendanceContainer}>
          <View style={styles.row}>
            <Text style={{...styles.titleField, marginRight: 4}}>
              {'Tipe Sesi Kelas'}
            </Text>
            <TouchableOpacity
              style={styles.iconInformation}
              onPress={() => {
                _handlerShowSwipeUpInformation();
              }}>
              <IconInformationGrey width={16} height={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {sessionTypeList &&
              sessionTypeList?.map((value: any, index: any) => {
                const isSelectedItem = type === value;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      _handlerSelectedSessionClassType(value);
                    }}
                    style={styles.swipeUpContentContainer}>
                    <View
                      style={
                        isSelectedItem
                          ? styles.outterDotActive
                          : styles.outterDotPassive
                      }>
                      <View style={styles.innerDot} />
                    </View>

                    <Text
                      style={
                        isSelectedItem
                          ? styles.descriptionSwipeUpActive
                          : styles.descriptionSwipeUpPasive
                      }>
                      {value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        {type === 'Langsung' ? (
          <View style={{...styles.reasonAttendanceContainer, marginBottom: 16}}>
            <Text style={styles.titleField}>
              {'Platform Sesi Kelas Langsung'}
            </Text>

            <View style={styles.row}>
              {sessionPlatformList &&
                sessionPlatformList?.map((value: any, index: any) => {
                  const isSelectedItem = platform === value;

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        _handlerSelectedSessionClassPlatform(value);
                      }}
                      style={{
                        ...styles.swipeUpContentContainer,
                        marginBottom: 8,
                      }}>
                      <View
                        style={
                          isSelectedItem
                            ? styles.outterDotActive
                            : styles.outterDotPassive
                        }>
                        <View style={styles.innerDot} />
                      </View>

                      <Text
                        style={
                          isSelectedItem
                            ? styles.descriptionSwipeUpActive
                            : styles.descriptionSwipeUpPasive
                        }>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        ) : null}

        {type === 'Langsung' ? null : (
          <>
            {isAttachmentAvailable ? (
              <View style={styles.dateCardContainer}>
                <Text style={styles.uploadTitleField}>{'Video Rekaman'}</Text>

                {attachmentTemporary?.fileType == 'image' ? (
                  <View style={{marginBottom: 16}}>
                    <Video
                      source={{uri: attachmentTemporary?.uri}} // Can be a URL or a local file.
                      paused={true}
                      controls={false}
                      poster={posterVideo}
                      style={styles.videoThumbnail}
                    />
                    {/* <ImageBackground
                      source={{uri: attachmentTemporary?.uri}}
                      imageStyle={styles.imageBackground}> */}
                    <View style={styles.attachmentImageContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          _handlerOnCloseAttachmentUpload();
                        }}>
                        <IconClose
                          width={8}
                          height={8}
                          style={styles.iconClose}
                        />
                      </TouchableOpacity>
                      <View />

                      {isDoneProgress ? (
                        <TouchableOpacity
                          onPress={() => {
                            _handlerReUploadImage();
                          }}
                          style={styles.attachmentResendContainer}>
                          <Text style={styles.attachmentResendTitle}>
                            {'Unggah ulang'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <ProgressBar progress={progressUpload} />
                      )}
                    </View>
                    {/* </ImageBackground> */}
                  </View>
                ) : null}

                {attachmentTemporary?.fileType == 'file' ? (
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.attachmentFileContainer}>
                    <View style={styles.headAttachmentFileContainer}>
                      <Text style={styles.attachmentFileHeadTitle}>
                        {'File'}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          _handlerOnCloseAttachmentUpload();
                        }}>
                        <IconClose
                          width={8}
                          height={8}
                          style={styles.iconClose}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.attachmentDescriptionWrapper}>
                      <IconFileBlue width={24} height={24} />

                      <Text style={styles.attachmentFileDescriptionTitle}>
                        {attachmentTemporary?.name}
                      </Text>
                    </View>

                    {isDoneProgress ? (
                      <TouchableOpacity
                        onPress={() => {
                          _handlerReUploadFile();
                        }}
                        style={styles.attachmentResendContainer}>
                        <Text style={styles.attachmentResendTitle}>
                          {'Unggah ulang'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <ProgressBar progress={progressUpload} />
                    )}
                  </TouchableOpacity>
                ) : null}

                <Text style={styles.noteField}>
                  {'Format MP4. Maksimum 230MB.'}
                </Text>

                {!attachmentTemporary ? (
                  <Text style={styles.noteFieldDanger}>
                    {'Video rekaman wajib diunggah.'}
                  </Text>
                ) : null}
              </View>
            ) : (
              <View style={styles.dateContainer}>
                <Text style={styles.uploadTitleField}>{'Video Rekaman'}</Text>

                <TouchableOpacity
                  onPress={() => {
                    _handlerShowSwipeUpUpload();
                  }}
                  style={styles.uploadButton}>
                  <IconUploadBlue width={24} height={24} />
                  <Text style={styles.uploadTitle}>{'Unggah Video'}</Text>
                </TouchableOpacity>

                <Text style={styles.noteField}>
                  {'Format MP4. Maksimum 230MB.'}
                </Text>

                {!attachmentDataId ? (
                  <Text style={styles.noteFieldDanger}>
                    {'Video rekaman wajib diunggah.'}
                  </Text>
                ) : null}
              </View>
            )}
          </>
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.titleField}>{'Kurikulum'}</Text>

          <TouchableOpacity
            // disabled
            onPress={() => {
              _handlerShowSwipeUpCurriculum();
            }}
            style={[
              curriculumErrorMessage
                ? styles.inputFieldError
                : styles.inputField,
              {
                backgroundColor: Colors.dark.neutral10,
              },
            ]}>
            <Text style={styles.inputFieldValue}>
              {curriculumName || 'Pilih Kurikulum'}
            </Text>
            {/* <IconArrowBottomGrey width={24} height={24} /> */}
            <IconArrowBottomBlue width={24} height={24} />
          </TouchableOpacity>

          {curriculumErrorMessage ? (
            <Text style={styles.titleError}>{curriculumErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.titleField}>{'Kelas'}</Text>

          <TouchableOpacity
            onPress={() => {
              _handlerShowSwipeUpClass();
            }}
            style={
              classErrorMessage ? styles.inputFieldError : styles.inputField
            }>
            <Text style={styles.inputFieldValue}>
              {className || 'Pilih Kelas'}
            </Text>

            <IconArrowBottomBlue width={24} height={24} />
          </TouchableOpacity>

          {classErrorMessage ? (
            <Text style={styles.titleError}>{classErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.titleField}>{'Mata Pelajaran'}</Text>

          <TouchableOpacity
            disabled={!curriculumId || !classId}
            onPress={() => {
              _handlerShowSwipeUpSubjectMatter();
            }}
            style={[
              (curriculumId || classId) && subjectMatterErrorMessage
                ? styles.inputFieldError
                : styles.inputField,
              {
                backgroundColor:
                  !curriculumId || !classId
                    ? Colors.dark.neutral20
                    : Colors.dark.neutral10,
              },
            ]}>
            <Text
              style={{
                ...styles.inputFieldValue,
                color:
                  !curriculumId || !classId
                    ? Colors.dark.neutral50
                    : Colors.dark.neutral100,
              }}>
              {subjectMatterName || 'Pilih Mata Pelajaran'}
            </Text>

            {!curriculumId || !classId ? (
              <IconArrowBottomGrey width={24} height={24} />
            ) : (
              <IconArrowBottomBlue width={24} height={24} />
            )}
          </TouchableOpacity>

          {(curriculumId || classId) && subjectMatterErrorMessage ? (
            <Text style={styles.titleError}>{subjectMatterErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.dateContainer}>
          <InputText
            onChangeText={(text: any) => {
              _handlerOnChangeTitle(text);
            }}
            label={'Judul'}
            value={title?.value}
            error={!title?.isValid}
            errorMessage={title?.errorMessage}
            backgroundColor={Colors.dark.neutral10}
            placeholder={'Masukkan Judul/Bab'}
          />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.titleField}>{'Tanggal & Jam Mulai'}</Text>

          <TouchableOpacity
            onPress={() => {
              _handlerShowSwipeUpDate();
            }}
            style={
              datePickerFromErrorMessage
                ? styles.inputFieldError
                : styles.inputField
            }>
            <Text style={styles.inputFieldValue}>
              {datePickerFrom || 'Pilih tanggal & jam'}
            </Text>

            <IconCalendarBlue width={24} height={24} />
          </TouchableOpacity>

          {datePickerFromErrorMessage ? (
            <Text style={styles.titleError}>{datePickerFromErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.dateContainer}>
          <InputText
            onChangeText={(text: any) => {
              _handlerOnChangeDuration(text);
            }}
            label={'Durasi (Menit)'}
            value={duration?.value}
            error={!duration?.isValid}
            errorMessage={duration?.errorMessage}
            backgroundColor={Colors.dark.neutral10}
            placeholder={'Cth: 120'}
            keyboardType={'numeric'}
          />
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.titleField}>{'Deskripsi (opsional)'}</Text>

          <InputText
            multiline
            inputTextStyle={{height: 120}}
            isNotOutline
            value={description}
            borderRadius={10}
            placeholder={'Tulis deskripsi sesi kelas...'}
            onChangeText={(text: any) => {
              _handlerOnChangeDescription(text);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.container}>{_renderContent()}</View>
        </ScrollView>

        <View style={{padding: 16}}>
          <Button
            action={() => {
              _handlerValidateAllField();
            }}
            label={'Simpan'}
          />
        </View>

        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />

        <SwipeUp
          height={100}
          visible={isShowSwipeUpInfromation}
          onClose={_handlerOnCloseSwipeUpInformation}
          children={_renderSwipeUpInformation()}
        />

        <SwipeUp
          height={100}
          visible={isShowSwipeUpUpload}
          onClose={_handlerOnCloseSwipeUpUpload}
          children={_renderSwipeUpUpload()}
        />

        {curriculumData ? (
          <SwipeUp
            height={100}
            visible={isShowSwipeUpCurriculum}
            onClose={_handlerOnCloseSwipeUpCurriculum}
            children={_renderSwipeUpCurriculum()}
          />
        ) : null}

        {classData ? (
          <SwipeUp
            height={100}
            visible={isShowSwipeUpClass}
            onClose={_handlerOnCloseSwipeUpClass}
            children={_renderSwipeUpClass()}
          />
        ) : null}

        {subjectMatterData ? (
          <SwipeUp
            height={100}
            visible={isShowSwipeUpSubjectMatter}
            onClose={_handlerOnCloseSwipeUpSubjectMatter}
            children={_renderSwipeSubjectMatter()}
          />
        ) : null}

        <SwipeUp
          height={100}
          visible={isShowSwipeUpChooseDate}
          onClose={_handlerOnCloseSwipeUpChooseDate}
          children={_renderSwipeUpChooseDate()}
        />

        <SnackbarResult
          label={snackBarLabel}
          visible={isShowSnackBar}
          type={snackBarType}
          onPressClose={() => {
            _handlerOnPressCloseSnackBar();
          }}
        />
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default LMSTeacherFormClassSessionScreen;
