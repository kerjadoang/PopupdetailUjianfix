/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, memo, useCallback, useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import styles from './style';
import Colors from '@constants/colors';
import HistoryIcon from '@assets/svg/ic24_history_blue.svg';
import {Header} from '@components/atoms/Header';
import {TabContentItem} from './components';
import {TAB_NAMES} from './utils';
import {getPerluDiperiksaDestroy, getDijadwalkanDestroy} from '@redux';
import {ParamList} from 'type/screen';

const Tab = createMaterialTopTabNavigator();

const MyTabContent: FC = memo(({route: {name}}: any) => (
  <TabContentItem type={name} />
));

const LMSTeacherTaskScreen: FC = () => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSTeacherTaskScreen'>>();

  const __renderHeader = useCallback(
    () => (
      <View style={{backgroundColor: Colors.white}}>
        <StatusBar barStyle="dark-content" translucent={true} />

        <Header
          label="PR, Projek & Tugas"
          backgroundColor="transparent"
          iconRight={<HistoryIcon />}
          onPressIconRight={() => {
            navigation.navigate('PRProjectTaskHistoryScreen');
          }}
        />
      </View>
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: __renderHeader,
    });

    return () => {
      dispatch(getPerluDiperiksaDestroy());
      dispatch(getDijadwalkanDestroy());
    };
  }, []);

  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => (
      <Text
        style={[
          styles.containerTabBarLabel,
          focused && {color: Colors.primary.base},
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

export {LMSTeacherTaskScreen};
