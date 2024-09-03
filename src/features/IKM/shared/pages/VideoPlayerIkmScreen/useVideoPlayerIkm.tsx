import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList, VideoPlayerIkmScreenParam} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';

const useVideoPlayerIkm = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'VideoPlayerIkmScreen'>>();
  const {getRouteParams} = useNavigate();
  const {title, data, userRole} = getRouteParams<VideoPlayerIkmScreenParam>();

  return {
    navigation,
    title,
    data,
    userRole,
  };
};
export default useVideoPlayerIkm;
