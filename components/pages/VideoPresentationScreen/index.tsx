/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header} from '@components/atoms/Header';
import {Button, PopUpVideoNotReady, SwipeUp} from '@components/atoms';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEndDurationLearn, fetchStartDurationLearn} from '@redux';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import {URL_PATH} from '@constants/url';
import SaveMediaIcon from '@assets/svg/ic_saveMedia_blue.svg';
import DetailNote from '../NotesScreen/components/DetailNote';
import SnackbarResult from '@components/atoms/SnackbarResult';
import ProviderLPT from '@services/lpt/provider';
import ProviderUAA from '@services/uaa/provider';
import RobotEmptyIcon from '@assets/svg/robot_empty_search.svg';
import RobotEmptyBlogIcon from '@assets/svg/robot_empty_blog.svg';
import More from '@assets/svg/ic24_more_blue.svg';
import SearchInput from '@components/atoms/SearchInput';
import {apiGet, apiGetBulkImage} from '@api/wrapping';
import {
  isStringContains,
  showErrorToast,
  showLoading,
  dismissLoading,
  htmlObjectTagWrapping,
  _handleUserTypeId,
} from '@constants/functional';
import {SwipeUpActionMaterials} from '@components/molecules';
import SwipeUpCardItem from './Components/SwipeUpCardItem';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import {getToken} from '@hooks/getToken';
import jwtDecode from 'jwt-decode';

const VideoPresentationScreen = ({route}: any) => {
  const webViewRef = useRef<any>();
  const [isDisplay, setIsDisplay] = useState(false);
  const [media, setMedia] = useState({
    ID: '000000000000000000000000',
    path_url: '',
    status: '',
  });
  const [durationId, setDurationId] = useState<any>();
  const [isPPT, setIsPPT] = useState<boolean>(true);
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
  const [objectId, setObjectId] = useState<any>('');
  const [txtSearch, setTxtSearch] = useState<string>('');
  const navigation: any = useNavigation();
  const [presentationData, setPresentationData] = useState<any>();
  const {
    contentData,
    subjectId,
    contentType,
    isFromGuru,
    isFromSchoolMaterials,
  } = route?.params;
  const {getUser}: any = useSelector(state => state);
  const [listBab, setListBab] = useState<any[]>();
  const [tempListBab, setTempListBab] = useState<any[]>();
  const dispatch: any = useDispatch();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const onCloseDetailNote = useCallback(() => {
    setVisibleDetail(false);
  }, []);

  const handleStartVideoXPTimer = async () => {
    try {
      const userToken = jwtDecode<IBaseJWTUser>(await getToken());
      if (_handleUserTypeId(userToken.user_type_id || 0).role !== 'MURID') {
        return;
      }
      const _fetchData = await ProviderUAA?.startVideoXPTimer({
        activity: 'video_presentasi',
        type: 'learn',
        reference_id: contentData?.id?.toString(),
      });
      const ResData = _fetchData?.data || false;
      setObjectId(ResData?.data?.id);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || 'Terjadi kesalahan pada sistem kami',
      );
    }
  };

  const handleEndVideoXPTimer = async () => {
    try {
      const userToken = jwtDecode<IBaseJWTUser>(await getToken());
      if (_handleUserTypeId(userToken.user_type_id || 0).role !== 'MURID') {
        return;
      }
      await ProviderUAA?.endVideoXPTimer(objectId);
    } catch (error: any) {}
  };

  const handleCreateUserLearnPorgress = async () => {
    try {
      const userToken = jwtDecode<IBaseJWTUser>(await getToken());
      if (_handleUserTypeId(userToken.user_type_id || 0).role !== 'MURID') {
        return;
      }
      await ProviderLPT?.createUserLearnProgress({
        userId: getUser?.data?.id,
        bodyPayload: {
          chapter_material_id: contentData?.id,
          is_done: true,
        },
      });
      navigation.goBack();
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || 'Terjadi kesalahan pada sistem kami',
      );
      navigation.goBack();
    }
  };

  const fetchMediaChapter = async () => {
    try {
      const data = await apiGet({
        url: URL_PATH.get_file_html(contentData?.file_id || contentData?.file),
      });
      setPresentationData(data);
      setMedia({
        ID: data?.ID,
        path_url: data?.path_url,
        status: data?.status,
      });

      if (!isStringContains(data?.path_url, 'ppt')) {
        setIsPPT(false);
      }

      await getBabPelajaran();
    } catch (err: any) {
      showErrorToast(err, {visibilityTime: 3000});
      if (isStringContains(err, 'tidak ditemukan')) {
        return navigation.goBack();
      }
    }
  };
  useEffect(() => {
    if (media?.status === 'process') {
      setShowPopUp(true);
    }
  }, [media?.status]);

  const fetchDuration = async () => {
    await dispatch(
      fetchStartDurationLearn(
        {subject_id: subjectId},
        contentType,
        (res: any) => {
          setDurationId(res?.data?.data?.id);
        },
      ),
    );
  };

  useEffect(() => {
    if (!isFromGuru) {
      handleStartVideoXPTimer();
      fetchDuration();
    }
    fetchMediaChapter();
  }, []);

  useEffect(() => {
    if (!presentationData?.presentation_slides) {
      filterBabPelajaran();
      return;
    }

    const filtered = presentationData?.presentation_slides?.filter(
      (item: any) => isStringContains(item?.subtitle, txtSearch),
    );
    const newData: any = {...presentationData};
    newData.presentation_slides = filtered;
    setPresentationData(newData);
  }, [txtSearch]);

  const handleGoBack = async () => {
    dispatch(fetchEndDurationLearn(durationId));
    handleEndVideoXPTimer();
    handleCreateUserLearnPorgress();
  };

  const injectedJavaScript = `
  (function() {
    var elementsToHide = document.querySelectorAll('.office-doc-top-menu, .office-doc-command-bar');
    for (var i = 0; i < elementsToHide.length; i++) {
      elementsToHide[i].style.display = 'none';
    }})();`;

  const handleNavigationStateChange = (navState: any) => {
    if (navState?.url === media?.path_url) {
      return;
    }
  };
  const isFromLMS = isStringContains(contentType, 'lms');
  const getBabPelajaran = async () => {
    try {
      showLoading();

      let resData = await apiGet({
        url: URL_PATH.get_next_content_video_presentation(
          contentData?.chapter_id || contentData?.chapter?.id,
          contentData?.learning_method_id || contentData?.service_method?.id,
          isFromLMS,
        ),
      });

      resData = await apiGetBulkImage({
        dottedString: 'thumbnail',
        datas: resData,
      });

      setListBab(resData);
    } catch (error: any) {
      // showErrorToast(
      //   error?.response?.data?.message || 'Terjadi kesalahan pada sistem kami',
      // );
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    setTempListBab(listBab);
  }, [listBab]);

  const filterBabPelajaran = () => {
    const filteredBab = listBab?.filter(item =>
      isStringContains(item?.title, txtSearch),
    );
    setTempListBab(filteredBab);
  };

  const webviewScrollTo = () => {
    setIsDisplay(false);
  };

  const handleWebViewRef = (ref: any) => {
    webViewRef.current = ref;
  };

  const navigationContext: any = React.useContext(NavigationContext);

  const renderSearchNotFound = () => {
    return (
      <View style={styles.swipeErrorNotFoundContainer}>
        <RobotEmptyIcon />
        <Text style={styles.swipeEmptyStateTextTop}>
          Pencarian Tidak Ditemukan
        </Text>
        <Text style={styles.swipeErrorNotFoundTextBottom}>
          Hasil pencarian "{txtSearch?.toUpperCase()}" nihil. Coba
          {'\n'}
          kunci lainnya!
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.swipeErrorNotFoundContainer}>
        <RobotEmptyBlogIcon />
        <Text style={styles.swipeErrorNotFoundTextTop}>
          Pokok bahasan tidak ditemukan
          {/* {isPPT
            ? 'Pokok bahasan tidak ditemukan'
            : 'Materi pelajaran lainnya tidak ditemukan'} */}
        </Text>
      </View>
    );
  };

  const renderPokokBahasan = () => {
    if (
      presentationData?.presentation_slides?.length == 0 &&
      txtSearch !== ''
    ) {
      return renderSearchNotFound();
    }

    if (
      !presentationData?.presentation_slides ||
      presentationData?.presentation_slides?.length == 0
    ) {
      return renderEmptyState();
    }

    return (
      <ScrollView>
        {presentationData?.presentation_slides?.map(
          (
            _pres_data: {
              description: String;
              slide_title: String;
              subtitle: String;
              path_url: any;
            },
            index: number,
          ) => {
            return (
              <SwipeUpCardItem
                key={index}
                index={index}
                onPress={() => webviewScrollTo(index)}
                title={`${_pres_data?.slide_title}. ${_pres_data?.subtitle}`}
                imageUrl={_pres_data?.path_url}
              />
            );
          },
        )}
      </ScrollView>
    );
  };

  const renderBabPelajaran = () => {
    if (tempListBab?.length == 0 && txtSearch !== '') {
      return renderSearchNotFound();
    }

    if (!tempListBab || tempListBab?.length == 0) {
      return renderEmptyState();
    }

    return (
      <ScrollView>
        {tempListBab?.map((item, index) => {
          return (
            <SwipeUpCardItem
              key={index}
              index={index}
              onPress={() => {
                navigation.replace('VideoPresentationScreen', {
                  contentData: item,
                  subjectId: subjectId,
                  contentType: contentType,
                  isFromGuru: isFromGuru,
                });
              }}
              title={item?.title}
              imageUrl={item?.thumbnail}
            />
          );
        })}
      </ScrollView>
    );
  };

  const ppt_url = isPPT
    ? `https://view.officeapps.live.com/op/view.aspx?src=${media?.path_url}`
    : '';
  return (
    <SafeAreaView style={styles.container}>
      <Header
        label="Video Presentasi"
        onPressIconLeft={
          isFromSchoolMaterials
            ? () => {
                navigationContext.pop(3);
              }
            : !isFromGuru
            ? handleGoBack
            : navigation.goBack
        }
        // onPressIconLeft={!isFromGuru ? handleGoBack : navigation.goBack}
        iconRight={
          !isFromGuru ? (
            <SaveMediaIcon style={styles.headerIconSave} />
          ) : (
            <More />
          )
        }
        onPressIconRight={() => {
          !isFromGuru ? setVisibleDetail(true) : setOpenMore(true);
        }}
        styleIconRight={styles.headerIconRight}
        styleContainer={styles.headerContainer}
      />
      {media?.path_url ? (
        <>
          <View style={styles.mediaContainer}>
            <WebView
              ref={handleWebViewRef}
              originWhitelist={['*']}
              source={{
                uri: isPPT ? ppt_url : '',
                html: isPPT
                  ? undefined
                  : htmlObjectTagWrapping(media?.path_url),
              }}
              onLoadStart={() => (isPPT ? null : showLoading())}
              onLoadEnd={() => (isPPT ? null : dismissLoading())}
              onLoad={() => (isPPT ? null : dismissLoading())}
              javaScriptEnabled={true}
              scalesPageToFit={true}
              javaScriptCanOpenWindowsAutomatically={true}
              injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
              scrollEnabled={false}
              allowsInlineMediaPlayback={true}
              allowsProtectedMedia={true}
              mediaPlaybackRequiresUserAction={true}
              androidLayerType="hardware"
              userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
              contentMode="recommended"
              automaticallyAdjustContentInsets={false}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </View>
          {/* <View style={styles.sliderInfoContainer}>
            {isPPT === true && (
              <View style={styles.sliderInfoContentContainer}>
                <Text style={styles.sliderTitle}>Slide</Text>
                <Text style={styles.sliderCount}>
                  1/{presentationData?.presentation_slides?.length}
                </Text>
              </View>
            )}
          </View> */}
          <View style={styles.descriptionContainer}>
            <ScrollView
              style={styles.descriptionInnerContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.descriptionTitleContainer}>
                <Text style={styles.descriptionTitle}>
                  {contentData?.title}
                </Text>
              </View>
              <View style={styles.descriptionBodyContainer}>
                <Text style={styles.descriptionBody}>
                  {contentData?.description}
                </Text>
              </View>
            </ScrollView>
          </View>
        </>
      ) : null}
      <Button
        label={'Pokok Bahasan'}
        action={() => {
          setIsDisplay(true);
        }}
        style={styles.buttonContainer}
      />
      <SwipeUp
        onClose={() => setIsDisplay(false)}
        height={100}
        visible={isDisplay}
        isSwipeLine={true}
        children={
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.headerSwiperContainer}>
              <Text style={styles.headerSwiperText}>
                {/* {isPPT ? 'Pokok Bahasan' : 'Bab Pelajaran'} */}
                Pokok Bahasan
              </Text>
            </View>
            <View style={styles.swipeInputText}>
              <SearchInput
                onChangeText={(txt: string) => setTxtSearch(txt)}
                placeholder="Cari kata kunci"
                query={txtSearch}
                onClear={() => setTxtSearch('')}
              />
            </View>
            <View style={styles.h600}>
              <View style={styles.flex1}>
                {presentationData?.presentation_slides
                  ? renderPokokBahasan()
                  : renderBabPelajaran()}
              </View>
              <View style={styles.slideButtonBackContainer}>
                <View style={styles.swipeButtonBack}>
                  <Button action={() => setIsDisplay(false)} label="Kembali" />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        }
      />

      <SwipeUpActionMaterials
        onClose={() => setOpenMore(false)}
        visible={openMore}
        data={contentData}
        navigation={navigation}
        fromScreen="VideoPresentationScreen"
        screenParams={route?.params}
      />

      <DetailNote
        type={'mynotes' as any}
        mode="create"
        visible={visibleDetail}
        onClose={onCloseDetailNote}
        onSuccessSubmit={() => {
          setShowSnackbar(true);
          setVisibleDetail(false);
        }}
        chapterMaterialId={contentData?.id}
        coverScreen
        height={100}
      />
      <SnackbarResult
        label="Berhasil"
        visible={showSnackBar}
        onPressClose={() => setShowSnackbar(false)}
      />
      <PopUpVideoNotReady
        close={() => setShowPopUp(false)}
        show={showPopUp}
        type="presentation"
      />
    </SafeAreaView>
  );
};

export default VideoPresentationScreen;
