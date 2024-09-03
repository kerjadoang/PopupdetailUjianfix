import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProviderLPT from '@services/lpt/provider';
import Toast from 'react-native-toast-message';

const useLearningObjective = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LearningObjectiveScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'LearningObjectiveScreen'>>();
  const {getUser}: any = useSelector(state => state);

  const handleCreateUserLearnPorgress = async () => {
    try {
      await ProviderLPT?.createUserLearnProgress({
        userId: getUser?.data?.id,
        bodyPayload: {
          chapter_material_id:
            route?.params?.chapterData?.chapter_material?.[0]?.id ||
            route?.params?.chapterData?.id,
          is_done: true,
        },
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  useEffect(() => {
    handleCreateUserLearnPorgress();
  }, []);

  return {
    dispatch,
    navigation,
    route,
  };
};

export default useLearningObjective;
