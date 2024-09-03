import {_handlerSetItem} from '@constants/functional';
import {Keys} from '@constants/keys';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import {useSelector} from 'react-redux';

interface RootState {
  verifyOtp: any;
}

const useSuccessRegister = () => {
  const navigation: any = useNavigation();
  const {verifyOtp} = useSelector((state: RootState) => state);
  const {access_token} = verifyOtp?.data || false;

  const _handlerNavigationToBottomNavigator = async () => {
    try {
      const token = JSON.stringify(access_token);
      _handlerSetItem(Keys.token, token);
      const decode: any = jwtDecode(access_token);
      switch (decode.user_type_id) {
        case 1:
          await navigation.replace('BottomTabNavigator');
          break;
        case 2:
          await navigation.replace('BottomTabNavigatorParent');
          break;
        case 3:
          await navigation.replace('BottomTabNavigatorMentor');
          break;
        case 4:
          await navigation.replace('BottomTabNavigatorKepsek');
          break;
        case 5:
          await navigation.replace('BottomTabNavigatorGuru');
          break;
        case 6:
          await navigation.replace('BottomTabNavigatorAdmin');
          break;
        case 7:
          await navigation.replace('BottomTabNavigatorAdmin');
          break;
        default:
          throw new Error('Invalid user type');
      }
    } catch (error) {}
  };

  return {
    _handlerNavigationToBottomNavigator,
  };
};

export default useSuccessRegister;
