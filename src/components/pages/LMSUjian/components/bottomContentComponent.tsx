/* eslint-disable react-hooks/exhaustive-deps */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import TabMendatangComponent from './tabMendatangComponent';
import TabRiwayatComponent from './tabRiwayatComponent';
import Colors from '@constants/colors';
import {Styles} from '../style';

type _IBottomContent = {
  handleOpenPopUp: any;
  tabActive: string;
  handleOnPressTab: any;
  handleSetPopUpType: any;
  examDataSchedule: any;
  handleSetListSubject: any;
  listSavedSubject: any;
  handleSetCardData: any;
  fetchOnExamGoingData?: VoidCallBack;
};

const BottomContentComponent = ({
  handleOpenPopUp,
  handleOnPressTab,
  tabActive,
  handleSetPopUpType,
  examDataSchedule,
  handleSetListSubject,
  handleSetCardData,
  listSavedSubject,
  fetchOnExamGoingData,
}: _IBottomContent) => {
  const Tab = createMaterialTopTabNavigator();
  const [savedSubject, setSavedSubject] = useState<any>(listSavedSubject);
  useEffect(() => {
    setSavedSubject(listSavedSubject);
  }, []);

  return (
    <View style={{flex: 2}}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 4,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Colors.primary.base,
          },
        }}>
        {examDataSchedule && (
          <Tab.Screen
            key={'TabMendatang'}
            name={'Mendatang'}
            component={TabMendatangComponent}
            initialParams={{
              handleOpenPopUp: handleOpenPopUp,
              handleSetPopUpType: handleSetPopUpType,
              handleSetCardData: handleSetCardData,
              handleSetListSubject: handleSetListSubject,
              listSavedSubject: savedSubject,
              data: examDataSchedule,
              fetchOnExamGoingData: fetchOnExamGoingData,
            }}
            listeners={{
              focus: () => handleOnPressTab('Mendatang'),
            }}
            options={{
              tabBarLabelStyle:
                tabActive === 'Mendatang'
                  ? Styles.labelActiveStyle
                  : Styles.labelInactiveStyle,
              tabBarLabel: 'Mendatang',
              tabBarPressColor: 'white',
            }}
          />
        )}
        <Tab.Screen
          key={'TabRiwayat'}
          name={'Riwayat'}
          component={TabRiwayatComponent}
          initialParams={{
            handleOpenPopUp: handleOpenPopUp,
            handleSetPopUpType: handleSetPopUpType,
            handleSetCardData: handleSetCardData,
            handleSetListSubject: handleSetListSubject,
            listSavedSubject: savedSubject,
            data: examDataSchedule,
          }}
          listeners={{
            focus: () => handleOnPressTab('Riwayat'),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === 'Riwayat'
                ? Styles.labelActiveStyle
                : Styles.labelInactiveStyle,
            tabBarLabel: 'Riwayat',
            tabBarPressColor: 'white',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomContentComponent;
