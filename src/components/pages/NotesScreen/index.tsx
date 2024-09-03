import React, {useLayoutEffect} from 'react';

import {SCREEN_NAME} from '@constants/screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Colors from '@constants/colors';
import TabBarLabel from '@components/atoms/TabBarLabel';

import MyNotesScreen from './MyNotesScreen';
import SharedNotesScreen from './SharedNotesScreen';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';

const Tab = createMaterialTopTabNavigator();

const NotesScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'NotesScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'NotesScreen'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header subLabel={route.params?.title ?? 'test'} label="Catatan" />
      ),
    });
  }, []);

  return (
    <Tab.Navigator
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
        name={SCREEN_NAME.MyNotesScreen}
        component={(props: any) => (
          <MyNotesScreen {...props} chapterId={route.params.chapter_id} />
        )}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Catatan Saya" />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.SharedNotesScreen}
        component={(props: any) => (
          <SharedNotesScreen {...props} chapterId={route.params.chapter_id} />
        )}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} title="Catatan Lain" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default NotesScreen;
