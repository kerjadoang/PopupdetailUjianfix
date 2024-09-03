import {UndefinedInitialDataOptions} from '@tanstack/react-query';

export interface ISearchUserData extends IBaseResponseData<IBaseUser> {}

export type SearchUserBody = {
  username: string;
};

export type ChangeUserBody = {
  avatar_id: string;
};

export type EditProfile = {
  full_name: any;
  gender: string;
  email: any;
  school_name: any;
  class_id: number;
};

export type LinkAccountBody = {
  parent_id?: number;
  student_id?: number;
};

export type TCheckPassword = {
  password?: string;
};

export type CheckPhonebookBody = {
  list: {
    phone_number: string;
  }[];
};

export type ShareLearnNoteBody = {
  id: string | number;
  users_id: string[];
};

export interface IParentResponse extends IBaseResponseData<IBaseUser> {}

export interface IPhoneBookResponseData {
  full_name?: string;
  phone_number?: string;
  role_name?: string;
  avatar?: string;
  id?: any;
  path_url?: string;
}

export interface IPhoneBookResponse
  extends IBaseResponseData<IPhoneBookResponseData[]> {}

export type VerifyDeactivedAccountBody = {
  otp: number;
};

export type IUseQueryFetchUserOptions = {
  callback?: CallBackWithParams<void, IBaseUser>;
  storeUserToRedux?: boolean;
  disableLoadingAnimation?: boolean;
  queryOptions?: Partial<
    UndefinedInitialDataOptions<IBaseUser, Error, IBaseUser, string[]>
  >;
  token?: string;
};

export type IUsePrefetchUserDataOptions = {
  fetchUserOptions?: IUseQueryFetchUserOptions;
};

export type IPrefetchUserData = {
  token?: string;
};

export type TCheckAssignedPackage = {
  id: number;
  is_assign: boolean;
  package_id: number;
  payment_id: number;
};
