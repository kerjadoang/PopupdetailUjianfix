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
import useAddSchoolMaterials from './useAddSchoolMaterials';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import SwipeUpSchoolMaterials from './components/SwipeUpSchoolMaterials';
import Colors from '@constants/colors';
import IconTrash from '@assets/svg/ic24_trash_red.svg';
import ProgressBar from '@components/atoms/ProgressBar';
import IconClose from '@assets/svg/x.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';

const AddSchoolMaterials = () => {
  const {
    dataType,
    kurikulum,
    subject,
    classes,
    setKurikulum,
    setClasses,
    isShowClasses,
    isShowKurikulum,
    isShowMaterialsType,
    setIsShowClasses,
    setIsShowKurikulum,
    setIsShowMaterialsType,
    curriculum,
    materialsType,
    setMaterialsType,
    getMaterialTypes,
    navigateToScreen,
    handleDisabled,
    listClass,
    isShowPopup,
    popupData,
    _handlerClose,
    postSchoolMaterial,
    materialsTitle,
    setMaterialsTitle,
    submited,
    materialsIndex,
    setMaterialsIndex,
    addSchoolMaterials,
    materialsParams,
    chapter,
    _handlerRemoveMaterials,

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
    indexAttachment,
    setIndexAttachment,
    handleValidData,
  } = useAddSchoolMaterials();

  const setIndex = async (index: number) => {
    await setIndexAttachment(index);
  };

  const _renderSwipeUpUpload = (idx: number) => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>
        {uploadList?.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                value?.onPress();
                setIndexAttachment(idx);
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

  const renderChildrenSwipeUpKurikulum = () => {
    return (
      <SwipeUpSchoolMaterials
        data={curriculum?.data}
        selected={kurikulum}
        setSelected={setKurikulum}
        title={'Pilih Kurikulum'}
      />
    );
  };

  const renderChildrenSwipeUpClasses = () => {
    return (
      <SwipeUpSchoolMaterials
        data={listClass}
        selected={classes}
        setSelected={setClasses}
        title={'Pilih Kelas'}
      />
    );
  };

  const renderChildrenSwipeUpMaterialType = () => {
    return (
      <SwipeUpSchoolMaterials
        data={getMaterialTypes?.data}
        selected={materialsType[materialsIndex]}
        setSelected={setMaterialsType}
        title={'Pilih Tipe Materi'}
        isArray
        index={materialsIndex}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={'Tambah Materi Sekolah'}
        onPressIconLeft={() => {
          _handlerClose();
        }}
        backgroundColor={Colors.white}
      />
      <ScrollView style={styles.subContainer}>
        {materialsParams ? (
          <View style={{flexDirection: 'column', marginBottom: 8}}>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Kurikulum</Text>
              <Text style={styles.valueTopContainer}>: {kurikulum?.value}</Text>
            </View>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Kelas</Text>
              <Text style={styles.valueTopContainer}>: {classes?.value}</Text>
            </View>
            <View style={styles.topSubContainer}>
              <Text style={styles.titleTopContainer}>Mata Pelajaran</Text>
              <Text style={styles.valueTopContainer}>: {subject?.value}</Text>
            </View>
          </View>
        ) : null}
        {!materialsParams ? (
          dataType?.map((i: any, index: number) => (
            <InputForm
              key={index}
              onPress={() => {
                i?.title === 'Mata Pelajaran' || i?.title === 'Bab'
                  ? navigateToScreen(i?.title)
                  : i?.onPress();
              }}
              title={i?.title}
              value={i?.value}
              selected={
                i?.title === 'Kurikulum' ? true : i?.value !== i?.initValue
              }
              disabled={i?.disabled ?? handleDisabled(i?.title)}
              error={i?.error}
            />
          ))
        ) : (
          <InputForm
            onPress={() => {
              navigateToScreen(chapter?.title);
            }}
            title={chapter?.title}
            value={chapter?.value}
            selected={chapter?.value !== chapter?.initValue}
            disabled={handleDisabled(chapter?.title)}
            error={chapter?.error}
          />
        )}
        {materialsType?.map((i: any, index: number) => {
          return (
            <View key={`${index}`}>
              <View style={styles.rectangle} />
              <View style={styles.materialsContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.materialsTitle}>Materi {index + 1}</Text>
                  {index >= 1 ? (
                    <TouchableOpacity
                      onPress={() => _handlerRemoveMaterials(i, index)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <IconTrash
                        width={24}
                        height={24}
                        style={{marginTop: -8}}
                      />
                      <Text
                        style={[
                          styles.materialsTitle,
                          {
                            marginLeft: 4,
                            color: Colors.danger.base,
                          },
                        ]}>
                        Hapus
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <Text style={styles.titleButton}>Judul Materi</Text>
                <InputText
                  value={materialsTitle[index]}
                  placeholder="Judul Materi"
                  placeholderTextColor={Colors.dark.neutral50}
                  onChangeText={text =>
                    setMaterialsTitle((prevMaterialsTitle: any) => {
                      const updatedMaterialsTitle = [...prevMaterialsTitle];
                      updatedMaterialsTitle[index] = text;
                      return updatedMaterialsTitle;
                    })
                  }
                  inputTextStyle={styles.inputText}
                  error={submited && !materialsTitle[index] ? true : false}
                  errorMessage={
                    submited && !materialsTitle[index] ? ' ' : undefined
                  }
                  borderWidth={submited && !materialsTitle[index] ? 2 : 0}
                />
                {submited && !materialsTitle[index] ? (
                  <Text
                    style={[
                      styles.titleButton,
                      {
                        color: Colors.danger.base,
                        fontSize: 12,
                        lineHeight: 16,
                        marginTop: -20,
                        marginBottom: 16,
                      },
                    ]}>
                    Judul materi wajib diisi
                  </Text>
                ) : null}
                <InputForm
                  onPress={materialsType[index]?.onPress}
                  title={materialsType[index]?.title}
                  value={materialsType[index]?.value}
                  selected={
                    materialsType[index]?.value !==
                    materialsType[index]?.initValue
                  }
                  error={materialsType[index]?.error}
                  index={index}
                  setIndex={setMaterialsIndex}
                />
                {materialsType[index]?.type ? (
                  attachmentTemporary[index]?.uri ? (
                    <View style={styles.dateCardContainer}>
                      {attachmentTemporary[index]?.fileType === 'video' ? (
                        <View style={{marginBottom: 16}}>
                          <ImageBackground
                            source={{uri: attachmentTemporary[index]?.uri}}
                            imageStyle={styles.imageBackground}>
                            <View style={styles.attachmentImageContainer}>
                              {progressUpload[index] === '100%' ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    _handlerOnCloseAttachmentUpload(index);
                                  }}>
                                  <IconClose
                                    width={8}
                                    height={8}
                                    style={styles.iconClose}
                                  />
                                </TouchableOpacity>
                              ) : null}
                              <View />

                              {progressUpload[index] === '100%' ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    _handlerReUploadImage(index);
                                  }}
                                  style={styles.attachmentResendContainer}>
                                  <Text style={styles.attachmentResendTitle}>
                                    {'Unggah ulang'}
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <ProgressBar progress={progressUpload[index]} />
                              )}
                            </View>
                          </ImageBackground>
                        </View>
                      ) : null}

                      {attachmentTemporary[index]?.fileType === 'file' ? (
                        <TouchableOpacity
                          onPress={() => {}}
                          style={styles.attachmentFileContainer}>
                          <View style={styles.headAttachmentFileContainer}>
                            <Text style={styles.attachmentFileHeadTitle}>
                              {'File'}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                _handlerOnCloseAttachmentUpload(index);
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
                              {attachmentTemporary[index]?.name}
                            </Text>
                          </View>

                          {progressUpload[index] === '100%' ? (
                            <TouchableOpacity
                              onPress={() => {
                                _handlerReUploadFile(index);
                              }}
                              style={styles.attachmentResendContainer}>
                              <Text style={styles.attachmentResendTitle}>
                                {'Unggah ulang'}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <ProgressBar progress={progressUpload[index]} />
                          )}
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  ) : (
                    <View style={styles.dateContainer}>
                      <Text style={styles.titleButton}>Unggah Materi</Text>

                      <TouchableOpacity
                        onPress={() => {
                          setIndex(index).then(() => {
                            if (materialsType[index]?.type === 'video') {
                              _handlerShowSwipeUpUpload();
                            } else {
                              _handlerDocumentSelection(index);
                            }
                          });
                        }}
                        style={styles.uploadButton}>
                        <IconUploadBlue width={24} height={24} />
                        <Text style={styles.uploadTitle}>
                          {materialsType[index]?.type === 'presentation'
                            ? 'Unggah PPT'
                            : materialsType[index]?.type === 'video'
                            ? 'Unggah Video'
                            : 'Unggah PDF'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                ) : null}
              </View>
            </View>
          );
        })}

        <Button
          label={'+ Tambah Tipe Materi'}
          action={addSchoolMaterials}
          background={Colors.primary.light3}
          color={Colors.primary.base}
          fontSize={16}
          style={styles.buttonAddMaterials}
        />
        <View style={{marginVertical: 34}}>
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
        visible={isShowKurikulum}
        onClose={() => {
          setIsShowKurikulum(false);
        }}
        height={500}
        children={renderChildrenSwipeUpKurikulum()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowClasses}
        onClose={() => {
          setIsShowClasses(false);
        }}
        height={500}
        children={renderChildrenSwipeUpClasses()}
      />
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
        children={_renderSwipeUpUpload(indexAttachment)}
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
    </SafeAreaView>
  );
};

export {AddSchoolMaterials};
