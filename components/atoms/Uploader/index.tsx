import {
  ImageBackground,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import IconClose from '@assets/svg/ic24_x_round.svg';
import Colors from '@constants/colors';
import FileIcon from '@assets/svg/ic24_file.svg';
import UploadIcon from '@assets/svg/ic24_upload.svg';
import ProgressBar from '@components/atoms/ProgressBar';

export type UploaderProps = {
  path_url?: string | any;
  onRemoveFile?: () => void;
  isImageFormat?: boolean;
  onUpload?: () => void;
  fileName?: string;
  isUploading?: boolean;
  btnLabel?: string;
  labelFormat?: string;
  progressUpload?: string;
  showFormatLabel?: boolean;
  formatType?: string;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const Uploader: React.FC<UploaderProps> = ({
  showFormatLabel = true,
  formatType = '.doc/.pdf/.png/.jpeg.',
  ...props
}) => {
  let render;
  if (props.path_url && props.isImageFormat) {
    render = (
      <View style={[styles.container, props?.containerStyle]}>
        <ImageBackground
          source={{uri: props.path_url}}
          style={styles.imgBg}
          resizeMode="contain">
          <Pressable
            onPress={props.onRemoveFile}
            style={{alignItems: 'flex-end'}}>
            <IconClose />
          </Pressable>
          <View style={styles.btnContainer}>
            {props.isUploading ? (
              <ProgressBar progress={props.progressUpload} />
            ) : (
              <Pressable style={styles.btn} onPress={props.onUpload}>
                <Text style={styles.reuploadLabel}>Unggah Ulang</Text>
              </Pressable>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  } else if (props.path_url) {
    render = (
      <View style={styles.fileBg}>
        <View style={styles.containerFileHeaderContent}>
          <Text style={styles.headerLabel}>File</Text>
          <Pressable
            onPress={props.onRemoveFile}
            style={{alignItems: 'flex-end'}}>
            <IconClose />
          </Pressable>
        </View>
        <View style={styles.containerFileContent}>
          <FileIcon />
          <Text style={styles.fileLabel}>{props.fileName ?? 'File'}</Text>
        </View>
        <View style={styles.btnContainer}>
          {props.isUploading ? (
            <ProgressBar progress={props.progressUpload} />
          ) : (
            <Pressable style={styles.btn} onPress={props.onUpload}>
              <Text style={styles.reuploadLabel}>Unggah Ulang</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  } else {
    render = (
      <TouchableOpacity onPress={props.onUpload}>
        <View
          style={[
            {
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: Colors.primary.light3,
            },
            props.buttonContainerStyle,
          ]}>
          <UploadIcon />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: Colors.primary.base,
            }}>
            {props.btnLabel ?? 'Unggah Gambar'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      {render}
      {showFormatLabel && (
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: Colors.dark.neutral60,
            fontSize: 12,
            marginTop: 8,
          }}>
          {props.labelFormat ??
            `Maksimum ukuran file 100 MB.\nFile dapat dalam format ${formatType}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  imgBg: {
    borderRadius: 10,
    height: 166,
    padding: 12,
  },
  fileBg: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reuploadLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.primary.base,
  },
  containerFileHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  containerFileContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  fileLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    flexGrow: 1,
    fontSize: 14,
  },
});

export {Uploader};
