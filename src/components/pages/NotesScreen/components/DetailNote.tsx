import {Button, PopUpProps, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import IconShare from '@assets/svg/ic24_share.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

import IconChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';
import {IMAGES} from '@constants/image';
import {Pressable} from 'react-native';
import {CreateNoteBody} from '@services/lpt/type';
import {Controller, UseFormSetValue, useForm} from 'react-hook-form';
import ImageViewer from './ImageViewer';
import IconClose from '@assets/svg/ic24_x_round.svg';
import {Platform} from 'react-native';
import {iosPhotoGalleryPermission} from '@constants/functional';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useUploadImage} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {useCreateNote, useEditNote} from '@services/lpt';
import ConfirmDelete from './ConfirmDelete';
import {getDetailNoteDestroy} from '@redux';
import Fonts from '@constants/fonts';

type InputNotesProps = {} & TextInputProps;

const InputNotes: React.FC<InputNotesProps> = props => {
  return (
    <View
      style={{
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 120,
        backgroundColor: Colors.dark.neutral10,
      }}>
      <TextInput
        multiline
        {...props}
        style={[
          props.style,
          {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            color: Colors.dark.neutral100,
          },
        ]}
      />
    </View>
  );
};

type UploadImageProps = {
  path_url?: string | any;
  setImage?: UseFormSetValue<CreateNoteBody>;
  onUpload?: () => void;
};

const UploadImage: React.FC<UploadImageProps> = props => {
  if (props.path_url) {
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.dark.neutral20,
        }}>
        <ImageBackground
          source={{uri: props.path_url}}
          style={{
            borderRadius: 10,
            height: 200,
            padding: 12,
          }}
          resizeMode="contain">
          <Pressable
            onPress={() => props.setImage?.('path_url', null)}
            style={{alignItems: 'flex-end'}}>
            <IconClose />
          </Pressable>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 5,
                backgroundColor: Colors.primary.light3,
                borderRadius: 20,
                alignSelf: 'flex-start',
              }}
              onPress={props.onUpload}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                  color: Colors.primary.base,
                }}>
                Unggah Ulang
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <Button
      label="Unggah Foto"
      background={Colors.primary.light3}
      color={Colors.primary.base}
      action={props.onUpload}
    />
  );
};

type DetailNoteProps = {
  note_id?: string;
  type: 'mynotes' | 'sharednotes' | 'reject_attendance' | 'close_class_session';
  mode: 'edit' | 'create' | 'detail';
  chapterMaterialId?: string;
  onSuccessSubmitRejectAttendance?: any;
  onSuccessSubmit?: () => void;
  onErrorSubmit?: () => void;
  onDeleteNote?: () => void;
  onShareNote?: () => void;
} & SwipeUpProps &
  PopUpProps;

const DetailNote: React.FC<DetailNoteProps> = props => {
  const {control, handleSubmit, setValue, watch} = useForm<CreateNoteBody>();
  const noteState = useSelector((state: RootState) => state.notes).detailNote;
  const {mutate: uploadImage} = useUploadImage();
  const {mutate: createNote} = useCreateNote();
  const {mutate: editNote} = useEditNote();

  const [mode, setMode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [showImageDetail, setShowImageDetail] = useState<boolean>(false);

  const isSharedNote = props.type === 'sharednotes';
  const isCreateMode = mode === 'create';
  const isEditMode = mode === 'edit';

  const watchPathUrl = watch('path_url');
  const watchNote = watch('notes');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCreateMode && props.visible) {
      setValue('notes', noteState?.data?.notes as any);
      setValue(
        'chapter_material_id',
        noteState?.data?.chapter_material_id as any,
      );
      setValue('file_path', noteState?.data?.file);
      setValue('path_url', noteState?.data?.path_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  useEffect(() => {
    if (props.visible) {
      setMode(props.mode);
    } else {
      dispatch(getDetailNoteDestroy());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const renderWordLeftBtn = (): string => {
    let word;
    if (isEditMode || isCreateMode) {
      if (props.type === 'close_class_session') {
        word = 'Kembali';
      } else {
        word = 'Batal';
      }
    } else {
      word = 'Hapus';
    }
    return word;
  };

  const renderWordRightBtn = (): string => {
    let word;
    if (isEditMode || isCreateMode) {
      word = 'Simpan';
    } else {
      word = 'Edit';
    }
    return word;
  };

  const onRequestImageViewerClose = () => {
    setShowImageDetail(false);
  };

  const upload = (asset: ImagePickerResponse['assets']) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.fileName,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'kp_regular');
    formData.append('sub_type', 'learn');
    uploadImage(formData).then((res: IUploadImageResponse) => {
      setValue('path_url', res.data?.path_url);
      setValue('file_path', res.data?.ID);
    });
  };

  const onUploadImageIos = async () => {
    try {
      const permit = await iosPhotoGalleryPermission();
      if (permit) {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        });
        if (!result.didCancel) {
          upload(result.assets);
        }
      }
    } catch (e) {}
  };

  const onUploadImageAndroid = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });
      if (!result.didCancel) {
        upload(result.assets);
      }
    } catch (e) {}
  };

  const onUpload = () => {
    if (Platform.OS === 'ios') {
      onUploadImageIos();
    } else {
      onUploadImageAndroid();
    }
  };

  const onSubmit = async (data: CreateNoteBody) => {
    try {
      if (isCreateMode) {
        await createNote({
          notes: data.notes,
          file_path: data.file_path ?? null,
          chapter_material_id:
            data.chapter_material_id ?? Number(props.chapterMaterialId),
        }).then(() => _resetAfterSubmit());
        dispatch(getDetailNoteDestroy());
      } else {
        await editNote(data, noteState?.data?.id).then(() =>
          _resetAfterSubmit(),
        );
        dispatch(getDetailNoteDestroy());
      }
      props.onSuccessSubmit?.();
    } catch (e) {
      props.onErrorSubmit?.();
    }
  };

  const _resetAfterSubmit = () => {
    setValue('notes', '');
  };

  const onSubmitButtonPressed = (param: any) => {
    if (!isCreateMode && !isEditMode) {
      setMode('edit');
    } else {
      props.type === 'reject_attendance' || props.type === 'close_class_session'
        ? props.onSuccessSubmitRejectAttendance(param)
        : onSubmit(param);
    }
  };

  const onCancelButtonPressed = () => {
    if (!isCreateMode && !isEditMode) {
      props.onDeleteNote?.();
    } else {
      props.onClose?.();
    }
  };

  return (
    <>
      <SwipeUp {...props}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.svContainer}>
          <Text style={styles.titleModal}>
            {props.type === 'reject_attendance'
              ? 'Catatan Penolakan'
              : props.type === 'close_class_session'
              ? 'Informasi Pembatalan'
              : 'Catatan'}
          </Text>
          {props.type === 'close_class_session' && (
            <View>
              <Text style={styles.classSessionDescription1Style}>
                Apakah Anda yakin untuk membatalkan sesi{'\n'}kelas? Notifikasi
                pembatalan akan dikirim ke{'\n'}Murid.
              </Text>
              <Text style={styles.classSessionDescription2Style}>
                Alasan Pembatalan Sesi Kelas
              </Text>
            </View>
          )}
          {!isCreateMode && !isEditMode && props.type === 'mynotes' && (
            <Pressable style={styles.share} onPress={props.onShareNote}>
              <IconShare />
            </Pressable>
          )}
          {!isEditMode && !isCreateMode && (
            <View style={styles.chapterCardContainer}>
              {noteState?.data?.chapter_material?.path_url && (
                <Image
                  source={{uri: noteState?.data?.chapter_material?.path_url}}
                  style={{width: 32, height: 32}}
                />
              )}
              <View style={styles.chapterCardContent}>
                <Text style={styles.chapterCardTitle}>
                  {noteState?.data?.chapter_material?.learning_method?.name}
                </Text>
                <Text style={styles.chapterCardSubTitle}>
                  {noteState?.data?.chapter_material?.title}
                </Text>
              </View>
              <IconChevronRight />
            </View>
          )}

          {isSharedNote && (
            <Text style={styles.sharedFrom}>
              Dari {noteState?.data?.role}: {noteState?.data?.full_name}
            </Text>
          )}

          {isEditMode || isCreateMode ? (
            <Controller
              name="notes"
              control={control}
              render={({field: {onChange, value}}) => {
                if (!value) {
                  setIsButtonDisabled(true);
                } else {
                  setIsButtonDisabled(false);
                }
                return (
                  <InputNotes
                    onChangeText={onChange}
                    value={value}
                    placeholder="Tulis catatan di sini..."
                  />
                );
              }}
            />
          ) : (
            <Text style={styles.note}>{noteState?.data?.notes}</Text>
          )}
          {(props.type === 'mynotes' || props.type === 'sharednotes') &&
          (isEditMode || isCreateMode) ? (
            <UploadImage
              onUpload={onUpload}
              path_url={watchPathUrl}
              setImage={setValue}
            />
          ) : noteState?.data?.path_url ? (
            <Pressable
              onPress={() => setShowImageDetail(true)}
              style={styles.imageContainer}>
              <Image
                source={{uri: noteState.data.path_url}}
                defaultSource={IMAGES.imgPlaceHolder}
                style={{width: 100, height: 100}}
              />
            </Pressable>
          ) : null}
          <View style={styles.backBtn}>
            <Button
              style={{flexGrow: 1}}
              label={renderWordLeftBtn()}
              outline
              action={onCancelButtonPressed}
            />

            {props.type === 'close_class_session' && (
              <Button
                style={{flexGrow: 1}}
                background={Colors.danger.base}
                label={'Batalkan'}
                isDisabled={isButtonDisabled}
                action={handleSubmit(onSubmitButtonPressed)}
              />
            )}

            {props.type === 'mynotes' && (
              <Button
                style={{flexGrow: 1}}
                label={renderWordRightBtn()}
                isDisabled={watchNote?.length < 1}
                action={handleSubmit(onSubmitButtonPressed)}
              />
            )}

            {props.type === 'reject_attendance' && (
              <Button
                style={{flexGrow: 1}}
                label={renderWordRightBtn()}
                isDisabled={isButtonDisabled}
                action={handleSubmit(onSubmitButtonPressed)}
              />
            )}
          </View>
        </ScrollView>
        {!isCreateMode && !isEditMode && <ConfirmDelete {...props} />}
        <ImageViewer
          visible={showImageDetail}
          onRequestClose={onRequestImageViewerClose}
          pathUrl={noteState?.data?.path_url}
        />
      </SwipeUp>
    </>
  );
};

const styles = StyleSheet.create({
  svContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
  },
  classSessionDescription1Style: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  classSessionDescription2Style: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    marginTop: 10,
    marginLeft: 5,
  },
  titleModal: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    textAlign: 'center',
    marginTop: 16,
  },
  share: {position: 'absolute', right: 16, marginTop: 16},
  chapterCardContainer: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: Colors.primary.light3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  chapterCardContent: {gap: 2, flexGrow: 1},
  chapterCardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
  },
  chapterCardSubTitle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.light1,
    fontSize: 12,
  },
  sharedFrom: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.primary.base,
  },
  note: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backBtn: {padding: 16, flexDirection: 'row', gap: 12},
});

export default DetailNote;
