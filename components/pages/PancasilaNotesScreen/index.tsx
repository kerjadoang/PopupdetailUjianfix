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
import {ParamList} from 'type/screen';

const Tab = createMaterialTopTabNavigator();

const PancasilaNotesScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PancasilaNotesScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'PancasilaNotesScreen'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header subLabel={route.params?.title ?? 'test'} label="Catatan" />
      ),
    });
  }, []);

  const serviceType = route.params.service_type;
  const isKepsek = serviceType === 'kepsek';
  const RenderSharedNotes = (props: any) => (
    <SharedNotesScreen chapterId={route.params.chapter_id} {...props} />
  );
  const RenderNotes = (props: any) => <MyNotesScreen {...props} />;
  return (
    <>
      {
        <Tab.Navigator
          tabBar={isKepsek ? () => null : undefined}
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
            initialParams={{service_type: serviceType}}
            component={RenderNotes}
            options={{
              tabBarLabel: props => (
                <TabBarLabel title="Catatan Saya" {...props} />
              ),
            }}
          />
          {!isKepsek && (
            <Tab.Screen
              name={SCREEN_NAME.SharedNotesScreen}
              initialParams={{service_type: serviceType}}
              component={RenderSharedNotes}
              options={{
                tabBarLabel: props => (
                  <TabBarLabel title="Catatan Lain" {...props} />
                ),
              }}
            />
          )}
        </Tab.Navigator>
      }
    </>
  );
};

export default PancasilaNotesScreen;
