import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {PDFPreviewScreenParam, ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useRef, useState} from 'react';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {
  dismissLoading,
  downloadFile,
  isText,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {Dimensions} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import Orientation from 'react-native-orientation-locker';
import {IMediaType} from '@api/types';

const usePDFPreview = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PDFPreviewScreen'>>();
  const {getRouteParams} = useNavigate();
  const _carousel: any = useRef();
  const {data, getResHeader, serviceType} =
    getRouteParams<PDFPreviewScreenParam>();
  const {width, height} = Dimensions.get('screen');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [header, setHeader] = useState<any>();
  const [fileData, setFileData] = useState<IMediaType>();
  const [media, setMedia] = useState({
    ID: '000000000000000000000000',
    path_url: 'https://storage.googleapis.com/kp_reborn_bucket/kelas_pintar/',
    status: '',
    images: [],
    isError: false,
  });

  const orientation = useDeviceOrientation();
  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const handleDisplayPDF: any = (val: boolean) => {
    return {
      opacity: val ? 0 : 1,
    };
  };

  const getResponseHeader = async () => {
    if (serviceType === 'Analisis Butir Soal') {
      try {
        showLoading();
        const res: any = await apiGet({
          url: URL_PATH.get_analisis_butir_soal_preview(
            data?.id || data?.exam_schedule?.id,
          ),
          resHeaders: true,
        });

        setHeader(res);
        getMedia(res?.fileid ?? '');
      } catch (error) {
        showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
      } finally {
        dismissLoading();
      }
    }
  };

  const getMedia = async (mediaId: string) => {
    try {
      showLoading();
      const res = await apiGet({
        url: URL_PATH.get_file(mediaId),
      });

      setMedia(res);
      setFileData(res);
      setTotalPage(res.images?.length);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  const handleDownloadPdf = async () => {
    try {
      // const fullDate = dayjs().format('YYYYMMDDHHmmss');
      const fileName = `${fileData?.original_name}`;
      await downloadFile({
        fileExt: fileData?.content_extention! as IFileExt,
        fileNameWithExt: fileName,
        full_path: fileData?.path_url || '',
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (!getResHeader) {
      setTimeout(() => getMedia(data?.id), 500);
      return;
    }

    setTimeout(getResponseHeader, 500);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      _carousel?.current?.snapToNext();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      _carousel?.current?.snapToPrev();
    }
  };

  return {
    navigation,
    header,
    height,
    width,
    orientation,
    media,
    _carousel,
    handleNextPage,
    handlePreviousPage,
    handleDisplayPDF,
    handleDownloadPdf,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
  };
};
export default usePDFPreview;
