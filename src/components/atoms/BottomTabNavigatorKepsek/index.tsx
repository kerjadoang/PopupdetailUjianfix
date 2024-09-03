/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Colors from '@constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationScreen from '@components/pages/NotificationScreen';
import HomeScreenKepsek from '@components/pages/HomeScreenKepsek';
import ProfileScreen from '@components/pages/ProfileScreen';
const Tab = createBottomTabNavigator();

const BottomTabNavigatorKepsek = ({}) => {
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
        component={HomeScreenKepsek}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="home-variant" color={color} size={size} />
          ),
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

export default BottomTabNavigatorKepsek;
