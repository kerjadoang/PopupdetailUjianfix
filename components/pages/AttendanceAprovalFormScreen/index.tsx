import React, {useLayoutEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {Button, DatePicker, InputText, PopUp, SwipeUp} from '@components/atoms';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import useAttendanceApprovalFormScreen from './useAttendanceApprovalFormScreen';
import ProgressBar from '@components/atoms/ProgressBar';
import IconClose from '@assets/svg/x.svg';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const AttendanceApprovalFormScreen = () => {
  const {
    isLoading,
    valueDatePicker,
    isShowSwipeUpDate,
    isShowSwipeUpChooseDate,
    isShowSwipeUpUpload,
    attendanceReason,
    isShowPopup,
    popupData,
    datePickerFrom,
    datePickerUntil,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFromUntil,
    isDisableButtonReset,
    isDisableButtonApply,
    absentCount,
    attachmentTemporary,
    isShowSnackBar,
    snackBarLabel,
    snackBarType,
    progressUpload,
    uploadList,
    setValueDatePicker,
    _handlerOnCloseSwipeUpDate,
    _handlerOnCloseSwipeUpChooseDate,
    _handlerOnCloseSwipeUpUpload,
    _handlerShowSwipeUpDate,
    _handlerShowSwipeUpUpload,
    _handlerSelectedAttendanceReason,
    _handlerSubmitRequestApproval,
    _handlerOnPressSwipeUpFromButton,
    _handlerOnPressSwipeUpUntilButton,
    _handlerOnPressSwipeUpResetButton,
    _handlerOnPressSwipeUpApplyButton,
    _handlerOnPressSwipeUpSelectDateButton,
    _handlerOnChangeNote,
    _handlerOnPressCloseSnackBar,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
  } = useAttendanceApprovalFormScreen();

  const isAttachmentAvailable = attachmentTemporary?.uri;
  const isAttachmentImage = attachmentTemporary?.fileType == 'image';
  const isAttachmentFile = attachmentTemporary?.fileType == 'file';
  const isDoneProgress = progressUpload == '100%';
  const navigation = useNavigation();
  const attendanceReasonList = ['Sakit', 'Izin'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Ajukan Ketidakhadiran'} />,
    });
  }, []);

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

  const _renderSwipeUpDate = () => {
    return (
      <>
        <View style={styles.swipeUpDateWrapper}>
          <Text style={styles.swipeUpDateHeaderTitle}>{'Pilih Tanggal'}</Text>

          <View style={styles.swipeUpDateContainer}>
            <View style={styles.swipeUpdateLeftField}>
              <Text style={styles.swipeUpDateTitle}>{'Dari'}</Text>
              <TouchableOpacity
                onPress={_handlerOnPressSwipeUpFromButton}
                style={styles.swipeUpDateButton}>
                <Text style={styles.swipeUpDateLabelButton}>
                  {datePickerFrom ? datePickerConvertFrom : '-'}
                </Text>

                <IconCalendarBlue width={24} height={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.swipeUpdateLeftField}>
              <Text style={styles.swipeUpDateTitle}>{'Sampai'}</Text>
              <TouchableOpacity
                onPress={_handlerOnPressSwipeUpUntilButton}
                style={styles.swipeUpDateButton}>
                <Text style={styles.swipeUpDateLabelButton}>
                  {datePickerUntil ? datePickerConvertUntil : '-'}
                </Text>

                <IconCalendarBlue width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.swipeUpButtonWrapper}>
            <Button
              outline
              style={styles.swipeUpButtonCancel}
              label={'Atur Ulang'}
              isDisabled={isDisableButtonReset}
              action={() => {
                _handlerOnPressSwipeUpResetButton();
              }}
            />
            <Button
              style={styles.swipeUpButtonConfirm}
              label={'Terapkan'}
              isDisabled={isDisableButtonApply}
              action={() => {
                _handlerOnPressSwipeUpApplyButton();
              }}
            />
          </View>
        </View>

        {isShowSwipeUpChooseDate ? (
          <SwipeUp
            height={100}
            visible={isShowSwipeUpChooseDate}
            onClose={_handlerOnCloseSwipeUpChooseDate}
            children={_renderSwipeUpChooseDate()}
          />
        ) : null}
      </>
    );
  };

  const _renderSwipeUpChooseDate = () => {
    return (
      <View style={styles.swipeUpChooseDateWrapper}>
        <Text style={styles.swipeUpChooseDateHeaderTitle}>
          {'Pilih Tanggal'}
        </Text>
        <DatePicker selected={valueDatePicker} onChange={setValueDatePicker} />

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
          <Text style={styles.titleField}>{'Pilih Alasan Ketidakhadiran'}</Text>

          <View style={styles.row}>
            {attendanceReasonList &&
              attendanceReasonList?.map((value: any, index: any) => {
                const isSelectedItem = attendanceReason === value;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      _handlerSelectedAttendanceReason(value);
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

        <View style={styles.rowSpaceBetween}>
          <Text style={styles.titleField}>{'Tanggal Tidak Hadir'}</Text>
          <Text style={styles.dangerValueField}>{`${absentCount} Hari`}</Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.titleField}>{'Tanggal'}</Text>

          <TouchableOpacity
            onPress={() => {
              _handlerShowSwipeUpDate();
            }}
            style={styles.inputField}>
            <Text style={styles.inputFieldValue}>{datePickerFromUntil}</Text>

            <IconCalendarBlue width={24} height={24} />
          </TouchableOpacity>
        </View>

        {isAttachmentAvailable ? (
          <View style={styles.dateCardContainer}>
            <Text style={styles.uploadTitleField}>
              {'Foto/Lampiran (opsional)'}
            </Text>

            <Text style={styles.noteField}>
              {
                'Cth: Surat izin sakit atau surat lainnya.\nMaksimum ukuran file 100 MB.\nFile dapat dalam format .doc/.pdf/.png/.jpeg/.jpg.'
              }
            </Text>

            {isAttachmentImage ? (
              <View style={{marginBottom: 16}}>
                <ImageBackground
                  source={{uri: attachmentTemporary?.uri}}
                  imageStyle={styles.imageBackground}>
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
                </ImageBackground>
              </View>
            ) : null}

            {isAttachmentFile ? (
              <TouchableOpacity
                onPress={() => {}}
                style={styles.attachmentFileContainer}>
                <View style={styles.headAttachmentFileContainer}>
                  <Text style={styles.attachmentFileHeadTitle}>{'File'}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      _handlerOnCloseAttachmentUpload();
                    }}>
                    <IconClose width={8} height={8} style={styles.iconClose} />
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

            <TouchableOpacity
              onPress={() => {
                _handlerShowSwipeUpUpload();
              }}
              style={styles.uploadButton}>
              <IconUploadBlue width={24} height={24} />
              <Text style={styles.uploadTitle}>{'Unggah Foto/Lampiran'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.dateContainer}>
            <Text style={styles.uploadTitleField}>
              {'Foto/Lampiran (opsional)'}
            </Text>

            <Text style={styles.noteField}>
              {
                'Cth: Surat izin sakit atau surat lainnya.\nMaksimum ukuran file 100 MB.\nFile dapat dalam format .doc/.pdf/.png/.jpeg./.jpg'
              }
            </Text>

            <TouchableOpacity
              onPress={() => {
                _handlerShowSwipeUpUpload();
              }}
              style={styles.uploadButton}>
              <IconUploadBlue width={24} height={24} />
              <Text style={styles.uploadTitle}>{'Unggah Foto/Lampiran'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.noteContainer}>
          <Text style={styles.titleField}>{'Catatan (opsional)'}</Text>

          <InputText
            multiline
            inputTextStyle={{height: 120}}
            isNotOutline
            borderRadius={10}
            placeholder={'Tulis catatan di sini...'}
            onChangeText={(text: any) => {
              _handlerOnChangeNote(text);
            }}
          />
        </View>

        <Button
          action={() => {
            _handlerSubmitRequestApproval();
          }}
          label={'Ajukan Ketidakhadiran'}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.container}>{_renderContent()}</View>
        </ScrollView>

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
          visible={isShowSwipeUpDate}
          onClose={_handlerOnCloseSwipeUpDate}
          children={_renderSwipeUpDate()}
        />

        <SwipeUp
          height={100}
          visible={isShowSwipeUpUpload}
          onClose={_handlerOnCloseSwipeUpUpload}
          children={_renderSwipeUpUpload()}
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

export default AttendanceApprovalFormScreen;
