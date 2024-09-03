import React, {FC, useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import useProjectPancasila from './useProjectPancasila';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '@components/atoms/Header';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import IconNote from '@assets/svg/ic24_note.svg';
import DaftarProyekTab from './components/DaftarProyekTab';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import StatusProyekTab from './components/StatusProyekTab';

const Tab = createMaterialTopTabNavigator();

const TAB_NAMES = {
  DAFTAR_PROJEK: 'Daftar Projek',
  STATUS_PROJEK: 'Status Projek',
};

const MyTabContent: FC = ({route: {name, params}}: any) => (
  <MyTabContentItem type={name} serviceType={params.serviceType} />
);

const MyTabContentItem: FC<{type: any; serviceType: any}> = ({
  type,
  serviceType,
}) => {
  switch (type) {
    case TAB_NAMES.STATUS_PROJEK:
      return <StatusProyekTab service_type={serviceType} />;

    default:
      return <DaftarProyekTab service_type={serviceType} />;
  }
};

const ProjectPancasilaScreen: FC = () => {
  const {isLoading, onIconNotePress, serviceType} = useProjectPancasila();

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
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Projek Pancasila'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
        iconRight={<IconNote width={24} height={24} />}
        onPressIconRight={onIconNotePress}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.cardContainer}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.sceneContainer}
          style={styles.containerTab}
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          }}>
          {Object.values(TAB_NAMES).map(_val => (
            <Tab.Screen
              key={_val}
              initialParams={{serviceType: serviceType}}
              name={_val}
              component={MyTabContent}
              options={{
                tabBarLabel: __renderMyTabBarlabel,
              }}
            />
          ))}
        </Tab.Navigator>
      </View>
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {ProjectPancasilaScreen};
