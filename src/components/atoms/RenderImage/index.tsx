import ImageViewer from '@components/molecules/ImageViewer';
import React, {FC, ReactElement} from 'react';
import {View, StyleProp, ViewStyle, ImageStyle, Pressable} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import RenderImageLoading from './RenderImageLoading';
import SvgUri2 from '../SvgUri2';
import {useRenderImage} from './useRenderImage';
export * from './RenderImageLoading';

export type RenderImageProps = {
  imageUrl?: string | undefined;
  imageId?: string;
  style?: StyleProp<ImageStyle> | StyleProp<ViewStyle> | any;
  svgStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  width?: number | string;
  height?: number | string;
  onPress?: () => void;
  placeholder?: ReactElement;
  resizeMode?: FastImageProps['resizeMode'];
  source?: FastImageProps['source'];
  showPreviewImage?: boolean;
  showLoadingIndicator?: boolean;
};

const RenderImage: FC<RenderImageProps> = props => {
  const {
    source,
    style,
    imageStyle,
    svgStyle,
    width,
    height,
    placeholder,
    placeHolderStyle,
    containerStyle,
    showLoadingIndicator,
    currentImageUrl,
    resizeMode,
    isSVG,
    isLoading,
    isError,
    isModalOpen,
    onPress,
    onLoadStart,
    onLoadEnd,
    onError,
    openPreview,
    onModalClose,
  } = useRenderImage(props);

  const renderSvg = () => {
    const currentSvgStyle = svgStyle || style;
    return (
      <View
        style={
          isLoading && showLoadingIndicator ? placeHolderStyle : undefined
        }>
        <SvgUri2
          uri={currentImageUrl || ''}
          style={currentSvgStyle}
          width={width || currentSvgStyle?.width}
          height={height || currentSvgStyle?.height}
          onLoadStart={onLoadStart}
          onLoad={onLoadEnd}
          onError={onError}
        />
        <RenderImageLoading
          isLoading={isLoading && showLoadingIndicator}
          placeHolderStyle={placeHolderStyle}
        />
      </View>
    );
  };

  const renderDefaultImage = () => {
    const currentDefaultImageStyle = imageStyle || style;
    return (
      <View
        style={
          isLoading && showLoadingIndicator
            ? {...placeHolderStyle, borderWidth: 0}
            : undefined
        }>
        <FastImage
          source={source || {uri: currentImageUrl, cache: 'immutable'}}
          resizeMode={resizeMode || 'contain'}
          style={[{width: width, height: height}, currentDefaultImageStyle]}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
        />
        <RenderImageLoading
          isLoading={isLoading && showLoadingIndicator}
          placeHolderStyle={placeHolderStyle}
        />
      </View>
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
          : isSVG
          ? renderSvg()
          : renderDefaultImage()}
        <ImageViewer
          visible={isModalOpen}
          onRequestClose={onModalClose}
          pathUrl={currentImageUrl}
        />
      </View>
    </Pressable>
  );
};

RenderImage.defaultProps = {
  imageUrl: '',
};

export default RenderImage;
