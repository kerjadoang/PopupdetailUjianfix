import {View, TouchableOpacity, Dimensions, Platform} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Colors from '@constants/colors';
import Pdf from 'react-native-pdf';
import {Button, Header, PopUpVideoNotReady} from '@components/atoms';
import {ActivityIndicator, Text} from 'react-native-paper';
import ArrowRightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import {useNavigation} from '@react-navigation/native';
import ArrowGrey from '@assets/svg/ic_arrow_right_grey.svg';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel-v4';
import {showErrorToast} from '@constants/functional';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {StackNavigationProp} from '@react-navigation/stack';
import {PDFViewerIKMScreenParam, ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import RobotUpload from '@assets/svg/robot_upload.svg';
import ImageZoom from 'react-native-image-pan-zoom';
import {useDeviceOrientation} from '@react-native-community/hooks';
import Orientation from 'react-native-orientation-locker';

const PDFViewerIKMScreen = React.memo(() => {
  const navigation: any =
    useNavigation<StackNavigationProp<ParamList, 'PDFViewerIKMScreen'>>();
  const {getRouteParams} = useNavigate();
  const {data, id, accountRole, title} =
    getRouteParams<PDFViewerIKMScreenParam>();

  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBottom, setCurrentPageBottom] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [maxRead, setMaxRead] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoadingPdf, setIsloadingPdf] = useState(false);
  const {width, height} = Dimensions.get('screen');
  const orientation = useDeviceOrientation();

  const [media, setMedia] = useState({
    ID: '000000000000000000000000',
    path_url: 'https://storage.googleapis.com/kp_reborn_bucket/kelas_pintar/',
    status: '',
    images: [],
    isError: false,
  });

  const [showPopUp, setShowPopUp] = useState<boolean>(false);

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

  useEffect(() => {
    if (media?.status === 'process') {
      setIsloadingPdf(false);
      setShowPopUp(true);
    }
  }, [media?.status]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const file_id = `${id || data?.ID || data?.file_id || data?.media_id}`;
        const resData = await apiGet({url: URL_PATH.get_ebook(file_id)});
        setMedia(resData);
        setTotalPage(resData.images?.length);
        setIsloadingPdf(false);
      } catch (err: any) {
        setMedia({...media, isError: true});
        setIsloadingPdf(false);
        showErrorToast(err);
        return;
      }
    };

    fetchMedia();
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
  }, [currentPageBottom]);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} />,
    });
  }, []);

  return (
    <View style={styles.container}>
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
            <Text style={styles.paginationText}>{`Halaman ${
              currentPage || ''
            } dari ${totalPage || ''}`}</Text>
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
            <Text style={styles.paginationText}>{`Halaman ${
              currentPageBottom || ''
            } dari ${totalPage || ''}`}</Text>
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

      <PopUpVideoNotReady
        overrideTitle={accountRole === 'GURU'}
        title={'Dalam Proses Unggahan Lampiran'}
        close={() => setShowPopUp(false)}
        Icon={RobotUpload}
        show={showPopUp}
        type="ebook"
      />
    </View>
  );
});

export {PDFViewerIKMScreen};
