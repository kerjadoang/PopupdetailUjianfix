import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import SearchIcon from '@assets/svg/ic_search.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles} from '../style';
import TabRiwayatDiterima from '../tab/tabRiwayatDiterima';
import TabRiwayatDitolak from '../tab/tabRiwayatDitolak';

const _TabRiwayat: {diterima: string; ditolak: string} = {
  diterima: 'Diterima',
  ditolak: 'Ditolak',
};

const RiwayatKetidakhadiranScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RiwayatKetidakhadiranScreen'>>();
  const Tab = createMaterialTopTabNavigator();
  const [tabActive, setTabActive] = useState<'Diterima' | 'Ditolak'>(
    'Diterima',
  );

  useEffect(() => {}, []);

  return (
    <View style={styles.RKSContainer}>
      <Header
        label={'Riwayat Ketidakhadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text style={styles.DKSubtitleStyle}>{route?.params.subTitle}</Text>
        }
        iconRight={<SearchIcon />}
        onPressIconRight={() => {}}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 4,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Colors.primary.base,
          },
        }}>
        <Tab.Screen
          key={'TabLMSTLKM_approved'}
          name={_TabRiwayat.diterima}
          component={TabRiwayatDiterima}
          initialParams={{
            rombelClassSchoolId: route?.params.rombelClassSchoolId,
          }}
          listeners={{
            focus: () => setTabActive('Diterima'),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === _TabRiwayat.diterima
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabRiwayat.diterima,
            tabBarPressColor: 'white',
          }}
        />
        <Tab.Screen
          key={'TabLMSTLKM_rejected'}
          name={_TabRiwayat.ditolak}
          component={TabRiwayatDitolak}
          initialParams={{
            rombelClassSchoolId: route?.params.rombelClassSchoolId,
          }}
          listeners={{
            focus: () => setTabActive('Ditolak'),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === _TabRiwayat.ditolak
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabRiwayat.ditolak,
            tabBarPressColor: 'white',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default RiwayatKetidakhadiranScreen;
