import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms';
import {View} from 'react-native';
import Colors from '@constants/colors';
import {styles} from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ScheduleSectionTab from './component/ScheduleSectionTab';
import HistorySectionTab from './component/HistorySectionTab';
import Left from '@assets/svg/ic24_chevron_left_white.svg';
import {ParamList} from 'type/screen';
const ScheduleSection = createStackNavigator();
const HistorySection = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ScheduleSectionScreen = () => (
  <ScheduleSection.Navigator>
    <ScheduleSection.Screen
      name="JadwalSection"
      children={() => <ScheduleSectionTab />}
      options={{
        headerShown: false,
      }}
    />
  </ScheduleSection.Navigator>
);

const HistorySectionScreen = () => (
  <HistorySection.Navigator>
    <HistorySection.Screen
      name="RiwayatSection"
      children={() => <HistorySectionTab />}
      options={{
        headerShown: false,
      }}
    />
  </HistorySection.Navigator>
);
const TryOutScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TryOutScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Try Out'}
          backgroundColor={Colors.primary.base}
          colorLabel={'white'}
          iconLeft={<Left width={18} height={18} />}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.scrollview}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: Colors.primary.base,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarInactiveTintColor: Colors.dark.neutral50,
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabBarIndicator,
          }}>
          <Tab.Screen name="Jadwal" children={() => ScheduleSectionScreen()} />
          <Tab.Screen name="Riwayat" children={() => HistorySectionScreen()} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export {TryOutScreen};
