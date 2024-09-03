import {
  Button,
  PopUp,
  PopUpProps,
  SwipeUp,
  SwipeUpProps,
} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import IconShare from '@assets/svg/ic24_share.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

import {IMAGES} from '@constants/image';
import {Pressable} from 'react-native';
import {CreateNoteBody} from '@services/lpt/type';
import {Controller, UseFormSetValue, useForm} from 'react-hook-form';
import IconClose from '@assets/svg/ic24_x_round.svg';
import {
  dismissLoading,
  handlerOpenGallery,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {useCreateNote, useEditNote} from '@services/lms';
import ConfirmDelete from './ConfirmDelete';
import {getDetailNotePancasilaDestroy} from '@redux';
import Ic24_upload from '@assets/svg/ic24_upload.svg';
import Fonts from '@constants/fonts';
import RobotClose from '@assets/svg/Robot_close.svg';
import usePancasilaDetailNote from '../usePancasilaDetailNote';
import ImageViewer from '@components/molecules/ImageViewer';

type InputNotesProps = {} & TextInputProps;

const InputNotes: React.FC<InputNotesProps> = props => {
  return (
    <View style={styles.inputNotesContainer}>
      <TextInput
        multiline
        {...props}
        style={[props.style, styles.textInputNotes]}
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
      <View style={styles.uploadImageContainer}>
        <ImageBackground
          source={{uri: props.path_url}}
          style={styles.uploadImageBackground}
          resizeMode="contain">
          <Pressable
            onPress={() => {
              props.setImage?.('path_url', null);
              props.setImage?.('file', null);
            }}
            style={{alignItems: 'flex-end'}}>
            <IconClose />
          </Pressable>
          <View style={styles.uploadImageReuploadContainer}>
            <Pressable
              style={styles.uploadImageReuploadBtn}
              onPress={props.onUpload}>
              <Text style={styles.uploadImageReuploadTextBtn}>
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
      iconLeft={<Ic24_upload width={24} height={24} />}
    />
  );
};

type DetailNoteProps = {
  note_id?: any;
  type: 'mynotes' | 'sharednotes';
  mode: 'edit' | 'create' | 'detail';
  role?: 'guru' | 'kepsek' | 'murid';
  projectId?: string;
  data?: IProyekPancasila;
  isPancasila?: boolean;
  service_type?: any;
  onSuccessSubmit?: () => void;
  onErrorSubmit?: () => void;
  onDeleteNote?: () => void;
  onShareNote?: () => void;
} & SwipeUpProps &
  PopUpProps;

const PancasilaDetailNote: React.FC<DetailNoteProps> = props => {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const {control, handleSubmit, setValue, watch} = useForm<CreateNoteBody>();
  const noteState = useSelector(
    (state: RootState) => state.pancasilaNotes,
  ).detailNote;
  const {mutate: createNote} = useCreateNote();
  const {mutate: editNote} = useEditNote();
  const {gotoDetailProyek, onKonfirmRekomendasi} = usePancasilaDetailNote(
    props.role,
    props.data,
  );

  const [mode, setMode] = useState('');
  const [showImageDetail, setShowImageDetail] = useState<boolean>(false);

  const isSharedNote = props.type === 'sharednotes';
  const isCreateMode = mode === 'create';
  const isEditMode = mode === 'edit';
  const isGuru = props.service_type || props.role === 'guru';
  const isKepsek = props.service_type || props.role === 'kepsek';
  const isMurid = props.service_type || props.role === 'murid';

  const watchPathUrl = watch('path_url');
  const watchNote = watch('notes');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCreateMode && props.visible) {
      setValue('notes', noteState?.data?.notes as any);
      setValue('project_id', noteState?.data?.project_id as any);
      setValue('file', noteState?.data?.file);
      setValue('path_url', noteState?.data?.path_url);
    }
    return _resetAfterSubmit;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  useEffect(() => {
    if (props.visible) {
      setMode(props.mode);
    } else {
      dispatch(getDetailNotePancasilaDestroy());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const renderWordLeftBtn = (): string => {
    let word;
    if (isEditMode || isCreateMode) {
      if (isGuru || isKepsek) {
        word = 'Kembali';
        return word;
      }
      word = 'Batal';
    } else {
      if (isGuru || isKepsek) {
        word = 'Kembali';
        return word;
      }
      word = 'Hapus';
    }
    return word;
  };

  const renderWordRightBtn = (): string => {
    let word;
    if (isEditMode || isCreateMode) {
      if (isGuru) {
        if (isCreateMode) {
          word = 'Kirim';
        } else {
          word = 'Simpan';
        }
        return word;
      }
      if (isKepsek) {
        if (isCreateMode) {
          word = 'Rekomendasi';
        } else {
          word = 'Simpan';
        }

        if (props.data?.is_recommended) {
          word = 'Batalkan';
        }

        return word;
      }
      word = 'Simpan';
    } else {
      word = 'Edit';
    }
    return word;
  };

  const isLeftBtnUseOutline = (): boolean => {
    if ((isCreateMode || isEditMode) && !isGuru) {
      return true;
    }

    if (isSharedNote) {
      return false;
    }
    return true;
  };

  const onRequestImageViewerClose = () => {
    setShowImageDetail(false);
  };

  const onUpload = async () => {
    try {
      showLoading();

      const resData = await handlerOpenGallery({
        type: 'pancasila',
      });

      // const resUrl =
      //   resData?.path_url == '-' ? resData.local_path_url : resData?.path_url;
      setValue('path_url', resData?.path_url);
      setValue('file', resData?.ID);
    } catch (error: any) {
      showErrorToast(error || '');
    } finally {
      dismissLoading();
    }
  };

  const _resetAfterSubmit = () => {
    setValue('notes', '');
    setValue('project_id', '');
    setValue('file', '');
    setValue('path_url', '');
  };

  const createNotes = async (data: CreateNoteBody) => {
    if (!data.notes && !isMurid) {
      return _resetAfterSubmit();
    }
    await createNote({
      project_id: data.chapter_material_id ?? props.projectId,
      notes: data.notes || '',
      file: data.file ?? '',
    }).then(() => _resetAfterSubmit()); //clear state after success create note
    dispatch(getDetailNotePancasilaDestroy());
  };

  const editNotes = async (data: CreateNoteBody) => {
    await editNote(data, noteState?.data?.id).then(() => _resetAfterSubmit()); //clear state after success create note
    dispatch(getDetailNotePancasilaDestroy());
  };

  const onSubmit = async (data: CreateNoteBody) => {
    try {
      if (isGuru) {
        //kirim note dlu
        if (isEditMode) {
          await editNotes(data);
          props.onSuccessSubmit?.();
          return;
        }
        props.onSuccessSubmit?.();
        await createNotes(data);
        await gotoDetailProyek();
        return;
      }

      if (isKepsek) {
        if (isEditMode) {
          await editNotes(data);
          props.onSuccessSubmit?.();
          return;
        }
        await createNotes(data);
        props.onClose?.();
        setTimeout(() => {
          setIsOpenPopUp(true);
        }, 500);
        return;
      }

      if (isCreateMode) {
        await createNotes(data);
      } else {
        await editNotes(data);
      }
      props.onSuccessSubmit?.();
    } catch (e) {
      props.onErrorSubmit?.();
    }
  };

  const onSubmitButtonPressed = (param: any) => {
    if (!isCreateMode && !isEditMode) {
      setMode('edit');
    } else {
      onSubmit(param);
    }
  };

  const onCancelButtonPressed = () => {
    if (!isCreateMode && !isEditMode && !isGuru) {
      props.onDeleteNote?.();
    } else {
      props.onClose?.();
    }
  };

  const titleModal = () => {
    if (isGuru && isCreateMode) {
      return 'Kirim Projek';
    }

    if (isKepsek && isCreateMode) {
      return 'Rekomendasi Projek';
    }

    return 'Catatan';
  };

  const isShowTextCatatan = () => {
    return (isGuru || isKepsek) && isCreateMode;
  };

  const generateConfirmStyle = () => {
    if (!isKepsek || !props.data?.is_recommended) {
      return null;
    }

    return {
      backgroundColor: Colors.danger.base,
      borderColor: Colors.danger.base,
    } as StyleProp<ViewStyle>;
  };

  return (
    <>
      <SwipeUp {...props}>
        <ScrollView contentContainerStyle={styles.svContainer}>
          <Text style={styles.titleModal}>{titleModal()}</Text>
          {isShowTextCatatan() && (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subTitle}>Catatan </Text>
              <Text
                style={[styles.subTitle, {fontFamily: Fonts.RegularPoppins}]}>
                (Optional)
              </Text>
            </View>
          )}
          {!isCreateMode &&
            !isEditMode &&
            props.type === 'mynotes' &&
            !isGuru &&
            !isKepsek && (
              <Pressable style={styles.share} onPress={props.onShareNote}>
                <IconShare />
              </Pressable>
            )}
          {isSharedNote && !isGuru && (
            <Text style={styles.sharedFrom}>
              Dari {noteState?.data?.role}: {noteState?.data?.full_name}
            </Text>
          )}

          {isSharedNote && isGuru && (
            <Text style={styles.sharedFrom}>Dari Kepala Sekolah</Text>
          )}

          {isEditMode || isCreateMode ? (
            <Controller
              name="notes"
              control={control}
              render={({field: {onChange, value}}) => (
                <InputNotes
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Tulis catatan di sini...'}
                />
              )}
            />
          ) : (
            <Text style={styles.note}>{noteState?.data?.notes}</Text>
          )}

          {isEditMode || isCreateMode ? (
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
                progressiveRenderingEnabled
              />
            </Pressable>
          ) : null}

          {isEditMode || isCreateMode ? (
            <View style={styles.warningInfo}>
              <Text style={styles.warningText}>
                Maksimum ukuran file 100 MB. {'\n'}File dapat dalam format
                .doc/.pdf/.png/.jpeg.
              </Text>
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.backBtn}>
          {props?.service_type !== undefined || props.role !== undefined ? (
            <Button
              style={{flexGrow: 1}}
              label={renderWordLeftBtn()}
              outline={isLeftBtnUseOutline()}
              action={onCancelButtonPressed}
            />
          ) : null}

          {props.type === 'mynotes' && (
            <Button
              style={[{flexGrow: 1}, generateConfirmStyle()]}
              label={renderWordRightBtn()}
              isDisabled={isMurid && !watchNote}
              // isDisabled={watchNote ? false : true}
              action={handleSubmit(onSubmitButtonPressed)}
            />
          )}
        </View>
        {!isCreateMode && !isEditMode && <ConfirmDelete {...props} />}
        <ImageViewer
          visible={showImageDetail}
          onRequestClose={onRequestImageViewerClose}
          pathUrl={noteState?.data?.path_url}
        />
      </SwipeUp>
      <PopUp
        show={isOpenPopUp}
        Icon={RobotClose}
        title={props.data?.is_recommended ? 'Batal Rekomendasi' : 'Rekomendasi'}
        desc={`Apakah anda yakin mau ${
          props.data?.is_recommended ? 'Membatalkan' : 'merekomendasikan'
        } Projek?`}
        titleConfirm={props.data?.is_recommended ? 'Batalkan' : 'Rekomendasi'}
        actionConfirm={() => {
          setIsOpenPopUp(!isOpenPopUp);
          onKonfirmRekomendasi(watch());
        }}
        titleCancel={'Kembali'}
        actionCancel={() => setIsOpenPopUp(!isOpenPopUp)}
        close={() => setIsOpenPopUp(!isOpenPopUp)}
        confirmStyle={generateConfirmStyle()}
        confirmTextStyle={{fontWeight: '600'}}
      />
      {/* {isLoading ? <LoadingIndicator /> : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  svContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  titleModal: {
    fontSize: 20,
    fontFamily: Fonts.SemiBoldPoppins,
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
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  chapterCardSubTitle: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.light1,
    fontSize: 12,
  },
  sharedFrom: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.primary.base,
  },
  note: {
    fontFamily: Fonts.RegularPoppins,
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
  warningInfo: {},
  warningText: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  subTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  inputNotesContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 120,
    backgroundColor: Colors.dark.neutral10,
  },
  textInputNotes: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  uploadImageContainer: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  uploadImageBackground: {
    borderRadius: 10,
    height: 166,
    padding: 12,
  },
  uploadImageReuploadContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  uploadImageReuploadBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  uploadImageReuploadTextBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.primary.base,
  },
});

export default PancasilaDetailNote;
