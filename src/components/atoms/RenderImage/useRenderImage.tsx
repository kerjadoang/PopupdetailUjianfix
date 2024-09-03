import {apiGetSingleImage} from '@api/wrapping';
import {useState, useEffect, useCallback} from 'react';
import {RenderImageProps} from '.';

const useRenderImage = (props?: RenderImageProps) => {
  const {
    imageUrl,
    style,
    width,
    height,
    onPress,
    svgStyle,
    imageStyle,
    containerStyle,
    placeholder,
    resizeMode,
    source,
    imageId,
    showPreviewImage = false,
    showLoadingIndicator = true,
  } = props || {};
  const [isError, setisError] = useState<boolean>(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    imageUrl || '',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const placeHolderStyle = placeholder?.props?.style;
  const isSVG = currentImageUrl?.endsWith('.svg');

  const getImageUrl = useCallback(async () => {
    try {
      const imgUrl = await apiGetSingleImage<string>({
        imageId: imageId || '',
      });

      setCurrentImageUrl(imgUrl);
    } catch (error) {}
  }, [imageId]);

  useEffect(() => {
    if (imageId) {
      getImageUrl();
      return;
    }
    setCurrentImageUrl(imageUrl || '');
  }, [imageUrl, getImageUrl, imageId]);

  const openPreview = () => {
    if (!showPreviewImage) {
      return;
    }
    setIsModalOpen(true);
  };

  const onModalClose = () => setIsModalOpen(false);

  const onLoadEnd = () => {
    return setIsLoading(false);
  };

  const onError = () => {
    onLoadEnd();
    return setisError(true);
  };

  const onLoadStart = () => {
    return setIsLoading(true);
  };

  return {
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
  };
};

export {useRenderImage};
