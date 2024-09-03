import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {
  FetchBlobResponse,
  Mediatype,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';

type ISendLog = {
  type: ('ERROR' | 'REQUEST')[];
  logType?: IFirebaseDatabaseLogType;
};

type ApiProps = {
  url: string;
  statusCode?: number;
  body?: any;
  fullResponse?: boolean;
  fullErrorResponse?: boolean;
  tags?: string;
  headers?: any;
  withoutToken?: boolean;
  retry?: number;
  config?: AxiosRequestConfig;
  sendLog?: ISendLog;
  resHeaders?: boolean;
  onTimeout?: VoidCallBack;
};

type ApiLog = {
  nameFunction: string;
  body?: any;
  tags?: string;
  res?: AxiosResponse<any, any> | any;
  e?: any;
  isDownload?: boolean;
};

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

type MimeType = 'application/pdf' | string;

type ApiDownloadType = {
  fileNameWithExt: string;
  mime?: MimeType;
  progress?: (received: number, total: number) => void;
  mediaType?: Mediatype;
  appendExt?: string;
  headers?: {
    [key: string]: string;
  };
};

type ApiDownloadFileProps = ApiDownloadType & ApiProps;

type ApiDownloadFileResProps = {
  blobResponse?: FetchBlobResponse;
  filePath?: string;
};

interface BlobDownloadProps {
  method: Methods;
  url: string;
  headers?:
    | {
        [key: string]: string;
      }
    | undefined;
  body?: any;
  progress?: (received: number, total: number) => void;
}

type ReactNativeBlobUtilConfigExt = ApiDownloadType & ReactNativeBlobUtilConfig;

type ApiMediaType = 'image' | 'video' | 'file' | 'html';

type ApiUploadingStatus = {
  fileId: string;
  mediaType: ApiMediaType;
  retry?: number;
  customCondition?: (data: IMediaType) => boolean;
  url?: string;
  progress?: number = 0;
  callbackProgress?: CallBackWithParams<void, number>;
} & Omit<ApiProps, 'url'>;

type IMediaStatus = 'process' | 'finish' | 'failed';

interface IMediaImage {
  ID?: string;
  url_prefix_id?: string;
  video_type?: string;
  type?: string;
  service_type?: string;
  service_sub_type?: string;
  file_name?: string;
  duration?: number;
  size?: number;
  presentation_slides?: null;
  images?: null;
  content_type?: string;
  original_name?: string;
  content_extention?: string;
  path_url?: string;
  local_path_url?: string;
  status?: IMediaStatus;
  created_at?: Date;
  local_name?: string;
  local_type?: string;
}

interface IMediaVideo {
  ID?: string;
  file_name?: string;
  url_prefix_id?: string;
  original_name?: string;
  content_extention?: string;
  video_type?: string;
  content_type?: string;
  service_type?: string;
  service_sub_type?: string;
  uuid?: string;
  title?: string;
  duration?: number;
  size?: number;
  description?: string;
  path_url?: string;
  local_path_url?: string;
  status?: string;
  video_sections?: null;
  zip_file?: string;
  thumbnail?: string;
  created_at?: Date;
  filecollection?: null;
  local_type?: string;
  local_name?: string;
}

type IMediaType = IMediaImage | IMediaVideo;

interface ApiGetSingleImageProps {
  imageId: string;
  fullResponse?: boolean;
  fullData?: boolean;
  tags?: string;
}
interface ApiGetMediaProps {
  imageId: string;
  fullResponse?: boolean;
  fullDataResponse?: boolean;
  tags?: string;
}
interface ApiGetMediaProps {
  imageId: string;
  fullResponse?: boolean;
  fullDataResponse?: boolean;
  tags?: string;
}

interface ApiGetBulkImageProps {
  dottedString: string;
  datas: any[];
  newParams?: string;
  tags?: string;
}

interface GenerateCurlProps {
  res: AxiosResponse<any, any> | any;
  url: string;
  nameFunction: string;
  tags: string;
  isError?: string;
}

type ApiUploadFormDataProps = {
  body: FormData;
  uploadProgress?: CallBackWithParams<void, number>;
} & Omit<ApiProps, 'body' | 'config'>;

type ApiTelegramSendMessage = {
  botId: string;
} & ITelegramSendMessage &
  Omit<ApiProps, 'body' | 'url'>;
