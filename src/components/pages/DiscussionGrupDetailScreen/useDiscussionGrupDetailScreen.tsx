import {useMergeState} from '@constants/functional';
import {useRoute} from '@react-navigation/native';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {useEffect} from 'react';

const useDiscussionGrupDetailScreen = () => {
  const route: any = useRoute();
  const [state, setState] = useMergeState({
    isLoading: false,
    detailUserData: false,
    attachmentImage: false,
  });
  const {isLoading, detailUserData}: any = state;
  const {userId} = route?.params;

  useEffect(() => {
    _handlerGetDetailUser();
  }, []);

  const _handlerGetDetailUser = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getDiscusssionDetailInformation(userId);

      var resDataData = res?.data?.data || false;
      const userMediaId = resDataData?.avatar;

      if (userMediaId) {
        const userRes = await providerMedia.getImage(userMediaId);

        if (userRes?.code === 100) {
          resDataData.path_url = userRes?.data?.path_url || false;
        }
      }

      setTimeout(() => {
        setState({
          isLoading: false,
          detailUserData: resDataData,
        });
      }, 500);
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  return {
    isLoading,
    detailUserData,
  };
};

export default useDiscussionGrupDetailScreen;
