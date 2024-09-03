import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import DocIcon from '@assets/svg/ic_document_blue.svg';
import XIcon from '@assets/svg/close_x.svg';
import ProgressBar from '@components/atoms/ProgressBar';
import {styles} from '../style';
import IconDownload from '@assets/svg/ic24_download_round.svg';
import {downloadFile} from '@constants/functional';
import {IMediaType} from '@api/types';

export interface UploadCardComponentProps {
  fileData: IFileData & IMediaType;
  handleRemoveData?: any;
  handleReUpload?: any;
  progressUpload: any;
  hideReUploadButton?: boolean;
  showDownloadIcon?: boolean;
  downloadFileProps?: IDownloadFile;
  handleDownloadData?: CallBack<void>;
  isError?: boolean;
  errorMessage?: string;
  reUploadText?: string;
}

const UploadCardComponent = ({
  fileData,
  handleRemoveData,
  handleReUpload,
  progressUpload,
  hideReUploadButton,
  showDownloadIcon,
  handleDownloadData,
  isError,
  reUploadText,
}: UploadCardComponentProps) => {
  const _handleDownloadData = async () => {
    try {
      const fileName = `${fileData.file_name}`;
      const reqData = {
        fileExt: ((fileData.file_type || fileData.type) as IFileExt) || 'docx',
        fileNameWithExt: fileName,
        full_path: fileData.path_url || '',
      };
      await downloadFile(reqData);
    } catch (error) {}
  };
  return (
    <View
      style={[
        !isError ? styles.UploadCardContainer : styles.UploadCardContainerError,
      ]}>
      <View style={styles.flexRow}>
        <View style={styles.flex1}>
          <Text style={styles.UploadCardFileTitle}>File</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {progressUpload === '100%' && !showDownloadIcon && (
            <TouchableOpacity onPress={handleRemoveData} style={{padding: 2}}>
              <XIcon />
            </TouchableOpacity>
          )}
          {progressUpload === '100%' && showDownloadIcon && (
            <TouchableOpacity
              onPress={handleDownloadData || _handleDownloadData}
              style={{padding: 2}}>
              <IconDownload width={24} height={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.UploadCardFileContainer}>
        <DocIcon width={20} height={20} />
        <Text style={styles.UploadCardFileName}>{fileData?.file_name}</Text>
      </View>
      {progressUpload !== '100%' && !isError ? (
        <ProgressBar progress={progressUpload} />
      ) : null}
      {!hideReUploadButton && (
        <View style={{width: '100%', flexDirection: 'row'}}>
          {progressUpload === '100%' && (
            <Pressable
              onPress={handleReUpload}
              style={styles.UploadCardUploadButton}>
              <Text style={styles.UploadCardUploadButtonTitle}>
                {reUploadText ?? 'Unggah Ulang'}
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

export default UploadCardComponent;
