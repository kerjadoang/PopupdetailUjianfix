import SvgUri2 from '@components/atoms/SvgUri2';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React, {FC, ReactElement} from 'react';
import {View, StyleProp, ViewStyle, ImageStyle, Pressable} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {useRenderImage} from '@components/atoms/RenderImage/useRenderImage';
import ImageZoom from 'react-native-image-pan-zoom';

type Props = {
  imageUrl?: string | undefined;
  imageId?: string;
  style?: StyleProp<ImageStyle> | StyleProp<ViewStyle> | any;
  svgStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
  onPress?: () => void;
  placeholder?: ReactElement;
  resizeMode?: FastImageProps['resizeMode'];
  source?: FastImageProps['source'];
  showPreviewImage?: boolean;
  showPreview?: CallBackWithParams<void, boolean>;
};

const RenderImageViewer: FC<Props> = props => {
  const {
    source,
    style,
    imageStyle,
    svgStyle,
    width,
    height,
    placeholder,
    containerStyle,
    currentImageUrl,
    resizeMode,
    isError,
    onPress,
    onLoadStart,
    onLoadEnd,
    onError,
    openPreview,
  } = useRenderImage(props);

  const renderSvg = () => {
    const currentSvgStyle = svgStyle || style;
    return (
      <SvgUri2
        uri={currentImageUrl || ''}
        style={currentSvgStyle}
        width={width || currentSvgStyle?.width}
        height={height || currentSvgStyle?.height}
        onLoadStart={onLoadStart}
        onLoad={onLoadEnd}
        onError={onError}
      />
    );
  };

  const renderDefaultImage = () => {
    const currentDefaultImageStyle = imageStyle || style;
    return (
      <ImageZoom
        cropHeight={WINDOW_HEIGHT}
        cropWidth={WINDOW_WIDTH}
        imageHeight={Number(height || WINDOW_HEIGHT)}
        imageWidth={Number(width || WINDOW_WIDTH)}
        useNativeDriver
        centerOn={{
          x: 0,
          y: 0,
          scale: 1.01,
          duration: 100,
        }}
        enableSwipeDown={true}
        maxScale={10}
        minScale={1}
        swipeDownThreshold={-1}
        onDoubleClick={() => {}}>
        <FastImage
          source={source || {uri: currentImageUrl, cache: 'immutable'}}
          resizeMode={resizeMode || 'contain'}
          style={[{width: width, height: height}, currentDefaultImageStyle]}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
        />
      </ImageZoom>
    );
  };

  const renderPlaceHolder = () => {
    return placeholder || <View style={style} />;
  };

  return (
    <Pressable onPress={onPress ?? openPreview}>
      <View style={containerStyle}>
        {isError || !currentImageUrl
          ? renderPlaceHolder()
          : currentImageUrl?.endsWith('.svg')
          ? renderSvg()
          : renderDefaultImage()}

        {/* <ImageViewer
          visible={isModalOpen}
          onRequestClose={onModalClose}
          pathUrl={currentImageUrl}
        /> */}
      </View>
    </Pressable>
  );
};

export default RenderImageViewer;
