import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconClose from '@assets/svg/ic24_x_round.svg';
import Colors from '@constants/colors';
import {Button, ButtonProps} from '@components/atoms';
import FileIcon from '@assets/svg/ic24_file.svg';
import ProgressBar from '@components/atoms/ProgressBar';

type UploadFileProps = {
  path_url?: string | any;
  onRemoveFile?: () => void;
  isImageFormat?: boolean;
  onUpload?: () => void;
  fileName?: string;
  isUploading?: boolean;
  progressUpload: string;
  buttonProps?: ButtonProps;
};

const UploadFile: React.FC<UploadFileProps> = props => {
  let render;
  if (props.path_url && props.isImageFormat) {
    render = (
      <View style={styles.container}>
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
      <Button
        label="Unggah File"
        background={Colors.white}
        borderWidth={2}
        style={{marginTop: 16}}
        color={Colors.primary.base}
        borderColor={Colors.primary.base}
        action={props.onUpload}
        {...props.buttonProps}
      />
    );
  }

  return (
    <>
      {render}
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: Colors.dark.neutral60,
          fontSize: 12,
          marginTop: 8,
        }}>
        Maksimum ukuran file 100 MB.{'\n'}
        File dapat dalam format .doc/.pdf/.png/.jpeg.
      </Text>
    </>
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

export default UploadFile;
