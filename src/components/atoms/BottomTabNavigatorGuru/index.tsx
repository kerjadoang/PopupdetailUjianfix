/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Colors from '@constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationScreen from '@components/pages/NotificationScreen';
import Laporan from '@assets/svg/ic24_navbar_laporan.svg';
import Presensi from '@assets/svg/ic24_navbar_absensi.svg';
import HomeScreenGuru from '@components/pages/HomeScreenGuru';
import {LmsReportTeacherScreen} from '@components/pages/LmsReportTeacherScreen';
import ProfileScreen from '@components/pages/ProfileScreen';
import AttendanceScreen from '@components/pages/AttendanceScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigatorGuru = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.base,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 11,
        },
      }}>
      <Tab.Screen
        name="Beranda"
        component={HomeScreenGuru}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="home-variant" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Laporan"
        component={LmsReportTeacherScreen}
        options={{
          tabBarIcon: ({color}) => <Laporan color={color} />,
        }}
      />

      <Tab.Screen
        name="Presensi"
        component={AttendanceScreen}
        options={{
          tabBarIcon: ({color}) => <Presensi color={color} />,
        }}
      />

      <Tab.Screen
        name="Notifikasi"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorGuru;
