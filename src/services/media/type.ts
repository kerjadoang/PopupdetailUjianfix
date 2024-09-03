export interface IUploadImageResponseData {
  ID?: string;
  type?: string;
  service_type?: string;
  service_sub_type?: string;
  file_name?: string;
  content_type?: string;
  path_url?: string;
  created_at?: Date;
}

export type IUploadImageResponse = IBaseResponseData<IUploadImageResponseData>;
