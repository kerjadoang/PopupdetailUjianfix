import {useEffect} from 'react';
import {useMergeState} from '@constants/functional';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useAdminListVerificationScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AdminListVerificationScreen'>
    >();
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    listData: false,
  });
  const {isLoading, isShowPopup, popupData, listData}: any = state;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _handlerGetData();
    }
  }, [isFocused]);

  const _handlerGetData = async () => {
    setState({isLoading: true});
    try {
      const res = await provider.getListAllClassAdmin();
      const resDataData = res?.data?.data || false;
      // console.log('abcde resDataData>>>', JSON.stringify(resDataData, null, 2));

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

  const _handlerOnPressUploadEvidence = async () => {
    navigation?.navigate('AdminUploadEvidenceScreen', {});
  };

  const _handlerNavigateToAdminListScreen = async (
    class_name: any,
    class_id: number,
  ) => {
    navigation?.navigate('AdminListScreen', {class_name, class_id});
  };

  return {
    isLoading,
    isShowPopup,
    popupData,
    listData,
    navigation,
    _handlerOnPressUploadEvidence,
    _handlerNavigateToAdminListScreen,
  };
};

export default useAdminListVerificationScreen;
