import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useNavigation} from '@react-navigation/native';
import {Storage} from '@constants/storage';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useDisclosure} from '@hooks/useDisclosure';
import {dismissLoading, showLoading} from '@constants/functional';
import {isAxiosError} from 'axios';
import {logout} from '@components/pages/ProfileScreen/utils';
import {getToken} from '@hooks/getToken';

const useAuthController = () => {
  const navigation: any = useNavigation();
  const {isVisible: isShowPopupKickUser, toggle: toggleShowPopupKickUser} =
    useDisclosure();
  const {data: user}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );
  const {error} = useQuery({
    queryKey: ['check_token', !!user],
    queryFn: async () => {
      const [token, resIsAdmin] = await Promise.all([
        getToken(),
        Storage.getFromStorage<boolean>({
          key: 'isAdmin',
        }),
      ]);
      if (!token) {
        return false;
      }
      const resDataCheckToken = await apiGet({
        url: URL_PATH.check_token(resIsAdmin?.data || false),
        fullErrorResponse: true,
      });
      return resDataCheckToken;
    },
    placeholderData: false,
    enabled: !isShowPopupKickUser,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (isAxiosError(error)) {
      const isForbiddenAccess = error.response?.status === 401;
      if (!isForbiddenAccess) {
        return;
      }
      toggleShowPopupKickUser();
      return;
    }
  }, [error]);

  const kickUser = async () => {
    showLoading();
    toggleShowPopupKickUser();
    await logout().catch();
    navigation?.reset({
      index: 0,
      routes: [{name: 'Autentikasi'}],
    });
    dismissLoading();
  };

  return {
    isShowPopupKickUser,
    kickUser,
  };
};

export {useAuthController};
