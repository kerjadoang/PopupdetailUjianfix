/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, memo, useCallback, useLayoutEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import styles from './style';
import HistoryIcon from '@assets/svg/ic24_history_blue.svg';
import Colors from '@constants/colors';
import {TAB_NAMES, useAnnouncementManageScreen} from './utils';
import {Header} from '@components/atoms';
import {TabContentItem} from './components';

const Tab = createMaterialTopTabNavigator();

const MyTabContent: FC = memo(({route: {name}}: any) => (
  <TabContentItem type={name} />
));

const AnnouncementManageScreen: FC = () => {
  const {navigation} = useAnnouncementManageScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: __renderHeader,
    });
  }, []);

  const __renderHeader = useCallback(
    () => (
      <View style={{backgroundColor: Colors.white}}>
        <StatusBar barStyle="dark-content" translucent={true} />

        <Header
          label="Pengumuman"
          backgroundColor="transparent"
          iconRight={<HistoryIcon />}
          onPressIconRight={() =>
            navigation.navigate('AnnouncementManageHistoryScreen')
          }
        />
      </View>
    ),
    [],
  );

  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => (
      <Text
        style={[
          styles.containerTabBarLabel,
          focused ? {color: Colors.primary.base} : null,
        ]}>
        {children}
      </Text>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        backBehavior="none"
        sceneContainerStyle={styles.containerTab}
        screenOptions={{
          tabBarStyle: {
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
        {Object.values(TAB_NAMES).map(_val => (
          <Tab.Screen
            key={_val}
            name={_val}
            component={MyTabContent}
            options={{
              tabBarLabel: __renderMyTabBarlabel,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export {AnnouncementManageScreen};
