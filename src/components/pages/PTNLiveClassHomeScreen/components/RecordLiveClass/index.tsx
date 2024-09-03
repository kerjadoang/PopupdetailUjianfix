import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Widget} from '@components/atoms';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import usePTNLiveClassHome from '../../usePTNLiveClass';

type Props = {};
const Tab = createMaterialTopTabNavigator();

const TAB_NAMES = {
  TPS: 'TPS',
  SAINTEK: 'Saintek',
  SOSHUM: 'Soshum',
};

const MyTabContent: FC = ({route: {name}}: any) => {
  return <MyTabContentItem type={name} />;
};

const MyTabContentItem: FC<{type: any}> = ({type}) => {
  const {parseTabData, onSeeAllRecording} = usePTNLiveClassHome();
  const data = parseTabData(type);
  return (
    <FlatList
      horizontal
      data={data ?? []}
      renderItem={({item}) => {
        return (
          <View style={styles.itemContainerTab}>
            <Widget
              title={item?.name ?? ''}
              type={1}
              remove={false}
              add={false}
              backgroundColor={'white'}
              action={() => onSeeAllRecording(item.id?.toString())}
              // svg={item?.icon_mobile || ''}
              imageId={item?.icon_mobile || ''}
            />
          </View>
        );
      }}
    />
  );
};

const RecordLiveClass: FC<Props> = ({}) => {
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
    <View>
      <Text style={[styles.rightTitle]}>Rekaman Live Kelas</Text>
      <Text style={[styles.subTitle]}>
        Semakin paham pelajaran dengan materi kelas pintar
      </Text>
      <View style={styles.parentContainerTab}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.containerTab}
          screenOptions={{
            swipeEnabled: false,
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
    </View>
  );
};

const styles = StyleSheet.create({
  rightTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 8,
  },
  btnSeeOther: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 20,
  },
  subTitle: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  containerTab: {
    backgroundColor: Colors.white,
  },
  parentContainerTab: {
    minHeight: 180,
  },
  containerTabBarLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  itemContainerTab: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export {RecordLiveClass, TAB_NAMES};
