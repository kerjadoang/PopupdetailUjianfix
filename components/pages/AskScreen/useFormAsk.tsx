import {useNavigation} from '@react-navigation/native';
import {useState, useEffect, useRef} from 'react';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  dismissLoading,
  iosCameraPermission,
  isStringContains,
  isText,
  listFileImageExtension,
  parseImagePath,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {apiUploadFormData, apiUploadingStatus} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {IMediaType} from '@api/types';
const useFormAsk = () => {
  const navigation: any = useNavigation();
  const [lastAccessed, setLastAccessed] = useState([]);
  const [data, setData] = useState([]);
  const [valid, setVaild] = useState(false);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState('');
  const [home, setHome] = useState<any>(null);
  const [freeCoin, setFreeCoin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState(1);
  const [show, setShow] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [selected, setSelected] = useState(null);
  const [total_coin, setTotal_coin] = useState(0);
  const [, setSelectedImageGallery] = useState(null);
  useEffect(() => {
    checkTips();
    const getLastAccessed = async () => {
      setIsLoading(true);
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
          setTotal_coin(response?.data?.data?.total_coin);
          const data = response?.data?.data?.subject || {};
          const promises = data?.map(async (obj: any) => {
            if (obj?.icon_mobile) {
              const imgRes = await api.get(
                `/media/v1/image/${obj.icon_mobile}`,
              );
              if (imgRes.status === 200 && imgRes.data?.code === 100) {
                obj.path_url = imgRes.data?.data?.path_url;
              }
            }
          });

          await Promise.all(promises);
          setLastAccessed(data);
          setHome(response?.data?.data);
          setIsLoading(false);
        }
      } catch (err) {
        return;
      }
    };

    getLastAccessed();
  }, []);

  const getLastAccessed = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.get('/tanya/v1/home', {
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
        setHome(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.get('/uaa/v1/user/get-user', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        setFreeCoin(response?.data?.data?.daily_check_in);
      }
    } catch (err) {
      return;
    }
  };

  const handleModal = () => setModal(false);
  const handleValid = async (item: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res: any = await api.get(`/tanya/v1/cek/${item?.id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      const data = res?.data;
      if (res?.status === 200) {
        setVaild(data);
        if (!data?.data?.open) {
          setModal(true);
          setNote(data?.data?.note);
        } else if (showTips) {
          setSelected(item);
          setShow(true);
          setSection(4);
        } else {
          setSection(5);
          setShow(true);
          setSelected(item);
        }
      } else {
        setVaild(data);
      }
    } catch (err) {
      return;
    }
  };
  const scrollView: any = useRef();
  const coachMark1: any = useRef();
  const coachMark2: any = useRef();
  const coachMark3: any = useRef();
  const coachMark4: any = useRef();

  // const checkCoachMarkStatus = useCallback(async () => {
  //   const val = coachmark?.data?.coachmark_mobile_tanya;
  //   if (!val) {
  //     const composer: any = new CoachmarkComposer([
  //       coachMark1 as unknown as RefObject<Coachmark>,
  //       coachMark2 as unknown as RefObject<Coachmark>,
  //       coachMark3 as unknown as RefObject<Coachmark>,
  //       coachMark4 as unknown as RefObject<Coachmark>,
  //       coachMark5 as unknown as RefObject<Coachmark>,
  //     ]);
  //     composer.show();
  //   }
  // }, []);

  const submitCoin = () => {
    const submit = async () => {
      try {
        showLoading();
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.put('/uaa/v1/user/claim-daily-checkin', {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        });
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Klaim koin berhasil.',
          });
          getUser();
          getLastAccessed();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Klaim koin tidak berhasil.',
          });
        }
      } catch (err) {
        return;
      } finally {
        dismissLoading();
      }
    };
    submit();
  };

  const checkTips = async () => {
    const reqBody = {
      device: 'mobile',
    };
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = await JSON.parse(token || '');
    const res: any = await api.post('/tanya/v1/hide/tipsfoto/cek', reqBody, {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    });
    const data = res?.data?.data;
    if (res?.status === 200) {
      setShowTips(data);
    }
  };

  const handleTips = check => {
    setShowTips(check);
  };

  const hideTips = async () => {
    const reqBody = {
      device: 'mobile',
    };
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = await JSON.parse(token || '');
    const res: any = await api.post('/tanya/v1/hide/tipsfoto', reqBody, {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    });
    const data = res?.data?.data;
    if (res?.status === 200) {
      setShowTips(data);
    }
  };

  const handleAskTips = () => {
    setShow(false);
    setSection(5);
    setShow(true);
    if (!showTips) {
      hideTips();
    }
  };

  const selectImageFromGallery = () => {
    if (Platform.OS === 'ios') {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        response => {
          if (response.didCancel) {
            Toast.show({
              type: 'success',
              text1: 'Batal Ambil Gambar',
            });
          } else if (response.error) {
            Toast.show({
              type: 'error',
              text1: 'Gagal Ambil Gambar',
            });
          } else if (response.customButton) {
          } else {
            const isValid = isValidExtImage(
              parseImagePath(response?.assets?.[0]?.uri!),
            );
            if (!isValid) {
              showErrorToast('Format file tidak valid!');
              setShow(false);
              return;
            }
            setSelectedImageGallery(response?.assets);
            setShow(false);
            setIsLoading(true);
            const formData = new FormData();
            formData.append('attachment', {
              name: response?.assets?.[0]?.fileName,
              type: response?.assets?.[0]?.type,
              uri: parseImagePath(response?.assets?.[0]?.uri || ''),
            });
            formData.append('type', 'user');
            formData.append('sub_type', 'tanya');
            onUploadImage(formData, response?.assets);
          }
        },
      );
    } else if (Platform.OS === 'android') {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        response => {
          if (response.didCancel) {
            Toast.show({
              type: 'success',
              text1: 'Batal Ambil Gambar',
            });
          } else if (response.error) {
            Toast.show({
              type: 'error',
              text1: 'Gagal Ambil Gambar',
            });
          } else if (response.customButton) {
          } else {
            const isValid = isValidExtImage(
              parseImagePath(response?.assets?.[0]?.uri!),
            );
            if (!isValid) {
              showErrorToast('Format file tidak valid!');
              setShow(false);
              return;
            }
            setSelectedImageGallery(response?.assets);
            setShow(false);
            setIsLoading(true);
            const formData = new FormData();
            formData.append('attachment', {
              name: response?.assets?.[0]?.fileName,
              type: response?.assets?.[0]?.type,
              uri: parseImagePath(response?.assets?.[0]?.uri || ''),
            });
            formData.append('type', 'user');
            formData.append('sub_type', 'tanya');
            onUploadImage(formData, response?.assets);
            // uploadImage(formData, setIsLoading)
            //   .then((res: IUploadImageResponse) => {
            //     setTimeout(() => {
            //       const dataAttachment = res?.data;
            //       console.log('cek data Attachment: ', dataAttachment);
            //       navigation.navigate('AskCameraScreen', {
            //         data_param: selected,
            //         type: home?.tanya_type?.type,
            //         total_coin: total_coin,
            //         imageLibary: response?.assets,
            //         dataAttachment,
            //       });
            //     }, 100);
            //     setIsLoading(false);
            //   })
            //   .catch(() => setIsLoading(false));
          }
        },
      );
    } else {
    }
  };

  const useCamera = () => {
    navigation.navigate('AskCameraScreen', {
      data_param: selected,
      type: home?.tanya_type?.type,
      total_coin: total_coin,
      imageLibary: null,
    });
    setShow(false);
  };

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
            setShow(false);
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
          const isValid = isValidExtImage(image.path);
          if (!isValid) {
            setShow(false);
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
        } else {
          return;
        }
      } else {
        return;
      }
      setShow(false);
      setIsLoading(true);

      const file = {
        uri: parseImagePath(image?.path || ''),
        type: image?.mime,
        name: image?.path.split('/').pop(),
      };

      const formData = new FormData();
      formData.append('type', 'user');
      formData.append('sub_type', 'tanya');
      formData.append('attachment', file);
      await onUploadImage(formData, [file]);
      // uploadImage(formData, setIsLoading)
      //   .then((res: IUploadImageResponse) => {
      //     setTimeout(() => {
      //       const dataAttachment = res?.data;
      //       console.log('cek data Attachment: ', dataAttachment);
      //       navigation.navigate('AskCameraScreen', {
      //         data_param: selected,
      //         type: home?.tanya_type?.type,
      //         total_coin: total_coin,
      //         imageLibary: [file],
      //         dataAttachment,
      //       });

      //       setIsLoading(false);
      //     }, 100);
      //   })
      //   .catch(() => setIsLoading(false));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Menyimpan Gambar.',
      });
    }
  };

  const onUploadImage = async (formData: FormData, file: any) => {
    try {
      setIsLoading(true);
      const resUploadImage = await apiUploadFormData<IMediaType>({
        url: URL_PATH.upload_image,
        body: formData,
      });
      const resStatusImage = await apiUploadingStatus({
        fileId: resUploadImage?.ID || '',
        mediaType: 'image',
      });

      if (resStatusImage.status === 'failed') {
        throw 'Gagal Upload gambar';
      }
      setIsLoading(false);

      navigation.navigate('AskCameraScreen', {
        data_param: selected,
        type: home?.tanya_type?.type,
        total_coin: total_coin,
        imageLibary: file,
        dataAttachment: resStatusImage,
      });
    } catch (error: any) {
      setIsLoading(false);
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLastAccessed();
    });

    return unsubscribe;
  }, [navigation]);
  return {
    lastAccessed,
    data,
    handleValid,
    valid,
    modal,
    handleModal,
    note,
    scrollView,
    coachMark1,
    coachMark2,
    coachMark3,
    coachMark4,
    submitCoin,
    freeCoin,
    isLoading,
    section,
    setSection,
    show,
    setShow,
    handleTips,
    handleAskTips,
    selectImageFromGallery,
    useCamera,
    handleChooseImage,
  };
};

export default useFormAsk;
