import ReactNativeBlobUtil, {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';

import {
  getExtensionFromFile,
  isStringContains,
  mimeTypes,
} from '@constants/functional';
import Config from 'react-native-config';
import {
  ApiDownloadType,
  BlobDownloadProps,
  ReactNativeBlobUtilConfigExt,
} from './types';
import {getRootPath} from './utils';
import {Platform} from 'react-native';

const configBlob = (
  options: ReactNativeBlobUtilConfigExt,
): ReactNativeBlobUtilConfig => {
  const filePath = getRootPath() + '/' + options.fileNameWithExt;
  const config: ReactNativeBlobUtilConfig = {
    ...options,
    fileCache: true,
    path: filePath,
    indicator: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: options.fileNameWithExt,
      mime: options.mime,
      path: filePath,
    },
  };
  !options.mime && delete config.addAndroidDownloads?.mime;
  return config;
};

const blobDownload = async (
  options: ReactNativeBlobUtilConfig,
  downloadProps: BlobDownloadProps,
): Promise<FetchBlobResponse> => {
  try {
    return await ReactNativeBlobUtil.config(options)
      .fetch(
        downloadProps?.method,
        downloadProps?.url,
        downloadProps?.headers,
        downloadProps?.body,
      )
      .progress((received, total) =>
        downloadProps?.progress?.(received, total),
      );
  } catch (e) {
    const errorMessage = 'blobDownload ' + JSON.stringify(e);
    return Promise.reject(errorMessage);
  }
};

export const blobGet = async (
  fileOpt: ApiDownloadType,
  url_path: string,
  blobDownloadProps?: BlobDownloadProps,
): Promise<FetchBlobResponse> => {
  try {
    const config = configBlob(fileOpt);
    const isFullPath = isStringContains(url_path, undefined, [
      'http:',
      'https:',
    ]);
    const url = isFullPath ? url_path : `${Config.BASEURL}/${url_path}`;
    const downloadProps: BlobDownloadProps = {
      ...blobDownloadProps,
      method: 'GET',
      url,
      headers: fileOpt.headers,
      progress: fileOpt.progress,
    };
    const blobResponse = await blobDownload(config, downloadProps);
    return blobResponse;
  } catch (e) {
    const errorMessage = 'blobGet ' + JSON.stringify(e);
    return Promise.reject(errorMessage);
  }
};

export const getMimeType = (filePath: string) => {
  try {
    // Extract file extension from the URL
    const fileExtension = getExtensionFromFile(filePath);

    if (!fileExtension) {
      return '';
    }

    const mimeType = mimeTypes[fileExtension];

    if (mimeType) {
      return mimeType;
    }

    return null;
  } catch (error) {
    // console.error('Error getting MIME type:', error);
    return null;
  }
};

export const copyFileToMedia = async (
  fileOpt: ApiDownloadType,
  filePath: string,
) => {
  try {
    if (Platform.OS === 'ios') {
      const destPath = getRootPath() + '/' + fileOpt.fileNameWithExt;

      if (filePath === destPath) {
        return destPath;
      }

      await ReactNativeBlobUtil.fs.mv(filePath, destPath);
      return destPath;
    }
    // const data = await ReactNativeBlobUtil.fs.(filePath)
    await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
      {
        name: fileOpt.fileNameWithExt,
        parentFolder: 'KelasPintar',
        mimeType: fileOpt.mime,
      },
      fileOpt.mediaType || 'Download',
      filePath,
    );
    // return filePath;
  } catch (e) {
    const errorMessage = 'saveFileToStorage ' + JSON.stringify(e);
    return Promise.reject(errorMessage);
  }
};
