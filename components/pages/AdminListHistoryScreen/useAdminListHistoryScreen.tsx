import {useEffect} from 'react';
import {useMergeState} from '@constants/functional';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useAdminListHistoryScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AdminListVerificationScreen'>
    >();
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    listData: false,
    searchQuery: '',
    page: 0,
    limit: 10,
    isOnSearching: false,
  });

  const {
    isLoading,
    isShowPopup,
    popupData,
    listData,
    searchQuery,
    page,
    limit,
    isOnSearching,
  }: any = state;
  const route = useRoute();
  const {rombel_class_school_id, class_id, class_name}: any = route?.params;

  useEffect(() => {
    _handlerGetData();
  }, []);

  const _handlerGetData = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getListHistoryAdmin(
        rombel_class_school_id,
        1,
        searchQuery,
        limit,
        page,
      );
      const resDataData = res?.data?.data || false;

      if (resDataData?.rombel_user) {
        const rombeluserArray = resDataData?.rombel_user?.map(
          async (item: any, index: any) => {
            const avatarMediaId = item?.avatar;
            const avatarRes = await providerMedia.getImage(avatarMediaId);

            if (avatarRes?.code == 100) {
              resDataData.rombel_user[index].avatar_path_url =
                avatarRes?.data?.path_url || false;
            }
          },
        );

        await Promise.all(rombeluserArray);
      }

      // console.log('abc resDataData>>>', JSON.stringify(resDataData, null, 2));

      setState({
        listData: resDataData,
        isLoading: false,
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({isLoading: false});
      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerOnPressSubmitSearch = async () => {
    _handlerGetData();
  };

  const _handlerOnPressActiveSearching = async () => {
    setState({isOnSearching: true});
  };
  const _handlerOnPressNotActiveSearching = async () => {
    setState({isOnSearching: false, searchQuery: ''});
  };

  const _handlerOnChangeSearching = async (text: any) => {
    setState({searchQuery: text});
  };

  const _handlerOnPressClearSearchQuery = async () => {
    setState({searchQuery: ''});
  };

  const _handlerOnPressNavigateToAdminListDetailScreen = async (
    id: number,
    full_name: string,
    rombel_class_school_name: string,
    registration_number: number | string,
  ) => {
    navigation.navigate('AdminListDetailScreen', {
      user_id: id,
      full_name,
      rombel_class_school_name,
      rombel_class_school_id,
      class_id,
      class_name,
      registration_number,
    });
  };

  return {
    isLoading,
    isShowPopup,
    popupData,
    listData,
    navigation,
    isOnSearching,
    searchQuery,
    _handlerOnPressSubmitSearch,
    _handlerOnPressActiveSearching,
    _handlerOnPressNotActiveSearching,
    _handlerOnChangeSearching,
    _handlerOnPressClearSearchQuery,
    _handlerOnPressNavigateToAdminListDetailScreen,
  };
};

export default useAdminListHistoryScreen;
