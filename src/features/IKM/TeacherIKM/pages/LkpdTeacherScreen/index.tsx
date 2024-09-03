import React, {FC, useCallback, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import useLkpdTeacher from './useLkpdTeacher';
import {Header} from '@components/atoms';
import IconHistory from '@assets/svg/ic24_history_blue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from '@constants/colors';
import PerluDiperiksaTabScreen from './components/PerluDiperiksaTabScreen';
import DijadwalkanTabScreen from './components/DijadwalkanTabScreen';

const Tab = createMaterialTopTabNavigator();
const TAB_NAMES = {
  PerluDiperiksa: 'Perlu Diperiksa',
  Dijadwalkan: 'Dijadwalkan',
};

const MyTabContent: FC = ({route: {name}}: any) => (
  <MyTabContentItem type={name} />
);

const MyTabContentItem: FC<{type: any}> = ({type}) => {
  switch (type) {
    case TAB_NAMES.Dijadwalkan:
      return <DijadwalkanTabScreen />;
    default:
      return <PerluDiperiksaTabScreen />;
  }
};

const LkpdTeacherScreen = () => {
  const {navigation, navigateScreen} = useLkpdTeacher();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'LKPD'}
          iconRight={<IconHistory />}
          onPressIconRight={() => {
            navigateScreen('LkpdTeacherHistoryScreen');
          }}
        />
      ),
    });
  }, []);

  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => {
      return (
        <Text
          style={[
            styles.containerTabBarLabel,
            focused && {color: Colors.primary.base},
          ]}>
          {children}
        </Text>
      );
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.containerTab}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabBarIndicator,
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
    </View>
  );
};

export {LkpdTeacherScreen};
