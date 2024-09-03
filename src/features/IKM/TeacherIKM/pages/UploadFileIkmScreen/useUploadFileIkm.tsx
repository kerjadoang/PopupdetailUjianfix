import {
  dismissLoading,
  getExtensionFromFile,
  handlerFileValidation,
  handlerOpenGallery,
  isStringContains,
  isText,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList, UploadFileIkmScreenParam} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useState} from 'react';
import {apiGetMedia, apiPost, apiPut, apiUploadFormData} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {Platform} from 'react-native';
import {IMediaImage, IMediaType} from '@api/types';

const useUploadFileIkm = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'UploadFileIkmScreen'>>();
  const {getRouteParams, navigateScreen, popScreen} = useNavigate();
  const {serviceType, data, defaultValue, type} =
    getRouteParams<UploadFileIkmScreenParam>();
  const [title, setTitle] = useState<string>('');
  const [errorTitleMessage, setErrorTitleMessage] = useState<string>('');
  const [isUploadFileError, setIsUploadFileError] = useState<boolean>(false);
  const [progressUpload, setProgressUpload] = useState<string>('100%');
  const [fileData, setFileData] = useState<IFileData>({
    file_name: '',
    path_url: '',
    type: '',
  });
  const [thumbnailData, setThumbnailData] = useState<IFileData>({
    file_name: '',
    path_url: '',
    type: '',
  });

  useEffect(() => {
    if (defaultValue === undefined) {
      return;
    }
    getFile(defaultValue?.media_id || '');
    getThumbnail(defaultValue?.thumbnail_media_id || '');
  }, [defaultValue]);

  const onUploadImage = async () => {
    try {
      showLoading();
      const resData = await handlerOpenGallery({
        type: 'ikm',
      });

      setThumbnailData({
        ID: resData?.ID,
        file_name: resData?.original_name,
        path_url: resData?.local_path_url,
        type: resData?.local_type,
      });
    } catch (error) {
    } finally {
      dismissLoading();
    }
  };

  const _handlerDocumentSelection = async () => {
    try {
      const response: DocumentPickerResponse[] = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      const result = handlerFileValidation({
        resultFile: response,
        listFileExtension: ['pdf'],
        maxLimitInMb: 100,
      });

      if (result === 'Higher Than Max Limit') {
        setIsUploadFileError(true);
        throw 'Ukuran File Terlalu Besar';
      }

      if (result === 'Format Not Valid') {
        setIsUploadFileError(true);
        throw 'Format file tidak valid';
      }

      uploadFile(response);
    } catch (error: any) {
      if (isStringContains(error.toString(), 'cancel')) {
        return;
      }
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    }
  };

  const getFile = async (fileId: string) => {
    try {
      const resData = await apiGetMedia<IMediaType>({
        imageId: fileId,
        fullResponse: true,
        fullDataResponse: true,
      });
      setFileData({
        ID: resData?.ID,
        file_name: resData?.original_name,
        path_url: resData.path_url,
        type: getExtensionFromFile(resData?.original_name || ''),
      });
    } catch (error) {}
  };

  const getThumbnail = async (imageId: string) => {
    try {
      const resData = await apiGetMedia<IMediaImage>({
        imageId: imageId,
        fullResponse: true,
        fullDataResponse: true,
      });
      setThumbnailData({
        ID: resData?.ID,
        file_name: resData?.original_name,
        path_url: resData?.path_url,
        type: resData?.type,
      });
    } catch (error) {}
  };

  const uploadFile = async (asset: Array<any>) => {
    try {
      const formData = new FormData();
      const uri =
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', '');
      formData.append('attachment', {
        name: asset?.[0]?.name,
        type: asset?.[0]?.type,
        uri: uri,
      });
      formData.append('type', 'lkpd');
      formData.append('sub_type', 'user_answer');
      setFileData({
        file_name: asset?.[0]?.name,
        path_url: uri,
        type: getExtensionFromFile(asset?.[0]?.name),
      });
      const resData = await apiUploadFormData<IMediaType>({
        url: URL_PATH.upload_file,
        body: formData,
        uploadProgress: (value: number) => setProgressUpload(`${value}%`),
      });
      setFileData(state => ({
        ...state,
        ID: resData.ID,
        path_url: resData.path_url,
      }));
    } catch (error) {}
  };

  const handleRemoveData = async () => {
    setFileData({});
  };

  const handleRemoveThumbnail = async () => {
    setThumbnailData({});
  };

  const isFormValid = () => {
    !!errorTitleMessage && setErrorTitleMessage('');
    isUploadFileError && setIsUploadFileError(false);
    let isValid = true;
    if ((!defaultValue?.name && type == 'Ubah') || !title) {
      setErrorTitleMessage(`Judul ${serviceType} wajib diisi`);
      isValid = false;
    }

    if (!fileData.ID) {
      showErrorToast('Upload file wajib diisi');
      setIsUploadFileError(true);
      isValid = false;
    }

    return isValid;
  };

  const submitCreate = async () => {
    try {
      if (!isFormValid()) {
        return;
      }
      const body = {
        name: title || defaultValue?.name,
        description: '',
        subject_name: data?.name ?? '',
        subject_id: data?.id ?? 0,
        media_id: fileData?.ID ?? '',
        media_url: '',
        thumbnail_media_id: thumbnailData?.ID ?? '',
        thumbnail_media_url: '',
        is_active: true,
        Idx: 1,
      };
      showLoading();

      type === 'Unggah'
        ? await apiPost({
            url:
              serviceType === 'ATP'
                ? URL_PATH.post_alur_tujuan_pembelajaran()
                : URL_PATH.post_modul_ajar(),
            body,
          })
        : await apiPut({
            url:
              serviceType === 'ATP'
                ? URL_PATH.put_alur_tujuan_pembelajaran(defaultValue?.id)
                : URL_PATH.put_modul_ajar(defaultValue?.id),
            body,
          });

      handleRemoveData();
      showSuccessToast(
        `${serviceType?.replace('ATP', 'Alur Tujuan Pembelajaran')} berhasil ${
          type === 'Unggah' ? 'Diunggah' : 'Diubah'
        }`,
      );
      popScreen();
    } catch (error) {
      showErrorToast(
        isText(error) ? error : 'Terjadi kesalahan pada sistem kami.',
      );
    } finally {
      dismissLoading();
    }
  };

  return {
    navigation,
    navigateScreen,
    serviceType,
    data,
    defaultValue,
    type,
    title,
    setTitle,
    fileData,
    setFileData,
    thumbnailData,
    setThumbnailData,
    progressUpload,
    _handlerDocumentSelection,
    onUploadImage,
    handleRemoveData,
    handleRemoveThumbnail,
    submitCreate,
    errorTitleMessage,
    isUploadFileError,
  };
};
export default useUploadFileIkm;
