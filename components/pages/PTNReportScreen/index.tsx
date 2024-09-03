/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useLayoutEffect} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import styles from './style';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import {Header} from '@components/atoms';
import {TabContentItem} from './components';
import {TAB_NAMES, usePTNReportScreen} from './utils';
import {ptnSetUser} from '@redux';

const Tab = createMaterialTopTabNavigator();

const TabContent: FC = ({route: {name}}: any) => <TabContentItem type={name} />;

const PTNReportScreen: FC = () => {
  const {navigation, route, dispatch} = usePTNReportScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.primary.base}
        />
      ),
    });

    if (route?.params?.data) {
      ptnSetUser(route?.params?.data)(dispatch);
    }

    return () => {
      ptnSetUser(null!)(dispatch);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite />}
        label="Laporan Belajar"
        colorLabel={Colors.white}
        backgroundColor="transparent"
      />

      <Image source={bgBlueOrnament} style={styles.headerBackground} />

      <View style={styles.content}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.tabContent}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabBarIndicator,
          }}>
          {Object.values(TAB_NAMES).map((_value, _index) => (
            <Tab.Screen
              key={_index}
              name={_value}
              component={TabContent}
              initialParams={{
                data: route?.params?.data,
                isfromParent: route?.params?.isFromParent,
              }}
              options={{
                tabBarLabel: ({
                  children,
                  focused,
                }: {
                  children: string;
                  focused: boolean;
                }) => (
                  <Text
                    style={[
                      styles.tabBarLabel,
                      focused && {color: Colors.primary.base},
                    ]}>
                    {children}
                  </Text>
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </View>
    </View>
  );
};

export {PTNReportScreen};
