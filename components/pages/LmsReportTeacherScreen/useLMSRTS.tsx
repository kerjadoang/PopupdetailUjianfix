/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useEffect, useLayoutEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const useLMSRTS = () => {
  const route = useRoute<RouteProp<ParamList, 'LmsReportTeacherScreen'>>();
  const oldRoute: any = useRoute();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'LmsReportTeacherScreen'>
    >();
  const oldNavigation: any = useNavigation();
  const handleNavigateMenu = (menuId: any) => {
    switch (menuId) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        oldNavigation.navigate('ERaportGuruChooseClassScreen');
        break;
      case 4:
        navigation.navigate('LMSTeacherLaporanKehadiranMuridScreen');
        break;
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Murid'}
          iconLeft
          backgroundColor={Colors.primary.base}
          colorLabel={Colors.white}
        />
      ),
    });
  }, []);

  useEffect(() => {});

  return {
    handleNavigateMenu,
    route,
    oldRoute,
    navigation,
    oldNavigation,
  };
};

export default useLMSRTS;
