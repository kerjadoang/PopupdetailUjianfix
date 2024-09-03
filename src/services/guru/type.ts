export interface ISendRequestCallResponseData {
  uuid?: string;
  _id?: string;
  academi_class_session_id?: number;
  type?: string;
  role?: string;
  message?: string;
  id_image?: string;
  device_key?: string;
  user_id?: number;
  full_name?: string;
  class_id?: number;
  school_id?: number;
  gender?: string;
  phone_number?: string;
  avatar?: string;
  call_request?: number;
  fcm_token?: string;
  created_at?: Date;
}

export type ISendRequestCallResponse =
  IBaseResponseData<ISendRequestCallResponseData>;
export type ICheckRequestCallResponse =
  IBaseResponseData<ISendRequestCallResponseData>;
