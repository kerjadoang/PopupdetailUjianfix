import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms';
import Ic_download from '@assets/svg/downloadBlue.svg';
import Colors from '@constants/colors';
import {styles} from './styles';
import {useRoute} from '@react-navigation/native';
import ScoreKDSection from './components/ScoreKDSection';
import EraportSection from './components/EraportSection';
import UseFormScoreKDSection from './UseFormScoreKDSection';

const NilaiKDStack = createStackNavigator();
const ERaporStack = createStackNavigator();

const NilaiKDStackScreen = (student_data, class_id, years, years_id) => (
  <NilaiKDStack.Navigator>
    <NilaiKDStack.Screen
      name="NilaiKD"
      children={() => (
        <ScoreKDSection
          student_data={student_data}
          class_id={class_id}
          years={years}
          years_id={years_id}
        />
      )}
      options={{
        headerShown: false,
      }}
    />
  </NilaiKDStack.Navigator>
);

const ERaporStackScreen = (student_data, class_id, years, years_id) => (
  <ERaporStack.Navigator>
    <ERaporStack.Screen
      name="ERapor"
      children={() => (
        <EraportSection
          student_data={student_data}
          class_id={class_id}
          years={years}
          years_id={years_id}
        />
      )}
      options={{
        headerShown: false,
      }}
    />
  </ERaporStack.Navigator>
);

const Tab = createMaterialTopTabNavigator();

const InputDetailKDReportScreen = () => {
  const route = useRoute();
  const {student_data, class_id, years, years_id}: any = route?.params;
  const {submitDownload} = UseFormScoreKDSection(
    student_data,
    class_id,
    years,
    years_id,
  );
  return (
    <View style={{flex: 1}}>
      <Header
        label="Detail"
        subLabel={`${student_data?.full_name} • ${class_id?.name} • ${years}`}
        iconRight={<Ic_download />}
        onPressIconRight={submitDownload}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primary.base,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarInactiveTintColor: Colors.dark.neutral50,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
        }}>
        <Tab.Screen
          name="Nilai KD"
          children={() =>
            NilaiKDStackScreen(student_data, class_id, years, years_id)
          }
        />
        <Tab.Screen
          name="e-Rapor"
          children={() =>
            ERaporStackScreen(student_data, class_id, years, years_id)
          }
        />
      </Tab.Navigator>
    </View>
  );
};

export {InputDetailKDReportScreen};
