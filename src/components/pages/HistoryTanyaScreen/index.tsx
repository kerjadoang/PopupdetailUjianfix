import React, {useLayoutEffect} from 'react';

import {SCREEN_NAME} from '@constants/screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Colors from '@constants/colors';
import TabBarLabel from '@components/atoms/TabBarLabel';

import BelumDijawabTabScreen from './BelumDijawabTabScreen';
import TerjawabTabScreen from './TerjawabTabScreen';
import TidakSesuaiTabScreen from './TidakSesuaiTabScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';

const Tab = createMaterialTopTabNavigator();

const HistoryTanyaScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryTanyaScreen'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Riwayat Tanya" />,
    });
  }, []);
  const route = useRoute();
  const {initialScreen}: any = route?.params || false;
  return (
    <Tab.Navigator
      initialRouteName={
        initialScreen ? initialScreen : SCREEN_NAME?.BelumDijawabTabScreen
      }
      screenOptions={{
        tabBarStyle: {
          height: 45,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.neutral20,
        },
        tabBarIndicatorStyle: {
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          height: 4,
          backgroundColor: Colors.primary.base,
        },
      }}>
      <Tab.Screen
        name={SCREEN_NAME.BelumDijawabTabScreen}
        component={BelumDijawabTabScreen}
        options={{
          tabBarLabel: props => (
            <TabBarLabel {...props} title="Belum Dijawab" />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.TerjawabTabScreen}
        component={TerjawabTabScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Terjawab" />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.TidakSesuaiTabScreen}
        component={TidakSesuaiTabScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Tidak Sesuai" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HistoryTanyaScreen;
