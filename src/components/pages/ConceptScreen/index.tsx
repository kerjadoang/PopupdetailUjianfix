/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Colors from '@constants/colors';
import WebView from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import CloseIcon from '@assets/svg/ic_closeIcon.svg';
// import ShareIcon from '@assets/svg/ic_shareMedia.svg';
import SaveIcon from '@assets/svg/ic_saveMedia.svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEndDurationLearn, fetchStartDurationLearn} from '@redux';
import {Keys} from '@constants/keys';
import api from '@api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailNote from '../NotesScreen/components/DetailNote';
import SnackbarResult from '@components/atoms/SnackbarResult';
import ProviderLPT from '@services/lpt/provider';
import ProviderUAA from '@services/uaa/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const ConceptScreen = ({route}: any) => {
  const webViewRef = useRef(null);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {startDurationLearn, getUser}: any = useSelector(state => state);
  const [durationId, setDurationId]: any = useState();
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
  const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
  const [objectId, setObjectId] = useState<string>('');
  const [media, setMedia]: any = useState({
    ID: '000000000000000000000000',
    path_url:
      'https://cdn.extramarks.id/content_data/mind_map/2019/11/21/2333315/dir_2333315/index.html',
  });
  const {chapterData} = route.params;
  const injectJavascript =
    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0.8'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); ";

  const onCloseDetailNote = useCallback(() => {
    setVisibleDetail(false);
  }, []);

  const lockToLandscape = () => {
    setTimeout(
      () => {
        Orientation.lockToLandscape();
      },
      Platform.select({
        android: 0,
        ios: 600,
      }),
    );
  };

  const lockToPortrait = () => {
    setTimeout(
      () => {
        Orientation.lockToPortrait();
      },
      Platform.select({
        android: 0,
        ios: 600,
      }),
    );
  };

  const handleGoBack = () => {
    const fetchDuration: any = dispatch(fetchEndDurationLearn(durationId));
    fetchDuration.then(() => {});
    lockToPortrait();
    Orientation.removeAllListeners();
    handleEndVideoXPTimer();
    navigation.goBack();
    return true;
  };

  const handleStartVideoXPTimer = async () => {
    try {
      const _fetchData = await ProviderUAA?.startVideoXPTimer({
        activity: 'concept_adventure',
        type: 'learn',
        reference_id:
          chapterData?.chapter_material?.id?.toString() ||
          chapterData?.chapter_material?.[0]?.id?.toString() ||
          chapterData?.chapter?.id?.toString(),
      });
      const ResData = _fetchData?.data || false;
      setObjectId(ResData?.data?.id);
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message || 'Terjadi kesalahn pada sistem kami',
      });
    }
  };

  const handleEndVideoXPTimer = async () => {
    try {
      await ProviderUAA?.endVideoXPTimer(objectId);
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message || 'Terjadi kesalahn pada sistem kami',
      });
    }
  };

  const handleCreateUserLearnPorgress = async () => {
    try {
      await ProviderLPT?.createUserLearnProgress({
        userId: getUser?.data?.id,
        bodyPayload: {
          chapter_material_id:
            chapterData?.chapter_material?.[0]?.id || chapterData?.chapter?.id,
          is_done: true,
        },
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  useEffect(() => {
    const fetchMediaChapter = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const response = await api.get(
          `media/v1/file/html/${
            chapterData?.chapter_material?.file_id ||
            chapterData?.chapter_material?.[0]?.file_id ||
            chapterData?.file
          }`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );
        if (response?.status === 200) {
          if (
            response?.data?.data?.path_url !==
            'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/'
          ) {
            setMedia({
              ID: response?.data?.data?.ID,
              path_url: response?.data?.data?.path_url,
            });
          }
        }
      } catch (err) {
        return;
      }
    };
    fetchMediaChapter();
    handleStartVideoXPTimer();
    handleCreateUserLearnPorgress();

    const fetchDuration: any = dispatch(
      fetchStartDurationLearn({subject_id: chapterData?.id}),
    );
    fetchDuration.then(() => {
      lockToLandscape();
      setDurationId(startDurationLearn?.data?.id);
    });
    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    // Bersihkan listener saat komponen dilepas (componentWillUnmount)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webViewStyle}
        source={{
          uri: media?.path_url,
        }}
        useWebView2={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
        startInLoadingState={true}
        scalesPageToFit={true}
        contentMode={'desktop'}
        injectedJavaScript={injectJavascript}
      />

      <TouchableOpacity
        onPress={() => {
          handleGoBack();
        }}
        style={styles.closeIconStyle}>
        <CloseIcon width={100} height={100} />
      </TouchableOpacity>

      <Pressable
        onPress={() => {
          setVisibleDetail(true);
        }}
        style={styles.shareIconStyle}>
        <SaveIcon width={100} height={100} />
      </Pressable>

      {/* Notes: Sementara di hide dulu
      <Pressable style={styles.shareIconStyle}>
        <ShareIcon width={100} height={100} />
      </Pressable> */}
      <DetailNote
        type="mynotes"
        mode="create"
        visible={visibleDetail}
        onClose={onCloseDetailNote}
        onSuccessSubmit={() => {
          setShowSnackbar(true);
          setVisibleDetail(false);
        }}
        chapterMaterialId={
          chapterData?.chapter_material?.[0].id?.toString() ||
          chapterData?.chapter?.id?.toString()
        }
        coverScreen
        height={100}
      />
      <SnackbarResult
        label="Berhasil"
        visible={showSnackBar}
        onPressClose={() => setShowSnackbar(false)}
      />
    </View>
  );
};

export default ConceptScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  headerContainer: {backgroundColor: 'white'},
  sliderContainer: {
    backgroundColor: Colors.primary.light1,
    flex: 1,
  },
  webViewStyle: {flex: 2},
  presentationContainer: {width: '100%', height: 80},
  subjectContainer: {height: '85%'},
  sliderInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  closeIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    top: '28%',
    left: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  saveIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    top: '28%',
    right: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  shareIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    top: '28%',
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  sliderInfoContentContainer: {
    width: 62,
    height: 20,
    backgroundColor: Colors.primary.light2,
    marginVertical: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sliderTitle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    fontSize: 11,
  },
  sliderCount: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    fontSize: 11,
    marginLeft: '5%',
  },
  descriptionContainer: {flex: 6.5},
  descriptionInnerContainer: {width: '100%', paddingHorizontal: '5%'},
  descriptionTitleContainer: {width: '100%'},
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  descriptionBodyContainer: {width: '100%'},
  descriptionBody: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    marginTop: '2%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
  },
});
