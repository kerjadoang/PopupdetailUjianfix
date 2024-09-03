import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {downloadFile, showErrorToast} from '@constants/functional';
import FastImage from 'react-native-fast-image';
import Colors from '@constants/colors';
import Carousel from 'react-native-snap-carousel-v4';
import Pdf from 'react-native-pdf';
import {MainView, PopUpVideoNotReady} from '@components/atoms';
import IconDownload from '@assets/svg/ic24_download_round.svg';
import IconNext from '@assets/svg/ic32_rounded_chevron_right.svg';
import IconPrev from '@assets/svg/ic32_rounded_chevron_left.svg';
import {IMediaType} from '@api/types';
import dayjs from 'dayjs';

type Props = {
  data?: any;
  fileId?: string;
  showPopupWhenError?: boolean;
};

type IPDFMedia = {
  images: Array<any>;
  isError?: boolean;
} & IMediaType;

const MiniPdf: FC<Props> = ({data, fileId, showPopupWhenError = true}) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBottom, setCurrentPageBottom] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [maxRead, setMaxRead] = useState(1);
  const [isLoadingPdf, setIsloadingPdf] = useState(false);

  const [media, setMedia] = useState<IPDFMedia>({
    ID: '000000000000000000000000',
    path_url: 'https://storage.googleapis.com/kp_reborn_bucket/kelas_pintar/',
    status: '',
    images: [],
    isError: false,
  });

  const [showPopUp, setShowPopUp] = useState<boolean>(false);

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
      setShowPopUp(true);
    }
  }, [media?.status]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const file_id = fileId ?? `${data?.file_id}`;
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
    }
  }, [currentPageBottom]);

  const keyExtractor = (item: any, index: any) => index?.toString();
  const _carousel: any = useRef();
  const renderItem = ({item, index}: any) => {
    return (
      <View key={index} style={styles.item}>
        <FastImage
          source={{uri: item}}
          style={styles.image}
          resizeMode={
            Platform.OS === 'android'
              ? FastImage.resizeMode.center
              : FastImage.resizeMode.contain
          }
        />
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

  const onDownloadPress = async () => {
    try {
      const fullDate = dayjs().format('YYYYMMDDHHmmss');
      const fileName = `${fullDate}_${media.original_name}`;
      await downloadFile({
        fileExt: (media.content_extention as IFileExt) || 'pdf',
        fileNameWithExt: fileName,
        full_path: media.path_url || '',
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        {!media?.isError && showPopupWhenError ? (
          <ActivityIndicator
            size={'large'}
            style={[handleDisplay(isLoadingPdf)]}
            color={Colors.primary.base}
          />
        ) : null}

        {!media?.isError ? (
          <MainView>
            <MainView zIndex={1}>
              <View>
                <MainView zIndex={1} position="absolute" right={8} top={10}>
                  <TouchableOpacity onPress={onDownloadPress}>
                    <IconDownload width={24} height={24} />
                  </TouchableOpacity>
                </MainView>
                {currentPage !== totalPage ? (
                  <MainView
                    zIndex={1}
                    position="absolute"
                    right={8}
                    top={Dimensions.get('window').height / 6}>
                    <TouchableOpacity onPress={handleNextPage}>
                      <IconNext width={24} height={24} />
                    </TouchableOpacity>
                  </MainView>
                ) : null}
                {currentPage === 1 ? null : (
                  <MainView
                    zIndex={1}
                    position="absolute"
                    left={8}
                    top={Dimensions.get('window').height / 6}>
                    <TouchableOpacity onPress={handlePreviousPage}>
                      <IconPrev width={24} height={24} />
                    </TouchableOpacity>
                  </MainView>
                )}
              </View>
            </MainView>
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
          </MainView>
        ) : (
          <View style={styles.noMediaContainer}>
            <Text style={styles.noMediaText}>Tidak dapat memuat media</Text>
          </View>
        )}
      </View>

      {showPopupWhenError && (
        <PopUpVideoNotReady
          close={() => setShowPopUp(false)}
          show={showPopUp}
          type="ebook"
        />
      )}
    </View>
  );
};

export default MiniPdf;
