import {useNavigation, useRoute} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  iosCameraPermission,
  isStringContains,
  listFileImageExtension,
  showErrorToast,
} from '@constants/functional';
import mediaProvider from '@services/media/provider';
import {apiUploadFormData, apiUploadingStatus} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {IMediaType} from '@api/types';

const useFormAskCamera = () => {
  const navigation: any = useNavigation();
  const [lastAccessed, setLastAccessed] = useState([]);
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState(false);
  const [modal, setModal] = useState(false);
  const [imageUri, setImageUri] = useState<string>();
  const [imageSend, setImageSend] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [chapterId, setChapterId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [notes, setNotes] = useState('');
  const [modalSection, setModalSection] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [warning, setWarning] = useState(false);
  const route = useRoute();
  const {data_param, type, total_coin, imageLibary, dataAttachment}: any =
    route?.params;
  const isValidExtImage = (path: string) => {
    return isStringContains(path, undefined, listFileImageExtension);
  };
  const handleChooseImage = async () => {
    try {
      let image;
      if (Platform.OS === 'ios') {
        const permit = await iosCameraPermission();
        if (permit) {
          image = await ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            // cropping: true,
            includeBase64: true,
            mediaType: 'photo',
            forceJpg: true,
            // compressImageMaxHeight: 400,
            // compressImageMaxWidth: 300,
          });
          const isValid = isValidExtImage(image.path);
          if (!isValid) {
            showErrorToast('Format file tidak valid!', {visibilityTime: 1000});
            return;
          }
          image = await ImagePicker.openCropper({
            path: image.path,
            mediaType: 'photo',
            forceJpg: true,
            // width: image.width / 4,
            // height: image.height / 3,
          });
        }
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Required',
            message: 'This app needs access to your camera.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          image = await ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            // cropping: true,
            includeBase64: true,
            mediaType: 'photo',
            forceJpg: true,
            // compressImageMaxHeight: 400,
            // compressImageMaxWidth: 300,
          });
          image = await ImagePicker.openCropper({
            path: image.path,
            mediaType: 'photo',
            forceJpg: true,
            // width: image.width / 4,
            // height: image.height / 3,
          });
        } else {
          return;
        }
      } else {
        return;
      }

      const {data, mime} = image || {};
      setImageUri(`data:${mime};base64,${data}`);
      const file = {
        uri: image?.path,
        type: image?.mime,
        name: image?.path.split('/').pop(),
      };
      setLoading(false);
      handleSend(file);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Menyimpan Gambar.',
      });
    }
  };

  const handleSend = async (files: any) => {
    try {
      setLoading(true);
      const file = {
        uri: files?.uri ? files?.uri : imageLibary[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      const formData = new FormData();
      formData.append('type', 'user');
      formData.append('sub_type', 'tanya');
      formData.append('attachment', file);
      const resImage = await apiUploadFormData<IMediaType>({
        url: URL_PATH.upload_image,
        body: formData,
      });
      const resImageStatus = await apiUploadingStatus({
        fileId: resImage?.ID || '',
        mediaType: 'image',
      });
      setImageSend(resImageStatus);
      // const response = await api.post('/media/v1/image/', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // if (response && response?.data) {
      //   console.log('cek data',response?.data?.data);
      //   setImageSend(response?.data?.data);
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Gagal Upload Gambar.',
      //   });
      // }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Upload Gambar.',
      });
      // Toast.show({
      //   type: 'error',
      //   text1: 'error',
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (item: any) => {
    try {
      const requestBody = {
        image: item?.ID,
        subject_id: subjectId ? subjectId : data_param?.id,
        chapter_id: chapterId,
        coin: data_param?.coin_default ? data_param?.coin_default : '0',
        tanya_type: type,
        note: notes,
      };
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.post('/tanya/v1/', requestBody, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response?.status === 200) {
        setModalSection(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal Melakukan Pertanyaan',
        });
      }
    } catch (err) {
      return;
    }
  };

  //Mata Pelajaran
  const getListSubject = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.get(URL_PATH.get_home_tanya(), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        setData(response?.data?.data);
        const data = response?.data?.data?.subject || {};
        const promises = data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj.icon_mobile}`);
            if (imgRes.status === 200 && imgRes.data?.code === 100) {
              obj.path_url = imgRes.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        setLastAccessed(data);
        getListChapter(subjectId ? subjectId : data_param?.id);
      }
    } catch (err) {
      return;
    }
  };

  //Bab
  const getListChapter = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/master/v1/chapter-by-subject/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      const data = res?.data?.data;
      if (res?.status === 200) {
        setChapter(data);
      } else {
        setChapter(data);
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    getListSubject();
  }, []);

  const repeatGetImage =
    dataAttachment?.status === 'process' || imageSend?.status === 'process';

  useEffect(() => {
    if (imageSend && imageSend?.status !== 'process') {
      return;
    }
    if (
      dataAttachment?.status === 'process' ||
      imageSend?.status === 'process'
    ) {
      const getImage = async () => {
        const imgRes = await mediaProvider.getImage(
          imageSend?.ID ?? dataAttachment?.ID,
        );
        return imgRes?.data;
      };
      getImage().then((res: any) => {
        setImageSend(res);
      });
    } else {
      setImageSend(dataAttachment);
    }
  }, [dataAttachment, imageLibary, imageSend, repeatGetImage]);

  useEffect(() => {
    getListChapter(subjectId ? subjectId : data_param?.id);
  }, [data_param?.id, subjectId]);
  const handleSubjectId = (item: any) => {
    setSubjectId(item?.id);
    getListChapter(item?.id);
  };

  const handleChapterId = (item: any) => {
    setChapterId(item?.id);
  };
  const handleModal = () => setModal(false);

  const handleSendAsk = () => {
    if (!selectedValue) {
      setWarning(true);
      setModal(false);
    } else {
      setWarning(false);
      setModal(true);
    }
  };

  const handleSuccess = () => {
    setModal(false);
    setModalSection(true);
    navigation.goBack();
  };

  return {
    lastAccessed,
    data,
    getListChapter,
    chapter,
    modal,
    handleModal,
    notes,
    getListSubject,
    handleSend,
    imageUri,
    handleSubmit,
    loading,
    handleSubjectId,
    handleChapterId,
    setNotes,
    total_coin,
    imageSend,
    modalSection,
    setModalSection,
    data_param,
    handleChooseImage,
    handleSendAsk,
    handleSuccess,
    selectedValue,
    setSelectedValue,
    warning,
    setModal,
    imageLibary,
  };
};

export default useFormAskCamera;
