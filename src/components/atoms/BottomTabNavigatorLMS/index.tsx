/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Colors from '@constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AbsensiIcon from '@assets/svg/ic24_navbar_absensi.svg';
import LaporanIcon from '@assets/svg/ic24_navbar_laporan.svg';
import SchoolIcon from '@assets/svg/ic24_navbar_LMS.svg';
import {LMSHomeScreen} from '@components/pages';
import AttendanceScreen from '@components/pages/AttendanceScreen';
import {LMSReportScreen} from '@components/pages';

const Tab = createBottomTabNavigator();

const BottomTabNavigatorLMS = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="LMSHomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.base,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 11,
        },
      }}>
      <Tab.Screen
        name="LMSHomeScreen"
        component={LMSHomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <SchoolIcon color={color} width={size} height={size} />
          ),
          title: 'LMS',
        }}
      />
      <Tab.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AbsensiIcon width={size} height={size} color={color} />
          ),
          title: 'Presensi',
        }}
      />
      <Tab.Screen
        name="reportScreen"
        component={LMSReportScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <LaporanIcon color={color} width={size} height={size} />
          ),
          title: 'Laporan',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorLMS;
