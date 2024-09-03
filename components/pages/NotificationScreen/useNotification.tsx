import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {_ITabLabel} from './type';
import {fetchUpdateReadAllActivity, fetchUpdateReadAllPromo} from '@redux';
import {StackNavigationProp} from '@react-navigation/stack';

const useNotification = () => {
  const TabLabel: _ITabLabel = {
    activity: 'Aktivitas',
    promo: 'Promo',
  };
  const [isDisplay, setIsDisplay] = useState(false);
  const [tabActive, setTabActive] = useState<string>(TabLabel.activity);
  const Tab = createMaterialTopTabNavigator();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreen'>>();
  const dispatch: any = useDispatch();
  const {
    getActivity,
    getPromo,
    getUser: {data: userData},
  }: any = useSelector(state => state);
  const [isReadAllCall, setIsReadAllCall] = useState<boolean>(true);
  const userType = userData?.user_type_id;

  const _handlerNavigateBaseOnUserType = () => {
    if (userType === 1) {
      navigation?.navigate('BottomTabNavigator');
    } else if (userType === 2) {
      navigation?.navigate('BottomTabNavigatorParent');
    } else if (userType === 3) {
      //to mentor (upcoming)
    } else if (userType === 4) {
      navigation?.navigate('BottomTabNavigatorKepsek');
    } else if (userType === 5) {
      navigation?.navigate('BottomTabNavigatorGuru');
    } else if (userType === 6) {
      navigation?.navigate('BottomTabNavigatorAdmin');
    }
  };
  const handleOnPressTab: any = (tabName: string) => {
    setTabActive(tabName);
  };
  const handleMarkAllNotif = () => {
    setIsDisplay(false);
    setIsReadAllCall(!isReadAllCall);
    tabActive === TabLabel?.activity
      ? dispatch(
          fetchUpdateReadAllActivity(() => {
            _handlerNavigateBaseOnUserType();
          }),
        )
      : dispatch(
          fetchUpdateReadAllPromo(() => {
            _handlerNavigateBaseOnUserType();
          }),
        );
  };

  return {
    isDisplay,
    Tab,
    navigation,
    TabLabel,
    handleOnPressTab,
    tabActive,
    getActivity,
    getPromo,
    dispatch,
    setIsDisplay,
    handleMarkAllNotif,
    isReadAllCall,
  };
};

export default useNotification;
