import React, {FC} from 'react';
import {View, Pressable, ViewStyle} from 'react-native';
import styles from './styles';
import ImageViewer from '@components/molecules/ImageViewer';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import IconDownload from '@assets/svg/ic24_download_round.svg';
import IcBlueEye from '@assets/svg/blue_eye.svg';
import Colors from '@constants/colors';
import {useDisclosure} from '@hooks/useDisclosure';
import {Button} from '@components/atoms';
import IcClose from '@assets/svg/ic_closeIcon.svg';
import {IMediaType} from '@api/types';
import {downloadFile} from '@constants/functional';

export type LembarKerjaImageViewProps = {
  fileData?: IMediaType;
  onDownloadImage?: CallBack<void>;
  userRole?: UserRole;
  onRemoveImage?: CallBack<void>;
  imageViewType?: 'upload' | 'view';
  hideDownloadbutton?: boolean;
  hidePreviewButton?: boolean;
  hideReuploadButton?: boolean;
  hideRemoveIcon?: boolean;
  onReuploadImage?: CallBack<void>;
};

const LembarKerjaImageView: FC<LembarKerjaImageViewProps> = ({
  fileData,
  userRole,
  onRemoveImage,
  onReuploadImage,
  hideRemoveIcon = false,
  hideDownloadbutton = true,
  hideReuploadButton = true,
  hidePreviewButton = false,
  imageViewType = 'view',
}) => {
  const {isVisible: isImageViewerShow, toggle: toggleImageViewer} =
    useDisclosure();
  const onDownloadPress = async () => {
    try {
      // const fullDate = dayjs().format('YYYYMMDDHHmmss');
      const fileName = `${fileData?.file_name}`;
      await downloadFile({
        fileExt: fileData?.content_extention! as IFileExt,
        fileNameWithExt: fileName,
        full_path: fileData?.path_url || '',
      });
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <RenderImage
        imageId={fileData?.ID}
        height={WINDOW_HEIGHT / 4}
        resizeMode="cover"
        style={{borderRadius: 12, overflow: 'hidden'} as ViewStyle}
      />
      {/* {userRole === 'MURID' && ( */}
      <View style={styles.optionsContainer}>
        {imageViewType === 'view' && userRole === 'MURID' && (
          <View style={styles.optionsContainer}>
            <Pressable onPress={toggleImageViewer} style={styles.eyeContainer}>
              <IcBlueEye height={14} width={18} />
            </Pressable>
            <IconDownload onPress={onDownloadPress} height={24} width={24} />
          </View>
        )}
        {imageViewType === 'upload' && !hideRemoveIcon && (
          <View>
            <IcClose onPress={onRemoveImage} height={42} width={42} />
          </View>
        )}
      </View>
      {/* )} */}
      {/* {userRole === 'GURU' && ( */}
      <View style={styles.bottomOptionsContainer}>
        {!hidePreviewButton && (
          <Button
            label="Lihat Gambar"
            action={toggleImageViewer}
            fontSize={10}
            color={Colors.primary.base}
            background={Colors.white}
            padding={8}
          />
        )}
        {!hideReuploadButton && (
          <Button
            label="Unggah ulang"
            action={onReuploadImage}
            fontSize={10}
            color={Colors.primary.base}
            background={Colors.white}
            padding={8}
          />
        )}
        {!hideDownloadbutton && (
          <Button
            label="Download"
            action={toggleImageViewer}
            fontSize={10}
            padding={8}
          />
        )}
      </View>
      {/* )} */}
      {/* {userRole === 'MURID' && imageViewType === 'upload' && (
        <View style={styles.bottomOptionsContainer}>
          {!hidePreviewButton && (
            <Button
              label="Lihat Gambar"
              action={toggleImageViewer}
              fontSize={10}
              color={Colors.primary.base}
              background={Colors.white}
              padding={8}
            />
          )}
           {!hideReuploadButton && (
            <Button
              label="Unggah ulang"
              action={onReuploadImage}
              fontSize={10}
              color={Colors.primary.base}
              background={Colors.white}
              padding={8}
            />
          )}
        </View>
      )} */}
      <ImageViewer
        visible={isImageViewerShow}
        onRequestClose={toggleImageViewer}
        imageId={fileData?.ID}
      />
    </View>
  );
};

export default LembarKerjaImageView;
