import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import {useDisclosure} from '@hooks/useDisclosure';
import {useMemo, useState} from 'react';
import {
  dismissLoading,
  handlerOpenFile,
  handlerOpenGallery,
  isText,
  showErrorToast,
  showLoading,
} from '@constants/functional';

export const useStudentAnswerLkpd = (
  setFileData: CallBackWithParams<void, IFileData>,
) => {
  const {
    isVisible: isShowSwipeUpUpload,
    toggle: toggleSwipeUpUpload,
    hide: hideSwipeUpUpload,
  } = useDisclosure();
  const [isError, setIsError] = useState<boolean>(false);
  const [progressUpload, setProgressUpload] = useState<string>('100%');

  const uploadList = useMemo(
    () => [
      {
        icon: (
          <IconGalleryBlue width={24} height={24} style={{marginRight: 12}} />
        ),
        label: 'Ambil dari Galeri',
        onPress: () => {
          if (isError) {
            setIsError(false);
          }
          hideSwipeUpUpload();

          setTimeout(() => {
            onUploadImage();
          }, 500);
        },
      },
      {
        icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
        label: 'Ambil dari File',
        onPress: () => {
          if (isError) {
            setIsError(false);
          }
          hideSwipeUpUpload();

          setTimeout(() => {
            _handlerDocumentSelection();
          }, 500);
        },
      },
    ],
    [isError],
  );

  const onUploadImage = async () => {
    hideSwipeUpUpload();
    try {
      showLoading();
      const resData = await handlerOpenGallery({
        type: 'lkpd',
        sub_type: 'user_answer',
      });

      setFileData({
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
      const resData = await handlerOpenFile({
        uploadType: 'lkpd',
        onError: () => setIsError(true),
        onUpload: () => setProgressUpload('0%'),
        onUploaded: () => setProgressUpload('100%'),
        uploadSubType: 'user_answer',
      });

      setFileData({
        ID: resData?.ID,
        file_name: resData?.local_name,
        path_url: resData?.path_url || '',
        type: resData?.local_type,
      });
    } catch (error: any) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    }
  };

  const handleRemoveData = async () => {
    setFileData({});
  };

  return {
    uploadList,
    isShowSwipeUpUpload,
    toggleSwipeUpUpload,
    handleRemoveData,
    progressUpload,
    isError,
  };
};
