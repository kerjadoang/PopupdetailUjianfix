import {useCallback, useEffect, useState} from 'react';
import provider from './provider';
import mediaProvider from '@services/media/provider';
import {
  CheckPhonebookBody,
  IParentResponse,
  IPhoneBookResponse,
  IUsePrefetchUserDataOptions,
  IUseQueryFetchUserOptions,
  LinkAccountBody,
  SearchUserBody,
  ShareLearnNoteBody,
  TCheckAssignedPackage,
} from './type';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useQuery} from '@tanstack/react-query';
import {apiGet, apiGetSingleImage} from '@api/wrapping';
import {URL_PATH, BASE_NAME_UAA} from '@constants/url';
import {
  dismissLoading,
  isStringContains,
  rdxDispatch,
} from '@constants/functional';
import {getUserSuccess} from '@redux';
import {
  useUserCurriculumActions,
  useUserClassActions,
} from '@features/IKM/zustand';

const useUserSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const searchUser = async (
    type: 'orangtua' | 'anak',
    body: SearchUserBody,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      let res;

      if (type === 'anak') {
        res = await provider.searchByParent(body);
      } else {
        res = await provider.searchByStudent(body);
      }

      if (res.data.data.avatar) {
        let resImage = await mediaProvider.getImage(res.data.data.avatar);
        res.data.data.path_url = resImage?.data?.path_url;
      }

      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: searchUser,
  };
};

const useLinkAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const linkAccount = async (
    type: 'orangtua' | 'anak',
    body: LinkAccountBody,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      let res;
      if (type === 'orangtua') {
        res = await provider.linkAccountParentToStudent(body);
      } else {
        res = await provider.linkAccountStudentToParent(body);
      }

      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: linkAccount,
  };
};

const useCancelConnection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const cancelConnection = async (
    type: 'orangtua' | 'anak',
    body: LinkAccountBody,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      let res;
      if (type === 'orangtua') {
        res = await provider.cancelStudentConnection(body);
      } else {
        res = await provider.cancelParentConnection(body);
      }

      return res.data;
    } catch (err: any) {
      setError(err);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: cancelConnection,
  };
};

const useGetOrangTua = ({enabled}: {enabled?: boolean}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IParentResponse>();

  const getOrangTua = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      let res = await provider.getParent();
      setData(res.data);
    } catch (err: any) {
      setError(err);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      getOrangTua();
    }
  }, [enabled, getOrangTua]);

  return {
    loading,
    error,
    data,
    refetch: getOrangTua,
  };
};

const useCheckPhonebook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IPhoneBookResponse>();

  const checkPhonebook = async (body: CheckPhonebookBody) => {
    setLoading(true);
    setError(undefined);
    try {
      let res = await provider.checkPhonebook(body);
      const resData = res?.data || [];

      const promises = resData?.data?.map(async (obj: any) => {
        if (obj?.avatar) {
          const imgRes = await mediaProvider.getImage(obj?.avatar);

          obj.path_url = imgRes?.data?.path_url;
        }
      });

      await Promise.all(promises);

      setData(resData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    mutate: checkPhonebook,
  };
};

const useShareNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState();

  const shareNote = async (body: ShareLearnNoteBody) => {
    setLoading(true);
    setError(undefined);
    try {
      let res = await provider.shareLearnNote(body);

      setData(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    mutate: shareNote,
  };
};

// just call this function and automatically get user data
const useQueryFetchUser = (options?: IUseQueryFetchUserOptions) => {
  const replacedOptions: IUseQueryFetchUserOptions = {
    ...options,
    disableLoadingAnimation: options?.disableLoadingAnimation ?? false,
    storeUserToRedux: options?.storeUserToRedux ?? true,
  };
  const {refetch} = useSelector((state: RootState) => state.getUser);
  const headers = replacedOptions?.token && {
    Authorization: replacedOptions?.token,
  };
  const fetchUserQuery = useQuery({
    ...replacedOptions.queryOptions,
    queryKey: ['getUser', refetch],
    queryFn: async ({}) => {
      const data = await apiGet<IBaseUser>({
        url: URL_PATH.get_user,
        headers: headers,
      });
      !replacedOptions?.disableLoadingAnimation && dismissLoading();

      const imageRequests: Promise<string>[] = [];
      if (data.school?.image) {
        imageRequests.push(
          apiGetSingleImage<string>({imageId: data.school.image}),
        );
      }

      if (data.avatar) {
        imageRequests.push(apiGetSingleImage<string>({imageId: data.avatar}));
      }

      const [schoolImageUrl, avatarImageUlr] = await Promise.all(imageRequests);
      data.school && (data.school.path_url = schoolImageUrl);
      data.path_url = avatarImageUlr;
      replacedOptions?.callback && replacedOptions?.callback(data);
      if (replacedOptions?.storeUserToRedux) {
        rdxDispatch(getUserSuccess({data: data}));
      }
      return data;
    },
    placeholderData: {},
    retry: replacedOptions?.queryOptions?.retry ?? 3, // Will retry failed requests 10 times before displaying an error
  });

  return fetchUserQuery;
};

const usePrefetchUserData = (options?: IUsePrefetchUserDataOptions) => {
  const {refetch: fetchUser} = useQueryFetchUser({
    ...options?.fetchUserOptions,
    disableLoadingAnimation: true,
    queryOptions: {
      ...options?.fetchUserOptions?.queryOptions,
      retry: options?.fetchUserOptions?.queryOptions?.retry ?? 1,
    },
  });
  const {getListCurriculum} = useUserCurriculumActions();
  const {getListClass} = useUserClassActions();
  const prefetchUserData = useCallback(async () => {
    fetchUser();
    getListCurriculum();
    getListClass();
    // getListPhaseClass();
  }, []);
  return {
    fetchUserData: prefetchUserData,
  };
};

const useFindSubscribePackage = (service: string, class_id: number) => {
  const {data: user}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );
  return (
    user?.services?.some(
      item =>
        isStringContains(item.name || '', service) &&
        item.class_id === class_id,
    ) ?? false
  );
};

const useCheckListPackageNotAssigned = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['UNASSIGNED_PACKAGE'],
    queryFn: async () =>
      await apiGet<TCheckAssignedPackage[]>({
        url: `${BASE_NAME_UAA}/user/listPackage`,
      }),
  });

  const isHaveUnAssignedPackages = data?.some(v => !v.is_assign);
  return {isLoading, data, isHaveUnAssignedPackages};
};

export {
  useLinkAccount,
  useUserSearch,
  useCancelConnection,
  useGetOrangTua,
  useCheckPhonebook,
  useShareNote,
  useQueryFetchUser,
  usePrefetchUserData,
  useFindSubscribePackage,
  useCheckListPackageNotAssigned,
};
