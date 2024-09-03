import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import InputForm from './components/InputForm';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import SwipeUpSchoolMaterials from './components/SwipeUpSchoolMaterials';
import Colors from '@constants/colors';
import ProgressBar from '@components/atoms/ProgressBar';
import IconClose from '@assets/svg/x.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import useEditSchoolMaterials from './useEditSchoolMaterials';
import {generalStyles} from '@constants/styles';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const EditSchoolMaterialsScreen = () => {
  const {
    kurikulum,
    subject,
    classes,
    isShowMaterialsType,
    setIsShowMaterialsType,
    materialsType,
    setMaterialsType,
    getMaterialTypes,
    isShowPopup,
    popupData,
    _handlerClose,
    postSchoolMaterial,
    materialsTitle,
    setMaterialsTitle,
    submited,
    materialsParams,
    chapter,

    //upload
    _handlerOnCloseSwipeUpUpload,
    _handlerShowSwipeUpUpload,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
    _handlerDocumentSelection,
    progressUpload,
    uploadList,
    attachmentTemporary,
    isShowSwipeUpUpload,
    loading,
    loadingFetchFile,
    handleValidData,
  } = useEditSchoolMaterials();

  const _renderSwipeUpUpload = () => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>
        {uploadList?.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                value?.onPress();
              }}
              style={styles.swipeUpUploadContent}>
              {value?.icon}
              <Text style={styles.swipeUpUploadLabel}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderChildrenSwipeUpMaterialType = () => {
    return (
      <SwipeUpSchoolMaterials
        data={getMaterialTypes?.data}
        selected={materialsType}
        setSelected={setMaterialsType}
        title={'Pilih Tipe Materi'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={'Ubah Materi Sekolah'}
        onPressIconLeft={() => {
          _handlerClose();
        }}
        backgroundColor={Colors.white}
      />
      <ScrollView style={styles.subContainer}>
        {materialsParams ? (
          <View style={styles.topColumn}>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Kurikulum</Text>
              <Text style={styles.valueTopContainer}>: {kurikulum?.value}</Text>
            </View>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Mata Pelajaran</Text>
              <Text style={styles.valueTopContainer}>: {subject?.value}</Text>
            </View>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Kelas</Text>
              <Text style={styles.valueTopContainer}>: {classes?.value}</Text>
            </View>
          </View>
        ) : null}
        {materialsParams ? (
          <InputForm
            title={chapter?.title}
            value={chapter?.value}
            disabled
            error={chapter?.error}
          />
        ) : null}
        <View>
          <View style={styles.rectangle} />
          <View style={styles.materialsContainer}>
            <View style={generalStyles.rowBetween}>
              <Text style={styles.materialsTitle}>Materi 1</Text>
            </View>
            <Text style={styles.titleButton}>Judul Materi</Text>
            <InputText
              value={materialsTitle}
              placeholder="Judul Materi"
              placeholderTextColor={Colors.dark.neutral50}
              onChangeText={setMaterialsTitle}
              inputTextStyle={styles.inputText}
              error={submited && !materialsTitle ? true : false}
              errorMessage={submited && !materialsTitle ? ' ' : undefined}
              borderWidth={submited && !materialsTitle ? 2 : 0}
            />
            {submited && !materialsTitle ? (
              <Text style={[styles.titleButton, styles.errorText]}>
                Judul materi wajib diisi
              </Text>
            ) : null}
            <InputForm
              onPress={materialsType?.onPress}
              title={materialsType?.title}
              value={materialsType?.value}
              selected={materialsType?.value !== materialsType?.initValue}
              error={materialsType?.error}
            />
            {materialsType?.type ? (
              attachmentTemporary?.uri ? (
                <View style={styles.dateCardContainer}>
                  {attachmentTemporary?.fileType === 'video' &&
                  !loadingFetchFile ? (
                    <View style={styles.containerVideo}>
                      <ImageBackground
                        source={{uri: attachmentTemporary?.uri ?? ''}}
                        imageStyle={styles.imageBackground}>
                        <View style={styles.attachmentImageContainer}>
                          {progressUpload === '100%' ? (
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
                          ) : null}
                          <View />

                          {progressUpload === '100%' ? (
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

                  {attachmentTemporary?.fileType === 'file' &&
                  !loadingFetchFile ? (
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

                      {progressUpload === '100%' ? (
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
                </View>
              ) : (
                <View style={styles.dateContainer}>
                  <Text style={styles.titleButton}>Unggah Materi</Text>

                  <TouchableOpacity
                    onPress={() => {
                      if (materialsType?.type === 'video') {
                        _handlerShowSwipeUpUpload();
                      } else {
                        _handlerDocumentSelection();
                      }
                    }}
                    style={styles.uploadButton}>
                    <IconUploadBlue width={24} height={24} />
                    <Text style={styles.uploadTitle}>
                      {materialsType?.type === 'presentation'
                        ? 'Unggah PPT'
                        : materialsType?.type === 'video'
                        ? 'Unggah Video'
                        : 'Unggah PDF'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label={'Simpan'}
            action={postSchoolMaterial}
            fontSize={16}
            isDisabled={!handleValidData()}
          />
        </View>
      </ScrollView>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowMaterialsType}
        onClose={() => {
          setIsShowMaterialsType(false);
        }}
        height={500}
        children={renderChildrenSwipeUpMaterialType()}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpUpload}
        onClose={_handlerOnCloseSwipeUpUpload}
        children={_renderSwipeUpUpload()}
      />

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
      {loading || loadingFetchFile ? <LoadingIndicator /> : null}
    </SafeAreaView>
  );
};

export {EditSchoolMaterialsScreen};
