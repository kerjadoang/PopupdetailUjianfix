import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';

export enum _TabNameEnum {
  KelasOnline = 'Kelas Online',
  TatapMuka = 'Tatap Muka',
}

const useLMSTLKMS = () => {
  const route = useRoute();
  const oldRoute: any = useRoute();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherLaporanKehadiranMuridScreen'>
    >();
  const oldNavigation: any = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  const [tabActiveState, setTabActiveState] = useState<_TabNameEnum>(
    _TabNameEnum.KelasOnline,
  );

  const [isOpenSwipeUp, setIsOpenSwipeUp] = useState<boolean>(false);

  const handleOnPressTab = (tabName: _TabNameEnum) => {
    setTabActiveState(tabName);
  };

  const handleToggleSwipeUp = async () => {
    setIsOpenSwipeUp(true);
  };

  return {
    route,
    oldRoute,
    oldNavigation,
    navigation,
    Tab,
    handleOnPressTab,
    tabActiveState,
    handleToggleSwipeUp,
    setIsOpenSwipeUp,
    isOpenSwipeUp,
  };
};

export default useLMSTLKMS;
