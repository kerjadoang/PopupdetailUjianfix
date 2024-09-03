import {View, TouchableOpacity, Dimensions, Platform} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Colors from '@constants/colors';
import Pdf from 'react-native-pdf';
import {Button, PopUp, PopUpVideoNotReady} from '@components/atoms';
import {ActivityIndicator, Text} from 'react-native-paper';
import ArrowRightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import SaveMediaIcon from '@assets/svg/ic_saveMedia_blue.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEndDurationLearn, fetchStartDurationLearn} from '@redux';
import ArrowGrey from '@assets/svg/ic_arrow_right_grey.svg';
import DetailNote from '../NotesScreen/components/DetailNote';
import PancasilaDetailNote from '../PancasilaNotesScreen/components/PancasilaDetailNote';
import SnackbarResult from '@components/atoms/SnackbarResult';
import IcSendBlue from '@assets/svg/ic_send_blue.svg';
import RobotClose from '@assets/svg/Robot_close.svg';
import {styles} from './styles';
import ProviderLPT from '@services/lpt/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import More from '@assets/svg/ic24_more_blue.svg';
import {SwipeUpActionMaterials} from '@components/molecules';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel-v4';
import {isStringContains, showErrorToast} from '@constants/functional';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import ImageZoom from 'react-native-image-pan-zoom';
import {useDeviceOrientation} from '@react-native-community/hooks';
import Orientation from 'react-native-orientation-locker';

const EbookScreen = React.memo(({route}: any) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBottom, setCurrentPageBottom] = useState(1);
  const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [maxRead, setMaxRead] = useState(1);
  const [durationId, setDurationId] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoadingPdf, setIsloadingPdf] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [visiblePancasilaDetail, setVisiblePancasilaDetail] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch: any = useDispatch();
  const {startDurationLearn, getUser}: any = useSelector(state => state);
  const onCloseDetailNote = useCallback(() => {
    setVisibleDetail(false);
    setVisiblePancasilaDetail(false);
  }, []);
  const [media, setMedia] = useState({
    ID: '000000000000000000000000',
    path_url: 'https://storage.googleapis.com/kp_reborn_bucket/kelas_pintar/',
    status: '',
    images: [],
    isError: false,
  });
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const {
    chapterData,
    subjectId,
    screen_type,
    isFromGuru,
    isFromSchoolMaterials,
  } = route.params;
  const projectData = route?.params?.projectData;
  const isProjectPancasila = (role?: 'guru' | 'kepsek') => {
    if (!screen_type?.includes('pancasila')) {
      return false;
    }

    if (!role) {
      return true;
    }

    // if (projectData?.id) {
    //   return true;
    // }

    if (!isStringContains(screen_type, role)) {
      return false;
    }
    return true;
  };

  const parsePancasilaRole = () => {
    if (isProjectPancasila('guru')) {
      return 'guru';
    }
    if (isProjectPancasila('kepsek')) {
      return 'kepsek';
    }
    return 'murid';
  };

  const handleClickButtonLastRead = useCallback(async () => {
    setCurrentPage(maxRead);
    setCurrentPageBottom(maxRead);
  }, [maxRead]);

  const handleDisplay: any = (val: boolean) => {
    return {
      display: val ? 'flex' : 'none',
    };
  };

  const handleDisplayPDF: any = (val: boolean) => {
    return {
      opacity: val ? 0 : 1,
    };
  };

  const handleCreateUserLearnProgress = async () => {
    try {
      if (isProjectPancasila()) {
        return;
      }

      await ProviderLPT.createUserLearnProgress({
        userId: getUser?.data?.id,
        bodyPayload: {
          chapter_material_id: chapterData?.id || route.params?.projectData?.id,
          is_done: true,
        },
      });
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const fetchDuration = async () => {
    if (isProjectPancasila()) {
      return;
    }
    await dispatch(
      fetchStartDurationLearn(
        {subject_id: subjectId},
        route?.params?.contentType,
        (res: any) => {
          setDurationId(res?.data?.data?.id);
        },
      ),
    );
  };

  useEffect(() => {
    if (media?.status === 'process') {
      setShowPopUp(true);
    }
  }, [media?.status]);

  useEffect(() => {
    const fetchMediaChapter = async () => {
      try {
        const file_id = `${
          chapterData?.chapter_material?.file_id ||
          chapterData?.file_id ||
          chapterData?.file ||
          projectData?.media_id
        }`;
        const resData = await apiGet({url: URL_PATH.get_ebook(file_id)});
        setMedia(resData);
        setTotalPage(resData.images?.length);
        setIsloadingPdf(false);
        // const token = await AsyncStorage.getItem(Keys.token);
        // const tokenParse = await JSON.parse(token || '');

        // const response = await api.get(
        //   `media/v1/file/html/${
        //     chapterData?.chapter_material?.file_id ||
        //     chapterData?.file_id ||
        //     chapterData?.file ||
        //     projectData?.media_id
        //   }`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${tokenParse}`,
        //     },
        //   },
        // );
        // logApi({
        //   nameFunction: 'apiGet',
        //   res: response,
        //   tags: 'fetchMediaChapter',
        // });
        // console.log('cek response', response?.status);
        // if (response?.status === 200) {
        //   const data = response?.data?.data;
        //   setMedia(data);
        //   setTotalPage(data.images?.length);
        //   setIsloadingPdf(false);
        //   return;
        // }
      } catch (err: any) {
        setMedia({...media, isError: true});
        setIsloadingPdf(false);
        showErrorToast(err);
        return;
      }
    };

    fetchDuration();
    setDurationId(startDurationLearn?.data?.id);

    fetchMediaChapter();
    if (maxRead < currentPageBottom) {
      setMaxRead(currentPageBottom);
      setShowButton(false);
    }

    if (currentPageBottom !== maxRead) {
      setShowButton(true);
    }

    if (currentPageBottom >= maxRead) {
      setShowButton(false);
    }

    if (currentPage === totalPage) {
      handleCreateUserLearnProgress();
    }
  }, [currentPageBottom]);
  const startXP = async () => {
    if (isProjectPancasila()) {
      return;
    }
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const requestBody = {
      chapter_material_id: chapterData?.id || route.params?.projectData?.id,
      is_done: true,
    };
    const response = await api.post('/lpt/v1/learn/new_progress', requestBody, {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    });
    if (response.status === 200) {
    }
  };

  const navigationContext: any = React.useContext(NavigationContext);

  const handleGoBack = async () => {
    dispatch(fetchEndDurationLearn(durationId));
    handleCreateUserLearnProgress();
    if (isFromSchoolMaterials) {
      navigationContext.pop(3);
      return;
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (currentPageBottom === totalPage) {
      startXP();
      fetchDuration();
    }
  }, []);
  const {width, height} = Dimensions.get('screen');
  const orientation = useDeviceOrientation();
  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const keyExtractor = (item: any, index: any) => index?.toString();
  const _carousel: any = useRef();
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <ImageZoom
          cropHeight={height}
          cropWidth={width}
          imageHeight={height}
          imageWidth={width}
          onDoubleClick={() => {}}>
          <FastImage
            source={{uri: item}}
            style={[
              styles.image,
              {height: orientation === 'portrait' ? 650 : height - 130},
            ]}
            resizeMode={
              Platform.OS === 'android'
                ? FastImage.resizeMode.center
                : FastImage.resizeMode.contain
            }
          />
        </ImageZoom>
      </View>
    );
  };
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
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            handleGoBack();
          }}
          style={styles.topIconBackContainer}>
          <ArrowRightIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>E-book</Text>
        </View>
        <View style={styles.topRightIconContainer}>
          {/* <TouchableOpacity>
            <SearchBlueIcon />
          </TouchableOpacity> */}
          {
            <TouchableOpacity
              onPress={() =>
                projectData?.id
                  ? setVisiblePancasilaDetail(true)
                  : isFromGuru
                  ? setOpenMore(true)
                  : setVisibleDetail(true)
              }
              style={styles.addNotesIconContainer}>
              {isFromGuru ? (
                <More style={styles.marginHorizontal} />
              ) : !isProjectPancasila() ? (
                <SaveMediaIcon />
              ) : (
                <IcSendBlue style={{marginHorizontal: 16, marginBottom: 12}} />
              )}
            </TouchableOpacity>
          }
        </View>
      </View>
      <View style={styles.sliderContainer}>
        {!media?.isError ? (
          <ActivityIndicator
            size={'large'}
            style={[handleDisplay(isLoadingPdf)]}
            color={Colors.primary.base}
          />
        ) : null}

        {!media?.isError ? (
          <View>
            {media?.images ? (
              <Carousel
                ref={_carousel}
                data={media?.images as any}
                renderItem={renderItem}
                vertical={false}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onSnapToItem={index => setCurrentPage(index + 1)}
                keyExtractor={keyExtractor}
              />
            ) : (
              <Pdf
                source={{uri: media?.path_url}}
                onLoadComplete={numberOfPages => {
                  setIsloadingPdf(false);
                  setTotalPage(numberOfPages);
                }}
                onPageChanged={page => {
                  setCurrentPageBottom(page);
                }}
                page={currentPage}
                horizontal={true}
                enablePaging={true}
                onLoadProgress={() => {
                  setIsloadingPdf(true);
                }}
                trustAllCerts={false}
                style={[styles.pdf, handleDisplayPDF(isLoadingPdf)]}
                ref={scrollViewRef}
              />
            )}
          </View>
        ) : (
          <View style={styles.noMediaContainer}>
            <Text style={styles.noMediaText}>Tidak dapat memuat media</Text>
          </View>
        )}
      </View>
      {media?.images ? (
        <View style={styles.footerContainer}>
          <View>
            <Text
              style={
                styles.paginationText
              }>{`Halaman ${currentPage} dari ${totalPage}`}</Text>
          </View>
          {currentPage === 1 ? null : (
            <TouchableOpacity
              onPress={handlePreviousPage}
              style={styles.prevIcon}>
              <ArrowRightIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={currentPage === totalPage ? true : false}
            onPress={handleNextPage}
            style={styles.nextIcon}>
            {currentPage === totalPage ? (
              <ArrowGrey width={23} height={23} />
            ) : (
              <ArrowRightIcon />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <View>
            <Text
              style={
                styles.paginationText
              }>{`Halaman ${currentPageBottom} dari ${totalPage}`}</Text>
          </View>
          {currentPageBottom === 1 ? null : (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPageBottom - 1)}
              style={styles.prevIcon}>
              <ArrowRightIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={currentPageBottom === totalPage ? true : false}
            onPress={() => setCurrentPage(currentPageBottom + 1)}
            style={styles.nextIcon}>
            {currentPage === totalPage ? (
              <ArrowGrey width={23} height={23} />
            ) : (
              <ArrowRightIcon />
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.floatingButtonContainer, handleDisplay(showButton)]}>
        <Button
          label={'Ke terakhir di baca'}
          action={() => {
            handleClickButtonLastRead();
          }}
          style={styles.floatingButton}
        />
      </View>
      <SwipeUpActionMaterials
        onClose={() => setOpenMore(false)}
        visible={openMore}
        navigation={navigation}
        data={chapterData}
        fromScreen="EBookScreen"
        screenParams={route?.params}
      />
      {projectData?.id ? (
        <PancasilaDetailNote
          type="mynotes"
          mode="create"
          role={parsePancasilaRole()}
          visible={visiblePancasilaDetail}
          onClose={onCloseDetailNote}
          onSuccessSubmit={() => {
            setVisiblePancasilaDetail(false);
          }}
          projectId={route.params?.projectData?.id}
          data={projectData}
          isPancasila
          coverScreen
          height={100}
        />
      ) : (
        <DetailNote
          type="mynotes"
          mode="create"
          visible={visibleDetail}
          onClose={onCloseDetailNote}
          onSuccessSubmit={() => {
            setShowSnackbar(true);
            setVisibleDetail(false);
          }}
          chapterMaterialId={route.params?.chapterData?.id}
          coverScreen
          height={100}
        />
      )}
      <SnackbarResult
        label={
          parsePancasilaRole() === 'guru'
            ? 'Berhasil'
            : 'Catatan berhasil ditambahkan.'
        }
        visible={showSnackBar}
        onPressClose={() => setShowSnackbar(false)}
      />
      <PopUp
        show={isOpenPopUp}
        Icon={RobotClose}
        title={'Rekomendasi'}
        desc={'Apakah anda yakin mau merekomendasikan Projek?'}
        titleConfirm={'Rekomendasi'}
        actionConfirm={() => {
          setIsOpenPopUp(!isOpenPopUp);
          setShowSnackbar(true);
        }}
        titleCancel={'Kembali'}
        actionCancel={() => setIsOpenPopUp(!isOpenPopUp)}
        close={() => setIsOpenPopUp(!isOpenPopUp)}
      />
      <PopUpVideoNotReady
        close={() => setShowPopUp(false)}
        show={showPopUp}
        type="ebook"
      />
    </View>
  );
});

export default EbookScreen;
