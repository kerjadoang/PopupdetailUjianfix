import React, {useRef} from 'react';
import {View, Dimensions, Text, Platform, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Header} from '@components/atoms';
import IcUnduh from '@assets/svg/ic24_unduh.svg';
import Pdf from 'react-native-pdf';
import Carousel from 'react-native-snap-carousel-v4';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import ArrowGrey from '@assets/svg/ic_arrow_right_grey.svg';
import ArrowRightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import usePDFPreview from './usePDFPreview';

const PDFPreviewScreen = () => {
  const {
    header,
    height,
    width,
    orientation,
    media,
    _carousel,
    handleNextPage,
    handlePreviousPage,
    handleDownloadPdf,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
  } = usePDFPreview();

  const scrollViewRef = useRef(null);
  const keyExtractor = (item: any, index: any) => index?.toString();

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
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <Header
        label={header?.filename ?? ''}
        iconRight={<IcUnduh />}
        onPressIconRight={() => handleDownloadPdf()}
      />

      <View style={styles.sliderContainer}>
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
                  setTotalPage(numberOfPages);
                }}
                page={currentPage}
                horizontal={true}
                enablePaging={true}
                trustAllCerts={false}
                style={styles.pdf}
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
              }>{`Halaman ${currentPage} dari ${totalPage}`}</Text>
          </View>
          {currentPage === 1 ? null : (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage - 1)}
              style={styles.prevIcon}>
              <ArrowRightIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={currentPage === totalPage ? true : false}
            onPress={() => setCurrentPage(currentPage + 1)}
            style={styles.nextIcon}>
            {currentPage === totalPage ? (
              <ArrowGrey width={23} height={23} />
            ) : (
              <ArrowRightIcon />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export {PDFPreviewScreen};
