import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useLMSTLKMS, {_TabNameEnum} from './useLMSTLKM';
import {styles} from './style';
import TabKelasOnline from './tab/tabKelasOnline';
import TabTatapMuka from './tab/tabTatapMuka';
import Colors from '@constants/colors';
import {Header} from '@components/atoms';
const LMSTeacherLaporanKehadiranMuridScreen = () => {
  const {Tab, handleOnPressTab, tabActiveState} = useLMSTLKMS();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        label={'Kehadiran Murid'}
        backgroundColor={Colors.white}
        colorLabel={Colors.dark.neutral100}
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
          key={'TabLMSTLKM_KelasOnline'}
          name={_TabNameEnum.KelasOnline}
          component={TabKelasOnline}
          initialParams={{}}
          listeners={{
            focus: () => handleOnPressTab(_TabNameEnum.KelasOnline),
          }}
          options={{
            tabBarLabelStyle:
              tabActiveState === _TabNameEnum.KelasOnline
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabNameEnum.KelasOnline,
            tabBarPressColor: 'white',
          }}
        />
        <Tab.Screen
          key={'TabLMSTLKM_TatapMuka'}
          name={_TabNameEnum.TatapMuka}
          component={TabTatapMuka}
          listeners={{
            focus: () => handleOnPressTab(_TabNameEnum.TatapMuka),
          }}
          initialParams={{}}
          options={{
            tabBarLabelStyle:
              tabActiveState === _TabNameEnum.TatapMuka
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabNameEnum.TatapMuka,
            tabBarPressColor: 'white',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export {LMSTeacherLaporanKehadiranMuridScreen};
